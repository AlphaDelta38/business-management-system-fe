<template>
  <div class="flex flex-col">
    <div class="flex items-center gap-3">
      <div class="relative group/avatar shrink-0">
        <a href=""
          class="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-bg-3/80 border border-border-2 text-text-2 hover:text-text-1 hover:border-border-focus transition-all duration-200 shadow-xs"
          :class="{ 'pointer-events-none': !isOpen }" :tabindex="!isOpen ? -1 : 0">
          <img v-if="avatarUrl" :src="avatarUrl" :alt="userStore.user?.name || 'User'"
            class="w-full h-full object-cover" />

          <span v-else-if="userInitials"
            class="text-[11px] font-semibold text-text-1 uppercase select-none tracking-tight">
            {{ userInitials }}
          </span>

          <UserRound v-else
            class="w-4.5 h-4.5 text-text-2 transition-transform duration-200 group-hover/avatar:scale-110" />
        </a>

        <div v-if="!isOpen"
          class="absolute inset-0 rounded-full bg-bg-1/85 backdrop-blur-[1px] flex items-center justify-center text-text-1 opacity-0 group-hover:opacity-100 group-hover/avatar:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none border border-border-2 shadow-sm">
          <PanelLeftOpen class="w-4 h-4" />
        </div>
      </div>

      <div class="flex flex-col overflow-hidden transition-opacity duration-300"
        :class="isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'">
        <span class="text-sm font-medium text-text-1 truncate leading-tight">{{ userStore.user?.name || 'User Name'
        }}</span>
        <span class="text-xs text-text-2 truncate leading-tight">{{ userStore.user?.email || 'email@example.com'
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PanelLeftOpen, UserRound } from '@lucide/vue'

defineProps<{
  isOpen: boolean
}>()

const userStore = useUserStore()

const avatarUrl = ''

const userInitials = computed(() => {
  const name = userStore.user?.name?.trim()
  if (name) {
    const parts = name.split(' ').filter(Boolean)
    if (parts.length >= 2) {
      return `${parts[0]?.[0]}${parts[1]?.[0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }
  return ''
})
</script>
