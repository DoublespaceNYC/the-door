export const toSlug = (string: string) =>
  string
    .replace(/[\s/]+/g, '-')
    .replace(/[^\w\d-]+/g, '')
    .replace(/--+/g, '-')
    .toLowerCase()

export const toAmPm = (time: string) => {
  const hour = Number(time.split(':')[0])
  const minute = Number(time.split(':')[1])
  const ampm = hour > 11 ? 'pm' : 'am'
  const ampmHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  const ampmMinutes =
    minute > 0 ? (minute < 10 ? `:0${minute}` : `:${minute}`) : ``
  return `${ampmHour}${ampmMinutes}${ampm}`
}
export const toAmPmRange = (startTime: string, endTime: string) => {
  const hour = (time: string) => Number(time.split(':')[0])
  const minute = (time: string) => Number(time.split(':')[1])
  const ampm = (hour: number) => (hour > 11 ? 'pm' : 'am')
  const ampmHour = (hour: number) =>
    hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  const ampmMinutes = (minute: number) =>
    minute > 0 ? (minute < 10 ? `:0${minute}` : `:${minute}`) : ``
  const startAmPm = ampm(hour(startTime)) !== ampm(hour(endTime))

  return `${ampmHour(hour(startTime))}${ampmMinutes(
    minute(startTime)
  )}${startAmPm ? ampm(hour(startTime)) : ''}–${ampmHour(
    hour(endTime)
  )}${ampmMinutes(minute(endTime))}${ampm(hour(endTime))}`
}

export const toDate = (dateString: string, locale = 'en-US') => {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleString(locale, {
    month: 'short',
    day: 'numeric',
  })
}
