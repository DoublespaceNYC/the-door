import type { GatsbyNode } from "gatsby"
import { resolve } from "path"

export const createPages: GatsbyNode["createPages"] = async ({ actions, graphql }) => {
  const { createPage } = actions

  const datoQuery: QueryProps = await graphql(`
    query {
      allDatoCmsService {
        nodes {
          slug
          id
        }
      }
    }
  `)

  type PageNode = {
    slug: string
    id: string
  }

  type QueryProps = {
    errors?: any
    data?: {
      allDatoCmsService: {
        nodes: PageNode[]
      }
    }
  }

  const { data } = datoQuery


  data?.allDatoCmsService.nodes.forEach((node: PageNode) => {
    createPage({
      path: `/${node.slug}/`,
      component: resolve(`./src/templates/ServicePage.tsx`),
      context: {
        id: node.id
      }
    })
  })
}
