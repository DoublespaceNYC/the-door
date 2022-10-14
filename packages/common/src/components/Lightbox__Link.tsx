import {
  Fragment,
  HTMLAttributes,
  ReactNode,
  SyntheticEvent,
  useState,
} from 'react'

import Lightbox from './Lightbox'
import { ILightboxContent } from './Lightbox__Content'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  link: ReactNode | string
  content: ILightboxContent
  slugPrefix?: string
}

const LightboxLink = ({
  content,
  link,
  slugPrefix,
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
  const slug = `/${slugPrefix || ''}/${content.slug}/`.replace(
    /\/{2,}/g,
    '/'
  )
  return (
    <Fragment>
      <a href={slug} onClick={handleOpen} {...props}>
        {link}
      </a>
      <Lightbox
        data={content}
        open={open}
        onClose={() => setOpen(false)}
        entry={entry}
        slug={slug}
        layout={
          content.__typename === 'DatoCmsFormLightbox'
            ? 'Centered'
            : 'Full'
        }
      />
    </Fragment>
  )
}

export default LightboxLink
