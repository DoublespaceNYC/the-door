import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import {
  IInternalArticle as IInternalArticleCommon,
  IStructuredText,
} from '@the-door/common/src/types'
import { IGatsbyImageData } from 'gatsby-plugin-image'

interface IStoryImage
  extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
  carouselImageData: IGatsbyImageData
}

export interface IStory {
  id: string
  __typename: string
  title: string
  image: IStoryImage
  excerpt: string
  ctaText: string
  body: IStructuredText
}

export interface IInternalArticle extends IInternalArticleCommon {
  category: 'News' | 'Report' | 'Press Release' | 'Event Recap'
}
