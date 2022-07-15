import { Helmet } from 'react-helmet'

type SeoProps = {
  title?: string | null
  description?: string | null
  lang?: string
  imageUrl?: string
  noSuffix?: boolean
}

const Seo = ({
  title = ``,
  description = ``,
  lang = `en`,
  imageUrl,
  noSuffix = false,
}: SeoProps) => {
  const metaDescription = description || ''
  const metaTitle = title || ''
  const titleSuffix = noSuffix ? '' : ''

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
          content: imageUrl || undefined,
        },
      ]}
    />
  )
}

export default Seo
