import type { InjectionKey } from "vue";

export const SideBarProvide = {
  isOpen: Symbol() as InjectionKey<Ref<boolean>>,
  toggleSidebar: Symbol() as InjectionKey<() => void>
}
