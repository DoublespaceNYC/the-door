import { Document } from 'datocms-structured-text-utils'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import { ISEO } from '../types'
import Article from './Article'
import { IMediaCarousel } from './ContentCarousel__Media'
import { IGatsbyImageFocused } from './GatsbyImageFocused'
import { IMediaBlock } from './MediaBlock'

interface IStoryImage
  extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
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
    blocks?: (IMediaBlock | IMediaCarousel)[]
  }
  slug: string
  seo: ISEO
}

interface Props {
  data: IFacesStory
  layout: 'Page' | 'Lightbox'
  highlightColor?: string
}

const Faces_Story = ({
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

export default Faces_Story
