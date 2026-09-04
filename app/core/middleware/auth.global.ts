import { useUserStore } from '@/lib/stores/user.store'

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()
  const isAuthPage = to.path.startsWith('/auth')

  if (userStore.isAuth || userStore.initialized) {
    return
  }

  userStore.init()

  const app = useNuxtApp()

  try {
    const response = await app.$http({
      method: 'GET',
      url: '/user',
    })

    if (response.status === 'success' && response.data) {
      userStore.setUser(response.data)
    }

    if (userStore.isAuth && isAuthPage) {
      return navigateTo('/')
    }
  } catch {
    return navigateTo('/auth')
  }
})