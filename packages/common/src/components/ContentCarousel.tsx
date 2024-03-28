import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { Fragment, HTMLAttributes } from 'react'

import LinksCarousel from './ContentCarousel__Links'
import { ICarouselLink } from './ContentCarousel__Links__Block'
import MediaCarousel from './ContentCarousel__Media'
import NewsEventsCarousel from './ContentCarousel__NewsEvents'
import { IImageBlock } from './ImageBlock'
import PartnersGrid from './PartnersGrid'
import { IVideoBlock } from './VideoBlock'
import { IPartner } from './Partner__Article'

export interface ICarousel extends Record {
  __typename: 'DatoCmsCarousel'
  contentType: 'News' | 'Events' | 'Links' | 'Media' | 'Partners'
  tags: {
    name: string
  }[]
  links: ICarouselLink[]
  media: (IImageBlock | IVideoBlock)[]
  partners: IPartner[]
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: ICarousel
  highlightColor: string
  orientation: 'left' | 'right'
}

const ContentCarousel = ({
  data: { contentType, tags, links, media, partners },
  highlightColor,
  orientation,
  ...props
}: Props): JSX.Element => {
  const styles = {
    mediaCarousel: css`
      margin: 2em 0 1em;
    `,
  }
  switch (contentType) {
    case 'News':
    case 'Events':
      return (
        <NewsEventsCarousel
          contentType={contentType}
          tags={tags}
          highlightColor={highlightColor}
          orientation={orientation}
          {...props}
        />
      )
    case 'Links':
      return (
        <LinksCarousel
          links={links}
          highlightColor={highlightColor}
          orientation={orientation}
          {...props}
        />
      )
    case 'Media':
      return (
        <MediaCarousel
          css={styles.mediaCarousel}
          data={media}
          highlightColor={highlightColor}
          layout="Page"
          {...props}
        />
      )
    case 'Partners':
      return (
        <PartnersGrid
          highlightColor={highlightColor}
          data={partners}
          {...props}
        />
      )
    default:
      return <Fragment />
  }
}

export default ContentCarousel
