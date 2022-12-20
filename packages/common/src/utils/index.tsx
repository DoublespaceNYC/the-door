import { render } from 'datocms-structured-text-to-plain-text'
import { StructuredText as IStructuredText } from 'datocms-structured-text-utils'

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

  return `${ampmHour(hour(startTime))}${ampmMinutes(minute(startTime))}${
    startAmPm ? ampm(hour(startTime)) : ''
  }–${ampmHour(hour(endTime))}${ampmMinutes(minute(endTime))}${ampm(
    hour(endTime)
  )}`
}

export const formatTimeRange = (
  startDateTimeString: string,
  endDateTimeString?: string
) => {
  const startDateTime = new Date(startDateTimeString)
  const endDateTime = endDateTimeString && new Date(endDateTimeString)

  const toTimeString = (dateTime: Date) =>
    dateTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: 'America/New_York',
    })

  const startTime = toTimeString(startDateTime)
  const endTime = endDateTime && toTimeString(endDateTime)
  const timeRange = endTime
    ? toAmPmRange(startTime, endTime)
    : toAmPm(startTime)

  return timeRange
}

export const formateDateTimeRange = (
  startDateTimeString: string,
  endDateTimeString?: string,
  length: 'short' | 'long' = 'short'
) => {
  const startDateTime = new Date(startDateTimeString)
  const endDateTime = endDateTimeString && new Date(endDateTimeString)

  const toDateString = (dateTime: Date) =>
    dateTime.toLocaleDateString('en-US', {
      weekday: length,
      month: length,
      day: 'numeric',
      year: 'numeric',
      timeZone: 'America/New_York',
    })

  const toTimeString = (dateTime: Date) =>
    dateTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: 'America/New_York',
    })

  const startDate = toDateString(startDateTime)
  const startTime = toTimeString(startDateTime)
  const endDate = endDateTime && toDateString(endDateTime)
  const endTime = endDateTime && toTimeString(endDateTime)
  const timeRange = endTime
    ? toAmPmRange(startTime, endTime)
    : toAmPm(startTime)

  const multiDay = endDate && endDate !== startDate

  return `${startDate}, ${
    multiDay
      ? `${toAmPm(startTime)}–${endDate}, ${endTime && toAmPm(endTime)}`
      : timeRange
  }`
}

export const toDate = (dateString: string, locale = 'en-US') => {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleString(locale, {
    month: 'short',
    day: 'numeric',
  })
}

export const renderDescription = (structuredText: IStructuredText) => {
  if (structuredText.value) {
    const textString = render(structuredText as IStructuredText)
    if (textString && textString.length > 160) {
      return textString.slice(0, 157) + '...'
    } else {
      return textString
    }
  } else return null
}
