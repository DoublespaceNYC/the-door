import { css } from '@emotion/react'
import ExternalArticleThumbnail from '@the-door/common/src/components/ExternalArticle__Thumbnail'
import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import InternalArticleThumbnail from '@the-door/common/src/components/InternalArticle__Thumbnail'
import PageFilter from '@the-door/common/src/components/PageFilter'
import PageHero from '@the-door/common/src/components/PageHero'
import { mq } from '@the-door/common/src/theme/mixins'
import { ISEO } from '@the-door/common/src/types'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { Fragment, useMemo, useState } from 'react'

import Seo from '../components/Seo'
import useNewsQuery from '../hooks/useNewsQuery'
import { colors } from '../theme/variables'

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
  const { allNews, allExternalArticles } = useNewsQuery()

  const categories = useMemo(() => {
    const catArray = allNews.reduce<string[]>((acc, val) => {
      if (
        (val.__typename === 'DatoCmsInternalArticle' ||
          val.__typename === 'DatoCmsPdfArticle') &&
        !acc.includes(val.category.pluralName)
      ) {
        acc.splice(
          val.category.position - 1,
          0,
          val.category.pluralName
        )
      }
      return acc
    }, [])
    return [
      page.allArticlesFilter,
      ...catArray,
      page.externalArticlesFilter,
    ]
  }, [page.allArticlesFilter, page.externalArticlesFilter])
  const [filter, setFilter] = useState<string | null>(null)
  const filteredArticles = useMemo(() => {
    switch (filter) {
      case page.allArticlesFilter:
        return allNews.filter(article => article.inLatest)
      case page.externalArticlesFilter:
        return allExternalArticles.filter(article => article.inLatest)
      default:
        return allNews.filter(
          article =>
            article.inLatest &&
            (article.__typename === 'DatoCmsInternalArticle' ||
              article.__typename === 'DatoCmsPdfArticle') &&
            article.category.pluralName === filter
        )
    }
  }, [
    filter,
    page.allArticlesFilter,
    page.externalArticlesFilter,
    allNews,
    allExternalArticles,
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
    <Fragment>
      <PageHero
        title={page.title}
        image={page.heroImage}
      />
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
                highlightColor={colors.yellow}
                article={article}
              />
            )
          }
          if (article.__typename === 'DatoCmsExternalArticle') {
            return (
              <ExternalArticleThumbnail
                key={i}
                layout="Carousel"
                highlightColor={colors.yellow}
                article={article}
              />
            )
          }
        })}
      </section>
    </Fragment>
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
