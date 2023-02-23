import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '',
    title: 'Maps',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],
  ssr: false,

  target: "static",
  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],
  plugins: [
    { src: "~/plugins/axios.js", ssr: false },
    { src: "~/plugins/persistedState.client.js" },
    { src: "~/plugins/google-maps.js" }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    
  ],
  // share cross-origin resource
  proxy: {
    '/maps': {
      target: 'https://maps.googleapis.com/maps',
      pathRewrite: {
        '^/maps' : '/'
        }
      }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
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
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
  }
}
