<template>
  <div class="flex h-screen w-full bg-bg-2 overflow-hidden text-text-1">
    <AppSidebar :isOpen="isSidebarOpen" :toggle="toggleSidebar" />

    <main class="flex-1 overflow-y-auto min-w-0">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { SideBarProvide } from '~/lib/constants/provide'

const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

provide(SideBarProvide.isOpen, isSidebarOpen)
provide(SideBarProvide.toggleSidebar, toggleSidebar)
</script>
