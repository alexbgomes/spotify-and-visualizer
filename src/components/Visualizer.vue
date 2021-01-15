<template>
    <div class="visualizer">
        <div id="main-container">
            <div id="head-panel" v-if="$spotifyAPI.accessToken">
                <div id="spotify-data-track"><a :href="trackURL" target="_blank">{{track}}</a></div>
                <div id="spotify-data-artist"><a :href="artistURL" target="_blank">{{artist}}</a></div>
            </div>
            <div id="visualisation">
                <div v-for="i in this.$audioVisuals.analyser.frequencyBinCount" :key="i" :style="getBarCSS(i)"></div>
            </div>
        </div>
        <div id="control-panel" v-if="$spotifyAPI.accessToken">
            <v-card id="album-art-card">
                <a :href="albumURL" target="_blank"><v-img id="album-art" :src="albumImg"></v-img></a>
            </v-card>
            <div id="control-dash-wrapper">
                <v-card id="control-dash">
                    <div id="control-container">
                        <v-progress-linear rounded id="duration-bar" :style="themeBorder" height="0.5em" color="primary" background-opacity="1" :buffer-value="songPercentProgress"></v-progress-linear>
                        <div id="control-duration">{{msToTime(songInternalDuration)}} // {{msToTime(songTotalDuration)}}</div>
                        <v-btn @click="prevSpotify" class="spotify-control-button"><v-icon :style="themeIconWithFade" class="spotify-control-button-icon">mdi-skip-previous</v-icon></v-btn>
                        <v-btn @click="toggleSpotifyPlayback" class="spotify-control-button"><v-icon class="spotify-control-button-icon">{{togglePlaybackIcon}}</v-icon></v-btn>
                        <v-btn @click="nextSpotify" class="spotify-control-button"><v-icon class="spotify-control-button-icon">mdi-skip-next</v-icon></v-btn>
                    </div>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            analyser: undefined,
            barSpacingPercent: undefined,
            freqData: undefined,
            barCSS: [],
            spotifyPlaying: false,
            spotifyUpdater: undefined,
            durationUpdater: undefined,
            lastSong: "__Unknown",
            spotifyUpdateDelay: 5000,
            songCurrentDuration: 0,
            songInternalDuration: 0,
            songTotalDuration: 1, 
            track: "Track - Album",
            artist: "Artist",
            trackURL: "",
            artistURL: "",
            albumURL: "",
            albumImg: "https://via.placeholder.com/300/0ea743/f2f2f2/?text=Loading",
        }
    },
    computed: {
        songPercentProgress() {
            //return this.songCurrentDuration / this.songTotalDuration * 100;
            return this.songInternalDuration / this.songTotalDuration * 100;
        },
        togglePlaybackIcon() {
            return this.spotifyPlaying ? "mdi-pause" : "mdi-play";
        },
        themeIconWithFade() {
            return {
                color: this.$vuetify.theme.currentTheme.background,
                transition: 'all 0.2s ease-in-out'
            }
        },
        themeBorder() {
            return {
                border: `1px solid ${this.$vuetify.theme.currentTheme.background}`
            }
        }
    },
    methods: {
        getBarCSS(offset) {
            return this.barCSS[offset];
        },
        startUpdating() {
            var anim = () => {
                requestAnimationFrame(anim);
                this.freqData = this.$audioVisuals.frequencyData;
                this.$audioVisuals.analyser.getByteFrequencyData(this.$audioVisuals.frequencyData);
                var temp = []
                for(var i = 0; i < this.$audioVisuals.analyser.frequencyBinCount; i++) {
                    temp[i] = `left: ${this.barSpacingPercent * i}%; height: ${this.$audioVisuals.frequencyData[i] + 1}px;`
                }
                this.barCSS = temp;
            };
            anim();
            this.updateSpotifyData();
        },
        updateDuration() {
            if (this.spotifyPlaying && this.songInternalDuration < this.songTotalDuration) {
                this.songInternalDuration+=1000;
            }
            this.durationUpdater = setTimeout(this.updateDuration, 1000);
        },
        resetDurationUpdate() {
            this.songInternalDuration = this.songCurrentDuration;
            clearTimeout(this.durationUpdater);
            this.updateDuration();
        },
        getSpotifyData() {
            var request = "https://api.spotify.com/v1/me/player/currently-playing";
            this.$spotifyAPI.callSpotifyAPI(request).then(function(response) {
                this.spotifyPlaying = response["data"]["is_playing"];
                this.songCurrentDuration = response["data"]["progress_ms"];
                this.songTotalDuration = response["data"]["item"]["duration_ms"];
                var track = response["data"]["item"]["name"];
                if (this.lastSong !== track) {
                    console.log("Track changed");
                    //this.resetDurationUpdate();
                    this.lastSong = track;
                }
                this.resetDurationUpdate();
                var album = response["data"]["item"]["album"]["name"];
                if (album !== track) {
                    track = `${track} - ${album}`;
                }
                this.track = track;
                this.trackURL = response["data"]["item"]["external_urls"]["spotify"];

                this.artist = response["data"]["item"]["artists"][0]["name"];
                this.artistURL = response["data"]["item"]["artists"][0]["external_urls"]["spotify"];

                this.albumURL = response["data"]["item"]["album"]["external_urls"]["spotify"];
                this.albumImg = response["data"]["item"]["album"]["images"][0]["url"];
            }.bind(this));
        },
        resetSpotifyUpdate() {
            if (this.spotifyUpdater) {
                clearTimeout(this.spotifyUpdater);
            }
            this.updateSpotifyData();
        },
        updateSpotifyData() {
            if (this.$spotifyAPI.accessToken) {
                this.getSpotifyData();
            }
            this.spotifyUpdater = setTimeout(this.updateSpotifyData, this.spotifyUpdateDelay);
        },
        toggleSpotifyPlayback() {
            if (this.spotifyPlaying) {
                let request = "https://api.spotify.com/v1/me/player/pause";
                this.spotifyPlaying = false;
                this.$spotifyAPI.callSpotifyAPI(request, "PUT").then(function() {
                    console.log("Spotify Paused");
                    this.resetSpotifyUpdate();
                }.bind(this));
            } else {
                let request = "https://api.spotify.com/v1/me/player/play";
                this.spotifyPlaying = true;
                this.$spotifyAPI.callSpotifyAPI(request, "PUT").then(function() {
                    console.log("Spotify Resumed");
                    this.resetSpotifyUpdate();
                }.bind(this));
            }
        },
        prevSpotify() {
            if (this.songCurrentDuration < 3000) {
                let request = "https://api.spotify.com/v1/me/player/previous";
                this.$spotifyAPI.callSpotifyAPI(request, "POST").then(function() {
                    console.log("Spotify Previous");
                    this.resetSpotifyUpdate(); //needs not refactoring, the timing must be synchronus to the promise
                }.bind(this));
            } else {
                let request = "https://api.spotify.com/v1/me/player/seek?position_ms=0";
                this.$spotifyAPI.callSpotifyAPI(request, "PUT").then(function() {
                    console.log("Spotify Rewind");
                    this.resetSpotifyUpdate();
                }.bind(this));
            }
        },
        nextSpotify() {
            var request = "https://api.spotify.com/v1/me/player/next";
            this.$spotifyAPI.callSpotifyAPI(request, "POST").then(function() {
                console.log("Spotify Next");
                this.resetSpotifyUpdate();
            }.bind(this));
        },
        msToTime(ms) {
            var start = ms > 3600000 ? 11 : 14; // check to see if hour included, not handling improbable cases of streaming content with duration > 24hrs
            return new Date(ms).toISOString().slice(start, -5);
        }
    },
    beforeMount() {
        this.$audioVisuals.createVisualizerData();
        this.analyser =  this.$audioVisuals.analyser;
        this.barSpacingPercent = 100 / this.analyser.frequencyBinCount;
    },
    mounted() {
        this.startUpdating();
    },
}
</script>

<style>
    #main-container {
        font-family: 'Myriad Pro', Calibri, Helvetica, Arial, sans-serif;
        font-size: small;
        height: 550px;
        padding: 0.5em;
        margin-bottom: 3.5em;
    }

    #main-container #visualisation {
        height: 255px;
        position: relative;
        margin: 10px;
        -webkit-box-reflect: below 3px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(255,255,255,0.2)));
    }

    #main-container #visualisation > div {
        width: 2.5%;
        height: 0px;
        background-color: var(--v-primary);
        display: inline-block;
        position: absolute;
        bottom: 0px;
    }
    div[id*="spotify-data-"] {
        font-family: 'gilroy-black', sans-serif;
        font-size: 2em;
    }

    div[id*="spotify-data-"] > a {
        color: var(--v-primary) !important;
    }

    #main-container a {
        text-decoration: none;
        color: var(--v-primary);
    }

    #control-panel {
        padding: 0.5em;
        display: flex;
    }

    #control-dash-container {
        padding: 4em 0;
    }

    #control-dash-wrapper {
        width: 100%;
        padding: 3.5em 0;
    }

    #control-dash {
        height: 8em;
        padding: 0.5em;
        text-align: center;
        margin: 0 15%;
        min-width: 15em;
        box-shadow: 0 3px 1px 8px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)
    }

    #control-container {
        padding-top: 1em;
    }

    #control-duration {
        padding: 0.5em 0;
    }

    #album-art-card {
        width: 15em;
        padding: 0.5em;
        -webkit-box-reflect: below 3px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(255,255,255,0.2)));
    }

    .spotify-control-button:hover > span > .spotify-control-button-icon {
        color: var(--v-primary) !important;
    }
</style>