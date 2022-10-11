import { Record } from 'datocms-structured-text-utils'

export interface IEvent extends Record {
  title: string
  startDateTime: string
  endDateTime?: string
  location:
    | 'Manhattan Youth Center'
    | 'Bronx Youth Center'
    | 'Off Campus'
  offCampusLocation?: string
  tags: { name: string }[]
  slug: string
}

const Event = (): JSX.Element => {
  return <div></div>
}

export default Event
