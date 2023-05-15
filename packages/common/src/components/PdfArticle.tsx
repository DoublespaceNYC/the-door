import { Record } from 'datocms-structured-text-utils'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import { IGatsbyImageFocused } from '../components/GatsbyImageFocused'

interface IArticleImage extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
  thumbnailImageData: IGatsbyImageData
}

export interface IPdfArticle extends Record {
  __typename: 'DatoCmsPdfArticle'
  title: string
  inLatest: boolean
  publicationDate: string
  pdf: {
    url: string
    localFileId: string
  }
  category: {
    name: string
    pluralName: string
    position: number
  }
  tags: { name: string }[]
  heroImage: IArticleImage
}
