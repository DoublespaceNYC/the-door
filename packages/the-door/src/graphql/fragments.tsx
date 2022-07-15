import { graphql } from 'gatsby'

export const InternalLinkFragment = graphql`
  fragment InternalLinkFragment on DatoCmsInternalLink {
    id: originalId
    __typename
    linkText
    url
  }
`
export const ExternalLinkFragment = graphql`
  fragment ExternalLinkFragment on DatoCmsExternalLink {
    id: originalId
    __typename
    linkText
    url
  }
`
export const ServiceGroupFragment = graphql`
  fragment ServiceGroupFragment on DatoCmsServiceGroup {
    id: originalId
    __typename
    title
    image {
      gatsbyImageData(
        width: 360
        imgixParams: {
          q: 50
          ar: "1:2"
          fit: "crop"
          crop: "focalpoint"
        }
      )
      alt
    }
    services {
      title
    }
  }
`
export const StoryFragment = graphql`
  fragment StoryFragment on DatoCmsStory {
    id: originalId
    __typename
    title
    image {
      carouselImageData: gatsbyImageData(
        width: 960
        imgixParams: {
          q: 50
          ar: "3:2"
          fit: "crop"
          crop: "focalpoint"
        }
      )
      alt
    }
    excerpt
    ctaText
    body {
      value
    }
  }
`
export const NewsArticleFragment = graphql`
  fragment NewsArticleFragment on DatoCmsNewsArticle {
    id: originalId
    __typename
    title
    excerpt
    heroImage {
      thumbnailImageData: gatsbyImageData(
        width: 960
        imgixParams: {
          q: 50
          ar: "16:9"
          fit: "crop"
          crop: "focalpoint"
        }
      )
      alt
    }
    category
    body {
      value
    }
    meta {
      createdAt
    }
  }
`
export const EventFragment = graphql`
  fragment EventFragment on DatoCmsEvent {
    id: originalId
    __typename
    title
    date
    startTime
    endTime
    location
  }
`
