import { graphql, useStaticQuery } from 'gatsby'
import { Fragment, ReactNode } from 'react'

export interface ISEO {
  title?: string
  description?: string
  twitterCard?: string
  image: {
    url: string
  }
}

type Props = {
  title?: string
  description?: string
  imageUrl?: string
  hideSuffix?: boolean
  children?: ReactNode
}

const Seo = ({
  title,
  description,
  imageUrl,
  hideSuffix,
  children,
}: Props): JSX.Element => {
  const {
    site: {
      globalSeo: {
        fallbackSeo: { defaultTitle, defaultDescription },
      },
    },
  } = useStaticQuery(graphql`
    query {
      site: datoCmsSite {
        globalSeo {
          fallbackSeo {
            defaultTitle: title
            defaultDescription: description
          }
        }
      }
    }
  `)

  const titleSuffix = ' | The Door'

  const metaDescription = description || defaultDescription
  const metaTitle = title || defaultTitle

  return (
    <Fragment>
      <title>
        {!hideSuffix ? `${metaTitle}${titleSuffix}` : metaTitle}
      </title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      {/* <meta
        name="twitter:creator"
        content={site.siteMetadata?.author || ``}
      /> */}
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:title" content={metaTitle} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {children}
    </Fragment>
  )
}

export const SEOFragment = graphql`
  fragment SEOFragment on DatoCmsSeoField {
    title
    description
    twitterCard
    image {
      url(imgixParams: { maxW: 1080 })
    }
  }
`

export default Seo
