import { Record } from 'datocms-structured-text-utils'
import { Fragment, HTMLAttributes } from 'react'

import DocumentLink, { IDocumentLink } from './DocumentLink'
import { IEventLink } from './Event__Article'
import ExternalLink, { IExternalLink } from './ExternalLink'
import { IFormLightboxLink } from './Form__Lightbox'
import { IInternalArticleLink } from './InternalArticle'
import InternalLink, { IInternalLink } from './InternalLink'
import LightboxLink from './Lightbox__Link'

export type IDatoLink = Record &
  (
    | IInternalLink
    | IExternalLink
    | IDocumentLink
    | IFormLightboxLink
    | IInternalArticleLink
    | IEventLink
  )

export const isDatoLink = (record: Record) => {
  return [
    'DatoCmsInternalLink',
    'DatoCmsExternalLink',
    'DatoCmsDocumentLink',
    'DatoCmsFormLightboxLink',
    'DatoCmsInternalArticleLink',
    'DatoCmsEventLink',
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
    case 'DatoCmsExternalLink':
      return <ExternalLink data={data} icon={icon} {...props} />
    case 'DatoCmsDocumentLink':
      return <DocumentLink data={data} icon={icon} {...props} />
    case 'DatoCmsFormLightboxLink':
    case 'DatoCmsInternalArticleLink':
    case 'DatoCmsEventLink':
      return (
        <LightboxLink
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
