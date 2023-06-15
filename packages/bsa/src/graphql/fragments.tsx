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
      ... on DatoCmsHomePage {
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
      ... on DatoCmsCalendarPage {
        slug
      }
      ... on DatoCmsProgramsPage {
        slug
      }
      ... on DatoCmsContactPage {
        slug
      }
      ... on DatoCmsMembershipPage {
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
      localFileId
      url
    }
  }
  fragment AnchorLinkFragment on DatoCmsAnchorLink {
    id: originalId
    __typename
    linkText
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
        width: 1440
        imgixParams: {
          q: 65
          ar: "16:9"
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
        ... on DatoCmsImageBlock {
          ...ImageBlockFragment
        }
        ... on DatoCmsVideoBlock {
          ...VideoBlockFragment
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
  fragment PdfArticleFragment on DatoCmsPdfArticle {
    id: originalId
    __typename
    title
    pdf {
      url
      localFileId
    }
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
        width: 1440
        imgixParams: {
          q: 65
          ar: "16:9"
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
    inLatest
    publicationDate
  }
  fragment PdfArticleLinkFragment on DatoCmsPdfArticleLink {
    __typename
    id: originalId
    linkText
    link {
      ...PdfArticleFragment
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
        ... on DatoCmsImageBlock {
          ...ImageBlockFragment
        }
        ... on DatoCmsVideoBlock {
          ...VideoBlockFragment
        }
        ... on DatoCmsMediaCarousel {
          ...MediaCarouselFragment
        }
      }
    }
    tags {
      name
      position
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
        ... on DatoCmsTextBlockLink {
          id: originalId
          __typename
          link {
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
            ... on DatoCmsInternalArticleLink {
              ...InternalArticleLinkFragment
            }
            ... on DatoCmsPdfArticleLink {
              ...PdfArticleLinkFragment
            }
            ... on DatoCmsEventLink {
              ...EventLinkFragment
            }
          }
        }
        ... on DatoCmsTextBlockButton {
          id: originalId
          __typename
          link {
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
            ... on DatoCmsInternalArticleLink {
              ...InternalArticleLinkFragment
            }
            ... on DatoCmsPdfArticleLink {
              ...PdfArticleLinkFragment
            }
            ... on DatoCmsEventLink {
              ...EventLinkFragment
            }
          }
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
  fragment ImageBlockFragment on DatoCmsImageBlock {
    id: originalId
    __typename
    caption {
      value
    }
    image {
      gatsbyImageData(
        width: 1280
        imgixParams: { q: 60, fit: "crop", crop: "focalpoint" }
      )
      ...ImageFocalData
    }
  }
  fragment VideoBlockFragment on DatoCmsVideoBlock {
    id: originalId
    __typename
    caption {
      value
    }
    video {
      url
      width
      height
    }
  }
  fragment CarouselImageBlockFragment on DatoCmsImageBlock {
    id: originalId
    __typename
    caption {
      value
    }
    image {
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
    }
  }
  fragment MediaCarouselFragment on DatoCmsMediaCarousel {
    id: originalId
    __typename
    media {
      ...CarouselImageBlockFragment
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
      ... on DatoCmsImageBlock {
        ...CarouselImageBlockFragment
      }
      ... on DatoCmsVideoBlock {
        ...VideoBlockFragment
      }
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
    width
  }
  fragment DateFieldFragment on DatoCmsDateField {
    __typename
    id: originalId
    label
    required
    width
  }
  fragment SelectFieldFragment on DatoCmsSelectField {
    __typename
    id: originalId
    label
    options {
      ... on DatoCmsSelectOption {
        __typename
        id: originalId
        label
        value
      }
      ... on DatoCmsSelectGroup {
        __typename
        id: originalId
        label
        options {
          __typename
          id: originalId
          label
          value
        }
      }
    }
    required
    width
  }
  fragment SelectStateFieldFragment on DatoCmsSelectStateField {
    __typename
    id: originalId
    label
    required
  }
  fragment MultilineTextFieldFragment on DatoCmsMultilineTextField {
    __typename
    id: originalId
    label
    required
    width
  }
  fragment CheckboxFieldFragment on DatoCmsCheckboxField {
    __typename
    id: originalId
    label
    required
  }
  fragment CheckboxArrayFieldFragment on DatoCmsCheckboxArrayField {
    __typename
    id: originalId
    label
    options {
      ...CheckboxFieldFragment
    }
  }
  fragment FormDividerFragment on DatoCmsFormDivider {
    __typename
    id: originalId
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
      ... on DatoCmsSelectStateField {
        ...SelectStateFieldFragment
      }
      ... on DatoCmsMultilineTextField {
        ...MultilineTextFieldFragment
      }
      ... on DatoCmsCheckboxArrayField {
        ...CheckboxArrayFieldFragment
      }
      ... on DatoCmsCheckboxField {
        ...CheckboxFieldFragment
      }
      ... on DatoCmsDateField {
        ...DateFieldFragment
      }
      ... on DatoCmsFormDivider {
        ...FormDividerFragment
      }
    }
    conditionalFields
    recipients {
      email
    }
  }
  fragment BlackbaudFormFragment on DatoCmsBlackbaudForm {
    id: originalId
    __typename
    formName
    formId
    bboxVersion
  }
  fragment FormLightboxFragment on DatoCmsFormLightbox {
    __typename
    id: originalId
    title
    text {
      value
    }
    form {
      ... on DatoCmsForm {
        ...FormFragment
      }
      ... on DatoCmsBlackbaudForm {
        ...BlackbaudFormFragment
      }
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
        width: 1440
        imgixParams: {
          q: 65
          ar: "16:9"
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
        ... on DatoCmsImageBlock {
          ...ImageBlockFragment
        }
        ... on DatoCmsVideoBlock {
          ...VideoBlockFragment
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
  fragment PartnerFragment on DatoCmsPartner {
    id: originalId
    __typename
    name
    description {
      value
    }
    logo {
      format
      url
      gatsbyImageData(width: 480, imgixParams: { q: 80 })
      alt
    }
    slug
    seo {
      ...SEOFragment
    }
  }
`
