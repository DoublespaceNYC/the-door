import { IEvent } from '@the-door/common/src/components/Event'
import { graphql, useStaticQuery } from 'gatsby'

const useEventsQuery = () => {
  const { allEvents } = useStaticQuery<QueryProps>(graphql`
    query {
      allEvents: allDatoCmsEvent(filter: { isUpcoming: { eq: true } }) {
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
  return {
    allEvents: allEvents.nodes,
  }
}

export default useEventsQuery
