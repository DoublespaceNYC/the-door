import { css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { GatsbyImage } from 'gatsby-plugin-image'

import { absoluteFill, mq } from '../theme/mixins'
import { IArticle } from '../types'

type Props = {
  article: IArticle
  layout: 'Featured' | 'Grid' | 'Carousel'
  colors?: {
    title?: string
    category?: string
    date?: string
    excerpt?: string
    bg?: string
    shadow?: string
    shadowHover?: string
  }
  css?: CSSInterpolation
}

const ArticleThumbnail = ({
  article,
  layout,
  colors,
  ...props
}: Props) => {
  const date = new Date(article.meta.createdAt)
  const featured = layout === 'Featured'
  const grid = layout === 'Grid'
  const carousel = layout === 'Carousel'
  const styles = {
    container: css`
      position: relative;
      display: grid;
      grid-template-columns: ${featured ? '1fr 1fr' : '1fr'};
      grid-column-gap: var(--gtr-m);
      background: ${colors?.bg || '#fff'};
      justify-items: flex-start;
      cursor: pointer;
      ${colors?.shadow &&
      css`
        box-shadow: -1rem 1rem 0 ${colors?.shadow};
        transition: box-shadow 300ms ease;
        &:hover {
          box-shadow: -1rem 1rem 0 ${colors.shadowHover};
        }
      `};
      ${mq().s} {
        grid-template-columns: ${grid ? '1fr 1fr' : '1fr'};
      }
    `,
    text: css`
      display: flex;
      flex-direction: column;
      padding: ${featured
        ? '2.5em var(--gtr-m) 2.5em 0'
        : '1rem 1em 1.5em'};
      ${mq().s} {
        padding: ${grid
          ? '1.5em var(--gtr-m) 2.5em 0'
          : '1rem 1em 1.5em'};
      }
      z-index: 1;
      h3 {
        order: 2;
        font-size: var(--fs-${featured ? '36' : '24'});
        color: ${colors?.title || '#444'};
        margin: 0.125em 0 0;
        line-height: 1;
        ${mq().s} {
          font-size: var(--fs-${featured ? '48' : '30'});
        }
      }
      h4 {
        font-size: var(--fs-${featured ? '15' : '14'});
        text-transform: uppercase;
        font-weight: 500;
        display: inline-block;
        color: ${colors?.date || '#888'};
        margin: 0;
        &:nth-of-type(1) {
          margin-right: 0.75em;
          color: ${colors?.category || '#444'};
        }
      }
    `,
    details: css`
      order: 1;
    `,
    excerpt: css`
      order: 4;
      margin-top: 0.5em;
      color: ${colors?.excerpt || '#666'};
      line-height: 1.5;
    `,
    imageWrap: css`
      position: relative;
      z-index: 1;
      overflow: hidden;
      ${featured &&
      css`
        min-height: 100%;
        ${mq().s} {
        }
      `}
    `,
    image: css`
      transition: transform 500ms ease;
      min-height: 100%;
      div:hover > div > & {
        transform: scale3d(1.05, 1.05, 1);
      }
    `,
  }
  return (
    <div css={styles.container} {...props}>
      <div css={styles.imageWrap}>
        <GatsbyImage
          css={styles.image}
          image={article.heroImage.thumbnailImageData}
          alt={article.heroImage.alt || article.title}
        />
      </div>
      <div css={styles.text}>
        <h3>{article.title}</h3>
        <div css={styles.details}>
          <h4>{article.category}</h4>
          <h4>
            {date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'America/New_York',
            })}
          </h4>
        </div>
        {featured && <p css={styles.excerpt}>{article.excerpt}</p>}
      </div>
    </div>
  )
}

export default ArticleThumbnail
