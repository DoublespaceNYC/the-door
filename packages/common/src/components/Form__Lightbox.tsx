import { Document, Record } from 'datocms-structured-text-utils'
import { graphql } from 'gatsby'

import { ISEO } from '../types'
import Article from './Article'
import { IForm } from './Form'

export interface IFormLightbox extends Record {
  __typename: 'DatoCmsFormLightbox'
  id: string
  title: string
  text: {
    value: Document
  }
  form: IForm
  slug: string
  seo?: ISEO
}

type Props = {
  data: IFormLightbox
  layout: 'Page' | 'Lightbox'
  highlightColor?: string
}

const FormLightbox = ({
  data: { title, text, form },
  layout,
  highlightColor,
}: Props): JSX.Element => {
  return (
    <Article
      layout={layout}
      title={title}
      body={text}
      form={form}
      highlightColor={highlightColor}
    />
  )
}

export interface IFormLightboxLink extends Record {
  __typename: 'DatoCmsFormLightboxLink'
  id: string
  linkText: string
  link: IFormLightbox
}

export const FormLightboxFragment = graphql`
  fragment FormLightboxFragment on DatoCmsFormLightbox {
    __typename
    id: originalId
    title
    text {
      value
    }
    form {
      ...FormFragment
    }
    slug
    seo {
      ...SEOFragment
    }
  }
  fragment FormLightboxLinkFragment on DatoCmsFormLightboxLink {
    __typename
    id: originalId
    linkText
    link {
      ...FormLightboxFragment
    }
  }
`

export default FormLightbox
