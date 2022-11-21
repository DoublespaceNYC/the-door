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
          _allSlugLocales {
            locale
            value
          }
        }
      }
      allDatoCmsLeader {
        nodes {
          slug
        }
      }
      allDatoCmsInternalArticle {
        nodes {
          slug
        }
      }
      allDatoCmsFormLightbox {
        nodes {
          slug
        }
      }
      allDatoCmsFacesStory {
        nodes {
          slug
        }
      }
      allDatoCmsEvent {
        nodes {
          slug
        }
      }
      allDatoCmsInteriorPage {
        nodes {
          slug
        }
      }
      allDatoCmsTertiaryPage {
        nodes {
          slug
          parentPage {            
            ...on DatoCmsService {
              slug
            }
            ... on DatoCmsInteriorPage {
              slug
            }          
          }
        }
      }
      datoCmsLeadershipPage {
        slug
      }
      datoCmsTheLatestPage {
        slug
      }
    }
  `)

  type Locale = ('en' | 'es' | 'fr')
  type PageNode = {
    slug: string
  }
  type LocalesPageNode = {
    _allSlugLocales: {
      locale: Locale
      value: string
    }[]
  }
  type QueryProps = {
    errors?: any
    data?: {
      allDatoCmsService: {
        nodes: LocalesPageNode[]
      }
      allDatoCmsLeader: {
        nodes: PageNode[]
      }
      allDatoCmsInternalArticle: {
        nodes: PageNode[]
      }
      allDatoCmsFormLightbox: {
        nodes: PageNode[]
      }
      allDatoCmsFacesStory: {
        nodes: PageNode[]
      }
      allDatoCmsEvent: {
        nodes: PageNode[]
      }
      allDatoCmsInteriorPage: {
        nodes: PageNode[]
      }
      allDatoCmsTertiaryPage: {
        nodes: {
          slug: string,
          parentPage: {
            slug: string
          }
        }[]
      }
      datoCmsLeadershipPage: PageNode
      datoCmsTheLatestPage: PageNode
    }
  }

  const { data } = datoQuery

  const localePrefix = (locale: string) => locale === 'en' ? '' : '/' + locale

  data?.allDatoCmsService.nodes.forEach(node => {
    node._allSlugLocales.forEach(slugLocale => {
      createPage({
        path: `${localePrefix(slugLocale.locale)}/${slugLocale.value}/`,
        component: resolve(`./src/templates/ServicePage.tsx`),
        context: {
          locale: slugLocale.locale,
          slug: slugLocale.value,
        },
      })
    })
  })
  data?.allDatoCmsLeader.nodes.forEach(node => {
    createPage({
      path: `/leadership/${node.slug}/`,
      component: resolve(`./src/templates/LeaderProfilePage.tsx`),
      context: {
        slug: node.slug
      }
    })
  })
  data?.allDatoCmsInternalArticle.nodes.forEach(node => {
    createPage({
      path: `/articles/${node.slug}/`,
      component: resolve(`./src/templates/InternalArticlePage.tsx`),
      context: {
        slug: node.slug
      }
    })
  })
  data?.allDatoCmsFormLightbox.nodes.forEach(node => {
    createPage({
      path: `/forms/${node.slug}/`,
      component: resolve(`./src/templates/FormPage.tsx`),
      context: {
        slug: node.slug
      }
    })
  })
  data?.allDatoCmsFacesStory.nodes.forEach(node => {
    createPage({
      path: `/stories/${node.slug}/`,
      component: resolve(`./src/templates/FacesStoryPage.tsx`),
      context: {
        slug: node.slug
      }
    })
  })
  data?.allDatoCmsEvent.nodes.forEach(node => {
    createPage({
      path: `/events/${node.slug}/`,
      component: resolve(`./src/templates/EventArticlePage.tsx`),
      context: {
        slug: node.slug
      }
    })
  })
  data?.allDatoCmsInteriorPage.nodes.forEach(node => {
    createPage({
      path: `/${node.slug}/`,
      component: resolve(`./src/templates/InteriorPage.tsx`),
      context: {
        slug: node.slug
      }
    })
  })
  data?.allDatoCmsTertiaryPage.nodes.forEach(node => {
    createPage({
      path: `/${node.parentPage.slug}/${node.slug}/`,
      component: resolve(`./src/templates/TertiaryPage.tsx`),
      context: {
        slug: node.slug
      }
    })
  })
  createPage({
    path: `/${data?.datoCmsLeadershipPage.slug}/`,
    component: resolve(`./src/templates/LeadershipPage.tsx`)
  })
  createPage({
    path: `/${data?.datoCmsTheLatestPage.slug}/`,
    component: resolve(`./src/templates/LatestPage.tsx`)
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
