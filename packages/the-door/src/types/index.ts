import { IGatsbyImageData } from "gatsby-plugin-image"
import { IArticle, IStructuredText } from "@the-door/common/src/types"

export interface IStory {
  id: string
  __typename: string
  title: string
  image: {
    carouselImageData: IGatsbyImageData
    alt?: string
  }
  excerpt: string
  ctaText: string
  body: IStructuredText
}

export interface INewsArticle extends IArticle {
  category: 'News' | 'Report' | 'Press Release' | 'Event Recap'
}