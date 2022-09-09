import {
  Block,
  StructuredText as IStructuredText,
} from 'datocms-structured-text-utils'
import { HTMLAttributes } from 'react'

import ContentCarouselLinks from './ContentCarouselLinks'
import { ICarouselLink } from './ContentCarouselLinkThumbnail'
import ContentCarouselNewsEvents from './ContentCarouselNewsEvents'
import { IGatsbyImageFocused } from './GatsbyImageFocused'

export interface ICarouselMedia extends Block {
  __typename: 'DatoCmsCarouselMediaBlock'
  caption: IStructuredText
  media:
    | IGatsbyImageFocused
    | {
        video: {
          streamingUrl: string
        }
      }
}

export interface ICarousel extends Block {
  __typename: 'DatoCmsCarousel'
  contentType: 'News' | 'Events' | 'Links' | 'Media'
  tags: {
    name: string
  }[]
  links: ICarouselLink[]
  media: ICarouselMedia[]
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: ICarousel
  color: string
  orientation: 'left' | 'right'
}

const ContentCarousel = ({
  data: { contentType, tags, links, media },
  color,
  orientation,
  ...props
}: Props) => {
  switch (contentType) {
    case 'News':
    case 'Events':
      return (
        <ContentCarouselNewsEvents
          contentType={contentType}
          tags={tags}
          color={color}
          orientation={orientation}
          {...props}
        />
      )
    case 'Links':
      return (
        <ContentCarouselLinks
          links={links}
          color={color}
          orientation={orientation}
        />
      )
    default:
      return null
  }
}

export default ContentCarousel
