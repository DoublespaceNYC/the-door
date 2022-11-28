import { graphql } from 'gatsby'

export const Fragments = graphql`
  fragment ImageFocalData on DatoCmsFileField {
    isImage
    alt
    sizes {
      aspectRatio
    }
    focalPoint {
      x
      y
    }
  }
  fragment InternalLinkFragment on DatoCmsInternalLink {
    id: originalId
    __typename
    linkText
    link {
      ... on DatoCmsDoorHome {
        slug
      }
      ... on DatoCmsLeadershipPage {
        slug
      }
      ... on DatoCmsInteriorPage {
        slug
      }
      ... on DatoCmsService {
        slug
      }
      ... on DatoCmsTheLatestPage {
        slug
      }
      ... on DatoCmsImpactPage {
        slug
      }
    }
  }
  fragment InternalLinkFilteredFragment on DatoCmsInternalLinkFiltered {
    id: originalId
    __typename
    linkText
    link {
      ... on DatoCmsTheLatestPage {
        slug
      }
    }
    filter
  }
  fragment ExternalLinkFragment on DatoCmsExternalLink {
    id: originalId
    __typename
    linkText
    url
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
  fragment FacesStoryFragment on DatoCmsFacesStory {
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
      heroImageData: gatsbyImageData(
        layout: FULL_WIDTH
        imgixParams: {
          q: 65
          ar: "8:3"
          fit: "crop"
          crop: "focalpoint"
        }
      )
      ...ImageFocalData
    }
    excerpt
    ctaText
    body {
      value
    }
    seo {
      ...SEOFragment
    }
    slug
  }
  fragment InternalArticleFragment on DatoCmsInternalArticle {
    id: originalId
    __typename
    title
    excerpt
    heroImage {
      thumbnailImageData: gatsbyImageData(
        width: 600
        imgixParams: {
          q: 50
          ar: "16:9"
          fit: "crop"
          crop: "focalpoint"
        }
      )
      heroImageData: gatsbyImageData(
        layout: FULL_WIDTH
        imgixParams: {
          q: 65
          ar: "8:3"
          fit: "crop"
          crop: "focalpoint"
        }
      )
      ...ImageFocalData
    }
    category {
      name
      pluralName
      position
    }
    tags {
      name
    }
    lede {
      value
    }
    body {
      value
      blocks {
        ... on DatoCmsMediaBlock {
          ...MediaBlockFragment
        }
        ... on DatoCmsMediaCarousel {
          ...MediaCarouselFragment
        }
      }
    }
    inLatest
    publicationDate
    slug
    seo {
      ...SEOFragment
    }
  }
  fragment InternalArticleLinkFragment on DatoCmsInternalArticleLink {
    __typename
    id: originalId
    linkText
    link {
      ...InternalArticleFragment
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
      ...ImageFocalData
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
    excerpt
    body {
      value
      blocks {
        ... on DatoCmsMediaBlock {
          ...MediaBlockFragment
        }
        ... on DatoCmsMediaCarousel {
          ...MediaCarouselFragment
        }
      }
    }
    tags {
      name
    }
    slug
    seo {
      ...SEOFragment
    }
  }
  fragment EventLinkFragment on DatoCmsEventLink {
    __typename
    id: originalId
    linkText
    link {
      ...EventFragment
    }
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
        ... on DatoCmsFormLightboxLink {
          ...FormLightboxLinkFragment
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
        ... on DatoCmsFormLightboxLink {
          ...FormLightboxLinkFragment
        }
        ... on DatoCmsDocumentLink {
          ...DocumentLinkFragment
        }
        ... on DatoCmsTertiaryLink {
          ...TertiaryLinkFragment
        }
      }
    }
  }
  fragment VectorGraphicFragment on DatoCmsVectorGraphic {
    id: originalId
    __typename
    graphic {
      url
      alt
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
  fragment MediaBlockFragment on DatoCmsMediaBlock {
    id: originalId
    __typename
    caption {
      value
    }
    asset {
      gatsbyImageData(
        width: 1280
        imgixParams: { q: 60, fit: "crop", crop: "focalpoint" }
      )
      ...ImageFocalData
      video {
        streamingUrl
        thumbnailUrl
      }
    }
  }
  fragment CarouselMediaBlockFragment on DatoCmsMediaBlock {
    id: originalId
    __typename
    caption {
      value
    }
    asset {
      gatsbyImageData(
        width: 960
        imgixParams: {
          q: 50
          ar: "3:2"
          fit: "crop"
          crop: "focalpoint"
        }
      )
      ...ImageFocalData
      video {
        streamingUrl
        thumbnailUrl
      }
    }
  }
  fragment MediaCarouselFragment on DatoCmsMediaCarousel {
    id: originalId
    __typename
    media {
      ...CarouselMediaBlockFragment
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
      ... on DatoCmsVectorGraphic {
        ...VectorGraphicFragment
      }
    }
    layout
    image {
      narrow: gatsbyImageData(width: 720, imgixParams: { q: 65 })
      medium: gatsbyImageData(width: 840, imgixParams: { q: 65 })
      wide: gatsbyImageData(width: 960, imgixParams: { q: 65 })
      ...ImageFocalData
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
  fragment FormLightboxFragment on DatoCmsFormLightbox {
    __typename
    id: originalId
    title
    text {
      value
    }
    form {
      ...FormFragment
    }
    slug
    seo {
      ...SEOFragment
    }
  }
  fragment FormEmbedFragment on DatoCmsFormEmbed {
    __typename
    id: originalId
    form {
      ...FormFragment
    }
  }
  fragment FormLightboxLinkFragment on DatoCmsFormLightboxLink {
    __typename
    id: originalId
    linkText
    link {
      ...FormLightboxFragment
    }
  }
  fragment LeaderFragment on DatoCmsLeader {
    id: originalId
    __typename
    name
    title
    headshot {
      gatsbyImageData(
        width: 480
        imgixParams: {
          q: 65
          ar: "1:1"
          fit: "crop"
          crop: "focalpoint"
        }
      )
      ...ImageFocalData
    }
    bio {
      value
    }
    slug
    seo {
      ...SEOFragment
    }
  }
  fragment BoardMemberFragment on DatoCmsBoardMember {
    id: originalId
    __typename
    name
    title
    category
    bio {
      value
    }
  }
  fragment AdvisoryMemberFragment on DatoCmsAdvisoryMember {
    id: originalId
    __typename
    name
    title {
      value
    }
    headshot {
      gatsbyImageData(
        width: 240
        imgixParams: {
          q: 65
          ar: "1:1"
          fit: "crop"
          crop: "focalpoint"
        }
      )
      ...ImageFocalData
    }
  }
  fragment TertiaryPageFragment on DatoCmsTertiaryPage {
    id: originalId
    __typename
    title
    subheading {
      value
    }
    heroImage {
      heroImageData: gatsbyImageData(
        layout: FULL_WIDTH
        imgixParams: {
          q: 65
          ar: "8:3"
          fit: "crop"
          crop: "focalpoint"
        }
      )
      ...ImageFocalData
    }
    lede {
      value
    }
    body {
      value
      blocks {
        ... on DatoCmsMediaBlock {
          ...MediaBlockFragment
        }
        ... on DatoCmsMediaCarousel {
          ...MediaCarouselFragment
        }
      }
    }
    parentPage {
      ... on DatoCmsService {
        slug
      }
      ... on DatoCmsInteriorPage {
        slug
      }
    }
    slug
    seo {
      ...SEOFragment
    }
  }
  fragment TertiaryLinkFragment on DatoCmsTertiaryLink {
    id: originalId
    __typename
    linkText
    link {
      ...TertiaryPageFragment
    }
  }
`
