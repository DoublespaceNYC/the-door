import {
  Block,
  StructuredText as IStructuredText,
} from 'datocms-structured-text-utils'
import { Fragment, HTMLAttributes } from 'react'

import ContentCarouselLinks from './ContentCarousel__Links'
import { ICarouselLink } from './ContentCarousel__Links__Block'
import ContentCarouselMedia from './ContentCarousel__Media'
import { ICarouselMediaBlock } from './ContentCarousel__Media__Block'
import ContentCarouselNewsEvents from './ContentCarousel__NewsEvents'
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
  media: ICarouselMediaBlock[]
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
}: Props): JSX.Element => {
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
    case 'Media':
      return <ContentCarouselMedia data={media} color={color} />
    default:
      return <Fragment />
  }
}

export default ContentCarousel
