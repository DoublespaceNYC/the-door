import InternalArticle, {
  IInternalArticle,
} from '@the-door/common/src/components/InternalArticle'
import { HeadProps, PageProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

interface QueryProps {
  article: IInternalArticle
}

interface ContextProps {
  slug: string
}

const InternalArticlePage = ({
  data,
}: PageProps<QueryProps, ContextProps>): JSX.Element => {
  return (
    <Layout>
      <InternalArticle data={data.article} layout="Page" />
    </Layout>
  )
}

export const Head = ({
  data: {
    article: { title, seo },
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
    article: datoCmsInternalArticle(slug: { eq: $slug }) {
      ...InternalArticleFragment
    }
  }
`

export default InternalArticlePage
