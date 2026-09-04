<template>
  <div class="flex flex-col gap-1.5">
    <label
      v-if="label"
      :for="id"
      class="text-[length:--text-size-sm] font-medium text-text-1"
    >
      {{ label }}
    </label>

    <div class="relative">
      <input
        :id="id"
        ref="inputRef"
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="
          w-full rounded-lg border px-3 py-2.5
          text-[length:--text-size-sm] text-text-1
          placeholder:text-text-3
          bg-bg-1
          outline-none
          transition-colors duration-150
          disabled:cursor-not-allowed disabled:opacity-50
        "
        :class="[
          hasError
            ? 'border-error-1 focus:border-error-1 focus:ring-1 focus:ring-error-1'
            : 'border-border-2 hover:border-border-focus focus:border-border-focus focus:ring-1 focus:ring-border-focus'
        ]"
        @input="onInput"
        @blur="$emit('blur', $event)"
      />
    </div>

    <p
      v-if="errorMessage"
      class="text-[length:--text-size-xs] text-error-1"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: string
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  errorMessage?: string
  id?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const hasError = computed(() => !!props.errorMessage)

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  inputRef,
})
</script>
