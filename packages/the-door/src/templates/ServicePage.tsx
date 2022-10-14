import { IAnchorLink } from '@the-door/common/src/components/AnchorLink'
import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import PageContact, {
  IContactSection,
} from '@the-door/common/src/components/PageContact'
import PageContent, {
  ILayoutOptions,
  IPageContent,
} from '@the-door/common/src/components/PageContent'
import PageHero from '@the-door/common/src/components/PageHero'
import PageIntro from '@the-door/common/src/components/PageIntro'
import PageNav from '@the-door/common/src/components/PageNav'
import ProgramCatalogSection, {
  IProgramCatalogSection,
} from '@the-door/common/src/components/ProgramCatalogSection'
import { IStructuredText } from '@the-door/common/src/types'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { useMemo } from 'react'

import Layout from '../components/Layout'
import PageServices from '../components/PageServices'
import Seo, { ISEO } from '../components/Seo'

type DataProps = {
  service: {
    title: string
    heroImage: IGatsbyImageFocused
    intro: IStructuredText
    pageContent: IPageContent
    programCatalog: [IProgramCatalogSection?]
    contactSection: [IContactSection?]
    layoutOptions: [ILayoutOptions]
    seo?: ISEO
  }
  section: {
    title: string
  }
}

const ServicePage = ({
  data: {
    service: {
      title,
      heroImage,
      intro,
      pageContent,
      programCatalog,
      contactSection,
      layoutOptions,
    },
    section,
  },
}: PageProps<DataProps>) => {
  const anchorLinks = useMemo(() => {
    return pageContent
      .map(block => block.anchorLink[0])
      .filter(block => block !== undefined) as IAnchorLink[]
  }, [pageContent])
  return (
    <Layout>
      <PageHero
        title={title}
        image={heroImage}
        section={section.title}
      />
      <PageNav
        links={[
          ...anchorLinks,
          ...(programCatalog[0]?.anchorLink[0]
            ? [programCatalog[0]?.anchorLink[0]]
            : []),
          ...(contactSection[0]?.anchorLink[0]
            ? [contactSection[0]?.anchorLink[0]]
            : []),
        ]}
      />
      <PageIntro intro={intro} />
      <PageContent
        pageContent={pageContent}
        layoutOptions={layoutOptions[0]}
      />
      {programCatalog[0] && (
        <ProgramCatalogSection data={programCatalog[0]} />
      )}
      {contactSection[0] && <PageContact data={contactSection[0]} />}
      <PageServices />
    </Layout>
  )
}

export const Head = ({
  data: {
    service: { title, seo },
  },
}: HeadProps<DataProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description}
    imageUrl={seo?.image?.url}
  />
)

export const data = graphql`
  query ($id: String!) {
    service: datoCmsService(id: { eq: $id }) {
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
        sizes {
          aspectRatio
        }
        alt
        focalPoint {
          x
          y
        }
      }
      intro {
        value
      }
      pageContent {
        ... on DatoCmsContentBlock {
          ...ContentBlockFragment
        }
      }
      programCatalog {
        ...CatalogSectionFragment
      }
      contactSection {
        ...ContactSectionFragment
      }
      layoutOptions {
        ...LayoutOptionsFragment
      }
      seo {
        ...SEOFragment
      }
    }
    section: datoCmsServicesGroup(
      services: { elemMatch: { id: { eq: $id } } }
    ) {
      title
    }
  }
`

export default ServicePage
