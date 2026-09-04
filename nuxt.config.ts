import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import 'dotenv'
import { resolve } from 'node:path'
import { existsSync, readdirSync } from 'node:fs'

const domainsPath = resolve('./app/core/domains')

const domainComponents = readdirSync(domainsPath, {
  withFileTypes: true,
})
  .filter(entry => entry.isDirectory())
  .flatMap(domain => {
    return ['widgets', 'features']
      .map(type => ({
        path: `~/core/domains/${domain.name}/${type}`,
        pathPrefix: false,
        absolutePath: resolve(domainsPath, domain.name, type),
      }))
      .filter(({ absolutePath }) => {
        return (
          existsSync(absolutePath) &&
          readdirSync(absolutePath).length > 0
        )
      })
      .map(({ absolutePath, ...component }) => component)
  })

export default defineNuxtConfig({
  ssr: false,

  imports: {
    dirs: [
      '~/lib/utils',
      '~/lib/stores',
    ],
  },

  dir: {
    middleware: 'core/middleware',
    layouts: 'core/layout',

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
    {
      path: '~/lib/widgets',
      pathPrefix: false,
    },
    {
      path: '~/lib/ui',
      pathPrefix: false,
    },


    ...domainComponents
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
