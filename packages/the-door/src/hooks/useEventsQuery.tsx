import { graphql, useStaticQuery } from 'gatsby'

const useEventsQuery = () => {
  const { allEvents } = useStaticQuery(graphql`
    query {
      allEvents: allDatoCmsEvent {
        nodes {
          ...EventFragment
        }
      }
    }
  `)
  return {
    allEvents: allEvents.nodes,
  }
}

export default useEventsQuery
