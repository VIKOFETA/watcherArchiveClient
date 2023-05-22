// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in' // default
    },
    // layoutTransition: {
    //   name: 'slide',
    //   mode: 'out-in' // default
    // }
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
    ['@nuxtjs/google-fonts', {
      families: {
        'Open Sans': true,
        download: true,
        inject: true
      }
    }]
  ],
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       stylus: { 
  //         additionaldata: [`@import "${ resolve(__dirname, './')}/assets/stylesheets/global";`]
  //       }
  //     }
  //   }
  // },
  css: [
    // '~/assets/stylesheets/global.styl',
    // '~/assets/stylesheets/application.styl',
    '~/assets/stylesheets/bootstrap-custom.scss',
    // '~/assets/stylesheets/vendor/normalized.styl',
    // '~/assets/stylesheets/settings/variables.styl',
    // '~/assets/stylesheets/settings/mixins.styl',
    '~/assets/stylesheets/vendor/typography.styl',
    '~/assets/stylesheets/vendor/containers.styl',
    '~/assets/stylesheets/vendor/normalized.styl',
    '~/assets/stylesheets/vendor/style.styl',
  ],
  build: {
    transpile: ['gsap'],
  }
})
