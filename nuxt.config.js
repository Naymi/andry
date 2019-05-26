import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'
import axios from 'axios'
const fs = require('fs')
export default {
  generate: {
    async routes() {
      try {
        const e = await axios.get(
          'https://otchtest.000webhostapp.com/api/show.php'
        )
        return e.data.reduce((acc, item) => {
          acc.push(
            {
              route: `/${item.slug}`,
              payload: item
            },
            {
              route: `/${item.slug}/edit`,
              payload: item
            }
          )
          return acc
        }, [])
      } catch (e) {
        console.log('e :', e)
        return []
      }
    }
  },
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'blue' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify'],

  proxy: {
    '/api/': 'http://otchtest.000webhostapp.com'
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    proxy: true
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.html$/,
        loader: 'html-loader'
      })
    }
  }
}
