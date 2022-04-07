import Vue from 'vue'
//import './plugins/axios'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueAxios, axios);

Vue.prototype.$debugMode = false;

Vue.prototype.$rootUrl = Vue.prototype.$debugMode ? "http://localhost:8080/" : "https://alexbgomes.github.io/spotify-and-visualizer/"

import {SpotifyAPI} from './scripts/SpotifyAPI';
import {AudioVisuals} from './scripts/AudioVisuals';

Vue.prototype.$spotifyAPI = new SpotifyAPI(Vue.prototype.$rootUrl);
Vue.prototype.$audioVisuals = new AudioVisuals();

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
