module.exports = {
  server: {
    // port: 8082, // default: 3000
    // host: '' // default: localhost
  },
  plugins: [
    { src: '~plugins/autocomplete', mode: 'client' },
    { src: '~plugins/axios', mode: 'client' },
    // '~plugins/cookie',
    { src: '~plugins/translate', mode: 'client' },
    { src: '~plugins/tinymce', mode: 'client' },
    { src: '~/plugins/vue-kindergarten', mode: 'client' },
    { src: '~/plugins/datetimepicker', mode: 'client' }
  ],
  modules: [
    // Simple usage
    'cookie-universal-nuxt',

    // With options
    // ['cookie-universal-nuxt', { alias: 'cookiz' }]
  ],
  router: {
    middleware: 'auth',
    // base: '/admin'
    // base: '/app/'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Админка',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
