import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import 'dotenv'

export default defineNuxtConfig({
  ssr: false,

  dir: {
    middleware: 'core/middleware',
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    'reka-ui/nuxt', '@pinia/nuxt',
  ],

  components: [
    {
      path: '~/lib/components',
      pathPrefix: false,
    },
  ],

  alias: {
    '@/schemas': fileURLToPath(new URL('./app/core/generated/valibot.gen.ts', import.meta.url))
  },

  css: ['~/assets/css/main.css'],

  plugins: [
    '~/core/plugins/01.di.ts',
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
