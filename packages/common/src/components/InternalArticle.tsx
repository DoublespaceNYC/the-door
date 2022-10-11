import {
  StructuredText as IStructuredText,
  Record,
} from 'datocms-structured-text-utils'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import { IGatsbyImageFocused } from '../components/GatsbyImageFocused'

interface IArticleImage
  extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
  thumbnailImageData: IGatsbyImageData
}

export interface IInternalArticle extends Record {
  __typename: 'DatoCmsInternalArticle'
  title: string
  excerpt: string
  heroImage: IArticleImage
  category: { name: string }
  tags: { name: string }[]
  body: IStructuredText
  inLatest: boolean
  publicationDate: string
  slug: string
}

const InternalArticle = (): JSX.Element => {
  return <article></article>
}

export default InternalArticle
