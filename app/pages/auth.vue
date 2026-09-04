<template>
  <div class="flex min-h-screen items-center justify-center bg-bg-1 px-4">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <h1 class="text-[length:--text-size-xl] font-bold text-text-1">
          Simple Analytics
        </h1>
        <p class="mt-2 text-[length:--text-size-sm] text-text-2">
          Sign in or create an account
        </p>
      </div>

      <div class="rounded-xl border border-border-2 bg-bg-2 p-6 shadow-[--shadow-md]">
        <TabsRoot v-model="activeTab" class="flex flex-col">
          <TabsList class="
              mb-6 flex rounded-lg bg-bg-3 p-1
            ">
            <TabsTrigger value="login" class="
                flex-1 rounded-md px-3 py-2
                text-[length:--text-size-sm] font-medium text-text-2
                transition-colors duration-150 cursor-pointer
                data-[state=active]:bg-bg-1 data-[state=active]:text-text-1
                data-[state=active]:shadow-[--shadow-sm]
              ">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="register" class="
                flex-1 rounded-md px-3 py-2
                text-[length:--text-size-sm] font-medium text-text-2
                transition-colors duration-150 cursor-pointer
                data-[state=active]:bg-bg-1 data-[state=active]:text-text-1
                data-[state=active]:shadow-[--shadow-sm]
              ">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <div class="grid *:row-start-1 *:col-start-1">
            <TabsContent value="login" force-mount class="data-[state=inactive]:invisible">
              <LoginForm @success="onSuccess" />
            </TabsContent>

            <TabsContent value="register" force-mount class="data-[state=inactive]:invisible">
              <RegisterForm @success="onSuccess" />
            </TabsContent>
          </div>
        </TabsRoot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'reka-ui'
import LoginForm from '~/core/domains/auth/widgets/LoginForm.vue'
import RegisterForm from '~/core/domains/auth/widgets/RegisterForm.vue'

const activeTab = ref('login')

function onSuccess() {
  window.location.href = '/'
}
</script>
