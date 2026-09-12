export type Modals = {
  test: 123
  test2: null
}

export type Modal = {
  data: Modals[keyof Modals]
  key: keyof Modals
}

type ReturnData<T extends keyof Modals> = {
  open: <K extends keyof Modals>(key: K, data: Modals[K]) => void
  close: () => void
  closeAll: () => void
  stack: typeof stack
  data: Modals[T] | null
}

const stack = ref<Modal[]>([])

export const useModal = <T extends keyof Modals>(key?: T): ReturnData<T> => {

  const open = <K extends keyof Modals>(key: K, data: Modals[K]): void => {
    stack.value.push({
      key,
      data
    })
  }

  const close = (): void => {
    stack.value.pop()
  }

  const closeAll = (): void => {
    stack.value = []
  }

  const currentData = computed(() =>
    stack.value.find(item => item.key === key)?.data ?? null
  )

  return {
    open,
    close,
    closeAll,
    stack,
    data: currentData.value as Modals[T] | null,
  }
}
