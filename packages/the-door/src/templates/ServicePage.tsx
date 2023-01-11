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
import {
  ILocale,
  ISlugLocale,
} from '@the-door/common/src/components/PageNav__Language'
import ProgramCatalogSection, {
  IProgramCatalogSection,
} from '@the-door/common/src/components/ProgramCatalogSection'
import { IStructuredText } from '@the-door/common/src/types'
import { renderDescription } from '@the-door/common/src/utils'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { Fragment, useMemo } from 'react'

import PageServices from '../components/PageServices'
import Seo, { ISEO } from '../components/Seo'

type DataProps = {
  service: {
    _allSlugLocales: ISlugLocale[]
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

interface ContextProps {
  locale: ILocale
  id: string
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
      _allSlugLocales,
    },
    section,
  },
  pageContext: { locale },
}: PageProps<DataProps, ContextProps>): JSX.Element => {
  const anchorLinks = useMemo(() => {
    return pageContent
      .map(block => block.anchorLink[0])
      .filter(block => block !== undefined) as IAnchorLink[]
  }, [pageContent])
  return (
    <Fragment>
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
        slugLocales={_allSlugLocales}
        currentLocale={locale}
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
    </Fragment>
  )
}

export const Head = ({
  data: {
    service: { title, intro, seo },
  },
  pageContext: { locale },
}: HeadProps<DataProps, { locale: ILocale }>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description || renderDescription(intro)}
    imageUrl={seo?.image?.url}
    lang={locale}
  />
)

export const data = graphql`
  query ($id: String!, $locale: String!) {
    service: datoCmsService(id: { eq: $id }) {
      _allSlugLocales {
        locale
        value
      }
      title(locale: $locale)
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
      intro(locale: $locale) {
        value
      }
      pageContent(locale: $locale) {
        ... on DatoCmsContentBlock {
          ...ContentBlockFragment
        }
      }
      programCatalog(locale: $locale) {
        ...CatalogSectionFragment
      }
      contactSection(locale: $locale) {
        ...ContactSectionFragment
      }
      layoutOptions {
        ...LayoutOptionsFragment
      }
      seo(locale: $locale) {
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
