import { resolve } from 'path'

import type { GatsbyNode } from 'gatsby'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions

  const datoQuery: QueryProps = await graphql(`
    query {
      allDatoCmsService {
        nodes {
          slug
          id
          locale
        }
      }
    }
  `)

  type PageNode = {
    slug: string
    id: string
    locale: 'en' | 'es' | 'fr'
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
      path: `${node.locale === 'en' ? '' : '/' + node.locale}/${
        node.slug
      }/`,
      component: resolve(`./src/templates/ServicePage.tsx`),
      context: {
        id: node.id,
      },
    })
  })
}
