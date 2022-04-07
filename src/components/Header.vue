<template>
    <v-app-bar
      app
      color="primary"
      dark>
        <div class="d-flex align-center">
            <v-icon color="white">mdi-poll</v-icon><span class="pr-2"></span><h1 id="page-title">Audio Visualizer</h1>
        </div>

        <v-spacer></v-spacer>
        <div v-show="!connDialog">
            <v-btn
              color="secondary"
              v-on:click="toggleConnDialog">
                Menu</v-btn>
        </div>
        <div v-show="!settingsDialog">
            <v-btn
              color="secondary"
              v-on:click="toggleSettingsDialog">
                Settings</v-btn>
        </div>
        <v-dialog
          transition="slide-x-reverse-transition"
          v-model="connDialog"
          content-class="v-dialog--custom">
            <template>
                <v-card>
                    <v-card-text>
                        <div class="text-h2 px-12 pt-12 pb-4">
                            <v-icon x-large :color="$vuetify.theme.foreground">mdi-power-plug</v-icon>
                            Connections
                        </div>
                        <div class="text-h4 px-12 py-4">
                            <v-btn
                              color="primary"
                              v-on:click="connectSpotify">Connect to Spotify</v-btn>
                        </div>
                        <div class="text-h4 px-12 pb-4">
                            <v-btn
                              color="accent"
                              v-on:click="connectSystemAudio">Connect System Audio</v-btn>
                        </div>
                        <div>Notes:
                            <ul>
                                <li>Spotify is <strong>not required</strong> for the visualizer. Other audio from the desktop will affect the visualizer.</li>
                                <li>If you are using the Spotify controller, <strong>please connect Spotify first</strong> as authenticating will refresh the page.</li>
                                <li>When connecting <strong>system audio</strong>, select "Your Entire Screen" or the appropriate application and <strong>check the "Share audio" box</strong>.</li>
                            </ul>
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn
                          text
                          v-on:click="toggleConnDialog">
                            Close</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <v-dialog
          transition="slide-x-reverse-transition"
          v-model="settingsDialog"
          content-class="v-dialog--custom">
            <template>
                <v-card>
                    <v-card-text>
                        <div class="text-h2 px-12 pt-12 pb-4">
                            <v-icon x-large :color="$vuetify.theme.foreground">mdi-cogs</v-icon>
                            Settings
                        </div>
                        <div class="text-h4 px-12 py-4">
                            Visualizer Resolution: 
                            <v-slider 
                              @end="updateAnalyserResMode" 
                              :style="'padding-top: 2.5em;'" 
                              v-model="analyserResMode" 
                              min="0"
                              max="4"
                              ticks="always" 
                              tick-size="4" 
                              :tick-labels="resList"></v-slider>
                        </div>
                        <div>Notes:
                            <ul>
                                <li>More settings like colour options, better data division, may be considered!</li>
                            </ul>
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn
                          text
                          v-on:click="toggleSettingsDialog">
                            Close</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <v-dialog
          transition="slide-x-reverse-transition"
          v-model="audioErrDialog"
          content-class="v-dialog--custom">
            <template>
                <v-card>
                    <v-card-text>
                        <div class="text-h2 px-12 pt-12 pb-4">
                            <v-icon x-large :color="$vuetify.theme.foreground">mdi-alert-circle-outline</v-icon>
                            Error: System Audio
                        </div>
                        <div>You need to <strong>enable the share audio checkbox</strong> in order to connect to your desktop audio.</div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn
                          text
                          v-on:click="toggleAudioErrDialog">
                            Close</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <v-dialog
          transition="slide-x-reverse-transition"
          v-model="spotifyErrDialog"
          content-class="v-dialog--custom">
            <template>
                <v-card>
                    <v-card-text>
                        <div class="text-h2 px-12 pt-12 pb-4">
                            <v-icon x-large :color="$vuetify.theme.foreground">mdi-alert-circle-outline</v-icon>
                            Error: Spotify
                        </div>
                        <div v-if="spotifyErrMsgIdx === 0">You need to <strong>agree to authenticate with Spotify</strong> in order to connect your Spotify.</div>
                        <div v-if="spotifyErrMsgIdx === 1">You need to <strong>authenticate with Spotify <em>again</em></strong>. Your session has expired.</div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn
                          text
                          v-on:click="toggleSpotifyErrDialog">
                            Close</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <div class="theme-toggle-container">
            <v-switch
              id="toggle-theme"
              v-model="$vuetify.theme.dark"
              inset
              color="secondary"
              :append-icon="themeIcon"
              v-on:click="saveTheme"></v-switch>
        </div>
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            connDialog: true,
            settingsDialog: false,
            audioErrDialog: false,
            spotifyErrDialog: false,
            spotifyErrMsgIdx: 0,
            stream: undefined,
            analyserResMode: 1,
            resList: [32, 64, 128, 256, 512]
        }
    },
    computed: {
        themeIcon() {
            return this.$vuetify.theme.dark ? "mdi-weather-night" : "mdi-white-balance-sunny";
        },
    },
    methods: {
        saveTheme() {
            localStorage.setItem("lightTheme", !this.$vuetify.theme.dark);
        },
        toggleConnDialog() {
            this.connDialog = !this.connDialog;
        },
        toggleSettingsDialog() {
            this.settingsDialog = !this.settingsDialog;
        },
        toggleAudioErrDialog() {
            this.audioErrDialog = !this.audioErrDialog;
        },
        toggleSpotifyErrDialog(msgIdx) {
            this.spotifyErrMsgIdx = msgIdx;
            this.spotifyErrDialog = !this.spotifyErrDialog;
        },
        connectSpotify() {
            this.$spotifyAPI.getAuthCode();
        },
        connectSystemAudio() {
            if (this.$audioVisuals.cachedStream != undefined) {
                console.log("Called connectSystemAudio when cached stream exists!");
                this.$audioVisuals.cachedStream.then(function(stream) {
                    var src = this.$audioVisuals.context.createMediaStreamSource(stream);
                    src.connect(this.$audioVisuals.analyser);
                    this.$audioVisuals.resume();
                    console.log("Found cached stream, reconnected...")
                }.bind(this))
                .catch(function(err) {
                    console.log("Hook Error:", err);
                    this.toggleAudioErrDialog();
                }.bind(this));
            } else {
                this.$audioVisuals.cachedStream = this.$audioVisuals.getStream().then(function(stream) {
                    console.log("Caching stream")
                    var src = this.$audioVisuals.context.createMediaStreamSource(stream);
                    src.connect(this.$audioVisuals.analyser);
                    this.$audioVisuals.resume();
                    return stream;
                }.bind(this))
                .catch(function(err) {
                    console.log("Hook Error:", err);
                    this.toggleAudioErrDialog();
                }.bind(this));
            }
        },
        updateAnalyserResMode() {
            this.$audioVisuals.res = Math.pow(2, this.analyserResMode+5);
            console.log(`RES: 2^${this.analyserResMode+5}=${Math.pow(2, this.analyserResMode+5)}`);
            this.$root.$emit("updateVisualizer", "resChange");
            console.log(this.$audioVisuals.context);
            this.$audioVisuals.analyser.fftSize = this.$audioVisuals.res;
            this.$audioVisuals.frequencyData = new Uint8Array(this.$audioVisuals.analyser.frequencyBinCount);
            this.connectSystemAudio();
        }
    },
    beforeMount() {
        console.log("Header remounting...");
        this.$vuetify.theme.dark = localStorage.getItem("lightTheme") !== "true";

        var fields = this.$spotifyAPI.checkAuthCode();
        if (!fields)
            return

        if (fields["error"]) {
            console.log(`Well... I kind of need your permission to see your stuff and I can't do it if you say no :(`);
            this.toggleSpotifyErrDialog(0);
            return;
        }
        else if (fields["state"] !== `${this.$spotifyAPI.state}`) {
            console.log(`Looks like this session is different... You're going to need a new token.`);
            this.toggleSpotifyErrDialog(1);
            return;
        }
        else {
            this.$spotifyAPI.getAccessToken(fields["code"]);
        }
    }
}
</script>

<style>
    .theme-toggle-container {
        display: flex;
    }
    .theme-toggle-container > .v-input {
        padding-top: 1.2rem !important;
    }

    .theme-toggle-container > .v-input > .v-input__append-outer {
        margin-left: 0;
    }
    .v-input--switch__track.theme--dark {
        color: #000000 !important;
    }
    .v-input--switch__track.theme--dark.secondary--text {
        color: #000000 !important;
    }
    .v-input--switch__thumb {
        color: #f2f2f2 !important;
    }
    strong {
        color: crimson;
    }
    h1#page-title {
        font-family: 'gilroy-black', sans-serif;
    }
    .v-dialog--custom {
        width: 100%;
    }
    /* Desktop */
    @media screen and (min-width: 768px) {
        .v-dialog--custom {
            width: auto !important;
        }
    }
</style>