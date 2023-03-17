import TertiaryPageContent, {
  ITertiaryPage,
} from '@the-door/common/src/components/TertiaryPageContent'
import { renderDescription } from '@the-door/common/src/utils'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { Fragment } from 'react'

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
    <Fragment>
      <TertiaryPageContent
        data={tertiaryPage}
        layout="Page"
        highlightColor={colors.bsaBlue}
      />
    </Fragment>
  )
}
export const Head = ({
  data: {
    tertiaryPage: { title, lede, seo },
  },
}: HeadProps<DataProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description || renderDescription(lede)}
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
