<template>
  <v-app :style="cssProps">
    <Header/>

    <v-main>
      <Visualizer/>
    </v-main>

    <FooterVue/>
  </v-app>
</template>

<script>
import Header from './components/Header';
import FooterVue from './components/FooterVue';
import Visualizer from './components/Visualizer';

export default {
  name: 'App',

  components: {
    Header,
    FooterVue,
    Visualizer,
  },

  computed: {
    cssProps() {
      var themeColors = {}
      Object.keys(this.$vuetify.theme.themes.light).forEach((color) => {
        themeColors[`--v-${color}`] = this.$vuetify.theme.themes.light[color]
      })
      return themeColors
    },
  }
};
</script>
<style>
  @font-face {
    font-family: 'gilroy-black';
    src: url('./assets/Gilroy-Black.ttf');
  }
</style>