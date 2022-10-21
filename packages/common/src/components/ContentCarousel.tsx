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
  highlightColor: string
  orientation: 'left' | 'right'
}

const ContentCarousel = ({
  data: { contentType, tags, links, media },
  highlightColor,
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
          color={highlightColor}
          orientation={orientation}
          {...props}
        />
      )
    case 'Links':
      return (
        <LinksCarousel
          links={links}
          color={highlightColor}
          orientation={orientation}
          {...props}
        />
      )
    case 'Media':
      return (
        <MediaCarousel
          data={media}
          highlightColor={highlightColor}
          layout="Page"
          {...props}
        />
      )
    default:
      return <Fragment />
  }
}

export default ContentCarousel
