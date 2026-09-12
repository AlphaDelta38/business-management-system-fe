<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="overlay">
        <div v-if="showOverlay" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-bg-overlay"
          @click.self="close">
          <Transition :name="isMobile ? 'modal-mobile' : 'modal-desktop'" @after-leave="onModalAfterLeave">
            <KeepAlive :include="cachedNames">
              <component v-if="displayedModal" :is="getShell(displayedModal.key)" :key="displayedModal.key" />
            </KeepAlive>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
// @generated-modals-start
import { resolveComponent, type Component } from 'vue'

const modals: Record<keyof Modals, Component> = {
  test: resolveComponent('LazyTest') as Component,
  test2: resolveComponent('LazyTest2') as Component,
}
// @generated-modals-end

const { stack, close } = useModal()
const { isMobile } = useScreen()

const displayedModal = shallowRef<Modal | null>(null)
const pendingModal = shallowRef<Modal | null>(null)
const isLeaving = ref(false)

const showOverlay = computed(() =>
  stack.value.length > 0 || displayedModal.value !== null || isLeaving.value,
)

const topModal = computed(() =>
  stack.value.length > 0 ? stack.value[stack.value.length - 1] : null,
)

const cachedNames = computed(() =>
  stack.value.map(m => `ModalShell_${m.key}`),
)

watch(topModal, (newTop) => {
  if (displayedModal.value) {
    pendingModal.value = newTop ?? null
    isLeaving.value = true
    displayedModal.value = null
  } else {
    displayedModal.value = newTop ?? null
  }
})

const onModalAfterLeave = () => {
  isLeaving.value = false
  displayedModal.value = pendingModal.value
  pendingModal.value = null
}

const shells = new Map<keyof Modals, ReturnType<typeof defineComponent>>()

const getShell = (key: keyof Modals) => {
  if (!shells.has(key)) {
    shells.set(
      key,
      defineComponent({
        name: `ModalShell_${key}`,
        setup() {
          return () => {
            const comp = modals[key]

            return h(
              'div',
              {
                class:
                  'w-full max-h-full flex flex-col bg-bg-1 overflow-hidden rounded-t-2xl sm:rounded-2xl shadow-[--shadow-md] sm:max-w-[var(--modal-max-width,480px)] sm:max-h-[var(--modal-max-height,85vh)]',
              },
              comp ? [h(comp)] : [],
            )
          }
        },
      }),
    )
  }
  return shells.get(key)!
}

watch(
  stack,
  (current) => {
    const activeKeys = new Set(current.map(m => m.key))
    for (const key of shells.keys()) {
      if (!activeKeys.has(key)) {
        shells.delete(key)
      }
    }
  },
  { deep: true },
)
</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.25s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.modal-desktop-enter-active,
.modal-desktop-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-desktop-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.modal-desktop-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-mobile-enter-active,
.modal-mobile-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-mobile-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.modal-mobile-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
