import { css } from '@emotion/react'
import PartnerArticle, {
  IPartner,
} from '@the-door/common/src/components/Partner__Article'
import { renderDescription } from '@the-door/common/src/utils'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { Fragment } from 'react'

import Seo from '../components/Seo'
import { colors } from '../theme/variables'

interface QueryProps {
  partner: IPartner
}

interface ContextProps {
  id: string
}

const PartnerArticlePage = ({
  data,
}: PageProps<QueryProps, ContextProps>): JSX.Element => {
  const style = css`
    min-height: 75vh;
  `
  return (
    <Fragment>
      <PartnerArticle
        css={style}
        data={data.partner}
        highlightColor={colors.blue}
      />
    </Fragment>
  )
}

export const Head = ({
  data: {
    partner: { name, description, logo, seo },
  },
}: HeadProps<QueryProps>): JSX.Element => (
  <Seo
    title={seo?.title || name}
    description={seo?.description || renderDescription(description)}
    imageUrl={seo?.image?.url || logo.url}
  />
)

export const query = graphql`
  query ($id: String!) {
    partner: datoCmsPartner(id: { eq: $id }) {
      ...PartnerFragment
    }
  }
`

export default PartnerArticlePage
