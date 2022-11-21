import { Record } from 'datocms-structured-text-utils'
import { Fragment, HTMLAttributes } from 'react'

import DocumentLink, { IDocumentLink } from './DocumentLink'
import { IEventLink } from './Event__Article'
import ExternalLink, { IExternalLink } from './ExternalLink'
import { IFormLightboxLink } from './Form__Lightbox'
import { IInternalArticleLink } from './InternalArticle'
import InternalLink, { IInternalLink } from './InternalLink'
import InternalLinkFiltered, {
  IInternalLinkFiltered,
} from './InternalLinkFiltered'
import LightboxLink from './Lightbox__Link'
import { ITertiaryLink } from './TertiaryPageContent'

export type IDatoLink = Record &
  (
    | IInternalLink
    | IInternalLinkFiltered
    | IExternalLink
    | IDocumentLink
    | IFormLightboxLink
    | IInternalArticleLink
    | IEventLink
    | ITertiaryLink
  )

export const isDatoLink = (record: Record) => {
  return [
    'DatoCmsInternalLink',
    'DatoCmsInternalLinkFiltered',
    'DatoCmsExternalLink',
    'DatoCmsDocumentLink',
    'DatoCmsFormLightboxLink',
    'DatoCmsInternalArticleLink',
    'DatoCmsEventLink',
    'DatoCmsTertiaryLink',
  ].some(x => x === record.__typename)
}

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  data: IDatoLink
  icon?: boolean
  highlightColor?: string
}

const DatoLink = ({
  data,
  icon = true,
  highlightColor,
  ...props
}: Props): JSX.Element => {
  switch (data.__typename) {
    case 'DatoCmsInternalLink':
      return <InternalLink data={data} {...props} />
    case 'DatoCmsInternalLinkFiltered':
      return <InternalLinkFiltered data={data} {...props} />
    case 'DatoCmsExternalLink':
      return <ExternalLink data={data} icon={icon} {...props} />
    case 'DatoCmsDocumentLink':
      return <DocumentLink data={data} icon={icon} {...props} />
    case 'DatoCmsFormLightboxLink':
      return (
        <LightboxLink
          slugPrefix="/forms/"
          link={data.linkText}
          content={data.link}
          highlightColor={highlightColor}
          {...props}
        />
      )
    case 'DatoCmsInternalArticleLink':
      return (
        <LightboxLink
          slugPrefix="/articles/"
          link={data.linkText}
          content={data.link}
          highlightColor={highlightColor}
          {...props}
        />
      )
    case 'DatoCmsEventLink':
      return (
        <LightboxLink
          slugPrefix="/events/"
          link={data.linkText}
          content={data.link}
          highlightColor={highlightColor}
          {...props}
        />
      )
    case 'DatoCmsTertiaryLink':
      return (
        <LightboxLink
          slugPrefix={`/${data.link.parentPage.slug}/`}
          link={data.linkText}
          content={data.link}
          highlightColor={highlightColor}
          {...props}
        />
      )
    default:
      return <Fragment />
  }
}

export default DatoLink
