import colors from 'vuetify/es5/util/colors'

export default {
  ssr: true,
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    fallback: true
  },
  router: {
    base: '/demo-thai-series-event/',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'demo-thai-series-event',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'name', name: 'description', content: 'Demo Thai Series Event' },
      { name: 'description', content: 'The demo for stage screen' },
      { name: 'author', content: 'decimo.me' },
      { name: 'keywords', content: 'demo' },
      { name: 'apple-mobile-web-app-title', content: 'Demo Thai Series Event' },
      { name: 'og:type', content: 'website' },
      { name: 'og:title', content: 'Demo Thai Series Event' },
      { name: 'og:description', content: 'Demo Thai Series Event' },
      { name: 'og:site_name', content: 'Demo Thai Series Event' },
      { name: 'theme-color', content: '#FFFFFF' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxtjs/firebase',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  firebase: {
    config: {
      apiKey: "AIzaSyAo-Qk-hvrgb7fNbRkDa7wbxbkvOQhM0KU",
      authDomain: "event-thaiseries.firebaseapp.com",
      projectId: "event-thaiseries",
      storageBucket: "event-thaiseries.appspot.com",
      messagingSenderId: "670102778768",
      appId: "1:670102778768:web:f8e4e261ec279d5bb3f915",
      measurementId: "G-YXDKFVY8LY",
      databaseURL: "https://event-thaiseries-default-rtdb.asia-southeast1.firebasedatabase.app",
    },
    services: {
      firestore: true,
      database: true,
      storage: true,
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
