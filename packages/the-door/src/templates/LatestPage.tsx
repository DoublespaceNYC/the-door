import { css, useTheme } from '@emotion/react'
import ExternalArticleThumbnail from '@the-door/common/src/components/ExternalArticle__Thumbnail'
import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import InternalArticleThumbnail from '@the-door/common/src/components/InternalArticle__Thumbnail'
import PageFilter from '@the-door/common/src/components/PageFilter'
import PageHero from '@the-door/common/src/components/PageHero'
import useQueryContext from '@the-door/common/src/context/QueryContext'
import { mq } from '@the-door/common/src/theme/mixins'
import { doorColors } from '@the-door/common/src/theme/variables'
import { ISEO } from '@the-door/common/src/types'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { useMemo, useState } from 'react'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

interface DataProps {
  page: {
    title: string
    heroImage: IGatsbyImageFocused
    allArticlesFilter: string
    externalArticlesFilter: string
    seo: ISEO
  }
}

const LatestPage = ({
  data: { page },
  location,
}: PageProps<
  DataProps,
  Record<string, never>,
  { filter: string }
>): JSX.Element => {
  const theme = useTheme()
  const { allNews, allInternalArticles, allExternalArticles } =
    useQueryContext()
  const categories = useMemo(() => {
    const catArray = allInternalArticles
      .sort((a, b) => a.category.position - b.category.position)
      .map(article => article.category.pluralName)
    return [
      page.allArticlesFilter,
      ...new Set(catArray),
      page.externalArticlesFilter,
    ]
  }, [
    page.allArticlesFilter,
    page.externalArticlesFilter,
    allInternalArticles,
  ])
  const [filter, setFilter] = useState<string | null>(null)
  const filteredArticles = useMemo(() => {
    if (filter === page.allArticlesFilter) {
      return allNews.filter(article => article.inLatest)
    } else if (filter === page.externalArticlesFilter) {
      return allExternalArticles.filter(article => article.inLatest)
    } else if (filter && filter.length > 0) {
      return allInternalArticles.filter(
        article =>
          article.inLatest && article.category.pluralName === filter
      )
    } else {
      return []
    }
  }, [
    filter,
    page.allArticlesFilter,
    page.externalArticlesFilter,
    allNews,
    allExternalArticles,
    allInternalArticles,
  ])

  const styles = {
    grid: css`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: calc(var(--row-s) + 1em) var(--margin) var(--row-l);
      grid-gap: var(--gtr-m);
      ${mq().m} {
        grid-template-columns: repeat(2, 1fr);
      }
      ${mq().s} {
        grid-template-columns: 1fr;
      }
    `,
  }

  return (
    <Layout>
      <PageHero title={page.title} image={page.heroImage} />
      <PageFilter
        options={categories}
        initialOption={
          categories.includes(location.state?.filter)
            ? location.state.filter
            : categories[0]
        }
        onChange={option => setFilter(option)}
      />
      <section css={styles.grid}>
        {filteredArticles.map((article, i) => {
          if (article.__typename === 'DatoCmsInternalArticle') {
            return (
              <InternalArticleThumbnail
                key={i}
                layout="Carousel"
                highlightColor={
                  theme === 'The Door' ? doorColors.yellow : undefined
                }
                article={article}
              />
            )
          }
          if (article.__typename === 'DatoCmsExternalArticle') {
            return (
              <ExternalArticleThumbnail
                key={i}
                layout="Carousel"
                highlightColor={
                  theme === 'The Door' ? doorColors.yellow : undefined
                }
                article={article}
              />
            )
          }
        })}
      </section>
    </Layout>
  )
}

export const Head = ({
  data: {
    page: { title, seo },
  },
}: HeadProps<DataProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description}
    imageUrl={seo?.image?.url}
  />
)

export const data = graphql`
  query {
    page: datoCmsTheLatestPage {
      title
      slug
      heroImage {
        gatsbyImageData(
          layout: FULL_WIDTH
          imgixParams: {
            q: 65
            ar: "8:3"
            fit: "crop"
            crop: "focalpoint"
          }
        )
        ...ImageFocalData
      }
      allArticlesFilter
      externalArticlesFilter
      seo {
        ...SEOFragment
      }
    }
  }
`

export default LatestPage
