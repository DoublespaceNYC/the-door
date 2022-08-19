import { css } from '@emotion/react'
import ArticleThumbnail from '@the-door/common/src/components/ArticleThumbnail'
import DatoLink, {
  IDatoLink,
} from '@the-door/common/src/components/DatoLink'
import HomeCalendar, {
  IEvent,
} from '@the-door/common/src/components/HomeCalendar'
import {
  absoluteFill,
  linkStyle,
  mq,
} from '@the-door/common/src/theme/mixins'
import { graphql, useStaticQuery } from 'gatsby'
import { rgba } from 'polished'
import { useMemo } from 'react'

import { colors } from '../theme/variables'
import { IInternalArticle } from '../types'

type Props = {
  heading: string
  featuredArticle: IInternalArticle
  pageLink: IDatoLink
}

const HomeLatest = ({ heading, featuredArticle, pageLink }: Props) => {
  type QueryProps = {
    allNews: {
      nodes: IInternalArticle[]
    }
    events: {
      nodes: IEvent[]
    }
  }
  const { allNews, events } = useStaticQuery<QueryProps>(graphql`
    query {
      allNews: allDatoCmsInternalArticle(
        sort: { fields: meta___createdAt }
        limit: 4
      ) {
        nodes {
          ...InternalArticleFragment
        }
      }
      events: allDatoCmsEvent(sort: { fields: startDateTime }) {
        nodes {
          ...EventFragment
        }
      }
    }
  `)

  const allNewsFiltered = useMemo(() => {
    return allNews.nodes
      .filter(article => article.id !== featuredArticle.id)
      .slice(0, 3)
  }, [allNews, featuredArticle])
  const styles = {
    section: css`
      display: grid;
      grid-template-columns: 1fr max(30rem, 25vw);
      grid-template-rows: var(--row-l) auto;
      align-items: flex-start;
      position: relative;
      margin-top: calc(-1 * var(--row-l));
      overflow: hidden;
      ${mq().ml} {
        grid-template-columns: auto;
      }
      &:after {
        content: '';
        ${absoluteFill};
        max-width: 87.5vw;
        background: linear-gradient(to bottom right, #fff, #dbeaf5);
        z-index: 0;
      }
      &:before {
        content: '';
        ${absoluteFill};
        grid-column: 1 / -1;
        grid-row: 2 / 3;
        background: ${colors.purpleDark};
      }
      ${mq().ml} {
        &:after {
          max-width: 100%;
        }
        &:before {
          display: none;
        }
      }
    `,
    latestSection: css`
      padding: 0 var(--gtr-l) var(--row-l) var(--margin);
      grid-row: 2 / 3;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      ${mq().ml} {
        padding: 0 var(--margin) var(--row-m);
      }
    `,
    heading: css`
      position: relative;
      z-index: 1;
      font-size: var(--fs-108);
      margin: 0;
      color: ${colors.yellow};
      line-height: 1;
      flex: 1;
    `,
    featured: css`
      position: relative;
      z-index: 1;
      width: 100%;
      margin-top: 2rem;
    `,
    articles: css`
      margin-top: 3rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 2rem;
      z-index: 1;
      width: 100%;
      ${mq().s} {
        grid-template-columns: 1fr;
        margin-top: 2rem;
      }
    `,
    pageLink: css`
      ${linkStyle}
      display: block;
      max-width: fit-content;
      color: ${colors.navy};
      position: relative;
      z-index: 1;
      align-self: flex-end;
      margin-left: 0.5em;
      &:hover {
        color: ${colors.yellow};
      }
    `,
  }
  return (
    <section css={styles.section}>
      <section css={styles.latestSection}>
        <h2 css={styles.heading}>{heading}</h2>
        <DatoLink link={pageLink} css={styles.pageLink} />
        <ArticleThumbnail
          css={styles.featured}
          article={featuredArticle}
          layout="Featured"
          colors={{
            category: colors.yellowDark,
            shadow: rgba(colors.navy, 0.15),
            shadowHover: colors.yellow,
          }}
        />
        <div css={styles.articles}>
          {allNewsFiltered.map((article, i) => (
            <ArticleThumbnail
              key={i}
              article={article}
              layout="Grid"
              colors={{
                category: colors.yellowDark,
                shadow: rgba(colors.navy, 0.15),
                shadowHover: colors.yellow,
              }}
            />
          ))}
        </div>
      </section>
      <HomeCalendar
        events={events.nodes}
        colors={{
          bg: '#fff',
          heading: colors.yellow,
          eventTitle: ['#444', colors.yellow],
          eventText: ['#888'],
          ctaBg: [colors.gray50, colors.yellow],
          ctaText: ['#fff'],
          ctaSlider: [colors.navy, colors.yellow],
        }}
      />
    </section>
  )
}

export default HomeLatest
