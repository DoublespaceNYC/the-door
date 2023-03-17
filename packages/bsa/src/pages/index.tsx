import CornerPopup, {
  ICornerPopup,
} from '@the-door/common/src/components/CornerPopup'
import { IDatoLink } from '@the-door/common/src/components/DatoLink'
import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import HomeLatest from '@the-door/common/src/components/Home__Latest'
import { IInternalArticle } from '@the-door/common/src/components/InternalArticle'
import { IInternalLink } from '@the-door/common/src/components/InternalLink'
import { IStructuredText } from '@the-door/common/src/types'
import { PageProps, graphql } from 'gatsby'
import { Fragment, useEffect, useState } from 'react'

import HomeHero from '../components/Home__Hero'
import HomeResults from '../components/Home__Results'
import HomeServices from '../components/Home__Services'
import HomeWelcome from '../components/Home__Welcome'
import HomeWhyBSA from '../components/Home__WhyBSA'
import Seo from '../components/Seo'

type DataProps = {
  home: {
    heroHeading: string
    heroCtaText: string
    heroCtaLink: [IDatoLink]
    heroVideo: {
      video: {
        streamingUrl: string
        thumbnailUrl: string
      }
      customData?: {
        thumbnailTime?: string
      }
    }
    welcomeHeading: string
    welcomeBody: IStructuredText
    welcomeLinks: IDatoLink[]
    welcomeImage: IGatsbyImageFocused
    servicesHeading: string
    servicesBody: IStructuredText
    whyBsaHeading: string
    whyBsaBody: IStructuredText
    whyBsaCta: IDatoLink[]
    whyBsaImage: IGatsbyImageFocused
    resultsHeading: string
    resultsBody: IStructuredText
    resultsCta: IDatoLink[]
    resultsImage: IGatsbyImageFocused
    latestHeading: string
    featuredArticle: IInternalArticle
    latestLink: [IInternalLink]
    calendarLink: [IInternalLink]
    showPopup: boolean
    popup: [ICornerPopup]
  }
}

const IndexPage = ({ data: { home } }: PageProps<DataProps>) => {
  // Use state to control popup to avoid hydration errors
  const [showPopup, setShowPopup] = useState(false)
  useEffect(() => setShowPopup(home.showPopup), [home.showPopup])

  return (
    <Fragment>
      <HomeHero
        heading={home.heroHeading}
        ctaText={home.heroCtaText}
        ctaLink={home.heroCtaLink[0]}
        video={home.heroVideo}
      />
      <HomeWelcome
        heading={home.welcomeHeading}
        body={home.welcomeBody}
        links={home.welcomeLinks}
        image={home.welcomeImage}
      />
      {showPopup && <CornerPopup content={home.popup[0]} />}
      <HomeServices
        heading={home.servicesHeading}
        body={home.servicesBody}
      />
      <HomeWhyBSA
        heading={home.whyBsaHeading}
        body={home.whyBsaBody}
        cta={home.whyBsaCta}
        image={home.whyBsaImage}
      />
      <HomeResults
        heading={home.resultsHeading}
        body={home.resultsBody}
        cta={home.resultsCta}
        image={home.resultsImage}
      />
      <HomeLatest
        heading={home.latestHeading}
        featuredArticle={home.featuredArticle}
        pageLink={home.latestLink[0]}
        calendarLink={home.calendarLink[0]}
      />
    </Fragment>
  )
}

export const Head = (): JSX.Element => (
  <Seo
    title="Broome Street Academy"
    hideSuffix
  />
)

export const data = graphql`
  query {
    home: datoCmsHomePage {
      heroHeading
      heroCtaText
      heroCtaLink {
        ... on DatoCmsInternalLink {
          ...InternalLinkFragment
        }
        ... on DatoCmsExternalLink {
          ...ExternalLinkFragment
        }
        ... on DatoCmsFormLightboxLink {
          ...FormLightboxLinkFragment
        }
      }
      heroVideo {
        video {
          streamingUrl
          thumbnailUrl
        }
        customData
      }
      welcomeHeading
      welcomeBody {
        value
      }
      welcomeLinks {
        ... on DatoCmsExternalLink {
          ...ExternalLinkFragment
        }
        ... on DatoCmsInternalLink {
          ...InternalLinkFragment
        }
        ... on DatoCmsTertiaryLink {
          ...TertiaryLinkFragment
        }
      }
      welcomeImage {
        gatsbyImageData(
          width: 960
          imgixParams: {
            q: 65
            ar: "4:5"
            fit: "crop"
            crop: "focalpoint"
          }
        )
        ...ImageFocalData
      }
      servicesHeading
      servicesBody {
        value
      }
      whyBsaHeading
      whyBsaBody {
        value
      }
      whyBsaCta {
        ...InternalLinkFragment
      }
      whyBsaImage {
        gatsbyImageData(
          width: 960
          imgixParams: {
            q: 65
            ar: "4:5"
            fit: "crop"
            crop: "focalpoint"
          }
        )
        ...ImageFocalData
      }
      resultsHeading
      resultsBody {
        value
      }
      resultsCta {
        ...TertiaryLinkFragment
      }
      resultsImage {
        gatsbyImageData(
          width: 960
          imgixParams: {
            q: 65
            ar: "4:5"
            fit: "crop"
            crop: "focalpoint"
          }
        )
        ...ImageFocalData
      }
      latestHeading
      featuredArticle {
        ...InternalArticleFragment
      }
      latestLink {
        ...InternalLinkFragment
      }
      calendarLink {
        ...InternalLinkFragment
      }
      showPopup
      popup {
        ...CornerPopupFragment
      }
    }
  }
`

export default IndexPage
