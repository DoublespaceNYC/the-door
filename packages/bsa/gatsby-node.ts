import { resolve } from 'path'

import { GatsbyNode } from 'gatsby'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions

  const datoQuery: QueryProps = await graphql(`
    query {
      allDatoCmsService {
        nodes {
          id
          _allSlugLocales {
            locale
            value
          }
        }
      }
      allDatoCmsLeader {
        nodes {
          id
          slug
        }
      }
      allDatoCmsInternalArticle {
        nodes {
          id
          slug
        }
      }
      allDatoCmsFormLightbox {
        nodes {
          id
          slug
        }
      }
      allDatoCmsEvent {
        nodes {
          id
          slug
        }
      }
      allDatoCmsInteriorPage {
        nodes {
          id
          _allSlugLocales {
            locale
            value
          }
        }
      }
      allDatoCmsTertiaryPage {
        nodes {
          id
          slug
          parentPage {
            ... on DatoCmsService {
              slug
            }
            ... on DatoCmsInteriorPage {
              slug
            }
          }
        }
      }
      allDatoCmsContactPage {
        nodes {
          id
          slug
        }
      }
      allDatoCmsPartner {
        nodes {
          id
          slug
        }
      }
      datoCmsLeadershipPage {
        id
        slug
      }
      datoCmsTheLatestPage {
        id
        slug
      }
      datoCmsCalendarPage {
        id
        slug
      }
      datoCmsProgramsPage {
        id
        slug
      }
      datoCmsMembershipPage {
        id
        _allSlugLocales {
          locale
          value
        }
      }
    }
  `)

  type PageNode = {
    id: string
    slug: string
  }
  type Locale = 'en' | 'es' | 'fr'
  type LocalesPageNode = {
    id: string
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
      allDatoCmsEvent: {
        nodes: PageNode[]
      }
      allDatoCmsInteriorPage: {
        nodes: LocalesPageNode[]
      }
      allDatoCmsTertiaryPage: {
        nodes: {
          id: string
          slug: string
          parentPage: {
            slug: string
          } | null
        }[]
      }
      allDatoCmsPartner: {
        nodes: PageNode[]
      }
      allDatoCmsContactPage: {
        nodes: PageNode[]
      }
      datoCmsLeadershipPage: PageNode
      datoCmsTheLatestPage: PageNode
      datoCmsCalendarPage: PageNode
      datoCmsProgramsPage: PageNode
      datoCmsMembershipPage: LocalesPageNode
    }
  }

  const { data } = datoQuery

  const localePrefix = (locale: string) =>
    locale === 'en' ? '' : '/' + locale

  data?.allDatoCmsService.nodes.forEach(node => {
    node._allSlugLocales.forEach(slugLocale => {
      createPage({
        path: `${localePrefix(slugLocale.locale)}/${slugLocale.value}/`,
        component: resolve(`./src/templates/ServicePage.tsx`),
        context: {
          locale: slugLocale.locale,
          id: node.id,
        },
      })
    })
  })
  data?.allDatoCmsLeader.nodes.forEach(node => {
    createPage({
      path: `/leadership/${node.slug}/`,
      component: resolve(`./src/templates/LeaderProfilePage.tsx`),
      context: {
        id: node.id,
      },
    })
  })
  data?.allDatoCmsInternalArticle.nodes.forEach(node => {
    createPage({
      path: `/articles/${node.slug}/`,
      component: resolve(`./src/templates/InternalArticlePage.tsx`),
      context: {
        id: node.id,
      },
    })
  })
  data?.allDatoCmsFormLightbox.nodes.forEach(node => {
    createPage({
      path: `/forms/${node.slug}/`,
      component: resolve(`./src/templates/FormPage.tsx`),
      context: {
        id: node.id,
      },
    })
  })
  data?.allDatoCmsEvent.nodes.forEach(node => {
    createPage({
      path: `/events/${node.slug}/`,
      component: resolve(`./src/templates/EventArticlePage.tsx`),
      context: {
        id: node.id,
      },
    })
  })
  data?.allDatoCmsInteriorPage.nodes.forEach(node => {
    node._allSlugLocales.forEach(slugLocale => {
      createPage({
        path: `${localePrefix(slugLocale.locale)}/${slugLocale.value}/`,
        component: resolve(`./src/templates/InteriorPage.tsx`),
        context: {
          locale: slugLocale.locale,
          id: node.id,
        },
      })
    })
  })
  data?.allDatoCmsTertiaryPage.nodes.forEach(node => {
    createPage({
      path: `/${node.parentPage?.slug + '/' || ''}${node.slug}/`,
      component: resolve(`./src/templates/TertiaryPage.tsx`),
      context: {
        id: node.id,
      },
    })
  })
  data?.allDatoCmsPartner.nodes.forEach(node => {
    createPage({
      path: `/partners/${node.slug}/`,
      component: resolve(`./src/templates/PartnerArticlePage.tsx`),
      context: {
        id: node.id,
      },
    })
  })
  data?.allDatoCmsContactPage.nodes.forEach(node => {
    createPage({
      path: `/${node.slug}/`,
      component: resolve(`./src/templates/ContactPage.tsx`),
      context: {
        id: node.id,
      },
    })
  })
  createPage({
    path: `/${data?.datoCmsLeadershipPage.slug}/`,
    component: resolve(`./src/templates/LeadershipPage.tsx`),
  })
  createPage({
    path: `/${data?.datoCmsTheLatestPage.slug}/`,
    component: resolve(`./src/templates/LatestPage.tsx`),
  })
  createPage({
    path: `/${data?.datoCmsCalendarPage.slug}/`,
    component: resolve(`./src/templates/CalendarPage.tsx`),
  })
  createPage({
    path: `/${data?.datoCmsProgramsPage.slug}/`,
    component: resolve(`./src/templates/ProgramsPage.tsx`),
  })
  data?.datoCmsMembershipPage._allSlugLocales.map(slugLocale => {
    createPage({
      path: `${localePrefix(slugLocale.locale)}/${slugLocale.value}/`,
      component: resolve(`./src/templates/MembershipPage.tsx`),
      context: {
        locale: slugLocale.locale,
      },
    })
  })
  createPage({
    path: `/forms-detection/`,
    component: resolve(`./src/templates/ConditionalFormsPage.tsx`),
  })
}

export const createResolvers: GatsbyNode['createResolvers'] = async ({
  createResolvers,
}) => {

  createResolvers({
    DatoCmsEvent: {
      isUpcoming: {
        type: `Boolean!`,
        resolve: async (source, args, context, info) => {
          const { buildTime } = await context.nodeModel.findOne({
            type: `SiteBuildMetadata`,
          })
          const today = new Date(buildTime)
          today.getHours() < 5 && today.setUTCDate(today.getDate() - 1)
          today.setUTCHours(5, 0, 0, 0)
          const { start_date_time, end_date_time } =
            source.entityPayload.attributes
          const cutoff = new Date(end_date_time || start_date_time)
          console.log(
            `${source.entityPayload.attributes.slug}: ${cutoff} > ${today}? ${cutoff > today}`
          )
          return cutoff > today
        },
      },
    },
  })
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions: { createTypes } }) => {
    createTypes(`
    type DatoCmsEvent implements Node {
      isUpcoming: Boolean!
    }
  `)
  }
