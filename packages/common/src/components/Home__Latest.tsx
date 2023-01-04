import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import DatoLink from '@the-door/common/src/components/DatoLink'
import HomeCalendar from '@the-door/common/src/components/Home__Calendar'
import { IInternalArticle } from '@the-door/common/src/components/InternalArticle'
import useQueryContext from '@the-door/common/src/context/QueryContext'
import { absoluteFill, linkStyle, mq } from '@the-door/common/src/theme/mixins'
import { useMemo } from 'react'

import { IExternalArticle } from './ExternalArticle'
import ExternalArticleThumbnail from './ExternalArticle__Thumbnail'
import InternalArticleThumbnail from './InternalArticle__Thumbnail'
import { IInternalLink } from './InternalLink'
import { ITheme } from './Layout'

type Props = {
  heading: string
  featuredArticle: IInternalArticle | IExternalArticle
  pageLink: IInternalLink
  calendarLink: IInternalLink
}

const HomeLatest = ({
  heading,
  featuredArticle,
  pageLink,
  calendarLink,
}: Props): JSX.Element => {
  const { allNews, allEvents } = useQueryContext()

  const allNewsFiltered = useMemo(() => {
    return (
      allNews
        .filter(article => article.inLatest)
        .slice(0, 4)
        .filter(article => article.id !== featuredArticle.id)
        .slice(0, 3) || []
    )
  }, [allNews, featuredArticle])

  const theme = useTheme() as ITheme
  const setColors = () => {
    switch (theme.themeName) {
      case 'The Door':
        return {
          bg: theme.quinaryDark,
          heading: theme.quaternary,
          pageLink: [theme.primary, theme.quaternary],
        }
    }
  }
  const colors = setColors()
  const styles = {
    section: css`
      display: grid;
      grid-template-columns: 1fr max(30rem, 25vw);
      grid-template-rows: var(--row-l) auto;
      align-items: flex-start;
      position: relative;
      margin-top: calc(-1 * var(--row-l));
      ${mq().ml} {
        grid-template-columns: auto;
      }
      ${mq().ms} {
        margin-top: 0;
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
        background: ${colors?.bg};
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
      padding: 0 var(--margin) var(--row-l);
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
      color: ${colors?.heading};
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
      color: ${colors?.pageLink[0]};
      position: relative;
      z-index: 1;
      align-self: flex-end;
      margin-left: 0.5em;
      &:hover {
        color: ${colors?.pageLink[1]};
      }
    `,
  }
  return (
    <section css={styles.section}>
      <section css={styles.latestSection}>
        <h2 css={styles.heading}>{heading}</h2>
        <DatoLink
          data={pageLink}
          css={styles.pageLink}
        />
        {featuredArticle.__typename === 'DatoCmsInternalArticle' ? (
          <InternalArticleThumbnail
            css={styles.featured}
            layout="Featured"
            article={featuredArticle}
          />
        ) : (
          featuredArticle.__typename === 'DatoCmsExternalArticle' && (
            <ExternalArticleThumbnail
              css={styles.featured}
              layout="Featured"
              article={featuredArticle}
            />
          )
        )}
        <div css={styles.articles}>
          {allNewsFiltered.map((article, i) => {
            if (article.__typename === 'DatoCmsInternalArticle') {
              return (
                <InternalArticleThumbnail
                  key={i}
                  layout="Grid"
                  article={article}
                />
              )
            }
            if (article.__typename === 'DatoCmsExternalArticle') {
              return (
                <ExternalArticleThumbnail
                  key={i}
                  layout="Grid"
                  article={article}
                />
              )
            }
          })}
        </div>
      </section>
      <HomeCalendar
        events={allEvents || []}
        calendarLink={calendarLink}
      />
    </section>
  )
}

export default HomeLatest
