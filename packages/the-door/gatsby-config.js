require('dotenv').config()
const path = require('path')
// Get paths of Gatsby's required rules, which as of writing is located at:
// https://github.com/gatsbyjs/gatsby/tree/fbfe3f63dec23d279a27b54b4057dd611dce74bb/packages/
// gatsby/src/utils/eslint-rules
const gatsbyRequiredRules = path.join(
  '../../',
  'node_modules',
  'gatsby',
  'dist',
  'utils',
  'eslint-rules'
)

module.exports = {
  siteMetadata: {
    title: `The Door`,
    description: `Website for door.org built with DatoCMS, Emotion, and typescript.`,
    author: `Clay Giffin <clay@claygiffin.com>`,
    siteUrl: `https://www.door.org/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
  ],
}
