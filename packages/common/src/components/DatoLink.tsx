import { CSSInterpolation } from '@emotion/serialize'
import { Record } from 'datocms-structured-text-utils'
import { Link } from 'gatsby'
import { Fragment } from 'react'

export interface IInternalLink extends Record {
  __typename: 'DatoCmsInternalLink'
  linkText: string
  link: {
    slug: string
  }
}

export interface IExternalLink extends Record {
  __typename: 'DatoCmsExternalLink'
  linkText: string
  url: string
}

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
    'DatoCmsAssetLink',
    'DatoCmsLightboxLink',
  ].some(x => x === record.__typename)
}

type Props = {
  link: IDatoLink
  css?: CSSInterpolation
}

const DatoLink = ({ link, ...props }: Props) => {
  if (link.__typename === 'DatoCmsInternalLink') {
    return (
      <Link to={`/${link.link.slug}/`.replace('//', '/')} {...props}>
        <span>{link.linkText}</span>
      </Link>
    )
  }
  if (link.__typename === 'DatoCmsExternalLink') {
    return (
      <a href={link.url} rel="noreferrer" target="_blank" {...props}>
        <span>{link.linkText}</span>
      </a>
    )
  }
  return <Fragment />
}

export default DatoLink
