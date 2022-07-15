import { IDatoLink, IStructuredText } from '@the-door/common/src/types'
import { graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import HomeFaces from '../components/HomeFaces'
import HomeHero from '../components/HomeHero'
import HomeImpact from '../components/HomeImpact'
import HomeLatest from '../components/HomeLatest'
import HomeServices from '../components/HomeServices'
import HomeWelcome from '../components/HomeWelcome'
import Layout from '../components/Layout'
import { INewsArticle } from '../types'

export const data = graphql`
  query {
    home: datoCmsDoorHome {
      heroHeading
      heroCtaText
      heroCtaLink {
        ... on DatoCmsExternalLink {
          ...ExternalLinkFragment
        }
        ... on DatoCmsInternalLink {
          ...InternalLinkFragment
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
        gatsbyImageData
        alt
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
        gatsbyImageData
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
        ...NewsArticleFragment
      }
    }
  }
`

type Props = {
  data: {
    home: {
      heroHeading: string
      heroCtaText: string
      heroCtaLink: IDatoLink[]
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
      welcomeImage: {
        gatsbyImageData: IGatsbyImageData
        alt?: string
      }
      servicesHeading: string
      servicesBody: IStructuredText
      servicesLink: IDatoLink[]
      bsaHeading: string
      bsaBody: IStructuredText
      bsaLink: IDatoLink[]
      bsaImage: {
        gatsbyImageData: IGatsbyImageData
        alt?: string
      }
      impactHeading: string
      impactBody: IStructuredText
      impactLink: IDatoLink[]
      impactStats: {
        number: string
        text: string
      }[]
      impactCta: string
      impactCtaLink: IDatoLink[]
      facesHeading: string
      facesBody: IStructuredText
      latestHeading: string
      featuredArticle: INewsArticle
    }
  }
}

const IndexPage = ({ data }: Props) => {
  const { home } = data
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
      <HomeServices
        heading={home.servicesHeading}
        body={home.servicesBody}
        link={home.servicesLink[0]}
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
      />
    </Layout>
  )
}

export default IndexPage
