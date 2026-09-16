type DateFormatToken =
  | 'YYYY'
  | 'YY'
  | 'MMMM'
  | 'MMM'
  | 'MM'
  | 'M'
  | 'DD'
  | 'D'
  | 'HH'
  | 'mm'
  | 'SS'

type DateFormatOptions = {
  timestamp: number | string
  format: string
  locale?: string
}

export const formatDate = ({
  timestamp,
  format,
  locale = 'en-US',
}: DateFormatOptions): string => {
  const date = new Date(timestamp)

  const values: Record<DateFormatToken, string> = {
    YYYY: String(date.getFullYear()),
    YY: String(date.getFullYear()).slice(-2),

    MMMM: new Intl.DateTimeFormat(locale, {
      month: 'long',
    }).format(date),

    MMM: new Intl.DateTimeFormat(locale, {
      month: 'short',
    }).format(date),

    MM: String(date.getMonth() + 1).padStart(2, '0'),
    M: String(date.getMonth() + 1),

    DD: String(date.getDate()).padStart(2, '0'),
    D: String(date.getDate()),

    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    SS: String(date.getSeconds()).padStart(2, '0'),
  }

  return format.replace(
    /YYYY|YY|MMMM|MMM|MM|M|DD|D|HH|mm|SS/g,
    token => values[token as DateFormatToken] ?? '',
  )
}