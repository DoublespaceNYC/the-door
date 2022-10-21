import EventArticle, {
  IEvent,
} from '@the-door/common/src/components/Event__Article'
import { HeadProps, PageProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

interface QueryProps {
  event: IEvent
}

interface ContextProps {
  slug: string
}

const EventArticlePage = ({
  data,
}: PageProps<QueryProps, ContextProps>): JSX.Element => {
  return (
    <Layout>
      <EventArticle data={data.event} layout="Page" />
    </Layout>
  )
}

export const Head = ({
  data: {
    event: { title, seo },
  },
}: HeadProps<QueryProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description}
    imageUrl={seo?.image?.url}
  />
)

export const query = graphql`
  query ($slug: String!) {
    event: datoCmsEvent(slug: { eq: $slug }) {
      ...EventFragment
    }
  }
`

export default EventArticlePage
