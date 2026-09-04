import type { InjectionKey } from "vue";


export function injectStrict<T>(key: InjectionKey<T>, data?: T): T {
  const resolved = inject(key, data)

  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }

  return resolved
}
