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
export const LightboxLinkFragment = graphql`
  fragment LightboxLinkFragment on DatoCmsLightboxLink {
    id: originalId
    __typename
    linkText
  }
`
export const DocumentLinkFragment = graphql`
  fragment DocumentLinkFragment on DatoCmsDocumentLink {
    id: originalId
    __typename
    linkText
    document {
      url
    }
  }
`
export const AnchorLinkFragment = graphql`
  fragment AnchorLinkFragment on DatoCmsAnchorLink {
    id: originalId
    __typename
    linkText
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
export const InternalArticleFragment = graphql`
  fragment InternalArticleFragment on DatoCmsInternalArticle {
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
    inLatest
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
        ... on DatoCmsLightboxLink {
          ...LightboxLinkFragment
        }
        ... on DatoCmsDocumentLink {
          ...DocumentLinkFragment
        }
      }
    }
  }
`
export const ContentBlockFragment = graphql`
  fragment ContentBlockFragment on DatoCmsContentBlock {
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
        ... on DatoCmsLightboxLink {
          ...LightboxLinkFragment
        }
        ... on DatoCmsDocumentLink {
          ...DocumentLinkFragment
        }
      }
    }
    image {
      image {
        narrow: gatsbyImageData(width: 720, imgixParams: { q: 65 })
        medium: gatsbyImageData(width: 840, imgixParams: { q: 65 })
        wide: gatsbyImageData(width: 960, imgixParams: { q: 65 })
        alt
      }
      layout
    }
  }
`
export const SeoFragment = graphql`
  fragment SeoFragment on DatoCmsSeoField {
    title
    description
    image {
      url(
        imgixParams: {
          q: 40
          ar: "1:1"
          fit: "crop"
          crop: "focalpoint"
        }
      )
    }
  }
`
export const LayoutOptionsFragment = graphql`
  fragment LayoutOptionsFragment on DatoCmsLayoutOptionsBlock {
    id: originalId
    __typename
    startColor
    startOrientation
    startShape
  }
`
export const ContactBlockFragment = graphql`
  fragment ContactBlockFragment on DatoCmsContactBlock {
    id: originalId
    __typename
    heading
    body {
      value
    }
  }
`
export const ContactSectionFragment = graphql`
  fragment ContactSectionFragment on DatoCmsContactSection {
    id: originalId
    __typename
    heading
    anchorLink {
      ...AnchorLinkFragment
    }
    contactBlocks {
      ...ContactBlockFragment
    }
  }
`
export const ProgramFragment = graphql`
  fragment ProgramFragment on DatoCmsProgram {
    id: originalId
    __typename
    programTitle
    location
    description {
      value
    }
    registration
    url
  }
`
export const CatalogGroupFragment = graphql`
  fragment CatalogGroupFragment on DatoCmsCatalogGroup {
    id: originalId
    __typename
    heading
    programs {
      ...ProgramFragment
    }
  }
`
export const CatalogSectionFragment = graphql`
  fragment CatalogSectionFragment on DatoCmsCatalogSection {
    id: originalId
    __typename
    heading
    anchorLink {
      ...AnchorLinkFragment
    }
    catalogGroups {
      ...CatalogGroupFragment
    }
  }
`
