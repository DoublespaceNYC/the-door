import { graphql, useStaticQuery } from 'gatsby'

const useDocsQuery = () => {
  const { allFile } = useStaticQuery<QueryProps>(graphql`
    query LocalDocumentQuery {
      allFile(filter: { extension: { in: ["pdf", "doc", "docx"] } }) {
        nodes {
          id
          publicURL
        }
      }
    }
  `)
  type QueryProps = {
    allFile: {
      nodes: {
        id: string
        publicURL: string
      }[]
    }
  }
  return {
    allDocs: allFile.nodes,
  }
}

export default useDocsQuery
