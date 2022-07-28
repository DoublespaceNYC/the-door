import { graphql } from 'gatsby'

export const InternalLinkFragment = graphql`
  fragment InternalLinkFragment on DatoCmsInternalLink {
    id: originalId
    __typename
    linkText
    link {
      ... on DatoCmsDoorHome {
        slug
      }
      ... on DatoCmsService {
        slug
      }
    }
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
      sizes {
        aspectRatio
      }
      focalPoint {
        x
        y
      }
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
      sizes {
        aspectRatio
      }
      focalPoint {
        x
        y
      }
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
    startDateTime
    endDateTime
    location
  }
`
export const CornerPopupFragment = graphql`
  fragment CornerPopupFragment on DatoCmsCornerPopup {
    id: originalId
    __typename
    heading
    body {
      value
      blocks {
        ... on DatoCmsInternalLink {
          ...InternalLinkFragment
        }
        ... on DatoCmsExternalLink {
          ...ExternalLinkFragment
        }
      }
    }
  }
`
