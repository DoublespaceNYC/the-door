import { IAnchorLink } from '@the-door/common/src/components/AnchorLink'
import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import { IContactSection } from '@the-door/common/src/components/PageContact'
import { IPageContent } from '@the-door/common/src/components/PageContent'
import PageIntro from '@the-door/common/src/components/PageIntro'
import { IProgramCatalogSection } from '@the-door/common/src/components/ProgramCatalogSection'
import { IStructuredText } from '@the-door/common/src/types'
import { PageProps, graphql } from 'gatsby'
import { useMemo } from 'react'

import Layout from '../components/Layout'
import TheDoorPageContact from '../components/PageContact'
import TheDoorPageContent, {
  IDoorLayoutOptions,
} from '../components/PageContent'
import TheDoorPageHero from '../components/PageHero'
import TheDoorPageNav from '../components/PageNav'
import PageServices from '../components/PageServices'
import TheDoorProgramCatalogSection from '../components/ProgramCatalogSection'
import Seo, { ISEO } from '../components/Seo'

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
        ...SeoFragment
      }
    }
    section: datoCmsServicesGroup(
      services: { elemMatch: { id: { eq: $id } } }
    ) {
      title
    }
  }
`

type DataProps = {
  service: {
    title: string
    heroImage: IGatsbyImageFocused
    intro: IStructuredText
    pageContent: IPageContent
    programCatalog: [IProgramCatalogSection?]
    contactSection: [IContactSection?]
    layoutOptions: [IDoorLayoutOptions]
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
      seo,
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
      <Seo
        title={seo?.title || title}
        description={seo?.description}
        imageUrl={seo?.image?.url}
      />
      <TheDoorPageHero
        title={title}
        image={heroImage}
        section={section.title}
      />
      <TheDoorPageNav
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
      <TheDoorPageContent
        pageContent={pageContent}
        layoutOptions={layoutOptions[0]}
      />
      {programCatalog[0] && (
        <TheDoorProgramCatalogSection data={programCatalog[0]} />
      )}
      {contactSection[0] && (
        <TheDoorPageContact data={contactSection[0]} />
      )}
      <PageServices />
    </Layout>
  )
}

export default ServicePage
