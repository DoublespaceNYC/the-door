import { Record } from 'datocms-structured-text-utils'
import { Fragment, HTMLAttributes } from 'react'

import ExternalLink, { IExternalLink } from './ExternalLink'
import InternalLink, { IInternalLink } from './InternalLink'

export interface IDocumentLink extends Record {
  __typename: 'DatoCmsAssetLink'
  linkText: string
  document: {
    url: string
  }
}

export interface ILightboxLink extends Record {
  __typename: 'DatoCmsLightboxLink'
  linkText: string
  link: {
    slug: string
  }
}

export type IDatoLink =
  | IInternalLink
  | IExternalLink
  | IDocumentLink
  | ILightboxLink

export const isDatoLink = (record: Record) => {
  return [
    'DatoCmsInternalLink',
    'DatoCmsExternalLink',
    'DatoCmsDocumentLink',
    'DatoCmsLightboxLink',
  ].some(x => x === record.__typename)
}

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  data: IDatoLink
  icon?: boolean
}

const DatoLink = ({
  data,
  icon = true,
  ...props
}: Props): JSX.Element => {
  switch (data.__typename) {
    case 'DatoCmsInternalLink':
      return <InternalLink data={data} {...props} />
    case 'DatoCmsExternalLink':
      return <ExternalLink data={data} icon={icon} {...props} />
    default:
      return <Fragment />
  }
}

export default DatoLink
