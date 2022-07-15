import { SerializedStyles } from '@emotion/react'
import { Link } from 'gatsby'
import { Fragment } from 'react'

import { IDatoLink } from '../types'

type Props = {
  link: IDatoLink
  css?: SerializedStyles | SerializedStyles[]
}

const DatoLink = ({ link, ...props }: Props) => {
  if (link.__typename === 'DatoCmsInternalLink') {
    return (
      <Link to={link.url} {...props}>
        <span>{link.linkText}</span>
      </Link>
    )
  }
  if (link.__typename === 'DatoCmsExternalLink') {
    return (
      <a href={link.url} rel="noopener" target="_blank" {...props}>
        <span>{link.linkText}</span>
      </a>
    )
  }
  return <Fragment />
}

export default DatoLink
