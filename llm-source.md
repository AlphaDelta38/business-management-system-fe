# LLM Source — Project Context

## Tech Stack
- **Nuxt 4** (Vue 3, file-based routing `app/pages/`)
- **Tailwind CSS v4** (`@tailwindcss/vite` plugin, `@import "tailwindcss"` в `main.css`)
- **Reka UI** — headless UI библиотека (модуль `reka-ui/nuxt`)
- **Pinia** + **Pinia Colada** — стейт и серверный кеш (mutations/queries)
- **Valibot** — валидация схем (генерируется из OpenAPI)
- **vee-validate** + **@vee-validate/valibot** — управление формами и валидация
- **TypeScript** строгий

## Архитектура (DDD)

```
app/
├── app.vue                      # Корневой компонент, содержит <NuxtPage />
├── pages/                       # File-based routing (Nuxt)
│   └── auth.vue                 # /auth — страница логина/регистрации
├── assets/css/main.css          # Tailwind + CSS-переменные для тем (light/dark)
├── core/
│   ├── di.ts                    # DI-контейнер, инициализация use-case → slice
│   ├── http.ts                  # Типизированный HTTP-клиент (fetch-обёртка)
│   ├── utils.ts                 # createUseCase, createPinacoladaSlice, типы
│   ├── plugins/01.di.ts         # Nuxt-плагин — инициализация DI, provide $di/$http
│   ├── generated/               # Автогенерация из OpenAPI
│   │   ├── api.gen.ts           # Типы API-маршрутов (Api type)
│   │   ├── types.gen.ts         # DTO-типы (AuthDto, RegisterDto, etc.)
│   │   └── valibot.gen.ts       # Valibot-схемы (vAuthDto, vRegisterDto, etc.)
│   └── domains/
│       └── auth/
│           ├── use-case.ts      # Бизнес-логика: auth(), register(), logout()
│           ├── pina-colada.slice.ts  # Pinia Colada mutations (useLogin, useRegister)
│           └── widgets/         # UI-виджеты, привязанные к домену
│               ├── LoginForm.vue
│               └── RegisterForm.vue
├── lib/
│   ├── components/              # Shared UI-компоненты (переиспользуемые)
│   │   ├── UiInput.vue
│   │   ├── UiButton.vue
│   │   └── UiAlert.vue
│   ├── types/index.d.ts         # Расширение NuxtApp: $di, $http
│   └── scripts/                 # Скрипты сборки (transform-api.ts)
```

## DDD Слои внутри домена

```
domains/{domain}/
├── use-case.ts              # Бизнес-операции (вызовы HTTP)
├── pina-colada.slice.ts     # Pinia Colada обёртки (useMutation/useQuery)
├── widgets/                 # Самодостаточные UI-блоки домена
└── features/                # (опционально) Сложная логика между виджетами
```

- **use-case** — получает `httpClient`, `route`, `router` из DI, выполняет HTTP-запросы
- **pina-colada.slice** — оборачивает use-case в `useMutation`/`useQuery` для реактивности
- **widgets** — Vue-компоненты, потребляют slice через `$di`
- **features** — создаются только при необходимости (OAuth, 2FA, etc.)

## API Routes (Auth)

| Method | URL | Body | Description |
|--------|-----|------|-------------|
| POST | `/auth/login` | `AuthDto { email, password }` | Авторизация |
| POST | `/auth/register` | `RegisterDto { name, email, password }` | Регистрация |
| DELETE | `/auth/logout` | — (header: authorization) | Выход |

## Valibot-схемы (уже сгенерированы)

```ts
// vAuthDto
v.object({ email: v.pipe(v.string(), v.email()), password: v.string() })

// vRegisterDto
v.object({
  name: v.string(),
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(6), v.maxLength(18))
})
```

## Темизация

Две темы: **light** (`:root`) и **dark** (`.dark` + `prefers-color-scheme: dark`).
Все цвета через CSS-переменные → Tailwind `@theme` → классы (`bg-bg-1`, `text-text-1`, etc.).

### Доступные токены
- Backgrounds: `bg-1`, `bg-2`, `bg-3`
- Text: `text-1`, `text-2`, `text-3`, `text-inverse`
- Borders: `border-1`, `border-2`, `border-focus`
- Primary: `primary-1`, `primary-2`, `primary-text`
- Semantic: `error-1/text`, `success-1/text`, `warning-1/text`, `info-1/text`
- Shadows: `shadow-1` (добавлен для карточек)
- Typography: `text-size-xs/sm/base/md/lg/xl`

## Стилизация

- **Tailwind** — основной инструмент для стилей
- **CSS Modules** — только для экзотики (анимации, сложные pseudo-элементы)
- **Не использовать**: inline styles, scoped CSS без необходимости

## Shared компоненты (`app/lib/components`)

Создаются здесь, переиспользуются по всему приложению. Headless-подход с Reka UI, стилизация Tailwind.

## DI — как использовать в компонентах

```ts
const { $di } = useNuxtApp()
const { mutate, isLoading, error } = $di.auth.useLogin()
```

## Conventions

- Файлы: kebab-case (`use-case.ts`, `pina-colada.slice.ts`)
- Компоненты: PascalCase (`UiButton.vue`, `LoginForm.vue`)
- Импорты: `@/` = `app/`, `~/` = `app/` (Nuxt alias)
- Валидация: всегда через valibot-схемы из `@/schemas`
- Формы: vee-validate + @vee-validate/valibot
