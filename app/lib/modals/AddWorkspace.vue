<template>
  <ModalHeader title="Add Workspace" @back="close" @close="close" />
  <ModalBody>
    <AddWorkspaceForm @success="onClose" />
  </ModalBody>
</template>

<script setup lang="ts">
const { close, data } = useModal('addWorkspace')

const onClose = (id?: number): void => {
  if (data?.onSuccess) {
    data?.onSuccess(id ?? 0)
  }
  close()
}
</script>
