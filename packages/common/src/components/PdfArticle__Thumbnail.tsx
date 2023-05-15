import { HTMLAttributes } from 'react'

import useLocalFileUrl from '../hooks/useLocalFileUrl'
import ArticleThumbnail, { IArticleThumbnailLayout } from './Article__Thumbnail'
import { IPdfArticle } from './PdfArticle'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  article: IPdfArticle
  layout: IArticleThumbnailLayout
  highlightColor?: string
}

const PdfArticleThumbnail = ({
  article,
  layout,
  highlightColor,
  ...props
}: Props): JSX.Element => {
  const localFileUrl = useLocalFileUrl(article.pdf.localFileId)
  return (
    <a
      href={localFileUrl || article.pdf.url}
      target="__blank"
      rel="noopener"
      css={{ textDecoration: 'none' }}
      {...props}
    >
      <ArticleThumbnail
        article={article}
        layout={layout}
        highlightColor={highlightColor}
      />
    </a>
  )
}

export default PdfArticleThumbnail
