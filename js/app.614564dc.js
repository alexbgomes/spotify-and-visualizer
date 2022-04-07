(function(t){function e(e){for(var i,s,r=e[0],c=e[1],l=e[2],d=0,f=[];d<r.length;d++)s=r[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&f.push(a[s][0]),a[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);u&&u(e);while(f.length)f.shift()();return n.push.apply(n,l||[]),o()}function o(){for(var t,e=0;e<n.length;e++){for(var o=n[e],i=!0,r=1;r<o.length;r++){var c=o[r];0!==a[c]&&(i=!1)}i&&(n.splice(e--,1),t=s(s.s=o[0]))}return t}var i={},a={app:0},n=[];function s(e){if(i[e])return i[e].exports;var o=i[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=i,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(o,i,function(e){return t[e]}.bind(null,i));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/spotify-and-visualizer/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;n.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"034f":function(t,e,o){"use strict";o("85ec")},"0926":function(t,e,o){"use strict";o("9341")},1:function(t,e){},10:function(t,e){},11:function(t,e){},12:function(t,e){},13:function(t,e){},14:function(t,e){},2:function(t,e){},"2d6d":function(t,e,o){"use strict";(function(t){o.d(e,"a",(function(){return u}));o("99af"),o("d3b7"),o("ac1f"),o("25f0"),o("3ca3"),o("5319"),o("841c"),o("1276"),o("5cc6"),o("9a8c"),o("a975"),o("735e"),o("c1ac"),o("d139"),o("3a7b"),o("d5d6"),o("82f8"),o("e91f"),o("60bd"),o("5f96"),o("3280"),o("3fcc"),o("ca91"),o("25a1"),o("cd26"),o("3c5d"),o("2954"),o("649e"),o("219c"),o("170b"),o("b39a"),o("72f7"),o("ddb0"),o("2b3d");var i=o("3835"),a=o("d4ec"),n=o("bee2"),s=o("3452"),r=o("e762"),c=r.Base64,l=o("bc3a").default,u=function(){function e(t){Object(a["a"])(this,e),this.accessToken=void 0,this.refreshToken=void 0,this.codeVerifier=void 0,this.tokenType="Bearer",this.redirURI=t,this.codeChallengeMethod="S256",this.state=0,this.scope="streaming%20user-read-currently-playing%20user-read-playback-state%20user-modify-playback-state",this.responseType="code",this.clientId="333a78af11864cd2a92a92d0403b500c",this.grantType={access:"authorization_code",refresh:"refresh_token"},this.createAxiosRefreshTokenInterceptor()}return Object(n["a"])(e,[{key:"callSpotifyAPI",value:function(t,e){return this.createAxiosRefreshTokenInterceptor(),console.log("CALL:",t),e||(e="get"),l({method:e,url:t,headers:{"Content-Type":"application/json",Authorization:"".concat(this.tokenType," ").concat(this.accessToken)}})}},{key:"createAxiosRefreshTokenInterceptor",value:function(){var t=this,e=l.interceptors.response.use((function(t){return t}),(function(o){var i=o.config;if(i._retry=!0,console.log("INTERCEPTED ERR:",o.response.status),401!==o.response.status)return Promise.reject(o);if(l.interceptors.response.eject(e),console.log("Got 401, checking if there are tokens...",t),t.accessToken&&t.refreshToken){console.log("Token expired, hold on... getting you a new one!");var a="https://accounts.spotify.com/api/token",n=new URLSearchParams({client_id:t.clientId,grant_type:t.grantType["refresh"],refresh_token:t.refreshToken});return l({method:"post",url:a,headers:{"Content-Type":"application/x-www-form-urlencoded"},data:n}).then(function(t){return console.log("Token refreshed, expiration:",t["data"]["expires_in"]),this.accessToken=t["data"]["access_token"],this.refreshToken=t["data"]["refresh_token"],i.headers["Authorization"]="".concat(this.tokenType," ").concat(this.accessToken),console.log("Calling again with new token."),l(i)}.bind(t)).catch((function(t){console.log("Token error:",t,t.response)}))}console.log("CALLED API WITHOUT ACCESS/REFRESH TOKEN")}))}},{key:"generateNonce",value:function(t,e){t||(t=64);var o="_.-~";e&&(o="");for(var i="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"+o,n=0;n<t;n++)i+=a.charAt(Math.floor(Math.random()*a.length));return i}},{key:"getCodeVerifier",value:function(){var t=localStorage.getItem("codeVerifier");!this.codeVerifier&&t&&(this.codeVerifier=t,localStorage.removeItem("codeVerifier"));var e=localStorage.getItem("state");!this.state&&e&&(this.state=e,localStorage.removeItem("state"))}},{key:"setCodeVerifier",value:function(){this.codeVerifier&&localStorage.setItem("codeVerifier",this.codeVerifier),this.state&&localStorage.setItem("state",this.state)}},{key:"generateCodeChallenge",value:function(){var e=this.generateNonce();this.codeVerifier=e;var o=s.SHA256(e),i=t.from(o.toString(s.enc.Hex),"hex"),a=new Uint8Array(i),n=c.fromUint8Array(a,!0);return n}},{key:"createAuthURI",value:function(){var t=this.generateCodeChallenge(),e=this.generateNonce(14,!0);this.state=e;var o="https://accounts.spotify.com/en/authorize",i="response_type=".concat(this.responseType,"&client_id=").concat(this.clientId,"&redirect_uri=").concat(this.redirURI,"&scope=").concat(this.scope,"&state=").concat(e,"&code_challenge=").concat(t,"&code_challenge_method=").concat(this.codeChallengeMethod),a="".concat(o,"?").concat(i);return a}},{key:"getAuthCode",value:function(){var t=this.createAuthURI();this.setCodeVerifier(),window.location.replace(t)}},{key:"checkAuthCode",value:function(){if(""!=window.location.search){for(var t=window.location.search.substr(1),e=t.split("&"),o={},a=0;a<e.length;a++){var n=e[a].split("="),s=Object(i["a"])(n,2),r=s[0],c=s[1];o[r]=c}return this.getCodeVerifier(),o}}},{key:"getAccessToken",value:function(t){if(this.codeVerifier){console.log("New session huh? Hold on... getting you a fresh token!");var e="https://accounts.spotify.com/api/token",o=new URLSearchParams({client_id:this.clientId,grant_type:this.grantType["access"],code:t,redirect_uri:this.redirURI,code_verifier:this.codeVerifier});l({method:"post",url:e,headers:{"Content-Type":"application/x-www-form-urlencoded"},data:o}).then(function(t){console.log("Token expiration:",t["data"]["expires_in"]),this.accessToken=t["data"]["access_token"],this.refreshToken=t["data"]["refresh_token"]}.bind(this)).catch((function(t){console.log("ERR GETTING TOKEN:",t.response)}))}else console.log("codeVerifier not found.")}},{key:"getRefreshToken",value:function(){if(this.refreshToken){var t="https://accounts.spotify.com/api/token",e=new URLSearchParams({client_id:this.clientId,grant_type:this.grantType["refresh"],refresh_token:this.refreshToken});l({method:"post",url:t,headers:{"Content-Type":"application/x-www-form-urlencoded"},data:e}).then(function(t){console.log("Token refreshed, expiration:",t["data"]["expires_in"]),this.accessToken=t["data"]["access_token"],this.refreshToken=t["data"]["refresh_token"]}.bind(this)).catch((function(t){console.log("ERR GETTING TOKEN:",t.response)})).finally(this.createAxiosRefreshTokenInterceptor)}else console.log("ERR: REQUESTED REFRESH TOKEN WITHOUT ONE.")}}]),e}()}).call(this,o("b639").Buffer)},3:function(t,e){},4:function(t,e){},5:function(t,e){},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var i=o("2b0e"),a=o("bc3a"),n=o.n(a),s=o("2106"),r=o.n(s),c=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",{style:t.cssProps},[o("Header"),o("v-main",[o("Visualizer",{key:t.visualizerKey})],1),o("FooterVue")],1)},l=[],u=(o("4160"),o("b64b"),o("159b"),function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[o("div",{staticClass:"d-flex align-center"},[o("v-icon",{attrs:{color:"white"}},[t._v("mdi-poll")]),o("span",{staticClass:"pr-2"}),o("h1",{attrs:{id:"page-title"}},[t._v("Audio Visualizer")])],1),o("v-spacer"),o("div",{directives:[{name:"show",rawName:"v-show",value:!t.connDialog,expression:"!connDialog"}]},[o("v-btn",{attrs:{color:"secondary"},on:{click:t.toggleConnDialog}},[t._v(" Menu")])],1),o("div",{directives:[{name:"show",rawName:"v-show",value:!t.settingsDialog,expression:"!settingsDialog"}]},[o("v-btn",{attrs:{color:"secondary"},on:{click:t.toggleSettingsDialog}},[t._v(" Settings")])],1),o("v-dialog",{attrs:{transition:"slide-x-reverse-transition","content-class":"v-dialog--custom"},model:{value:t.connDialog,callback:function(e){t.connDialog=e},expression:"connDialog"}},[[o("v-card",[o("v-card-text",[o("div",{staticClass:"text-h2 px-12 pt-12 pb-4"},[o("v-icon",{attrs:{"x-large":"",color:t.$vuetify.theme.foreground}},[t._v("mdi-power-plug")]),t._v(" Connections ")],1),o("div",{staticClass:"text-h4 px-12 py-4"},[o("v-btn",{attrs:{color:"primary"},on:{click:t.connectSpotify}},[t._v("Connect to Spotify")])],1),o("div",{staticClass:"text-h4 px-12 pb-4"},[o("v-btn",{attrs:{color:"accent"},on:{click:t.connectSystemAudio}},[t._v("Connect System Audio")])],1),o("div",[t._v("Notes: "),o("ul",[o("li",[t._v("Spotify is "),o("strong",[t._v("not required")]),t._v(" for the visualizer. Other audio from the desktop will affect the visualizer.")]),o("li",[t._v("If you are using the Spotify controller, "),o("strong",[t._v("please connect Spotify first")]),t._v(" as authenticating will refresh the page.")]),o("li",[t._v("When connecting "),o("strong",[t._v("system audio")]),t._v(', select "Your Entire Screen" or the appropriate application and '),o("strong",[t._v('check the "Share audio" box')]),t._v(".")])])])]),o("v-card-actions",{staticClass:"justify-end"},[o("v-btn",{attrs:{text:""},on:{click:t.toggleConnDialog}},[t._v(" Close")])],1)],1)]],2),o("v-dialog",{attrs:{transition:"slide-x-reverse-transition","content-class":"v-dialog--custom"},model:{value:t.settingsDialog,callback:function(e){t.settingsDialog=e},expression:"settingsDialog"}},[[o("v-card",[o("v-card-text",[o("div",{staticClass:"text-h2 px-12 pt-12 pb-4"},[o("v-icon",{attrs:{"x-large":"",color:t.$vuetify.theme.foreground}},[t._v("mdi-cogs")]),t._v(" Settings ")],1),o("div",{staticClass:"text-h4 px-12 py-4"},[t._v(" Visualizer Resolution: "),o("v-slider",{style:"padding-top: 2.5em;",attrs:{min:"0",max:"4",ticks:"always","tick-size":"4","tick-labels":t.resList},on:{end:t.updateAnalyserResMode},model:{value:t.analyserResMode,callback:function(e){t.analyserResMode=e},expression:"analyserResMode"}})],1),o("div",[t._v("Notes: "),o("ul",[o("li",[t._v("More settings like colour options, better data division, may be considered!")])])])]),o("v-card-actions",{staticClass:"justify-end"},[o("v-btn",{attrs:{text:""},on:{click:t.toggleSettingsDialog}},[t._v(" Close")])],1)],1)]],2),o("v-dialog",{attrs:{transition:"slide-x-reverse-transition","content-class":"v-dialog--custom"},model:{value:t.audioErrDialog,callback:function(e){t.audioErrDialog=e},expression:"audioErrDialog"}},[[o("v-card",[o("v-card-text",[o("div",{staticClass:"text-h2 px-12 pt-12 pb-4"},[o("v-icon",{attrs:{"x-large":"",color:t.$vuetify.theme.foreground}},[t._v("mdi-alert-circle-outline")]),t._v(" Error: System Audio ")],1),o("div",[t._v("You need to "),o("strong",[t._v("enable the share audio checkbox")]),t._v(" in order to connect to your desktop audio.")])]),o("v-card-actions",{staticClass:"justify-end"},[o("v-btn",{attrs:{text:""},on:{click:t.toggleAudioErrDialog}},[t._v(" Close")])],1)],1)]],2),o("v-dialog",{attrs:{transition:"slide-x-reverse-transition","content-class":"v-dialog--custom"},model:{value:t.spotifyErrDialog,callback:function(e){t.spotifyErrDialog=e},expression:"spotifyErrDialog"}},[[o("v-card",[o("v-card-text",[o("div",{staticClass:"text-h2 px-12 pt-12 pb-4"},[o("v-icon",{attrs:{"x-large":"",color:t.$vuetify.theme.foreground}},[t._v("mdi-alert-circle-outline")]),t._v(" Error: Spotify ")],1),0===t.spotifyErrMsgIdx?o("div",[t._v("You need to "),o("strong",[t._v("agree to authenticate with Spotify")]),t._v(" in order to connect your Spotify.")]):t._e(),1===t.spotifyErrMsgIdx?o("div",[t._v("You need to "),o("strong",[t._v("authenticate with Spotify "),o("em",[t._v("again")])]),t._v(". Your session has expired.")]):t._e()]),o("v-card-actions",{staticClass:"justify-end"},[o("v-btn",{attrs:{text:""},on:{click:t.toggleSpotifyErrDialog}},[t._v(" Close")])],1)],1)]],2),o("div",{staticClass:"theme-toggle-container"},[o("v-switch",{attrs:{id:"toggle-theme",inset:"",color:"secondary","append-icon":t.themeIcon},on:{click:t.saveTheme},model:{value:t.$vuetify.theme.dark,callback:function(e){t.$set(t.$vuetify.theme,"dark",e)},expression:"$vuetify.theme.dark"}})],1)],1)}),d=[],f=(o("99af"),o("d3b7"),o("5cc6"),o("9a8c"),o("a975"),o("735e"),o("c1ac"),o("d139"),o("3a7b"),o("d5d6"),o("82f8"),o("e91f"),o("60bd"),o("5f96"),o("3280"),o("3fcc"),o("ca91"),o("25a1"),o("cd26"),o("3c5d"),o("2954"),o("649e"),o("219c"),o("170b"),o("b39a"),o("72f7"),{data:function(){return{connDialog:!0,settingsDialog:!1,audioErrDialog:!1,spotifyErrDialog:!1,spotifyErrMsgIdx:0,stream:void 0,analyserResMode:1,resList:[32,64,128,256,512]}},computed:{themeIcon:function(){return this.$vuetify.theme.dark?"mdi-weather-night":"mdi-white-balance-sunny"}},methods:{saveTheme:function(){localStorage.setItem("lightTheme",!this.$vuetify.theme.dark)},toggleConnDialog:function(){this.connDialog=!this.connDialog},toggleSettingsDialog:function(){this.settingsDialog=!this.settingsDialog},toggleAudioErrDialog:function(){this.audioErrDialog=!this.audioErrDialog},toggleSpotifyErrDialog:function(t){this.spotifyErrMsgIdx=t,this.spotifyErrDialog=!this.spotifyErrDialog},connectSpotify:function(){this.$spotifyAPI.getAuthCode()},connectSystemAudio:function(){void 0!=this.$audioVisuals.cachedStream?(console.log("Called connectSystemAudio when cached stream exists!"),this.$audioVisuals.cachedStream.then(function(t){var e=this.$audioVisuals.context.createMediaStreamSource(t);e.connect(this.$audioVisuals.analyser),this.$audioVisuals.resume(),console.log("Found cached stream, reconnected...")}.bind(this)).catch(function(t){console.log("Hook Error:",t),this.toggleAudioErrDialog()}.bind(this))):this.$audioVisuals.cachedStream=this.$audioVisuals.getStream().then(function(t){console.log("Caching stream");var e=this.$audioVisuals.context.createMediaStreamSource(t);return e.connect(this.$audioVisuals.analyser),this.$audioVisuals.resume(),t}.bind(this)).catch(function(t){console.log("Hook Error:",t),this.toggleAudioErrDialog()}.bind(this))},updateAnalyserResMode:function(){this.$audioVisuals.res=Math.pow(2,this.analyserResMode+5),console.log("RES: 2^".concat(this.analyserResMode+5,"=").concat(Math.pow(2,this.analyserResMode+5))),this.$root.$emit("updateVisualizer","resChange"),console.log(this.$audioVisuals.context),this.$audioVisuals.analyser.fftSize=this.$audioVisuals.res,this.$audioVisuals.frequencyData=new Uint8Array(this.$audioVisuals.analyser.frequencyBinCount),this.connectSystemAudio()}},beforeMount:function(){console.log("Header remounting..."),this.$vuetify.theme.dark="true"!==localStorage.getItem("lightTheme");var t=this.$spotifyAPI.checkAuthCode();if(t)return t["error"]?(console.log("Well... I kind of need your permission to see your stuff and I can't do it if you say no :("),void this.toggleSpotifyErrDialog(0)):t["state"]!=="".concat(this.$spotifyAPI.state)?(console.log("Looks like this session is different... You're going to need a new token."),void this.toggleSpotifyErrDialog(1)):void this.$spotifyAPI.getAccessToken(t["code"])}}),h=f,p=(o("8baf"),o("2877")),g=Object(p["a"])(h,u,d,!1,null,null,null),y=g.exports,v=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-footer"},[o("p",[t._v("Audio Visualizer")]),o("p",[t._v("Alex Gomes "+t._s(t.curYear))])])},m=[],b={name:"FooterVue",computed:{curYear:function(){return(new Date).getFullYear()}}},k=b,S=(o("fa76"),Object(p["a"])(k,v,m,!1,null,null,null)),_=S.exports,D=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"visualizer"},[o("div",{attrs:{id:"main-container"}},[t.$spotifyAPI.accessToken?o("div",{attrs:{id:"head-panel"}},[o("div",{attrs:{id:"spotify-data-track"}},[o("a",{attrs:{href:t.trackURL,target:"_blank"}},[t._v(t._s(t.track))])]),o("div",{attrs:{id:"spotify-data-artist"}},[o("a",{attrs:{href:t.artistURL,target:"_blank"}},[t._v(t._s(t.artist))])])]):t._e(),o("div",{attrs:{id:"visualisation"}},t._l(this.$audioVisuals.analyser.frequencyBinCount,(function(e){return o("div",{key:e,style:t.getBarCSS(e)})})),0)]),t.$spotifyAPI.accessToken?o("div",{attrs:{id:"control-panel"}},[o("v-card",{attrs:{id:"album-art-card"}},[o("a",{attrs:{href:t.albumURL,target:"_blank"}},[o("v-img",{attrs:{id:"album-art",src:t.albumImg}})],1)]),o("div",{attrs:{id:"control-dash-wrapper"}},[o("v-card",{attrs:{id:"control-dash"}},[o("div",{attrs:{id:"control-container"}},[o("v-progress-linear",{style:t.themeBorder,attrs:{rounded:"",id:"duration-bar",height:"0.5em",color:"primary","background-opacity":"1","buffer-value":t.songPercentProgress}}),o("div",{attrs:{id:"control-duration"}},[t._v(t._s(t.msToTime(t.songInternalDuration))+" // "+t._s(t.msToTime(t.songTotalDuration)))]),o("v-btn",{staticClass:"spotify-control-button",on:{click:t.prevSpotify}},[o("v-icon",{staticClass:"spotify-control-button-icon",style:t.themeIconWithFade},[t._v("mdi-skip-previous")])],1),o("v-btn",{staticClass:"spotify-control-button",on:{click:t.toggleSpotifyPlayback}},[o("v-icon",{staticClass:"spotify-control-button-icon"},[t._v(t._s(t.togglePlaybackIcon))])],1),o("v-btn",{staticClass:"spotify-control-button",on:{click:t.nextSpotify}},[o("v-icon",{staticClass:"spotify-control-button-icon"},[t._v("mdi-skip-next")])],1)],1)])],1)],1):t._e()])},x=[],T=(o("fb6a"),o("b0c0"),{data:function(){return{analyser:void 0,barSpacingPercent:void 0,freqData:void 0,barCSS:[],spotifyPlaying:!1,spotifyUpdater:void 0,durationUpdater:void 0,lastSong:"__Unknown",spotifyUpdateDelay:5e3,songCurrentDuration:0,songInternalDuration:0,songTotalDuration:1,track:"Track - Album",artist:"Artist",trackURL:"",artistURL:"",albumURL:"",albumImg:"https://via.placeholder.com/300/0ea743/f2f2f2/?text=Loading"}},computed:{songPercentProgress:function(){return this.songInternalDuration/this.songTotalDuration*100},togglePlaybackIcon:function(){return this.spotifyPlaying?"mdi-pause":"mdi-play"},themeIconWithFade:function(){return{color:this.$vuetify.theme.currentTheme.background,transition:"all 0.2s ease-in-out"}},themeBorder:function(){return{border:"1px solid ".concat(this.$vuetify.theme.currentTheme.background)}}},methods:{getBarCSS:function(t){return this.barCSS[t]},startUpdating:function(){var t=this,e=function e(){requestAnimationFrame(e),t.freqData=t.$audioVisuals.frequencyData,t.$audioVisuals.analyser.getByteFrequencyData(t.$audioVisuals.frequencyData);for(var o=[],i=0;i<t.$audioVisuals.analyser.frequencyBinCount;i++)o[i]="left: ".concat(t.barSpacingPercent*i,"%; height: ").concat(t.$audioVisuals.frequencyData[i]+1,"px;");t.barCSS=o};e(),this.updateSpotifyData()},updateDuration:function(){this.spotifyPlaying&&this.songInternalDuration<this.songTotalDuration&&(this.songInternalDuration+=1e3),this.durationUpdater=setTimeout(this.updateDuration,1e3)},resetDurationUpdate:function(){this.songInternalDuration=this.songCurrentDuration,clearTimeout(this.durationUpdater),this.updateDuration()},getSpotifyData:function(){var t="https://api.spotify.com/v1/me/player/currently-playing";this.$spotifyAPI.callSpotifyAPI(t).then(function(t){this.spotifyPlaying=t["data"]["is_playing"],this.songCurrentDuration=t["data"]["progress_ms"],this.songTotalDuration=t["data"]["item"]["duration_ms"];var e=t["data"]["item"]["name"];this.lastSong!==e&&(console.log("Track changed"),this.lastSong=e),this.resetDurationUpdate();var o=t["data"]["item"]["album"]["name"];o!==e&&(e="".concat(e," - ").concat(o)),this.track=e,this.trackURL=t["data"]["item"]["external_urls"]["spotify"],this.artist=t["data"]["item"]["artists"][0]["name"],this.artistURL=t["data"]["item"]["artists"][0]["external_urls"]["spotify"],this.albumURL=t["data"]["item"]["album"]["external_urls"]["spotify"],this.albumImg=t["data"]["item"]["album"]["images"][0]["url"]}.bind(this))},resetSpotifyUpdate:function(){this.spotifyUpdater&&clearTimeout(this.spotifyUpdater),this.updateSpotifyData()},updateSpotifyData:function(){this.$spotifyAPI.accessToken&&this.getSpotifyData(),this.spotifyUpdater=setTimeout(this.updateSpotifyData,this.spotifyUpdateDelay)},toggleSpotifyPlayback:function(){if(this.spotifyPlaying){var t="https://api.spotify.com/v1/me/player/pause";this.spotifyPlaying=!1,this.$spotifyAPI.callSpotifyAPI(t,"PUT").then(function(){console.log("Spotify Paused"),this.resetSpotifyUpdate()}.bind(this))}else{var e="https://api.spotify.com/v1/me/player/play";this.spotifyPlaying=!0,this.$spotifyAPI.callSpotifyAPI(e,"PUT").then(function(){console.log("Spotify Resumed"),this.resetSpotifyUpdate()}.bind(this))}},prevSpotify:function(){if(this.songCurrentDuration<3e3){var t="https://api.spotify.com/v1/me/player/previous";this.$spotifyAPI.callSpotifyAPI(t,"POST").then(function(){console.log("Spotify Previous"),this.resetSpotifyUpdate()}.bind(this))}else{var e="https://api.spotify.com/v1/me/player/seek?position_ms=0";this.$spotifyAPI.callSpotifyAPI(e,"PUT").then(function(){console.log("Spotify Rewind"),this.resetSpotifyUpdate()}.bind(this))}},nextSpotify:function(){var t="https://api.spotify.com/v1/me/player/next";this.$spotifyAPI.callSpotifyAPI(t,"POST").then(function(){console.log("Spotify Next"),this.resetSpotifyUpdate()}.bind(this))},msToTime:function(t){var e=t>36e5?11:14;return new Date(t).toISOString().slice(e,-5)}},beforeMount:function(){this.$audioVisuals.createVisualizerData(),this.analyser=this.$audioVisuals.analyser,this.barSpacingPercent=100/this.analyser.frequencyBinCount,console.log("Visualizer remounting... Res:",this.$audioVisuals.res)},mounted:function(){this.startUpdating(),console.log("Remounted Visualizer")}}),C=T,I=(o("0926"),Object(p["a"])(C,D,x,!1,null,null,null)),A=I.exports,w={name:"App",data:function(){return{visualizerKey:0}},components:{Header:y,FooterVue:_,Visualizer:A},computed:{cssProps:function(){var t=this,e={};return Object.keys(this.$vuetify.theme.themes.light).forEach((function(o){e["--v-".concat(o)]=t.$vuetify.theme.themes.light[o]})),e}},mounted:function(){var t=this;this.$root.$on("updateVisualizer",(function(e){console.log("Detected:",e),t.visualizerKey++}))}},$=w,P=(o("034f"),Object(p["a"])($,c,l,!1,null,null,null)),E=P.exports,V=o("ce5b"),R=o.n(V);o("bf40");i["default"].use(R.a);var U=new R.a({theme:{themes:{light:{primary:"#0ea743",secondary:"#f2f2f2",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107",background:"#212121",foreground:"#F2F2F2",spotifyLight:"#1DB954",spotifyDark:"#0ea743"},dark:{primary:"#0ea743",secondary:"#f2f2f2",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107",background:"#F2F2F2",foreground:"#212121",spotifyLight:"#1DB954",spotifyDark:"#0ea743"}},dark:!0,options:{themeCache:{get:function(t){return localStorage.getItem(t)},set:function(t,e){return localStorage.setItem(t,e)}}}}}),M=(o("d5e8"),o("5363"),o("2d6d")),F=o("d4ec"),O=o("bee2"),z=function(){function t(){Object(F["a"])(this,t),this.context=void 0,this.analyser=void 0,this.frequencyData=void 0,this.res=64,this.cachedStream=void 0,"undefined"!==typeof AudioContext?(this.context=new AudioContext,navigator.mediaDevices.getDisplayMedia||alert("navigator.mediaDevices.getDisplayMedia is not supported on your browser, please use the latest version of Chrome.")):alert("AudioContext is not supported on your browser, please use the latest version of Chrome.")}return Object(O["a"])(t,[{key:"resume",value:function(){this.context.resume().then((function(){console.log("Playback resumed successfully")}))}},{key:"createVisualizerData",value:function(){console.log("createVisualizerData... res=",this.res),this.analyser=this.context.createAnalyser(),this.analyser.fftSize=this.res,this.frequencyData=new Uint8Array(this.analyser.frequencyBinCount)}},{key:"getStream",value:function(){return navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0})}}]),t}();i["default"].use(r.a,n.a),i["default"].prototype.$debugMode=!1,i["default"].prototype.$rootUrl=i["default"].prototype.$debugMode?"http://localhost:8080/":"https://alexbgomes.github.io/spotify-and-visualizer/",i["default"].prototype.$spotifyAPI=new M["a"](i["default"].prototype.$rootUrl),i["default"].prototype.$audioVisuals=new z,i["default"].config.productionTip=!1,new i["default"]({vuetify:U,render:function(t){return t(E)}}).$mount("#app")},6:function(t,e){},6860:function(t,e,o){},7:function(t,e){},8:function(t,e){},"85ec":function(t,e,o){},"8baf":function(t,e,o){"use strict";o("6860")},9:function(t,e){},9341:function(t,e,o){},db43:function(t,e,o){},fa76:function(t,e,o){"use strict";o("db43")}});
//# sourceMappingURL=app.614564dc.js.map