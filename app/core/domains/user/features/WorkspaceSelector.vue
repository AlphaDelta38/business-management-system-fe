<template>
  <div class="flex flex-col gap-2 transition-opacity duration-300"
    :class="isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'">
    <div v-if="workspaces.length === 0">
      <button type="button"
        class="w-full flex items-center justify-center gap-2 px-3 py-2 text-[length:--text-size-sm] text-text-2 hover:text-text-1 border border-dashed border-border-2 rounded-lg hover:bg-bg-2 transition-colors cursor-pointer">
        <Plus class="w-4 h-4" />
        <span>Create workspace</span>
      </button>
    </div>

    <div v-else class="w-full">
      <UiSelect v-model="selectedWorkspaceId" :items="workspaceOptions" placeholder="Select workspace" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@lucide/vue'

defineProps<{
  isOpen: boolean
}>()

const userStore = useUserStore()
const app = useNuxtApp()
const { isLoading, mutate } = app.$di.user.useChangeWorkspace()

const workspaces = computed(() => {
  return userStore.user?.workspaces || []
})

const workspaceOptions = computed(() => {
  return workspaces.value.map(w => ({
    label: w.workspace.name,
    value: w.workspace.id,
    disabled: isLoading.value
  }))
})

const selectedWorkspaceId = ref<number | string | undefined>(
  workspaces.value[0]?.workspace.id
)

watch(selectedWorkspaceId, () => {
  if (Number.isInteger(Number(selectedWorkspaceId))) {
    mutate({
      options: {
        requestParams: { workspaceId: Number(selectedWorkspaceId.value) }
      }
    })
  }
})
</script>
