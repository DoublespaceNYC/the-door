import { css } from '@emotion/react'
import PartnerArticle, {
  IPartner,
} from '@the-door/common/src/components/Partner__Article'
import { render } from 'datocms-structured-text-to-plain-text'
import { HeadProps, PageProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
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
    <Layout>
      <PartnerArticle
        css={style}
        data={data.partner}
        highlightColor={colors.blue}
      />
    </Layout>
  )
}

export const Head = ({
  data: {
    partner: { name, description, logo, seo },
  },
}: HeadProps<QueryProps>): JSX.Element => (
  <Seo
    title={seo?.title || name}
    description={
      seo?.description || description.value ? render(description) : null
    }
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
