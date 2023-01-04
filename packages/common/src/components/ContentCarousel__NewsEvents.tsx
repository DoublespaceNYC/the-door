import { css } from '@emotion/react'
import { rgba } from 'polished'
import { HTMLAttributes, useMemo } from 'react'

import useQueryContext from '../context/QueryContext'
import { mq, widthInCols } from '../theme/mixins'
import { IEvent } from './Event__Article'
import EventThumbnail from './Event__Thumbnail'
import ExternalArticleThumbnail from './ExternalArticle__Thumbnail'
import InternalArticleThumbnail from './InternalArticle__Thumbnail'
import ScrollSlider from './ScrollSlider'

interface Props extends HTMLAttributes<HTMLDivElement> {
  contentType: 'News' | 'Events'
  tags?: {
    name: string
  }[]
  highlightColor: string
  orientation: 'left' | 'right'
}

const NewsEventsCarousel = ({
  contentType,
  tags,
  highlightColor,
  orientation,
  ...props
}: Props): JSX.Element => {
  const tagNames = tags?.map(tag => tag.name)
  const { allNews, allEvents } = useQueryContext()
  const taggedItems = useMemo(() => {
    if (contentType === 'News') {
      return allNews.filter(article =>
        article.tags.some(tag => tagNames?.includes(tag.name))
      )
    }
    if (contentType === 'Events') {
      return allEvents?.filter(event =>
        event.tags.some(tag => tagNames?.includes(tag.name))
      )
    } else return []
  }, [allNews, tagNames, allEvents, contentType])

  const styles = {
    slider: css`
      grid-column: 1 / -1;
      z-index: 2;
    `,
    scrollArea: css`
      ${orientation === 'right' &&
      css`
        ${taggedItems &&
        taggedItems.length === 2 &&
        css`
          justify-content: flex-end;
        `}
        ${taggedItems &&
        taggedItems.length === 1 &&
        css`
          justify-content: center;
        `}
        ${mq().ms} {
          justify-content: flex-start;
        }
      `}
    `,
    sliderContent: css`
      display: grid;
      grid-gap: var(--gtr-m);
      grid-template-columns: repeat(${taggedItems && taggedItems.length}, auto);
      padding: 0 var(--margin);
      ${contentType === 'News' &&
      css`
        margin-bottom: var(--shadow-offset-hover);
      `}
    `,
    thumbnail: css`
      width: ${widthInCols(4)};
      ${mq().m} {
        width: ${widthInCols(6)};
      }
      ${mq().s} {
        width: ${widthInCols(10)};
      }
    `,
  }
  return (
    <ScrollSlider
      navStyle="above"
      css={styles.slider}
      contentCss={styles.sliderContent}
      scrollAreaCss={styles.scrollArea}
      colors={{
        arrow: [highlightColor],
        arrowDisabled: '#00000015',
        link: [highlightColor, rgba(highlightColor, 0.75)],
      }}
      {...props}
    >
      {taggedItems &&
        taggedItems.map((item, i) => {
          if (contentType === 'News') {
            if (item.__typename === 'DatoCmsInternalArticle') {
              return (
                <InternalArticleThumbnail
                  key={i}
                  css={styles.thumbnail}
                  layout="Carousel"
                  highlightColor={highlightColor}
                  article={item}
                />
              )
            }
            if (item.__typename === 'DatoCmsExternalArticle') {
              return (
                <ExternalArticleThumbnail
                  key={i}
                  css={styles.thumbnail}
                  layout="Carousel"
                  highlightColor={highlightColor}
                  article={item}
                />
              )
            }
          }
          if (contentType === 'Events') {
            return (
              <EventThumbnail
                key={i}
                css={styles.thumbnail}
                event={item as IEvent}
                highlightColor={highlightColor}
                layout="Carousel"
              />
            )
          }
        })}
    </ScrollSlider>
  )
}

export default NewsEventsCarousel
