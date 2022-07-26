
import { IGatsbyImageData } from "gatsby-plugin-image"
import {
  StructuredText as IStructuredText,
  Record,
} from 'datocms-structured-text-utils'

export type { StructuredText as IStructuredText, Record as IRecord } from 'datocms-structured-text-utils'

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

export interface IArticle extends Record {
  title: string
  excerpt: string
  heroImage: {
    thumbnailImageData: IGatsbyImageData
    alt?: string
  }
  category: string
  body: IStructuredText
  meta: {
    createdAt: string
  }
}

