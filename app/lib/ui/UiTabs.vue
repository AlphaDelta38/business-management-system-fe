<template>
  <TabsRoot v-bind="$attrs" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <TabsList class="relative flex border-b border-border-2 w-full overflow-x-auto no-scrollbar" aria-label="tabs">
      <TabsIndicator 
        class="absolute bottom-0 left-0 h-0.5 bg-primary-1 transition-all duration-300 rounded-t-full z-10"
        style="width: var(--reka-tabs-indicator-size); transform: translateX(var(--reka-tabs-indicator-position));"
      />
      <TabsTrigger 
        v-for="tab in tabs" 
        :key="tab.id" 
        :value="tab.id"
        class="px-4 py-2.5 text-[length:--text-size-sm] font-medium text-text-2 hover:text-text-1 data-[state=active]:text-text-1 outline-none transition-colors cursor-pointer shrink-0"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>
    
    <div class="pt-4">
      <TabsContent v-for="tab in tabs" :key="tab.id" :value="tab.id" class="outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1 rounded-md">
        <slot :name="tab.id" />
      </TabsContent>
    </div>
  </TabsRoot>
</template>

<script setup lang="ts">
import { TabsRoot, TabsList, TabsTrigger, TabsContent, TabsIndicator } from 'reka-ui'

defineProps<{
  tabs: { id: string; label: string }[]
  modelValue?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
