export interface CookieOptions {
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'Lax' | 'Strict' | 'None' | 'lax' | 'strict' | 'none'
  expires?: Date | number | string
  maxAge?: number
}

export interface CookieMap {
  'workspace_id': number
}

export function getCookie<K extends keyof CookieMap>(name: K): CookieMap[K] | undefined {
  if (typeof document === 'undefined') return undefined

  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + String(name).replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  )

  if (!matches) return undefined

  const value = decodeURIComponent(matches[1]!)

  try {
    return JSON.parse(value)
  } catch {
    return value as any
  }
}

export function setCookie<K extends keyof CookieMap>(name: K, value: CookieMap[K], options: CookieOptions = {}): void {
  if (typeof document === 'undefined') return

  const opts = { path: '/', ...options }

  if (typeof opts.expires === 'number') {
    const date = new Date()
    date.setTime(date.getTime() + opts.expires * 24 * 60 * 60 * 1000)
    opts.expires = date
  }

  const stringValue = typeof value === 'string' ? value : JSON.stringify(value)
  let cookieString = `${encodeURIComponent(String(name))}=${encodeURIComponent(stringValue)}`

  if (opts.expires instanceof Date) cookieString += `; expires=${opts.expires.toUTCString()}`
  else if (typeof opts.expires === 'string') cookieString += `; expires=${opts.expires}`

  if (opts.maxAge !== undefined) cookieString += `; max-age=${opts.maxAge}`
  if (opts.path) cookieString += `; path=${opts.path}`
  if (opts.domain) cookieString += `; domain=${opts.domain}`
  if (opts.secure) cookieString += '; secure'
  if (opts.sameSite) cookieString += `; samesite=${opts.sameSite}`

  document.cookie = cookieString
}

export function removeCookie<K extends keyof CookieMap>(name: K, options: Omit<CookieOptions, 'expires' | 'maxAge'> = {}): void {
  setCookie(name, '' as any, { ...options, expires: new Date(0) })
}
