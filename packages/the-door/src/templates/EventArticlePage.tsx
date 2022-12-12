import EventArticle, {
  IEvent,
} from '@the-door/common/src/components/Event__Article'
import { render } from 'datocms-structured-text-to-plain-text'
import { HeadProps, PageProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

interface QueryProps {
  event: IEvent
}

interface ContextProps {
  id: string
}

const EventArticlePage = ({
  data,
}: PageProps<QueryProps, ContextProps>): JSX.Element => {
  return (
    <Layout>
      <EventArticle
        data={data.event}
        layout="Page"
      />
    </Layout>
  )
}

export const Head = ({
  data: {
    event: { title, body, seo },
  },
}: HeadProps<QueryProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description || body.value ? render(body) : null}
    imageUrl={seo?.image?.url}
  />
)

export const query = graphql`
  query ($id: String!) {
    event: datoCmsEvent(id: { eq: $id }) {
      ...EventFragment
    }
  }
`

export default EventArticlePage
