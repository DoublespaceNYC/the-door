import { css } from '@emotion/react'
import {
  Document,
  StructuredText as IStructuredText,
  Record,
  isParagraph,
} from 'datocms-structured-text-utils'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { darken } from 'polished'
import { StructuredText, renderNodeRule } from 'react-datocms'

import useReadableColor from '../hooks/useReadableColor'
import { ISEO } from '../types'
import Article from './Article'
import { IMediaCarousel } from './ContentCarousel__Media'
import { IGatsbyImageFocused } from './GatsbyImageFocused'
import { IMediaBlock } from './MediaBlock'

interface IArticleImage
  extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
  heroImageData: IGatsbyImageData
}

export interface ITertiaryPage extends Record {
  __typename: 'DatoCmsTertiaryPage'
  title: string
  subheading: IStructuredText
  heroImage?: IArticleImage
  lede: IStructuredText
  body: {
    value: Document
    blocks?: (IMediaBlock | IMediaCarousel)[]
  }
  parentPage: {
    slug: string
  }
  slug: string
  seo?: ISEO
}

interface Props {
  data: ITertiaryPage
  layout: 'Page' | 'Lightbox'
  highlightColor?: string
}

const TertiaryPageContent = ({
  data: { title, subheading, heroImage, lede, body },
  layout,
  highlightColor,
}: Props): JSX.Element => {
  const readableHighlight = useReadableColor(
    highlightColor || '#000',
    layout === 'Lightbox' ? '#f2f2f2' : '#fff'
  )
  const styles = {
    subheading: css`
      margin: 0 0 0.5em;
      line-height: 1.75;
      span {
        display: block;
        color: #666;
        strong {
          color: #444;
        }
      }
      a {
        color: ${readableHighlight};
        @media (hover: hover) {
          &:hover {
            color: ${darken(0.1, readableHighlight || '#000')};
          }
        }
      }
    `,
  }
  return (
    <Article
      layout={layout}
      title={title}
      subheading={
        <div css={styles.subheading}>
          <StructuredText
            data={subheading}
            customNodeRules={[
              renderNodeRule(isParagraph, ({ children, key }) => {
                return <span key={key}>{children}</span>
              }),
            ]}
          />
        </div>
      }
      heroImage={heroImage}
      lede={lede}
      body={body}
      highlightColor={highlightColor}
    />
  )
}

export default TertiaryPageContent

export interface ITertiaryLink extends Record {
  __typename: 'DatoCmsTertiaryLink'
  id: string
  linkText: string
  link: ITertiaryPage
}
