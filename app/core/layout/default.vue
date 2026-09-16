<template>
  <div class="flex h-screen w-full bg-bg-2 overflow-hidden text-text-1">
    <AppSidebar />

    <main class="flex-1 overflow-y-auto min-w-0 pb-16 md:pb-0">
      <slot />
    </main>

    <AppNavbar />

    <Teleport to="body">
      <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="isSidebarOpen" class="fixed inset-0 bg-bg-overlay/60 backdrop-blur-xs z-50 md:hidden"
          @click="toggleSidebar" />
      </Transition>

      <Transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="translate-y-full"
        enter-to-class="translate-y-0" leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-y-0" leave-to-class="translate-y-full">
        <div v-if="isSidebarOpen"
          class="fixed bottom-0 left-0 right-0 z-50 bg-bg-1 border-t border-border-2 rounded-t-2xl h-[90dvh] max-h-[90dvh] flex flex-col overflow-hidden md:hidden shadow-2xl">
          <div class="w-10 h-1 bg-bg-3 rounded-full mx-auto mt-3 shrink-0" />
          <AppSidebar isMobile />
        </div>
      </Transition>
    </Teleport>

    <Modals />
  </div>
</template>

<script setup lang="ts">
import { SideBarProvide } from '~/lib/constants/provide'

const isSidebarOpen = ref(typeof window !== 'undefined' ? window.innerWidth >= 768 : true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

provide(SideBarProvide.isOpen, isSidebarOpen)
provide(SideBarProvide.toggleSidebar, toggleSidebar)

watch(isSidebarOpen, (open) => {
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    if (open && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && typeof window !== 'undefined' && window.innerWidth < 768 && isSidebarOpen.value) {
    toggleSidebar()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>
