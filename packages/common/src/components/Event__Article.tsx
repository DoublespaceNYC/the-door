import { css } from '@emotion/react'
import { Document, Record } from 'datocms-structured-text-utils'
import { graphql } from 'gatsby'

import { formateDateTimeRange } from '../helpers'
import { ISEO } from '../types'
import Article from './Article'
import { IMediaCarousel } from './ContentCarousel__Media'
import { IMediaBlock } from './MediaBlock'

export interface IEvent extends Record {
  __typename: 'DatoCmsEvent'
  title: string
  startDateTime: string
  endDateTime?: string
  location: 'Off Campus' | string
  offCampusLocation?: string
  tags: { name: string }[]
  slug: string
  seo?: ISEO
  body: {
    value: Document
    blocks: (IMediaBlock | IMediaCarousel)[]
  }
}

interface Props {
  data: IEvent
  layout: 'Page' | 'Lightbox' | 'Calendar'
}

const EventArticle = ({
  data: {
    title,
    startDateTime,
    endDateTime,
    location,
    offCampusLocation,
    body,
  },
  layout,
}: Props): JSX.Element => {
  const styles = {
    details: css`
      > h2 {
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        margin: 0.25em 0;
        &:nth-of-type(1) {
          text-transform: uppercase;
        }
        &:nth-of-type(2) {
          font-style: italic;
        }
      }
    `,
  }
  return (
    <Article
      layout={layout}
      title={title}
      subheading={
        <div css={styles.details}>
          <h2>{formateDateTimeRange(startDateTime, endDateTime)}</h2>
          <h2>
            {location === 'Off Campus' ? offCampusLocation : location}
          </h2>
        </div>
      }
      body={body}
    />
  )
}

export default EventArticle

export interface IEventLink {
  __typename: 'DatoCmsEventLink'
  id: string
  linkText: string
  link: IEvent
}

export const EventFragments = () => graphql`
  fragment EventFragment on DatoCmsEvent {
    id: originalId
    __typename
    title
    startDateTime
    endDateTime
    location
    offCampusLocation
    tags {
      name
    }
    slug
    seo {
      ...SEOFragment
    }
    excerpt
    body {
      value
      blocks {
        ... on DatoCmsMediaBlock {
          ...MediaBlockFragment
        }
        ... on DatoCmsMediaCarousel {
          ...MediaCarouselFragment
        }
      }
    }
  }
  fragment EventLinkFragment on DatoCmsEventLink {
    __typename
    id: originalId
    linkText
    link {
      ...EventFragment
    }
  }
`
