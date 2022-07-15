
import { IGatsbyImageData } from "gatsby-plugin-image"
import {
  StructuredText as IStructuredText,
  Record,
} from 'datocms-structured-text-utils'

export type { StructuredText as IStructuredText } from 'datocms-structured-text-utils'


interface ILink extends Record {
  linkText: string
  url: string
}

export interface IInternalLink extends ILink {
  __typename: 'DatoCmsInternalLink'
}

export interface IExternalLink extends ILink {
  __typename: 'DatoCmsExternalLink'
}

export interface IAssetLink extends Record {
  __typename: 'DatoCmsAssetLink'
  linkText: string
  asset: {
    url: string
  }
}

export type IDatoLink = IInternalLink | IExternalLink | IAssetLink

export interface IArticle {
  id: string
  __typename: string
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

export interface IEvent {
  id: string
  __typename: string
  title: string
  date: string
  startTime: string
  endTime: string
  location: string
}