<template>
  <div
    v-if="visible"
    role="alert"
    class="
      flex items-center gap-3 rounded-lg border px-4 py-3
      text-[length:--text-size-sm]
    "
    :class="variantClasses"
  >
    <div class="flex-1">
      <p v-if="title" class="font-medium">{{ title }}</p>
      <p :class="{ 'mt-1': title }">
        <slot />
      </p>
    </div>

    <button
      v-if="dismissible"
      type="button"
      class="shrink-0 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
      @click="visible = false"
    >
      <X class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { X } from '@lucide/vue'

const props = withDefaults(defineProps<{
  variant?: 'error' | 'success' | 'warning' | 'info'
  title?: string
  dismissible?: boolean
}>(), {
  variant: 'error',
  dismissible: false,
})

const visible = defineModel<boolean>('visible', { default: true })

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'error':
      return 'bg-error-1/10 border-error-1/20 text-error-1'
    case 'success':
      return 'bg-success-1/10 border-success-1/20 text-success-1'
    case 'warning':
      return 'bg-warning-1/10 border-warning-1/20 text-warning-1'
    case 'info':
      return 'bg-info-1/10 border-info-1/20 text-info-1'
    default:
      return ''
  }
})
</script>
