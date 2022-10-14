import { IEvent } from '@the-door/common/src/components/Event__Article'
import { graphql, useStaticQuery } from 'gatsby'

const useEventsQuery = () => {
  const { allEvents } = useStaticQuery<QueryProps>(graphql`
    query {
      allEvents: allDatoCmsEvent(
        filter: { isUpcoming: { eq: true } }
        sort: { fields: startDateTime, order: ASC }
      ) {
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
