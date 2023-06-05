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
  data: ILightboxContent
  slugPrefix?: string | null
  pageTitle?: string
  highlightColor?: string
}

const LightboxLink = ({
  data,
  link,
  slugPrefix,
  pageTitle,
  highlightColor,
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
  const slug = `/${slugPrefix || ''}/${data.slug}/`.replace(/\/{2,}/g, '/')
  return (
    <Fragment>
      <a
        href={slug}
        onClick={handleOpen}
        css={{ textDecoration: 'none' }}
        {...props}
      >
        {link}
      </a>
      <Lightbox
        data={data}
        open={open}
        onClose={() => setOpen(false)}
        entry={entry}
        slug={slug}
        pageTitle={pageTitle}
        layout={data.__typename === 'DatoCmsFormLightbox' ? 'Centered' : 'Full'}
        highlightColor={highlightColor}
      />
    </Fragment>
  )
}

export default LightboxLink
