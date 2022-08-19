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

interface IArticleImage
  extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
  thumbnailImageData: IGatsbyImageData
}

export interface IInternalArticle extends Record {
  title: string
  excerpt: string
  heroImage: IArticleImage
  category: string
  body: IStructuredText
  inLatest: boolean
  meta: {
    createdAt: string
  }
}
