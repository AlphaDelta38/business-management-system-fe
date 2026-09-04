# LLM Source — Project Context & Architectural Rules

> **CRITICAL FOR ALL LLMS AND AGENTS**: Always read this document before generating or modifying code in this project. Adhere strictly to the conventions, auto-import rules, layer responsibilities, and provide/inject patterns described below.

---

## 1. Tech Stack
- **Nuxt 4** (Vue 3, SPA mode: `ssr: false`, file-based routing in `app/pages/`)
- **Tailwind CSS v4** (`@tailwindcss/vite`, CSS variables, `@theme` in `app/assets/css/main.css`)
- **Reka UI** — headless accessible UI primitives (Nuxt module `reka-ui/nuxt`)
- **Pinia** + **Pinia Colada** — client state and server-state caching (`useQuery`, `useMutation`)
- **Valibot** — ultra-lightweight schema validation (generated from OpenAPI into `app/core/generated/valibot.gen.ts`)
- **vee-validate** + **@vee-validate/valibot** — form state, field bindings, and validation
- **TypeScript** (Strict mode)

---

## 2. Auto-Imports & Import Rules (CRITICAL)

Nuxt 4 is configured with extensive auto-imports. **DO NOT write redundant manual imports.**

### ❌ NEVER Manually Import:
1. **Vue Core APIs**:
   - `ref`, `computed`, `watch`, `watchEffect`, `nextTick`, `toRef`, `reactive`, etc.
   - `onMounted`, `onUnmounted`, `onBeforeMount`, etc.
   - `provide`, `inject` (use `injectStrict` instead!)
   - Compiler macros: `defineProps`, `defineEmits`, `defineOptions`, `defineSlots` (available globally).
2. **Nuxt Composables & Helpers**:
   - `useRoute`, `useRouter`, `useNuxtApp`, `useRuntimeConfig`, `navigateTo`, `definePageMeta`, `defineNuxtPlugin`, `defineNuxtRouteMiddleware`.
3. **Project Stores & Utilities**:
   - `useUserStore` (from `app/lib/stores/`) — auto-imported via `nuxt.config.ts`.
   - `injectStrict` (from `app/lib/utils/vue.ts`) — auto-imported via `nuxt.config.ts`.
   - Helper functions in `app/lib/utils/` — auto-imported.
4. **Reka UI Primitives**:
   - `SelectRoot`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `TabsRoot`, `TabsList`, `AvatarRoot`, etc. — auto-imported via `reka-ui/nuxt`.
5. **Auto-registered Components**:
   - `app/lib/ui/` (`UiButton`, `UiInput`, `UiSelect`, `UiAlert`, etc.)
   - `app/lib/widgets/` (`AppSidebar`, etc.)
   - `app/lib/components/` (`UserSidebarProfile`, etc.)
   - `app/core/domains/{domain}/widgets/` (domain widgets)
   - `app/core/domains/{domain}/features/` (domain features)
   - *All above components are registered with `pathPrefix: false`, meaning you write `<UiButton />`, `<WorkspaceSelector />` without manual imports.*

### ✅ ONLY Manually Import:
- Icons from `@lucide/vue` (e.g. `import { Plus, ChevronDown, UserRound } from '@lucide/vue'`).
- Third-party library helpers (e.g. `import { useForm } from 'vee-validate'`, `import { toTypedSchema } from '@vee-validate/valibot'`).
- TypeScript types using `import type { ... }`.
- Schemas from `@/schemas` (e.g. `import { vAuthDto } from '@/schemas'`).
- Provide symbols from `~/lib/constants/provide` (e.g. `import { SideBarProvide } from '~/lib/constants/provide'`).

---

## 3. Directory Structure & Architecture

```
f:/simple-analytics-fe/
├── app/
│   ├── app.vue                      # Root layout host (<NuxtLayout><NuxtPage /></NuxtLayout>)
│   ├── assets/
│   │   └── css/main.css             # Tailwind v4 @theme, light/dark variables
│   ├── pages/                       # Nuxt file-based pages
│   │   ├── index.vue                # Main dashboard page
│   │   └── auth.vue                 # Auth page (Tabs: login / register)
│   ├── core/                        # Application Core & DDD Domains
│   │   ├── di.ts                    # DI container instance & factory
│   │   ├── http.ts                  # Fully typed HTTP client against Api schema
│   │   ├── utils.ts                 # createUseCase, createPinacoladaSlice helpers
│   │   ├── layout/                  # Custom layouts (configured in nuxt.config.ts)
│   │   │   └── default.vue          # Sidebar + main content wrapper
│   │   ├── middleware/              # Nuxt route middlewares
│   │   │   └── auth.global.ts       # Global auth protection guard
│   │   ├── plugins/
│   │   │   └── 01.di.ts             # Nuxt plugin providing $di and $http
│   │   ├── generated/               # Auto-generated from backend OpenAPI schema
│   │   │   ├── api.gen.ts           # Typed API route matrix (Api[Path][Method])
│   │   │   ├── types.gen.ts         # Backend DTOs & response contracts
│   │   │   └── valibot.gen.ts       # Runtime Valibot schemas for DTOs
│   │   └── domains/                 # DDD Domain modules
│   │       ├── auth/
│   │       │   ├── use-case.ts
│   │       │   ├── pina-colada.slice.ts
│   │       │   └── widgets/
│   │       │       ├── LoginForm.vue
│   │       │       └── RegisterForm.vue
│   │       └── user/
│   │           ├── use-case.ts
│   │           ├── pina-colada.slice.ts
│   │           └── features/
│   │               └── WorkspaceSelector.vue
│   └── lib/                         # Shared, Domain-Agnostic Infrastructure
│       ├── ui/                      # Base UI design-system primitives
│       │   ├── UiButton.vue
│       │   ├── UiInput.vue
│       │   ├── UiSelect.vue
│       │   └── UiAlert.vue
│       ├── components/              # Shared cross-domain components
│       │   └── UserSidebarProfile.vue
│       ├── widgets/                 # Shared global/layout widgets
│       │   └── AppSidebar.vue
│       ├── constants/
│       │   └── provide.ts           # Typed InjectionKey symbols
│       ├── stores/
│       │   └── user.store.ts        # Client-side Pinia store (current user, session)
│       ├── utils/
│       │   └── vue.ts               # injectStrict, common Vue helpers
│       ├── types/                   # NuxtApp augmentation ($di, $http)
│       └── scripts/                 # OpenAPI transformation build scripts
```

---

## 4. Layer Separation: `lib/` vs `domains/` (Widgets vs Features)

Understanding where to place components is crucial for architectural consistency:

### A. Shared Layer (`app/lib/`)
* **`app/lib/ui/` (UI Primitives)**:
  - Base design-system components (`UiButton`, `UiInput`, `UiSelect`, `UiAlert`).
  - **Rules**: Zero business logic, purely presentational, built with Reka UI primitives + Tailwind classes.
* **`app/lib/components/` (Shared Components)**:
  - Cross-domain reusable components that can be used across multiple pages or layouts (e.g. `UserSidebarProfile.vue`).
* **`app/lib/widgets/` (Shared Widgets)**:
  - High-level layout blocks that assemble parts of the application shell (e.g. `AppSidebar.vue`).

### B. Domain Layer (`app/core/domains/{domain}/`)
* **`use-case.ts`**:
  - Pure async business operations calling `httpClient`.
  - Injected with `{ httpClient, route, router, userStore }`.
* **`pina-colada.slice.ts`**:
  - Reactive caching layer wrapping use-cases with Pinia Colada's `useQuery` / `useMutation`.
* **`widgets/` (Domain Widgets)**:
  - Complete, self-contained domain UI blocks that implement a full domain user story (e.g. `LoginForm.vue`, `RegisterForm.vue`).
  - They connect directly to `$di.{domain}` mutations or queries.
* **`features/` (Domain Features)**:
  - Domain-specific interactive features or controls (e.g. `WorkspaceSelector.vue`).
  - Smaller or more specialized than widgets; represent a specific capability within a domain that can be embedded into shared widgets (e.g., embedded into `AppSidebar`).

---

## 5. Provide / Inject Pattern (MANDATORY STRICT USAGE)

Whenever components communicate via Vue's Dependency Injection (`provide` / `inject`), **follow this exact pattern**:

### 1. Define Typed Symbols in `app/lib/constants/provide.ts`:
```ts
import type { InjectionKey, Ref } from 'vue'

export const SideBarProvide = {
  isOpen: Symbol('isOpen') as InjectionKey<Ref<boolean>>,
  toggleSidebar: Symbol('toggleSidebar') as InjectionKey<() => void>,
}
```

### 2. Provide in Parent (e.g. `app/core/layout/default.vue`):
```ts
import { SideBarProvide } from '~/lib/constants/provide'

const isSidebarOpen = ref(true)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

provide(SideBarProvide.isOpen, isSidebarOpen)
provide(SideBarProvide.toggleSidebar, toggleSidebar)
```

### 3. Consume in Child with `injectStrict`:
- **NEVER** use raw `inject(SideBarProvide.isOpen)`.
- **ALWAYS** use `injectStrict(SideBarProvide.isOpen)`.
- `injectStrict` is auto-imported from `app/lib/utils/vue.ts`. If the provider is missing, it immediately throws a clear descriptive runtime error:
```ts
import { SideBarProvide } from '~/lib/constants/provide'

// No need to import injectStrict — it's auto-imported!
const isOpen = injectStrict(SideBarProvide.isOpen)
const toggle = injectStrict(SideBarProvide.toggleSidebar)
```

---

## 6. Dependency Injection (`$di`) & API Client

### Calling API in Components via `$di`:
```vue
<script setup lang="ts">
const app = useNuxtApp()

// Pinia Colada mutation:
const loginMutation = app.$di.auth.useLogin()

// Pinia Colada query:
const myInfoQuery = app.$di.user.useGetMyInfo()

async function onLogin(data: AuthDto) {
  await loginMutation.mutateAsync({
    options: {
      requestBody: data,
    },
  })
}
</script>
```

### Direct HTTP Calls via `$http`:
```ts
const app = useNuxtApp()

const response = await app.$http({
  method: 'GET',
  url: '/user',
})
```
*Note: TypeScript will strictly validate the `url`, `method`, `requestBody`, `requestParams`, and `requestQuery` based on the OpenAPI schema.*

---

## 7. Theming & Tailwind Tokens

Always use design-system CSS variables mapped to Tailwind `@theme`:

| Category | Available Classes |
|---|---|
| **Backgrounds** | `bg-bg-1`, `bg-bg-2`, `bg-bg-3`, `bg-bg-overlay` |
| **Text** | `text-text-1` (high contrast), `text-text-2` (muted), `text-text-3` (placeholder/subtle), `text-text-inverse` |
| **Borders** | `border-border-1`, `border-border-2`, `border-border-focus` |
| **Brand/Primary** | `bg-primary-1`, `hover:bg-primary-2`, `text-primary-text` |
| **Semantic** | `text-error-1`, `text-success-1`, `text-warning-1`, `text-info-1` |
| **Typography** | `text-[length:--text-size-xs]`, `text-[length:--text-size-sm]`, `text-[length:--text-size-base]`, `text-[length:--text-size-lg]`, `text-[length:--text-size-xl]` |
| **Shadows** | `shadow-xs`, `shadow-[--shadow-sm]`, `shadow-[--shadow-md]` |

- Two color schemes are supported: **light** (`:root`) and **dark** (`.dark` / `@media (prefers-color-scheme: dark)`).
- **NEVER** use hardcoded hex colors or arbitrary arbitrary utility colors (e.g. `text-gray-500`) when a design token exists.

---

## 8. Forms & Validation Rules

Forms must combine **vee-validate** and **Valibot**:
```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/valibot'
import { vAuthDto } from '@/schemas' // Alias to valibot.gen.ts

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(vAuthDto),
  initialValues: {
    email: '',
    password: '',
  },
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  // values are strictly typed and pre-validated
})
</script>
```

---

## 9. Page Meta & Layouts

- Layouts live in `app/core/layout/` (configured in `nuxt.config.ts`).
- `default.vue` layout renders the `AppSidebar`.
- If a page must NOT render the sidebar (like `app/pages/auth.vue`), you must explicitly disable the layout:
  ```vue
  <script setup lang="ts">
  definePageMeta({
    layout: false,
  })
  </script>
  ```

---

## 10. Development Checklist for LLMs

Before delivering any Vue/Nuxt code, verify:
- [ ] No manual imports of `ref`, `computed`, `watch`, `provide`, `inject`, `useRoute`, `useRouter`, etc.
- [ ] No manual imports of base UI components (`UiButton`, `UiInput`, etc.) or domain widgets/features.
- [ ] Any `inject` uses `injectStrict(ProvideSymbol)` with a symbol from `~/lib/constants/provide`.
- [ ] Colors and text sizes use theme tokens (`bg-bg-1`, `text-text-1`, `border-border-2`, etc.).
- [ ] API routes and methods strictly match the OpenAPI `Api` types.
- [ ] New shared UI primitives go to `app/lib/ui/`, cross-domain components to `app/lib/components/`, domain logic to `app/core/domains/{domain}/`.
