<template>
  <div class="flex flex-col gap-2 transition-opacity duration-300"
    :class="isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'">
    <div v-if="workspaces.length === 0">
      <UiButton variant="outline" class="w-full border-dashed gap-2" @click="modal.open('addWorkspace', {
        onSuccess: onChange
      })">
        <Plus class="w-4 h-4" />
        <span>Add workspace</span>
      </UiButton>
    </div>

    <div v-else class="w-full">
      <UiSelect :modelValue="userStore.workspaceId ?? 0" @change="onChange" :items="workspaceOptions"
        placeholder="Select workspace">
        <template #footer>
          <div class="my-1 border-t border-border-2 -mx-1" />
          <UiButton variant="ghost" size="sm"
            class="w-full justify-start px-2 font-normal text-text-2 hover:text-text-1" @click="modal.open('addWorkspace', {
              onSuccess: onChange
            })">
            <Plus class="w-4 h-4 shrink-0" />
            <span>Add workspace</span>
          </UiButton>
        </template>
      </UiSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@lucide/vue'

defineProps<{
  isOpen: boolean
}>()

const userStore = useUserStore()
const modal = useModal()

const workspaces = computed(() => {
  return userStore.user?.workspaces || []
})

const workspaceOptions = computed(() => {
  return workspaces.value.map(w => ({
    label: w.workspace.name,
    value: w.workspace.id,
  }))
})

function onChange(id: number | string): void {
  if (Number.isInteger(Number(id)) && userStore.user?.workspaces.find(item => item.id === id)) {
    userStore.setWorkspaceId(Number(id))
  }
}
</script>
