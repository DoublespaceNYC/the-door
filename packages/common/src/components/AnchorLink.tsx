import { Record } from 'datocms-structured-text-utils'
import {
  HTMLAttributes,
  ReactNode,
  SyntheticEvent,
  useEffect,
} from 'react'
import smoothscroll from 'smoothscroll-polyfill'

import { toSlug } from '../helpers'

export interface IAnchorLink extends Record {
  __typename: 'DatoCmsAnchorLink'
  linkText: string
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  id: string
}

export const Anchor = ({ id, ...props }: Props) => {
  return (
    <div
      css={{
        position: 'relative',
      }}
      {...props}
    >
      <div
        id={toSlug(id)}
        css={{
          position: 'absolute',
          top: `calc(-1 * var(--nav-height))`,
        }}
      />
    </div>
  )
}

interface AnchorLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  id: string
  onClick?: () => void
  children?: ReactNode
}

const AnchorLink = ({
  id,
  children,
  onClick = () => null,
  ...props
}: AnchorLinkProps) => {
  useEffect(() => smoothscroll.polyfill(), [])

  const slugId = toSlug(id)

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault()
    window.history.replaceState(
      null,
      '',
      window.location.pathname + '#' + slugId
    )
    document.getElementById(slugId)?.scrollIntoView({
      behavior: 'smooth',
    })
    onClick()
  }

  return (
    <a href={`#${slugId}`} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export default AnchorLink
