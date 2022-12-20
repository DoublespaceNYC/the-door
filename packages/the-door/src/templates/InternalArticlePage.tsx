import InternalArticle, {
  IInternalArticle,
} from '@the-door/common/src/components/InternalArticle'
import { renderDescription } from '@the-door/common/src/utils'
import { HeadProps, PageProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

interface QueryProps {
  article: IInternalArticle
}

interface ContextProps {
  id: string
}

const InternalArticlePage = ({
  data,
}: PageProps<QueryProps, ContextProps>): JSX.Element => {
  return (
    <Layout>
      <InternalArticle
        data={data.article}
        layout="Page"
      />
    </Layout>
  )
}

export const Head = ({
  data: {
    article: { title, lede, body, seo },
  },
}: HeadProps<QueryProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={
      seo?.description ||
      (lede && renderDescription(lede)) ||
      renderDescription(body)
    }
    imageUrl={seo?.image?.url}
  />
)

export const query = graphql`
  query ($id: String!) {
    article: datoCmsInternalArticle(id: { eq: $id }) {
      ...InternalArticleFragment
    }
  }
`

export default InternalArticlePage
