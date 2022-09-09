import { graphql } from 'gatsby'

export const Fragments = graphql`
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
  fragment ExternalLinkFragment on DatoCmsExternalLink {
    id: originalId
    __typename
    linkText
    url
  }
  fragment LightboxLinkFragment on DatoCmsLightboxLink {
    id: originalId
    __typename
    linkText
  }
  fragment DocumentLinkFragment on DatoCmsDocumentLink {
    id: originalId
    __typename
    linkText
    document {
      url
    }
  }
  fragment AnchorLinkFragment on DatoCmsAnchorLink {
    id: originalId
    __typename
    linkText
  }
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
    category {
      name
    }
    tags {
      name
    }
    body {
      value
    }
    inLatest
    publicationDate
    slug
    seo {
      ...SeoFragment
    }
  }
  fragment ExternalArticleFragment on DatoCmsExternalArticle {
    id: originalId
    __typename
    title
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
    publication
    publicationDate
    url
    tags {
      name
    }
    inLatest
  }
  fragment EventFragment on DatoCmsEvent {
    id: originalId
    __typename
    title
    startDateTime
    endDateTime
    location
    offCampusLocation
    tags {
      name
    }
    slug
  }
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
  fragment TextBlockFragment on DatoCmsTextBlock {
    id: originalId
    __typename
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
  fragment CarouselLinkFragment on DatoCmsCarouselLink {
    id: originalId
    __typename
    title
    categorization
    date
    linkType
    document {
      url
    }
    url
  }
  fragment CarouselMediaBlockFragment on DatoCmsCarouselMediaBlock {
    id: originalId
    __typename
    caption {
      value
    }
    media {
      gatsbyImageData(
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
      video {
        streamingUrl
      }
    }
  }
  fragment CarouselFragment on DatoCmsCarousel {
    id: originalId
    __typename
    contentType
    tags {
      name
    }
    links {
      ...CarouselLinkFragment
    }
    media {
      ...CarouselMediaBlockFragment
    }
  }
  fragment ContentBlockFragment on DatoCmsContentBlock {
    id: originalId
    __typename
    anchorLink {
      ...AnchorLinkFragment
    }
    heading
    content {
      ... on DatoCmsTextBlock {
        ...TextBlockFragment
      }
      ... on DatoCmsCarousel {
        ...CarouselFragment
      }
    }
    image {
      image {
        narrow: gatsbyImageData(width: 720, imgixParams: { q: 65 })
        medium: gatsbyImageData(width: 840, imgixParams: { q: 65 })
        wide: gatsbyImageData(width: 960, imgixParams: { q: 65 })
        alt
        sizes {
          aspectRatio
        }
        focalPoint {
          x
          y
        }
      }
      layout
    }
  }
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
  fragment LayoutOptionsFragment on DatoCmsLayoutOptionsBlock {
    id: originalId
    __typename
    startColor
    startOrientation
    startShape
  }
  fragment ContactBlockFragment on DatoCmsContactBlock {
    id: originalId
    __typename
    heading
    body {
      value
    }
  }
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
  fragment CatalogGroupFragment on DatoCmsCatalogGroup {
    id: originalId
    __typename
    heading
    programs {
      ...ProgramFragment
    }
  }
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
  fragment TextFieldFragment on DatoCmsTextField {
    __typename
    id: originalId
    label
    fieldType
    required
  }
  fragment SelectFieldFragment on DatoCmsSelectField {
    __typename
    id: originalId
    label
    options {
      id: originalId
      label
      value
    }
    required
  }
  fragment MultilineTextFieldFragment on DatoCmsMultilineTextField {
    __typename
    id: originalId
    label
    required
  }
  fragment FormFragment on DatoCmsForm {
    id: originalId
    __typename
    formName
    submitButtonText
    successMessage {
      value
    }
    formFields {
      ... on DatoCmsTextField {
        ...TextFieldFragment
      }
      ... on DatoCmsSelectField {
        ...SelectFieldFragment
      }
      ... on DatoCmsMultilineTextField {
        ...MultilineTextFieldFragment
      }
    }
  }
  fragment FormBlockFragment on DatoCmsFormBlock {
    id: originalId
    __typename
    form {
      ...FormFragment
    }
  }
`
