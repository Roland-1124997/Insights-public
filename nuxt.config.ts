// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxt/image', '@pinia/nuxt', "nuxt-umami"],

  umami: {
    id: process.env.UMAMI_ID,
    host: process.env.UMAMI_HOST,
    useDirective: true,
    autoTrack: true,
    enabled: true,
    proxy: "cloak",
    ignoreLocalhost: true,
    urlOptions: {
      excludeSearch: true,
      excludeHash: true,
    },
  },


  app: {
    head: {
      link: [
        { rel: "icon", href: "https://dashboard.roland-meijer.nl/favicon.ico", sizes: "48x48" },
        { rel: "icon", href: "https://dashboard.roland-meijer.nl/icons/icon_192-blue.png", sizes: "192x192" },

        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Livvic:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,900&display=swap",
        },
      ]
    }

  }

})