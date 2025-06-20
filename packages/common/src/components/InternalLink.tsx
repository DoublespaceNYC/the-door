export interface IInternalLink extends Record {
  __typename: 'DatoCmsInternalLink'
  linkText: string
  link: {
    slug: string
  }
}

import { Record } from 'datocms-structured-text-utils'
import { Link } from 'gatsby'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  data: IInternalLink
}

const InternalLink = ({ data, children, ...props }: Props): JSX.Element => {
  return (
    <Link
      to={`/${data.link.slug}/`.replace(/\/{2,}/g, '/')}
      {...props}
    >
      {children}
      <span>{data.linkText}</span>
    </Link>
  )
}

export default InternalLink
