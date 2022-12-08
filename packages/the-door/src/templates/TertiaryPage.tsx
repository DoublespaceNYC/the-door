import TertiaryPageContent, {
  ITertiaryPage,
} from '@the-door/common/src/components/TertiaryPageContent'
import { render } from 'datocms-structured-text-to-plain-text'
import { HeadProps, PageProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { colors } from '../theme/variables'

interface DataProps {
  tertiaryPage: ITertiaryPage
}
interface ContextProps {
  id: string
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
    tertiaryPage: { title, lede, seo },
  },
}: HeadProps<DataProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description || lede.value ? render(lede) : null}
    imageUrl={seo?.image?.url}
  />
)
export const data = graphql`
  query ($id: String!) {
    tertiaryPage: datoCmsTertiaryPage(id: { eq: $id }) {
      ...TertiaryPageFragment
    }
  }
`

export default TertiaryPage
