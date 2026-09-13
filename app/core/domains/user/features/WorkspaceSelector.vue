<template>
  <div class="flex flex-col gap-2 transition-opacity duration-300"
    :class="isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'">
    <div v-if="workspaces.length === 0">
      <UiButton variant="outline" class="w-full border-dashed gap-2" @click="modal.open('createWorkspace', {
        onSuccess
      })">
        <Plus class="w-4 h-4" />
        <span>Create workspace</span>
      </UiButton>
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
const modal = useModal()

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

function onSuccess(id: number): void {
  if (userStore.user?.workspaces.find(item => item.id === id)) {
    selectedWorkspaceId.value = id
  }
}

watch(selectedWorkspaceId, (id) => {
  if (Number.isInteger(Number(id))) {
    mutate({
      options: {
        requestParams: { workspaceId: Number(id) }
      }
    })
  }
})
</script>
