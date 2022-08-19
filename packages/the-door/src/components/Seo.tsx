import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'

export interface ISEO {
  title?: string
  description?: string
  image?: {
    url: string
  }
}

type SeoProps = {
  title?: string
  description?: string
  lang?: string
  imageUrl?: string
  noSuffix?: boolean
}

const Seo = ({
  title = ``,
  description = ``,
  lang = `en`,
  imageUrl,
  noSuffix,
}: SeoProps) => {
  const { datoCmsSite } = useStaticQuery<QueryProps>(graphql`
    query {
      datoCmsSite {
        globalSeo {
          titleSuffix
          fallbackSeo {
            ...SeoFragment
          }
        }
      }
    }
  `)

  type QueryProps = {
    datoCmsSite: {
      globalSeo: {
        titleSuffix?: string
        fallbackSeo?: ISEO
      }
    }
  }

  const metaDescription =
    description || datoCmsSite.globalSeo.fallbackSeo?.description || ''
  const metaTitle =
    title || datoCmsSite.globalSeo.fallbackSeo?.title || ''
  const titleSuffix = noSuffix ? '' : datoCmsSite.globalSeo.titleSuffix

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s${titleSuffix}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: `${metaTitle}${titleSuffix}`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: ``,
        },
        {
          name: `twitter:title`,
          content: metaTitle + titleSuffix,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `image`,
          property: `og:image`,
          content:
            datoCmsSite.globalSeo.fallbackSeo?.image?.url ||
            imageUrl ||
            undefined,
        },
      ]}
    />
  )
}

export default Seo
