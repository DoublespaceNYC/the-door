import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import {
  Document,
  StructuredText as IStructuredText,
  Record,
} from 'datocms-structured-text-utils'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import { IGatsbyImageFocused } from '../components/GatsbyImageFocused'
import { ISEO } from '../types'
import Article from './Article'
import { IMediaCarousel } from './ContentCarousel__Media'
import { ITheme } from './Layout'
import { IImageBlock } from './ImageBlock'

interface IArticleImage extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
  thumbnailImageData: IGatsbyImageData
  heroImageData: IGatsbyImageData
}

export interface IInternalArticle extends Record {
  __typename: 'DatoCmsInternalArticle'
  title: string
  excerpt: string
  heroImage: IArticleImage
  category: {
    name: string
    pluralName: string
    position: number
  }
  tags: { name: string }[]
  lede: IStructuredText
  body: {
    value: Document
    blocks?: (IImageBlock | IMediaCarousel)[]
  }
  inLatest: boolean
  publicationDate: string
  slug: string
  seo?: ISEO
}

interface Props {
  data: IInternalArticle
  layout: 'Page' | 'Lightbox'
  highlightColor?: string
}

const InternalArticle = ({
  data: { title, heroImage, category, lede, body, publicationDate },
  layout,
  highlightColor,
}: Props): JSX.Element => {
  const date = new Date(publicationDate)
  const theme = useTheme() as ITheme

  const styles = {
    details: css`
      grid-column: 2 / -2;
      margin: 0 0 0.5em;
      span {
        display: inline-block;
        &:nth-of-type(1) {
          margin-right: 0.75em;
          color: ${highlightColor || theme.secondary};
        }
      }
    `,
  }
  return (
    <Article
      layout={layout}
      title={title}
      eyebrow={
        <div css={styles.details}>
          <span>{category.name}</span>
          <span>
            {date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'America/New_York',
            })}
          </span>
        </div>
      }
      heroImage={heroImage}
      lede={lede}
      body={body}
      highlightColor={highlightColor}
    />
  )
}

export default InternalArticle

export interface IInternalArticleLink extends Record {
  __typename: 'DatoCmsInternalArticleLink'
  id: string
  linkText: string
  link: IInternalArticle
}
