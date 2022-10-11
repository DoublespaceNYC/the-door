import { graphql } from 'gatsby'
import {
  Fragment,
  HTMLAttributes,
  SyntheticEvent,
  useState,
} from 'react'

import Lightbox from './Lightbox'
import { ILightboxContent } from './LightboxContent'

export interface ILightboxLink {
  __typename: 'DatoCmsLightboxLink'
  id: string
  linkText: string
  link: ILightboxContent
}

interface Props extends HTMLAttributes<HTMLElement> {
  data: ILightboxLink
}

const LightboxLink = ({
  data: { linkText, link },
  ...props
}: Props): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [entry, setEntry] = useState<{
    title: string
    path: string
  } | null>(null)

  const handleOpen = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setEntry({
      title: document.title,
      path: window.location.pathname,
    })
    setTimeout(() => {
      setOpen(true)
    }, 10)
  }

  return (
    <Fragment>
      <a href={`/${link.slug}/`} onClick={handleOpen} {...props}>
        {linkText}
      </a>
      <Lightbox
        data={link}
        open={open}
        onClose={() => setOpen(false)}
        entry={entry}
      />
    </Fragment>
  )
}

export const LightboxLinkFragment = graphql`
  fragment LightboxLinkFragment on DatoCmsLightboxLink {
    __typename
    id: originalId
    linkText
    link {
      ...LightboxContentFragment
    }
  }
`

export default LightboxLink
