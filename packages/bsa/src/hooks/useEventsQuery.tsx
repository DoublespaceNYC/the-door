import { IEvent } from '@the-door/common/src/components/Event__Article'
import { graphql, useStaticQuery } from 'gatsby'

const useEventsQuery = () => {
  const { allEvents } = useStaticQuery<QueryProps>(graphql`
    query {
      # 'buildTime' query is required for Gatsby
      # to avoid skipping 'isUpcoming' custom schema
      siteBuildMetadata {
        buildTime
      }
      allEvents: allDatoCmsEvent(
        filter: { isUpcoming: { eq: true } }
        sort: { startDateTime: ASC }
      ) {
        nodes {
          ...EventFragment
        }
      }
    }
  `)
  type QueryProps = {
    siteBuildMetadata: {
      buildTime: string
    }
    allEvents: {
      nodes: IEvent[]
    }
  }
  return {
    allEvents: allEvents.nodes,
  }
}

export default useEventsQuery
