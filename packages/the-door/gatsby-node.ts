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
      datoCmsLeadershipPage {
        slug
      }
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
      datoCmsLeadershipPage: {
        slug: string
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
  createPage({
    path: `${data?.datoCmsLeadershipPage.slug}`,
    component: resolve(`./src/templates/LeadershipPage.tsx`)
  })
}

export const createResolvers: GatsbyNode['createResolvers'] = ({ createResolvers }) => {
  const convertTZ = (date: Date, tzString: string) => {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
  }
  const newDate = new Date()
  const today = convertTZ(newDate, 'America/New_York')
  today.setHours(0, 0, 0, 0)

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
      buildTime: {
        type: `String!`,
        resolve: async () => {
          return newDate.toString()
        }
      },
      midnightToday: {
        type: `String!`,
        resolve: async () => {
          return today.toString()
        }
      },
      cutoffTime: {
        type: `String!`,
        resolve: async (source, args, context, info) => {
          const { start_date_time, end_date_time } = source.entityPayload.attributes
          const cutoff = new Date(end_date_time || start_date_time)
          return cutoff.toString()
        }
      },
    },
  })
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions: { createTypes } }) => {
  createTypes(`
    type DatoCmsEvent implements Node {
      isUpcoming: Boolean!
    }
  `)
}
