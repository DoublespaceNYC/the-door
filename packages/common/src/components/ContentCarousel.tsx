import { Record } from 'datocms-structured-text-utils'
import { Fragment, HTMLAttributes } from 'react'

import LinksCarousel from './ContentCarousel__Links'
import { ICarouselLink } from './ContentCarousel__Links__Block'
import MediaCarousel from './ContentCarousel__Media'
import NewsEventsCarousel from './ContentCarousel__NewsEvents'
import { IMediaBlock } from './MediaBlock'

export interface ICarousel extends Record {
  __typename: 'DatoCmsCarousel'
  contentType: 'News' | 'Events' | 'Links' | 'Media'
  tags: {
    name: string
  }[]
  links: ICarouselLink[]
  media: IMediaBlock[]
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
        <NewsEventsCarousel
          contentType={contentType}
          tags={tags}
          color={color}
          orientation={orientation}
          {...props}
        />
      )
    case 'Links':
      return (
        <LinksCarousel
          links={links}
          color={color}
          orientation={orientation}
        />
      )
    case 'Media':
      return <MediaCarousel data={media} color={color} layout="Page" />
    default:
      return <Fragment />
  }
}

export default ContentCarousel
