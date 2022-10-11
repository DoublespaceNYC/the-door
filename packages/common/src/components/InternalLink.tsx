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

const InternalLink = ({ data, ...props }: Props): JSX.Element => {
  return (
    <Link to={`/${data.link.slug}/`.replace('//', '/')} {...props}>
      <span>{data.linkText}</span>
    </Link>
  )
}

export default InternalLink
