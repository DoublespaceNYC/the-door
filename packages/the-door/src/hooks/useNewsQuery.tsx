import { IExternalArticle } from '@the-door/common/src/components/ExternalArticle'
import { IInternalArticle } from '@the-door/common/src/components/InternalArticle'
import { graphql, useStaticQuery } from 'gatsby'
import { useMemo } from 'react'

const useNewsQuery = () => {
  const { allInternalArticles, allExternalArticles } =
    useStaticQuery<QueryProps>(graphql`
      query {
        allInternalArticles: allDatoCmsInternalArticle(
          sort: { publicationDate: ASC }
        ) {
          nodes {
            ...InternalArticleFragment
          }
        }
        allExternalArticles: allDatoCmsExternalArticle(
          sort: { publicationDate: ASC }
        ) {
          nodes {
            ...ExternalArticleFragment
          }
        }
      }
    `)
  type QueryProps = {
    allInternalArticles: {
      nodes: IInternalArticle[]
    }
    allExternalArticles: {
      nodes: IExternalArticle[]
    }
  }
  const allNews = useMemo(
    () =>
      [...allInternalArticles.nodes, ...allExternalArticles.nodes].sort(
        (a, b) => b.publicationDate.localeCompare(a.publicationDate)
      ),
    [allInternalArticles, allExternalArticles]
  )
  return {
    allNews,
    allInternalArticles: allInternalArticles.nodes,
    allExternalArticles: allExternalArticles.nodes,
  }
}

export default useNewsQuery
