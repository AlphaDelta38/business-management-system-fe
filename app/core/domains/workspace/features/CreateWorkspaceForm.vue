<template>
  <form class="flex flex-col gap-5" @submit="onSubmit">
    <UiAlert v-if="error?.data.message && showServerError" variant="error" dismissible
      v-model:visible="showServerError">
      {{ error.data.message }}
    </UiAlert>

    <UiInput v-model="name" :error-message="errors.name" label="Name" type="text" placeholder="Example: My bussines"
      autocomplete="organization" @blur="validateField('name')" />

    <UiButton type="submit" variant="primary" :loading="isSubmitting" :disabled="isSubmitting" class="mt-1 w-full">
      Create workspace
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/valibot'
import { vCreateWorkspaceDto } from '#/schemas'

const emit = defineEmits<{
  success: [workspaceId: number]
}>()

const app = useNuxtApp()
const userStore = useUserStore()
const { mutateAsync, error } = app.$di.workspace.useCreateWorkspace()

const showServerError = ref(true)

const {
  defineField,
  handleSubmit,
  errors,
  isSubmitting,
  validateField,
} = useForm({
  validationSchema: toTypedSchema(vCreateWorkspaceDto),
  initialValues: {
    name: '',
  },
})

const [name] = defineField('name')

const onSubmit = handleSubmit(async (values) => {
  showServerError.value = true

  const response = await mutateAsync({
    options: {
      requestBody: {
        name: values.name,
      },
    },
  })

  if (response.status === 'success' && response.data) {
    userStore.user?.workspaces.push(response.data)
  }

  emit('success', response.data?.id ?? 0)
})
</script>
