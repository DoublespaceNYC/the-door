import {
  StructuredText as IStructuredText,
  Record,
} from 'datocms-structured-text-utils'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import { IGatsbyImageFocused } from '../components/GatsbyImageFocused'

export type {
  StructuredText as IStructuredText,
  Record as IRecord,
} from 'datocms-structured-text-utils'

export interface IInternalLink extends Record {
  __typename: 'DatoCmsInternalLink'
  linkText: string
  link: {
    slug: string
  }
}

export interface IExternalLink extends Record {
  __typename: 'DatoCmsExternalLink'
  linkText: string
  url: string
}

export interface IAssetLink extends Record {
  __typename: 'DatoCmsAssetLink'
  linkText: string
  asset: {
    url: string
  }
}

interface IArticleImage
  extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
  thumbnailImageData: IGatsbyImageData
}

export interface IArticle extends Record {
  title: string
  excerpt: string
  heroImage: IArticleImage
  category: string
  body: IStructuredText
  meta: {
    createdAt: string
  }
}
