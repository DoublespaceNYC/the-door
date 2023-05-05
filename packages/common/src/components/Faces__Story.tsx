import { Document } from 'datocms-structured-text-utils'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import { ISEO } from '../types'
import Article from './Article'
import { IGatsbyImageFocused } from './GatsbyImageFocused'

interface IStoryImage extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
  carouselImageData: IGatsbyImageData
  heroImageData: IGatsbyImageData
}

export interface IFacesStory {
  id: string
  __typename: 'DatoCmsFacesStory'
  title: string
  image: IStoryImage
  excerpt: string
  ctaText: string
  body: {
    value: Document
  }
  slug: string
  seo: ISEO
}

interface Props {
  data: IFacesStory
  layout: 'Page' | 'Lightbox'
  highlightColor?: string
}

const FacesStory = ({
  data: { title, image, body },
  layout,
  highlightColor,
}: Props) => {
  return (
    <Article
      layout={layout}
      title={title}
      heroImage={image}
      body={body}
      highlightColor={highlightColor}
    />
  )
}

export default FacesStory
