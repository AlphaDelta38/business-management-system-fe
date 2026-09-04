import { getDICOntainer, initDIContainer } from "@/core/di"
import { createHttp } from "@/core/http"
import { useUserStore } from "@/lib/stores/user.store"


export default defineNuxtPlugin(() => {
  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()
  const userStore = useUserStore()

  const createdHttp = createHttp({
    baseUrl: config.public.apiUrl,
    credentials: 'include'
  })

  initDIContainer({
    httpClient: createdHttp,
    route,
    router,
    userStore,
  })

  return {
    provide: {
      di: getDICOntainer(),
      http: createdHttp
    }
  }
})
