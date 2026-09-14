<template>
  <form class="flex flex-col gap-5" @submit="onSubmit">
    <UiAlert v-if="error?.data?.message && showServerError" variant="error" dismissible
      v-model:visible="showServerError">
      {{ error.data.message }}
    </UiAlert>

    <UiInput v-model="name" :error-message="errors.name" :disabled="isNameDisabled" label="Name" type="text"
      placeholder="Example: My bussines" autocomplete="organization" @blur="validateField('name')" />

    <div class="relative flex items-center py-1">
      <div class="grow border-t border-border-2" />
      <span class="px-3 text-[length:--text-size-xs] uppercase font-medium text-text-3">or</span>
      <div class="grow border-t border-border-2" />
    </div>

    <UiInput v-model="code" :error-message="errors.code" :disabled="isCodeDisabled" label="Invite code" type="text"
      placeholder="Enter invite code" autocomplete="off" @blur="validateField('code')" />

    <UiButton type="submit" variant="primary" :loading="isSubmitting" :disabled="isSubmitting || isButtonDisabled"
      class="mt-1 w-full">
      {{ isJoin ? 'Join workspace' : 'Create workspace' }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/valibot'
import { vCreateWorkspaceDto, vJoinWorkspaceDto } from '#/schemas'

const emit = defineEmits<{
  success: [workspaceId: number]
}>()

const app = useNuxtApp()
const userStore = useUserStore()

const { safeMutateAsync: createWorkspace, error: createError } = app.$di.workspace.useCreateWorkspace()
const { safeMutateAsync: join, error: joinError } = app.$di.workspace.useJoinToWorkspace()

const showServerError = ref(true)
const isJoin = ref(false)

const {
  defineField,
  handleSubmit,
  errors,
  isSubmitting,
  validateField,
} = useForm({
  validationSchema: computed(() => toTypedSchema(isJoin.value ? vJoinWorkspaceDto : vCreateWorkspaceDto)),
  initialValues: {
    name: '',
    code: '',
  },
})

const [name] = defineField('name')
const [code] = defineField('code')

const error = computed(() => isJoin.value ? joinError.value : createError.value)
const isNameDisabled = computed(() => Boolean(code.value && code.value.trim().length > 0))
const isCodeDisabled = computed(() => Boolean(name.value && name.value.trim().length > 0))
const isButtonDisabled = computed(() => !name.value?.trim() && !code.value?.trim())

watch([name, code], () => {
  showServerError.value = false
})

watch(code, (newCode) => {
  isJoin.value = Boolean(newCode && newCode.trim().length > 0)
})


const onSubmit = handleSubmit(async (values) => {
  showServerError.value = true

  if (isJoin.value && 'code' in values) {
    const response = await join({
      options: {
        requestBody: {
          code: values.code,
        },
      },
    })

    if (response.status === 'success' && response.data) {
      userStore.user?.workspaces.push(response.data)
      emit('success', response.data?.workspace_id)
    }
  } else if ('name' in values) {
    const response = await createWorkspace({
      options: {
        requestBody: {
          name: values.name,
        },
      },
    })

    if (response.status === 'success' && response.data) {
      userStore.user?.workspaces.push(response.data)
      emit('success', response.data?.id ?? 0)
    }
  }
})
</script>
