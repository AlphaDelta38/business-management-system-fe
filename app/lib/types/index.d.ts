import { getDICOntainer } from '@/core/di'
import { httpClient } from '@/core/http'

declare module '#app' {
  interface NuxtApp {
    $di: ReturnType<typeof getDICOntainer>
    $http: typeof httpClient
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $di: ReturnType<typeof getDICOntainer>
    $http: typeof httpClient
  }
}

export {}