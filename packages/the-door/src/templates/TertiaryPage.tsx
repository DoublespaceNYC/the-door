import TertiaryPageContent, {
  ITertiaryPage,
} from '@the-door/common/src/components/TertiaryPageContent'
import { HeadProps, PageProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { colors } from '../theme/variables'

interface DataProps {
  tertiaryPage: ITertiaryPage
}
interface ContextProps {
  slug: string
}

const TertiaryPage = ({
  data: { tertiaryPage },
}: PageProps<DataProps, ContextProps>): JSX.Element => {
  return (
    <Layout>
      <TertiaryPageContent
        data={tertiaryPage}
        layout="Page"
        highlightColor={colors.blue}
      />
    </Layout>
  )
}
export const Head = ({
  data: {
    tertiaryPage: { title, seo },
  },
}: HeadProps<DataProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description}
    imageUrl={seo?.image?.url}
  />
)
export const data = graphql`
  query ($slug: String!) {
    tertiaryPage: datoCmsTertiaryPage(slug: { eq: $slug }) {
      ...TertiaryPageFragment
    }
  }
`

export default TertiaryPage
