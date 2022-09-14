import { IEvent } from '@the-door/common/src/components/Event'
import { graphql, useStaticQuery } from 'gatsby'
import { useMemo } from 'react'

const useEventsQuery = () => {
  const { allEvents } = useStaticQuery<QueryProps>(graphql`
    query {
      allEvents: allDatoCmsEvent(sort: { fields: startDateTime }) {
        nodes {
          ...EventFragment
        }
      }
    }
  `)
  type QueryProps = {
    allEvents: {
      nodes: IEvent[]
    }
  }
  const filteredEvents = useMemo(() => {
    const today = new Date()
    today.setHours(23, 59, 59)
    return allEvents.nodes.filter(event => {
      const cutoff = new Date(event.endDateTime || event.startDateTime)
      if (cutoff > today) {
        return true
      }
    })
  }, [allEvents])
  return {
    allEvents: filteredEvents,
  }
}

export default useEventsQuery
