<template>
  <form class="flex flex-col gap-5" @submit="onSubmit">
    <UiAlert v-if="error?.data.message" variant="error" dismissible v-model:visible="showServerError">
      {{ error.data.message }}
    </UiAlert>

    <UiInput v-model="email" :error-message="errors.email" label="Email" type="email" placeholder="you@example.com"
      autocomplete="email" @blur="validateField('email')" />

    <UiInput v-model="password" :error-message="errors.password" label="Password" type="password"
      placeholder="Min 6 characters" autocomplete="current-password" @blur="validateField('password')" />

    <UiButton type="submit" variant="primary" :loading="isSubmitting" :disabled="isSubmitting" class="mt-1 w-full">
      Sign In
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/valibot'
import { vAuthDto } from '~/core/generated/valibot.gen'

const emit = defineEmits<{
  success: []
}>()

const showServerError = ref(true)

const {
  defineField,
  handleSubmit,
  errors,
  isSubmitting,
  validateField
} = useForm({
  validationSchema: toTypedSchema(vAuthDto),
  initialValues: {
    email: '',
    password: '',
  },
})

const app = useNuxtApp()
const { mutateAsync, error } = app.$di.auth.useLogin()

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  showServerError.value = true

  await mutateAsync({
    options: {
      requestBody: {
        email: values.email,
        password: values.password
      }
    }
  })


  emit('success')
})
</script>
