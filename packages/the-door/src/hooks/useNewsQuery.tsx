import { IExternalArticle } from '@the-door/common/src/components/ExternalArticle'
import { IInternalArticle } from '@the-door/common/src/components/InternalArticle'
import { IPdfArticle } from '@the-door/common/src/components/PdfArticle'
import { graphql, useStaticQuery } from 'gatsby'
import { useMemo } from 'react'

const useNewsQuery = () => {
  const { allInternalArticles, allExternalArticles, allPdfArticles } =
    useStaticQuery<QueryProps>(graphql`
      query {
        allInternalArticles: allDatoCmsInternalArticle(
          sort: { publicationDate: DESC }
        ) {
          nodes {
            ...InternalArticleFragment
          }
        }
        allExternalArticles: allDatoCmsExternalArticle(
          sort: { publicationDate: DESC }
        ) {
          nodes {
            ...ExternalArticleFragment
          }
        }
        allPdfArticles: allDatoCmsPdfArticle(
          sort: { publicationDate: DESC }
        ) {
          nodes {
            ...PdfArticleFragment
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
    allPdfArticles: {
      nodes: IPdfArticle[]
    }
  }
  const allNews = useMemo(
    () =>
      [
        ...allInternalArticles.nodes,
        ...allExternalArticles.nodes,
        ...allPdfArticles.nodes,
      ].sort((a, b) =>
        b.publicationDate.localeCompare(a.publicationDate)
      ),
    [allInternalArticles, allExternalArticles, allPdfArticles]
  )
  return {
    allNews,
    allInternalArticles: allInternalArticles.nodes,
    allExternalArticles: allExternalArticles.nodes,
    allPdfArticles: allPdfArticles.nodes,
  }
}

export default useNewsQuery
