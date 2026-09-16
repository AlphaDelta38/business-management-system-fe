<template>
  <aside class="bg-bg-1 flex flex-col overflow-hidden select-none" :class="[
    isMobile
      ? 'w-full h-full flex-1'
      : 'hidden md:flex border-r border-border-2 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 will-change-[width] ' + (isOpen ? 'w-64' : 'w-16')
  ]">
    <div class="flex flex-col border-b border-border-2 shrink-0">
      <div class="h-16 flex items-center px-4 overflow-hidden relative group"
        :class="!isOpen && !isMobile ? 'cursor-pointer hover:bg-bg-2/50 transition-colors focus:outline-none focus:bg-bg-2/50' : ''"
        :tabindex="!isOpen && !isMobile ? 0 : -1" :role="!isOpen && !isMobile ? 'button' : undefined"
        :aria-label="!isOpen && !isMobile ? 'Expand sidebar' : undefined"
        :title="!isOpen && !isMobile ? 'Expand sidebar' : undefined" @click="!isOpen && !isMobile && toggle()"
        @keydown.enter="!isOpen && !isMobile && toggle()" @keydown.space.prevent="!isOpen && !isMobile && toggle()">
        <UserSidebarProfile :is-open="isOpen" class="flex-1" />

        <Transition enter-active-class="transition-opacity duration-200 ease-out" enter-from-class="opacity-0"
          enter-to-class="opacity-100" leave-active-class="transition-opacity duration-150 ease-in"
          leave-from-class="opacity-100" leave-to-class="opacity-0">
          <UiButton v-if="isOpen" variant="ghost" size="icon-sm" class="shrink-0 ml-auto text-text-2 hover:text-text-1"
            :title="isMobile ? 'Close' : 'Collapse sidebar'" @click.stop="toggle">
            <component :is="isMobile ? X : PanelLeftClose" class="w-5 h-5" />
          </UiButton>
        </Transition>
      </div>

      <div class="px-4 pb-4 overflow-hidden"
        :class="isOpen ? 'h-auto opacity-100' : 'h-0 opacity-0 pb-0 pointer-events-none'">
        <WorkspaceSelector :isOpen="isOpen" />
      </div>
    </div>

    <div class="flex-1 overflow-y-auto overflow-x-hidden px-3.5 py-3 flex flex-col gap-1"
      :class="!isOpen && !isMobile ? 'items-center' : ''">
      <SidebarMenuItem title="Home" to="/" :icon="Home" @click="isMobile && toggle()" />
      <SidebarMenuItem title="Search" :icon="Search" />
      <SidebarMenuItem title="Notifications" :icon="Bell" />
    </div>

    <div class="border-t border-border-2 px-3.5 py-3 flex items-center shrink-0"
      :class="isOpen ? 'gap-2 justify-between' : 'justify-center'">
      <SidebarMenuItem title="Settings" to="/settings" :icon="Settings" :block="false" @click="isMobile && toggle()" />
      <Logout v-if="isOpen" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Bell, Home, PanelLeftClose, Search, Settings, X } from '@lucide/vue'

withDefaults(defineProps<{
  isOpen: boolean
  toggle: () => void
  isMobile?: boolean
}>(), {
  isMobile: false,
})
</script>
