import { Record } from 'datocms-structured-text-utils'
import { navigate } from 'gatsby'
import { HTMLAttributes, MouseEvent } from 'react'

export interface IInternalLinkFiltered extends Record {
  __typename: 'DatoCmsInternalLinkFiltered'
  linkText: string
  link: {
    slug: string
  }
  filter: string
}

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  data: IInternalLinkFiltered
}

const InternalLinkFiltered = ({
  data,
  children,
  ...props
}: Props): JSX.Element => {
  const searchParams = new URLSearchParams()
  searchParams.set('filter', data.filter)
  const url =
    `/${data.link.slug}/`.replace(/\/{2,}/g, '/') +
    '?' +
    searchParams.toString()
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(url, { state: { filter: data.filter } })
    props.onClick && props.onClick(e)
  }
  return (
    <a
      href={url}
      {...props}
      onClick={handleClick}
    >
      {children}
      <span>{data.linkText}</span>
    </a>
  )
}

export default InternalLinkFiltered
