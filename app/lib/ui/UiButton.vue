<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="
      inline-flex items-center justify-center gap-2
      font-medium
      outline-none
      transition-colors duration-150
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-50
    "
    :class="[variantClasses, sizeClasses]"
  >
    <Loader2
      v-if="loading"
      class="h-4 w-4 animate-spin"
    />

    <slot />
  </button>
</template>

<script setup lang="ts">
import { Loader2 } from '@lucide/vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}>(), {
  variant: 'primary',
  type: 'button',
  size: 'md',
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-1 text-primary-text hover:bg-primary-2 focus-visible:ring-2 focus-visible:ring-primary-1 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1'
    case 'outline':
      return 'border border-border-2 bg-bg-1 text-text-1 hover:bg-bg-2 focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1'
    case 'ghost':
      return 'text-text-2 hover:text-text-1 hover:bg-bg-3 focus-visible:ring-2 focus-visible:ring-border-focus'
    default:
      return ''
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'rounded-md px-2.5 py-1.5 text-[length:--text-size-sm]'
    case 'lg':
      return 'rounded-lg px-5 py-3 text-[length:--text-size-base]'
    case 'icon':
      return 'rounded-lg w-9 h-9 p-0 text-[length:--text-size-sm]'
    case 'icon-sm':
      return 'rounded-md w-8 h-8 p-0 text-[length:--text-size-sm]'
    default:
      return 'rounded-lg px-4 py-2.5 text-[length:--text-size-sm]'
  }
})
</script>
