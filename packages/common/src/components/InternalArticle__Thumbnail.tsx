import { HTMLAttributes } from 'react'

import ArticleThumbnail, { IArticleThumbnailLayout } from './Article__Thumbnail'
import { IInternalArticle } from './InternalArticle'
import LightboxLink from './Lightbox__Link'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  article: IInternalArticle
  layout: IArticleThumbnailLayout
  highlightColor?: string
}

const InternalArticleThumbnail = ({
  article,
  layout,
  highlightColor,
  ...props
}: Props): JSX.Element => {
  return (
    <LightboxLink
      slugPrefix="/articles/"
      data={article}
      link={
        <ArticleThumbnail
          article={article}
          layout={layout}
          highlightColor={highlightColor}
        />
      }
      highlightColor={highlightColor}
      {...props}
    />
  )
}

export default InternalArticleThumbnail
