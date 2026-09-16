<template>
  <div class="w-full min-h-full py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-360 mx-auto flex flex-col gap-6">
      <div class="flex flex-col gap-1 border-b border-border-2 pb-5">
        <h1 class="text-2xl sm:text-3xl font-bold text-text-1 tracking-tight">
          Profile Settings
        </h1>
        <p class="text-sm text-text-2">
          Manage your account profile
        </p>
      </div>

      <div
        class="bg-bg-1 border border-border-2 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div class="flex items-center gap-5 sm:gap-6 min-w-0">
          <div
            class="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden flex items-center justify-center bg-bg-3/80 border border-border-2 text-text-2 shrink-0 shadow-xs">
            <img v-if="avatarUrl" :src="avatarUrl" :alt="userStore.user?.name || 'User'"
              class="w-full h-full object-cover" />
            <span v-else-if="userInitials"
              class="text-xl sm:text-2xl font-bold text-text-1 uppercase select-none tracking-tight">
              {{ userInitials }}
            </span>
            <UserRound v-else class="w-9 h-9 sm:w-10 sm:h-10 text-text-2" />
          </div>

          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-3 flex-wrap">
              <h2 class="text-xl sm:text-2xl font-bold text-text-1 truncate leading-tight">
                {{ userStore.user?.name || 'User Name' }}
              </h2>
            </div>

            <div class="flex items-center gap-1.5 text-sm text-text-2 mt-1 truncate">
              <Mail class="w-4 h-4 shrink-0 text-text-3" />
              <span class="truncate">{{ userStore.user?.email || 'email@example.com' }}</span>
            </div>

            <div class="flex items-center gap-2.5 mt-3 flex-wrap text-xs text-text-2">
              <div v-if="formattedJoinedDate"
                class="inline-flex items-center gap-1.5 bg-bg-2 border border-border-2 px-3 py-1 rounded-full font-medium">
                <Calendar class="w-3.5 h-3.5 text-text-3" />
                <span>Joined {{ formattedJoinedDate }}</span>
              </div>

              <div v-if="workspacesCount > 0"
                class="inline-flex items-center gap-1.5 bg-bg-2 border border-border-2 px-3 py-1 rounded-full font-medium">
                <Building2 class="w-3.5 h-3.5 text-text-3" />
                <span>{{ workspacesCount }} {{ workspacesCount === 1 ? 'workspace' : 'workspaces' }}</span>
              </div>

              <div
                class="inline-flex items-center gap-1.5 bg-bg-2 border border-border-2 px-3 py-1 rounded-full font-medium text-text-2">
                <ShieldCheck class="w-3.5 h-3.5 text-success-1" />
                <span>Active Account</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-bg-1 border border-border-2 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
        <div class="border-b border-border-2 pb-4">
          <h3 class="text-lg font-semibold text-text-1">
            Personal Information
          </h3>
          <p class="text-xs text-text-2 mt-0.5">
            Your personal account information and registered contact details.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-1.5 md:col-span-2">
            <span class="text-xs font-medium text-text-2">Email Address</span>
            <div
              class="h-10 px-3.5 rounded-lg bg-bg-2 border border-border-2 flex items-center text-sm text-text-1 font-medium select-all">
              {{ userStore.user?.email || '—' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Calendar, Mail, ShieldCheck, UserRound } from '@lucide/vue'

const userStore = useUserStore()

const avatarUrl = ''

const userInitials = computed(() => {
  const name = userStore.user?.name?.trim()
  if (name) {
    return getUserInitials(name)
  }
  return ''
})


const workspacesCount = computed(() => {
  return userStore.user?.workspaces?.length || 0
})

const formattedJoinedDate = computed(() => {
  const createdAt = userStore.user?.created_at

  if (!createdAt) {
    return ''
  }

  return formatDate({
    timestamp: Date.now(),
    format: 'YYYY MMM DD',
    locale: 'en-US',
  })
})
</script>