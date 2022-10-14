import { HTMLAttributes } from 'react'

import ArticleThumbnail, {
  IArticleThumbnailLayout,
} from './Article__Thumbnail'
import { IExternalArticle } from './ExternalArticle'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  article: IExternalArticle
  layout: IArticleThumbnailLayout
  highlightColor?: string
}

const ExternalArticleThumbnail = ({
  article,
  layout,
  highlightColor,
  ...props
}: Props): JSX.Element => {
  return (
    <a
      href={article.url}
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

export default ExternalArticleThumbnail
