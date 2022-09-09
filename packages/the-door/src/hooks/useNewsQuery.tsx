import { IExternalArticle } from '@the-door/common/src/components/ExternalArticle'
import { IInternalArticle } from '@the-door/common/src/components/InternalArticle'
import { graphql, useStaticQuery } from 'gatsby'

const useNewsQuery = () => {
  const { allInternalArticles, allExternalArticles } =
    useStaticQuery<QueryProps>(graphql`
      query {
        allInternalArticles: allDatoCmsInternalArticle(
          sort: { fields: publicationDate }
        ) {
          nodes {
            ...InternalArticleFragment
          }
        }
        allExternalArticles: allDatoCmsExternalArticle(
          sort: { fields: publicationDate }
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
  return {
    allInternalArticles: allInternalArticles.nodes,
    allExternalArticles: allExternalArticles.nodes,
  }
}

export default useNewsQuery
