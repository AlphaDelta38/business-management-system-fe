<template>
  <header
    class="flex items-center justify-between w-full px-4 py-3 gap-2 shrink-0 border-b sm:px-6 sm:py-4 sm:gap-3"
    :class="headerClass"
  >
    <div class="flex items-center shrink-0 min-w-11 sm:min-w-12">
      <slot name="left">
        <UiButton
          variant="ghost"
          class="p-0 w-11 h-11 sm:w-12 sm:h-12 shrink-0 active:scale-95"
          @click="$emit('back')"
        >
          <ArrowLeft class="w-6 h-6" />
        </UiButton>
      </slot>
    </div>

    <div class="flex items-center justify-center flex-1 min-w-0 overflow-hidden">
      <slot>
        <h2
          class="text-[length:--text-size-base] font-semibold text-text-1 whitespace-nowrap overflow-hidden text-ellipsis text-center leading-[1.4] m-0 sm:text-[length:--text-size-md]"
        >
          {{ title }}
        </h2>
      </slot>
    </div>

    <div class="flex items-center justify-end shrink-0 min-w-11 sm:min-w-12">
      <slot name="right">
        <UiButton
          variant="ghost"
          class="p-0 w-11 h-11 sm:w-12 sm:h-12 shrink-0 active:scale-95"
          @click="$emit('close')"
        >
          <X class="w-6 h-6" />
        </UiButton>
      </slot>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ArrowLeft, X } from '@lucide/vue'

defineProps<{
  title?: string
  headerClass?: string
}>()

defineEmits<{
  back: []
  close: []
}>()
</script>

<style scoped>
header {
  background: var(--modal-header-background, var(--bg-1));
  border-color: var(--modal-header-border, var(--border-2));
}
</style>
