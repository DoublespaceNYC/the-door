import { css } from '@emotion/react'
import { rgba } from 'polished'
import { HTMLAttributes, useContext, useMemo } from 'react'

import QueryContext from '../context/QueryContext'
import ArticleThumbnail from './ArticleThumbnail'
import { IEvent } from './Event'
import EventThumbnail from './EventThumbnail'
import { IExternalArticle } from './ExternalArticle'
import { IInternalArticle } from './InternalArticle'
import ScrollSlider from './ScrollSlider'

interface Props extends HTMLAttributes<HTMLDivElement> {
  contentType: 'News' | 'Events'
  tags?: {
    name: string
  }[]
  color: string
  orientation: 'left' | 'right'
}

const ContentCarouselNewsEvents = ({
  contentType,
  tags,
  color,
  orientation,
  ...props
}: Props) => {
  const tagNames = useMemo(() => tags?.map(tag => tag.name), [tags])
  const { allInternalArticles, allExternalArticles, allEvents } =
    useContext(QueryContext)
  const taggedItems = useMemo(() => {
    if (contentType === 'News') {
      console.log(
        [...allInternalArticles, ...allExternalArticles].filter(
          article =>
            article.tags.some(tag => tagNames?.includes(tag.name))
        )
      )
      return [...allInternalArticles, ...allExternalArticles]
        .sort((a, b) =>
          b.publicationDate.localeCompare(a.publicationDate)
        )
        .filter(article =>
          article.tags.some(tag => tagNames?.includes(tag.name))
        )
    }
    if (contentType === 'Events') {
      return allEvents.filter(event =>
        event.tags.some(tag => tagNames?.includes(tag.name))
      )
    } else return []
  }, [
    allInternalArticles,
    allExternalArticles,
    tagNames,
    allEvents,
    contentType,
  ])

  const styles = {
    slider: css`
      grid-column: 1 / -1;
      z-index: 2;
    `,
    scrollArea: css`
      ${orientation === 'right' &&
      css`
        ${taggedItems.length === 2 &&
        css`
          justify-content: flex-end;
        `}
        ${taggedItems.length === 1 &&
        css`
          justify-content: center;
        `}
      `}
    `,
    sliderContent: css`
      display: grid;
      grid-gap: var(--gtr-m);
      grid-template-columns: repeat(${taggedItems.length}, auto);
      padding: 0 var(--margin) 1rem;
    `,
    thumbnail: css`
      width: calc(4 * var(--col-w) + 3 * var(--gtr-m));
    `,
  }
  return (
    <ScrollSlider
      navStyle="above"
      css={styles.slider}
      contentCss={styles.sliderContent}
      scrollAreaCss={styles.scrollArea}
      colors={{
        arrow: [color],
        arrowDisabled: '#00000015',
        link: [color, rgba(color, 0.75)],
      }}
      {...props}
    >
      {taggedItems.map((item, i) => {
        if (contentType === 'News') {
          return (
            <ArticleThumbnail
              key={i}
              css={styles.thumbnail}
              article={item as IInternalArticle | IExternalArticle}
              layout="Carousel"
              highlightColor={color}
            />
          )
        }
        if (contentType === 'Events') {
          return (
            <EventThumbnail
              key={i}
              css={styles.thumbnail}
              event={item as IEvent}
              highlightColor={color}
            />
          )
        }
      })}
    </ScrollSlider>
  )
}

export default ContentCarouselNewsEvents
