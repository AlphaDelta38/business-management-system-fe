const mobileQuery = typeof window !== 'undefined' ? window.matchMedia('(max-width: 639px)') : null
const tabletQuery = typeof window !== 'undefined' ? window.matchMedia('(min-width: 640px) and (max-width: 1023px)') : null
const desktopQuery = typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)') : null

const isMobile = ref(mobileQuery?.matches ?? false)
const isTablet = ref(tabletQuery?.matches ?? false)
const isDesktop = ref(desktopQuery?.matches ?? true)

const onMobileChange = (e: MediaQueryListEvent) => { isMobile.value = e.matches }
const onTabletChange = (e: MediaQueryListEvent) => { isTablet.value = e.matches }
const onDesktopChange = (e: MediaQueryListEvent) => { isDesktop.value = e.matches }

mobileQuery?.addEventListener('change', onMobileChange)
tabletQuery?.addEventListener('change', onTabletChange)
desktopQuery?.addEventListener('change', onDesktopChange)

export const useScreen = () => {
  return {
    isMobile,
    isTablet,
    isDesktop,
  }
}