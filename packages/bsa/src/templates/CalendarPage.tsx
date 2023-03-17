import Calendar from '@the-door/common/src/components/Calendar'
import useQueryContext from '@the-door/common/src/context/QueryContext'
import { HeadProps, PageProps, graphql } from 'gatsby'

import Seo, { ISEO } from '../components/Seo'

interface DataProps {
  page: {
    title: string
    seo: ISEO
  }
}

const CalendarPage = ({
  data: {
    page: { title },
  },
}: PageProps<DataProps>): JSX.Element => {
  const { allEvents } = useQueryContext()
  return (
    <Calendar
      title={title}
      events={allEvents}
    />
  )
}

export const Head = ({
  data: {
    page: { title, seo },
  },
}: HeadProps<DataProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description}
    imageUrl={seo?.image?.url}
  />
)

export const data = graphql`
  query {
    page: datoCmsCalendarPage {
      title
      seo {
        ...SEOFragment
      }
    }
  }
`

export default CalendarPage
