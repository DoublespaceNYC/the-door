import { resolve } from 'path'

import { GatsbyNode, graphql } from 'gatsby'

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
      allDatoCmsFacesStory {
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
      datoCmsImpactPage {
        id
        slug
      }
      datoCmsFacesPage {
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
      allDatoCmsFacesStory: {
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
          }
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
      datoCmsImpactPage: PageNode
      datoCmsFacesPage: PageNode
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
  data?.allDatoCmsFacesStory.nodes.forEach(node => {
    createPage({
      path: `/${data.datoCmsFacesPage.slug}/${node.slug}/`,
      component: resolve(`./src/templates/FacesStoryPage.tsx`),
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
      path: `/${node.parentPage.slug}/${node.slug}/`,
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
    path: `/${data?.datoCmsImpactPage.slug}/`,
    component: resolve(`./src/templates/ImpactPage.tsx`),
  })
  createPage({
    path: `/${data?.datoCmsFacesPage.slug}/`,
    component: resolve(`./src/templates/FacesPage.tsx`),
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
  // const convertTZ = (date: Date, tzString: string) => {
  //   return new Date(
  //     (typeof date === 'string' ? new Date(date) : date).toLocaleString(
  //       'en-US',
  //       { timeZone: tzString }
  //     )
  //   )
  // }
  // const newDate = new Date()
  // const today = convertTZ(newDate, 'America/New_York')
  // today.setHours(0, 0, 0, 0)

  //     "siteBuildMetadata": {
  //   "buildTime": "2023-01-09T18:58:13.000Z"
  // }

  createResolvers({
    DatoCmsEvent: {
      isUpcoming: {
        type: `Boolean!`,
        resolve: async (source, args, context, info) => {
          const { buildTime } = await context.nodeModel.findOne({
            type: `SiteBuildMetadata`,
          })
          const today = new Date(buildTime)
          today.setHours(0, 0, 0, 0)
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
