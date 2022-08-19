import { CSSInterpolation } from '@emotion/serialize'
import { Record } from 'datocms-structured-text-utils'
import { ReactNode, SyntheticEvent, useEffect } from 'react'
import smoothscroll from 'smoothscroll-polyfill'

import { toSlug } from '../helpers'

export interface IAnchorLink extends Record {
  __typename: 'DatoCmsAnchorLink'
  linkText: string
}

type Props = {
  id: string
  css?: CSSInterpolation
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

type AnchorLinkProps = {
  id: string
  children?: ReactNode
  css?: CSSInterpolation
}

const AnchorLink = ({ id, children, ...props }: AnchorLinkProps) => {
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
  }

  return (
    <a href={`#${slugId}`} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export default AnchorLink
