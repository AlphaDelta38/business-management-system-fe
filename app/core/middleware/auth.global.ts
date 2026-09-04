import { useUserStore } from '@/lib/stores/user.store'

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()

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
      return userStore.setUser(response.data)
    }
  } catch {
    return navigateTo('/auth')
  }
})