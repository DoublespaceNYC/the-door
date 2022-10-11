import CornerPopup, {
  ICornerPopup,
} from '@the-door/common/src/components/CornerPopup'
import { IDatoLink } from '@the-door/common/src/components/DatoLink'
import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import HomeLatest from '@the-door/common/src/components/HomeLatest'
import { IInternalArticle } from '@the-door/common/src/components/InternalArticle'
import { IInternalLink } from '@the-door/common/src/components/InternalLink'
import { IStructuredText } from '@the-door/common/src/types'
import { PageProps, graphql } from 'gatsby'
import { useEffect, useState } from 'react'

import HomeFaces from '../components/HomeFaces'
import HomeHero from '../components/HomeHero'
import HomeImpact from '../components/HomeImpact'
import HomeServices from '../components/HomeServices'
import HomeWelcome from '../components/HomeWelcome'
import Layout from '../components/Layout'
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
    bsaHeading: string
    bsaBody: IStructuredText
    bsaLink: [IDatoLink]
    bsaImage: IGatsbyImageFocused
    impactHeading: string
    impactBody: IStructuredText
    impactLink: IDatoLink[]
    impactStats: {
      number: string
      text: string
    }[]
    impactCta: string
    impactCtaLink: [IDatoLink]
    facesHeading: string
    facesBody: IStructuredText
    latestHeading: string
    featuredArticle: IInternalArticle
    latestLink: [IInternalLink]
    showPopup: boolean
    popup: [ICornerPopup]
  }
}

const IndexPage = ({ data: { home } }: PageProps<DataProps>) => {
  // Use state to control popup to avoid hydration errors
  const [showPopup, setShowPopup] = useState(false)
  useEffect(() => setShowPopup(home.showPopup), [home.showPopup])

  return (
    <Layout>
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
        bsaHeading={home.bsaHeading}
        bsaBody={home.bsaBody}
        bsaLink={home.bsaLink[0]}
        bsaImage={home.bsaImage}
      />
      <HomeImpact
        heading={home.impactHeading}
        body={home.impactBody}
        link={home.impactLink[0]}
        stats={home.impactStats}
        cta={home.impactCta}
        ctaLink={home.impactCtaLink[0]}
      />
      <HomeFaces heading={home.facesHeading} body={home.facesBody} />
      <HomeLatest
        heading={home.latestHeading}
        featuredArticle={home.featuredArticle}
        pageLink={home.latestLink[0]}
      />
    </Layout>
  )
}

export const Head = (): JSX.Element => (
  <Seo title={`The Door`} hideSuffix />
)

export const data = graphql`
  query {
    home: datoCmsDoorHome {
      heroHeading
      heroCtaText
      heroCtaLink {
        ... on DatoCmsInternalLink {
          ...InternalLinkFragment
        }
        ... on DatoCmsExternalLink {
          ...ExternalLinkFragment
        }
        ... on DatoCmsLightboxLink {
          ...LightboxLinkFragment
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
        sizes {
          aspectRatio
        }
        alt
        focalPoint {
          x
          y
        }
      }
      servicesHeading
      servicesBody {
        value
      }
      servicesLink {
        ... on DatoCmsExternalLink {
          ...ExternalLinkFragment
        }
        ... on DatoCmsInternalLink {
          ...InternalLinkFragment
        }
      }
      bsaHeading
      bsaBody {
        value
      }
      bsaLink {
        ...ExternalLinkFragment
      }
      bsaImage {
        gatsbyImageData(width: 1280, imgixParams: { q: 60 })
        sizes {
          aspectRatio
        }
        focalPoint {
          x
          y
        }
        alt
      }
      impactHeading
      impactBody {
        value
      }
      impactLink {
        ...InternalLinkFragment
      }
      impactStats {
        number
        text
      }
      impactCta
      impactCtaLink {
        ... on DatoCmsExternalLink {
          ...ExternalLinkFragment
        }
        ... on DatoCmsInternalLink {
          ...InternalLinkFragment
        }
      }
      facesHeading
      facesBody {
        value
      }
      latestHeading
      featuredArticle {
        ...InternalArticleFragment
      }
      latestLink {
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
