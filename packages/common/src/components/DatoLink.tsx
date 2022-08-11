import { CSSInterpolation } from '@emotion/serialize'
import { Link } from 'gatsby'
import { Fragment } from 'react'

import { IAssetLink, IExternalLink, IInternalLink } from '../types'

export type IDatoLink = IInternalLink | IExternalLink | IAssetLink

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
