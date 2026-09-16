
export const getUserInitials = (name: string) => {
  const parts = name.split(' ').filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0]?.[0]}${parts[1]?.[0]}`.toUpperCase()
  }

  return name.slice(0, 2).toUpperCase()

}