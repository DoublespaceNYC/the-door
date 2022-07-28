import { IGatsbyImageData } from "gatsby-plugin-image"
import { IArticle, IStructuredText } from "@the-door/common/src/types"
import { IGatsbyImageFocused } from "@the-door/common/src/components/GatsbyImageFocused"

interface IStoryImage extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
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

export interface INewsArticle extends IArticle {
  category: 'News' | 'Report' | 'Press Release' | 'Event Recap'
}