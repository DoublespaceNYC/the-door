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
      # allDatoCmsEvent {
      #   nodes {
      #     originalId
      #     __typename
      #     title
      #     startDateTime
      #     endDateTime
      #     location
      #     offCampusLocation
      #     tags {
      #       name
      #     }
      #     slug
      #   }
      # }
    }
  `)

  type PageNode = {
    slug: string
    id: string
    locale: 'en' | 'es' | 'fr'
  }

  type EventNode = {
    originalId: string
    __typename: string
    title: string
    startDateTime: string
    endDateTime: string
    location: string
    offCampusLocation: string
    tags: {
      name: string
    }[]
    slug: string
  }

  type QueryProps = {
    errors?: any
    data?: {
      allDatoCmsService: {
        nodes: PageNode[]
      }
      allDatoCmsEvent: {
        nodes: EventNode[]
      }
    }
  }

  const { data } = datoQuery

  data?.allDatoCmsService.nodes.forEach(node => {
    createPage({
      path: `${node.locale === 'en' ? '' : '/' + node.locale}/${node.slug
        }/`,
      component: resolve(`./src/templates/ServicePage.tsx`),
      context: {
        id: node.id,
      },
    })
  })
}

export const createResolvers: GatsbyNode['createResolvers'] = ({ createResolvers }) => {
  const today = new Date()
  today.setHours(23, 59, 59)
  createResolvers({
    DatoCmsEvent: {
      isUpcoming: {
        type: `Boolean!`,
        resolve: async (source, args, context, info) => {
          const { start_date_time, end_date_time } = source.entityPayload.attributes
          const cutoff = new Date(end_date_time || start_date_time)
          return cutoff > today
        }
      },
    },
  })
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions: { createTypes } }) => {
  createTypes(`
    type DatoCmsEvent implements Node @infer {
      isUpcoming: Boolean!
    }
  `)
}
