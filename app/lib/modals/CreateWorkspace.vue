<template>
  <ModalHeader title="Create workspace" @back="close" @close="close" />
  <ModalBody>
    <CreateWorkspaceForm @success="onClose" />
  </ModalBody>
</template>

<script setup lang="ts">
const { close, data } = useModal('createWorkspace')

const onClose = (id?: number): void => {
  if (data?.onSuccess) {
    data?.onSuccess(id ?? 0)
  }
  close()
}
</script>
