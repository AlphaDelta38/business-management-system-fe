<template>
  <aside
    class="bg-bg-1 border-r border-border-2 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col shrink-0 overflow-hidden select-none will-change-[width]"
    :class="isOpen ? 'w-64' : 'w-16'">
    <div class="flex flex-col border-b border-border-2 shrink-0">
      <div class="h-16 flex items-center px-4 overflow-hidden relative group"
        :class="!isOpen ? 'cursor-pointer hover:bg-bg-2/50 transition-colors focus:outline-none focus:bg-bg-2/50' : ''"
        :tabindex="!isOpen ? 0 : -1" :role="!isOpen ? 'button' : undefined"
        :aria-label="!isOpen ? 'Expand sidebar' : undefined" :title="!isOpen ? 'Expand sidebar' : undefined"
        @click="!isOpen && toggle()" @keydown.enter="!isOpen && toggle()" @keydown.space.prevent="!isOpen && toggle()">
        <UserSidebarProfile :is-open="isOpen" class="flex-1" />

        <Transition enter-active-class="transition-opacity duration-200 ease-out" enter-from-class="opacity-0"
          enter-to-class="opacity-100" leave-active-class="transition-opacity duration-150 ease-in"
          leave-from-class="opacity-100" leave-to-class="opacity-0">
          <UiButton v-if="isOpen" variant="ghost" size="icon-sm" class="shrink-0 ml-auto" title="Collapse sidebar"
            @click.stop="toggle">
            <PanelLeftClose class="w-5 h-5" />
          </UiButton>
        </Transition>
      </div>

      <div class="px-4 pb-4 overflow-hidden"
        :class="isOpen ? 'h-auto opacity-100' : 'h-0 opacity-0 pb-0 pointer-events-none'">
        <WorkspaceSelector :is-open="isOpen" />
      </div>
    </div>

    <div class="w-64 flex-1 overflow-y-auto p-4 transition-opacity duration-300 ease-in-out"
      :class="isOpen ? 'opacity-100 delay-150' : 'opacity-0 pointer-events-none'">
      <!-- Map menu will go here later -->
    </div>

    <div class="border-t border-border-2 px-3.5 py-3 flex items-center shrink-0"
      :class="isOpen ? 'gap-2 justify-between' : 'justify-center'">
      <UiButton variant="ghost" :size="isOpen ? 'md' : 'icon'" class="text-text-2 hover:text-text-1"
        :class="isOpen ? 'flex-1 min-w-0 justify-start px-2.5 h-9 gap-2' : 'shrink-0'" title="Settings">
        <Settings class="w-4.5 h-4.5 shrink-0" />
        <span v-if="isOpen" class="truncate text-[length:--text-size-sm]">Settings</span>
      </UiButton>

      <Logout v-if="isOpen" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { PanelLeftClose, Settings } from '@lucide/vue'

defineProps<{
  isOpen: boolean
  toggle: () => void
}>()
</script>
