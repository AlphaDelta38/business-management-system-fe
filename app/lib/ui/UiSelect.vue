<template>
  <SelectRoot :modelValue="internalValue" :disabled="disabled" @update:modelValue="onValueChange">
    <SelectTrigger :disabled="disabled" class="
        flex w-full items-center justify-between gap-2
        rounded-lg border border-border-2 bg-bg-2 px-3 py-2
        text-[length:--text-size-sm] text-text-1
        outline-none
        transition-colors duration-150
        hover:border-border-focus focus:border-border-focus focus:ring-1 focus:ring-border-focus
        disabled:cursor-not-allowed disabled:opacity-50
        cursor-pointer
      " :class="triggerClass">
      <SelectValue :placeholder="placeholder" class="truncate text-left flex-1" />
      <SelectIcon as-child>
        <ChevronDown class="h-4 w-4 text-text-2 shrink-0 transition-transform duration-200" />
      </SelectIcon>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent position="popper" :side-offset="sideOffset" class="
          z-50 min-w-(--reka-select-trigger-width)
          max-h-60 overflow-hidden
          rounded-lg border border-border-2 bg-bg-2 p-1 text-text-1
          shadow-[--shadow-md]
          will-change-[opacity,transform]
        ">
        <SelectScrollUpButton class="flex items-center justify-center h-6 bg-bg-2 text-text-2 cursor-default">
          <ChevronUp class="h-4 w-4" />
        </SelectScrollUpButton>

        <SelectViewport class="p-1">
          <slot>
            <SelectItem v-for="item in normalizedOptions" :key="String(item.value)" :value="String(item.value)"
              :disabled="item.disabled" class="
                relative flex select-none items-center rounded-md py-1.5 pl-8 pr-2
                text-[length:--text-size-sm] text-text-1
                outline-none
                data-disabled:pointer-events-none data-disabled:opacity-50
                data-highlighted:bg-bg-3 data-highlighted:text-text-1
                cursor-pointer transition-colors
              ">
              <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <SelectItemIndicator>
                  <Check class="h-4 w-4 text-primary-1" />
                </SelectItemIndicator>
              </span>
              <SelectItemText>
                {{ item.label }}
              </SelectItemText>
            </SelectItem>
          </slot>
          <slot name="footer" />
        </SelectViewport>

        <SelectScrollDownButton class="flex items-center justify-center h-6 bg-bg-2 text-text-2 cursor-default">
          <ChevronDown class="h-4 w-4" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<script setup lang="ts">
import { ChevronDown, ChevronUp, Check } from '@lucide/vue'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: string | number
  items?: Array<SelectOption | string | number>
  placeholder?: string
  disabled?: boolean
  sideOffset?: number
  triggerClass?: string
}>(), {
  items: () => [],
  sideOffset: 4,
  placeholder: 'Select...',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()

const normalizedOptions = computed<SelectOption[]>(() => {
  return props.items.map(item => {
    if (typeof item === 'object' && item !== null) {
      return item as SelectOption
    }
    return {
      label: String(item),
      value: item,
    }
  })
})

const internalValue = computed(() => {
  return props.modelValue !== undefined && props.modelValue !== null
    ? String(props.modelValue)
    : undefined
})

function onValueChange(val: string) {
  const matched = normalizedOptions.value.find(item => String(item.value) === val)
  const emittedVal = matched ? matched.value : val
  emit('update:modelValue', emittedVal)
  emit('change', emittedVal)
}

</script>
