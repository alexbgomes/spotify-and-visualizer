import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0ea743',
        secondary: '#f2f2f2',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        background: '#212121',
        foreground: '#F2F2F2',
        spotifyLight: '#1DB954',
        spotifyDark: '#0ea743'
      },
      dark: {
        primary: '#0ea743',
        secondary: '#f2f2f2',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        background: '#F2F2F2',
        foreground: '#212121',
        spotifyLight: '#1DB954',
        spotifyDark: '#0ea743'
      },
    },
    dark: true,
    options: {
      themeCache: {
        get: key => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value),
      },
    },
  }
});
