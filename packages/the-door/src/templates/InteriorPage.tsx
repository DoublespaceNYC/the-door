import { IAnchorLink } from '@the-door/common/src/components/AnchorLink'
import { IDatoLink } from '@the-door/common/src/components/DatoLink'
import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
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
import { IStructuredText } from '@the-door/common/src/types'
import { renderDescription } from '@the-door/common/src/utils'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { Fragment, useMemo } from 'react'

import Seo, { ISEO } from '../components/Seo'

type DataProps = {
  page: {
    _allSlugLocales: ISlugLocale[]
    title: string
    navButton: [IDatoLink] | null
    heroImage: IGatsbyImageFocused
    intro: IStructuredText
    pageContent: IPageContent
    layoutOptions: [ILayoutOptions]
    seo?: ISEO
  }
}

interface ContextProps {
  id: string
  locale: ILocale
}

const InteriorPage = ({
  data: {
    page: {
      _allSlugLocales,
      title,
      navButton,
      heroImage,
      intro,
      pageContent,
      layoutOptions,
    },
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
      />
      <PageNav
        links={[...anchorLinks]}
        button={navButton ? navButton[0] : undefined}
        slugLocales={_allSlugLocales}
        currentLocale={locale}
      />
      <PageIntro intro={intro} />
      <PageContent
        pageContent={pageContent}
        layoutOptions={layoutOptions[0]}
      />
    </Fragment>
  )
}

export const Head = ({
  data: {
    page: { title, intro, seo },
  },
  pageContext: { locale },
}: HeadProps<DataProps, ContextProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description || renderDescription(intro)}
    imageUrl={seo?.image?.url}
    lang={locale}
  />
)

export const data = graphql`
  query ($id: String!, $locale: String!) {
    page: datoCmsInteriorPage(id: { eq: $id }) {
      _allSlugLocales {
        locale
        value
      }
      title(locale: $locale)
      navButton(locale: $locale) {
        ... on DatoCmsExternalLink {
          ...ExternalLinkFragment
        }
        ... on DatoCmsInternalLink {
          ...InternalLinkFragment
        }
        ... on DatoCmsTertiaryLink {
          ...TertiaryLinkFragment
        }
        ... on DatoCmsFormLightboxLink {
          ...FormLightboxLinkFragment
        }
      }
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
      layoutOptions {
        ...LayoutOptionsFragment
      }
      seo(locale: $locale) {
        ...SEOFragment
      }
    }
  }
`

export default InteriorPage
