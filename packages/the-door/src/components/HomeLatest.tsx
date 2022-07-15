import { css } from '@emotion/react'
import ArticleThumbnail from '@the-door/common/src/components/ArticleThumbnail'
import { absoluteFill } from '@the-door/common/src/theme/mixins'
import { graphql, useStaticQuery } from 'gatsby'
import { useMemo } from 'react'

import { colors } from '../theme/variables'
import { INewsArticle } from '../types'
import HomeCalendar from './HomeCalendar'

type Props = {
  heading: string
  featuredArticle: INewsArticle
}

const HomeLatest = ({ heading, featuredArticle }: Props) => {
  type QueryProps = {
    allNews: {
      nodes: INewsArticle[]
    }
  }
  const { allNews } = useStaticQuery<QueryProps>(graphql`
    query {
      allNews: allDatoCmsNewsArticle(
        sort: { fields: meta___createdAt }
        limit: 7
      ) {
        nodes {
          ...NewsArticleFragment
        }
      }
    }
  `)
  const allNewsFiltered = useMemo(() => {
    return allNews.nodes
      .filter(article => article.id !== featuredArticle.id)
      .slice(0, 6)
  }, [allNews, featuredArticle])
  const styles = {
    section: css`
      display: flex;
      position: relative;
      &:before {
        content: '';
        ${absoluteFill};
        max-width: 87.5vw;
        background: linear-gradient(to bottom right, #fff, #dbeaf5);
      }
      margin-top: -6rem;
      padding-top: 6rem;
    `,
    latestSection: css`
      padding: 0 var(--gtr-l) 0 var(--margin);
    `,
    heading: css`
      position: relative;
      font-size: var(--fs-108);
      margin: 0.4em 0 0.25em;
      color: ${colors.yellow};
    `,
    articles: css`
      margin-top: 4rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 2rem;
      margin-bottom: 12rem;
    `,
  }
  return (
    <section css={styles.section}>
      <section css={styles.latestSection}>
        <h2 css={styles.heading}>{heading}</h2>
        <ArticleThumbnail
          article={featuredArticle}
          featured
          colors={{
            category: colors.yellowDark,
            shadow: colors.navy + '22',
            shadowHover: colors.yellow,
          }}
        />
        <div css={styles.articles}>
          {allNewsFiltered.map((article, i) => (
            <ArticleThumbnail
              key={i}
              article={article}
              colors={{
                category: colors.yellowDark,
                shadow: colors.navy + '22',
                shadowHover: colors.yellow,
              }}
            />
          ))}
        </div>
      </section>
      <HomeCalendar />
    </section>
  )
}

export default HomeLatest
