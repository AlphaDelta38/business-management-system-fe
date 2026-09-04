import { defineStore } from 'pinia'

import type { CurrentUserResponseDto } from '@/core/generated/types.gen'

interface UserState {
  user: CurrentUserResponseDto | null
  initialized: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    initialized: false,
  }),

  getters: {
    isAuth: (state) => !!state.user,
  },

  actions: {
    setUser(user: CurrentUserResponseDto) {
      this.user = user
    },

    init() {
      this.initialized = true
    },


    logout() {
      this.user = null
    },
  },
})