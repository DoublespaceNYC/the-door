import { join } from 'path'

import { GatsbyConfig } from 'gatsby'

require('dotenv').config()

const gatsbyRequiredRules = join(
  '../../',
  'node_modules',
  'gatsby',
  'dist',
  'utils',
  'eslint-rules'
)

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://www.door.org',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction
  ? NETLIFY_SITE_URL
  : NETLIFY_DEPLOY_URL

const config: GatsbyConfig = {
  siteMetadata: {
    title: `The Door`,
    description: `Website for door.org built with DatoCMS, Emotion, and typescript.`,
    author: `Clay Giffin <clay@claygiffin.com>`,
    siteUrl,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        // You can find your read-only API token under the Settings > API tokens
        // section of your administrative area:
        apiToken: `${process.env.DATOCMS_KEY}`,

        // If you are working on development/staging environment, you might want to
        // preview the latest version of records instead of the published one:
        previewMode: false,

        // Disable automatic reloading of content when some change occurs on DatoCMS:
        disableLiveReload: false,

        // // Custom API base URL
        // apiUrl: 'https://graphql.datocms.com/preview/',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Door`,
        short_name: `@the-door/the-door`,
        start_url: `/`,
        background_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/favicon.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        // Gatsby required rules directory
        rulePaths: [gatsbyRequiredRules],
        // Default settings that may be ommitted or customized
        stages: ['develop'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: [
          'node_modules',
          'bower_components',
          '.cache',
          'public',
        ],
        // Any additional eslint-webpack-plugin options below
        // ...
      },
    },
    `gatsby-transformer-sharp`,
    'gatsby-transformer-remark',
    `gatsby-plugin-sharp`,
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/forms/*`, `/forms-detection/`],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [
              {
                userAgent: '*',
                allow: '/',
                disallow: ['/forms/', '/forms-detection/'],
              },
            ],
            sitemap: `${siteUrl}/sitemap/sitemap-index.xml`,
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-K8TZP8F7",
        // id: "G-86PJKS11B0",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        enableWebVitalsTracking: true,

      },
    },
    `gatsby-plugin-netlify`,
  ],
}

export default config
