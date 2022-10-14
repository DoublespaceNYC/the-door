import { HTMLAttributes } from 'react'

import ArticleThumbnail, {
  IArticleThumbnailLayout,
} from './Article__Thumbnail'
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
      content={article}
      link={
        <ArticleThumbnail
          article={article}
          layout={layout}
          highlightColor={highlightColor}
        />
      }
      css={{ textDecoration: 'none' }}
      {...props}
    />
  )
}

export default InternalArticleThumbnail
