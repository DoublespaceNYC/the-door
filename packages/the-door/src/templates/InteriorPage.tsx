import { IAnchorLink } from '@the-door/common/src/components/AnchorLink'
import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import PageContent, {
  ILayoutOptions,
  IPageContent,
} from '@the-door/common/src/components/PageContent'
import PageHero from '@the-door/common/src/components/PageHero'
import PageIntro from '@the-door/common/src/components/PageIntro'
import PageNav from '@the-door/common/src/components/PageNav'
import { IStructuredText } from '@the-door/common/src/types'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { useMemo } from 'react'

import Layout from '../components/Layout'
import Seo, { ISEO } from '../components/Seo'

type DataProps = {
  page: {
    title: string
    heroImage: IGatsbyImageFocused
    intro: IStructuredText
    pageContent: IPageContent
    layoutOptions: [ILayoutOptions]
    seo?: ISEO
  }
}

interface ContextProps {
  id: string
}

const InteriorPage = ({
  data: {
    page: { title, heroImage, intro, pageContent, layoutOptions },
  },
}: PageProps<DataProps, ContextProps>): JSX.Element => {
  const anchorLinks = useMemo(() => {
    return pageContent
      .map(block => block.anchorLink[0])
      .filter(block => block !== undefined) as IAnchorLink[]
  }, [pageContent])
  return (
    <Layout>
      <PageHero title={title} image={heroImage} />
      <PageNav links={[...anchorLinks]} />
      <PageIntro intro={intro} />
      <PageContent
        pageContent={pageContent}
        layoutOptions={layoutOptions[0]}
      />
    </Layout>
  )
}

export const Head = ({
  data: {
    page: { title, seo },
  },
}: HeadProps<DataProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description}
    imageUrl={seo?.image?.url}
  />
)

export const data = graphql`
  fragment InteriorPageFragment on DatoCmsInteriorPage {
    title
    heroImage {
      gatsbyImageData(
        layout: FULL_WIDTH
        imgixParams: {
          q: 65
          ar: "8:3"
          fit: "crop"
          crop: "focalpoint"
        }
      )
      ...ImageFocalData
    }
    intro {
      value
    }
    pageContent {
      ... on DatoCmsContentBlock {
        ...ContentBlockFragment
      }
    }
    layoutOptions {
      ...LayoutOptionsFragment
    }
    seo {
      ...SEOFragment
    }
  }
  query ($id: String!) {
    page: datoCmsInteriorPage(id: { eq: $id }) {
      ...InteriorPageFragment
    }
  }
`

export default InteriorPage
