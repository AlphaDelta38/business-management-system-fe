<template>
  <UiButton variant="ghost" size="icon" class="shrink-0 text-text-2 hover:text-text-1" title="Log out" @click="logout">
    <LogOut class="w-4.5 h-4.5" />
  </UiButton>
</template>

<script setup lang="ts">
import { LogOut } from '@lucide/vue'

const app = useNuxtApp()
const logoutHttp = app.$di.auth.useLogout()

const logout = async (): Promise<void> => {
  logoutHttp.safeMutateAsync({})
  window.location.reload()
}
</script>