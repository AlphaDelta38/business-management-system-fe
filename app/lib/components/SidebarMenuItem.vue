<template>
  <UiButton variant="ghost" :size="isOpen ? 'md' : 'icon'" :active="isActive" class="transition-colors" :class="[
    isOpen ? (block ? 'w-full' : 'flex-1 min-w-0') + ' justify-start px-2.5 h-9 gap-2' : 'shrink-0',
    isActive ? 'bg-bg-3! text-text-1! font-medium' : 'text-text-2 hover:text-text-1'
  ]" :aria-current="isActive ? 'page' : undefined" :title="title" @click="handleClick">
    <slot name="icon">
      <component :is="icon" v-if="icon" class="w-4.5 h-4.5 shrink-0" :class="isActive ? 'text-text-1!' : ''" />
    </slot>

    <span v-if="isOpen" class="truncate text-[length:--text-size-sm]" :class="isActive ? 'text-text-1!' : ''">
      <slot>{{ title }}</slot>
    </span>
  </UiButton>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { SideBarProvide } from '@/lib/constants/provide'

const props = withDefaults(defineProps<{
  title?: string
  to?: string
  icon?: Component
  active?: boolean | null
  block?: boolean
}>(), {
  block: true,
  active: null,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const route = useRoute()
const isSidebarOpen = injectStrict(SideBarProvide.isOpen)
const isOpen = computed(() => isSidebarOpen.value)

const isActive = computed(() => {
  if (props.active !== null && props.active !== undefined) {
    return props.active
  }

  if (!props.to) {
    return false
  }

  const currentPath = route.path.replace(/\/$/, '') || '/'
  const targetPath = props.to.replace(/\/$/, '') || '/'

  if (targetPath === '/') {
    return currentPath === '/'
  }

  return currentPath === targetPath || currentPath.startsWith(targetPath + '/')
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
  if (props.to) {
    navigateTo(props.to)
  }
}
</script>
