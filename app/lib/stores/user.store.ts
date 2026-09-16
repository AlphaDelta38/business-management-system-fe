import { defineStore } from 'pinia'

import type { CurrentUserResponseDto } from '@/core/generated/types.gen'

interface UserState {
  user: CurrentUserResponseDto | null
  initialized: boolean
  workspaceId: number | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    initialized: false,
    workspaceId: null
  }),

  getters: {
    isAuth: (state) => !!state.user,
  },

  actions: {
    setUser(user: CurrentUserResponseDto) {
      this.user = user

      const id = getCookie('workspace_id')
      const exsistWorkspaceId = user?.workspaces[0]?.id

      if (!Number.isInteger(id) && Number.isInteger(Number(exsistWorkspaceId))) {
        this.setWorkspaceId(Number(exsistWorkspaceId))
      }
    },

    setWorkspaceId(workspaceId: number) {
      if (workspaceId) {
        setCookie('workspace_id', workspaceId)
        this.workspaceId = workspaceId
      }
    },

    init() {
      this.workspaceId = getCookie('workspace_id') ?? null
      this.initialized = true
    },


    logout() {
      this.user = null
    },
  },
})