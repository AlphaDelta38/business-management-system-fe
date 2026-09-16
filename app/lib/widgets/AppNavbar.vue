<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-1 border-t border-border-2 h-16 flex items-stretch">
    <UiButton variant="ghost"
      class="flex-1 h-full rounded-none flex items-center justify-center text-text-2 hover:text-text-1 transition-colors"
      title="Menu" @click="toggleSidebar">
      <Menu class="w-5 h-5" />
    </UiButton>

    <UiButton variant="ghost" :active="isHomeActive"
      class="flex-1 h-full rounded-none flex items-center justify-center transition-colors"
      :class="isHomeActive ? 'bg-bg-3! text-text-1!' : 'text-text-2 hover:text-text-1'" title="Home"
      @click="navigateTo('/')">
      <Home class="w-5 h-5" :class="isHomeActive ? 'text-text-1!' : ''" />
    </UiButton>

    <UiButton variant="ghost"
      class="flex-1 h-full rounded-none flex items-center justify-center text-text-2 hover:text-text-1 transition-colors"
      title="Search">
      <Search class="w-5 h-5" />
    </UiButton>

    <UiButton variant="ghost"
      class="flex-1 h-full rounded-none flex items-center justify-center text-text-2 hover:text-text-1 transition-colors"
      title="Notifications">
      <Bell class="w-5 h-5" />
    </UiButton>

    <UiButton variant="ghost" :active="isSettingsActive"
      class="flex-1 h-full rounded-none flex items-center justify-center transition-colors"
      :class="isSettingsActive ? 'bg-bg-3! text-text-1!' : 'text-text-2 hover:text-text-1'" title="Settings"
      @click="navigateTo('/settings')">
      <Settings class="w-5 h-5" :class="isSettingsActive ? 'text-text-1!' : ''" />
    </UiButton>
  </nav>
</template>

<script setup lang="ts">
import { Bell, Home, Menu, Search, Settings } from '@lucide/vue'
import { SideBarProvide } from '@/lib/constants/provide'

const toggleSidebar = injectStrict(SideBarProvide.toggleSidebar)

const route = useRoute()

const isHomeActive = computed(() => {
  const path = route.path.replace(/\/$/, '') || '/'
  return path === '/'
})

const isSettingsActive = computed(() => {
  const path = route.path.replace(/\/$/, '') || '/'
  return path === '/settings' || path.startsWith('/settings/')
})
</script>
