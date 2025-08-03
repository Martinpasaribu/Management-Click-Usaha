
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/id'

// Setup plugin dan bahasa hanya sekali
dayjs.extend(relativeTime)
dayjs.locale('id')

export function getTimeFromNow(dateString: string): string {
  return dayjs(dateString).fromNow()
}

// 29 Juni 2025 from "$date": "2025-06-29T13:44:19.069Z"
export function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString)

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  return date.toLocaleDateString('id-ID', options)
}


