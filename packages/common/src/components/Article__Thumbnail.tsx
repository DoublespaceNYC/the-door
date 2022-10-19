import { css } from '@emotion/react'
import { rgba } from 'polished'
import { Fragment, HTMLAttributes } from 'react'

import useThemeContext from '../context/ThemeContext'
import { mq } from '../theme/mixins'
import { doorColors } from '../theme/variables'
import { IExternalArticle } from './ExternalArticle'
import ExternalLinkIcon from './ExternalLinkIcon'
import GatsbyImageFocused from './GatsbyImageFocused'
import { IInternalArticle } from './InternalArticle'

export type IArticleThumbnailLayout = 'Featured' | 'Grid' | 'Carousel'

interface Props extends HTMLAttributes<HTMLDivElement> {
  article: IInternalArticle | IExternalArticle
  layout: IArticleThumbnailLayout
  highlightColor?: string
}

const ArticleThumbnail = ({
  article,
  layout,
  highlightColor,
  ...props
}: Props): JSX.Element => {
  const date = new Date(article.publicationDate)

  const featured = layout === 'Featured'
  const grid = layout === 'Grid'
  const carousel = layout === 'Carousel'
  const { theme } = useThemeContext()

  const setColors = () => {
    const defaultColors = {
      title: '#444',
      category: highlightColor || '#444',
      date: '#888',
      excerpt: '#666',
      bg: '#fff',
      shadow: rgba('#444', 0.15),
      shadowHover: highlightColor || '#444',
    }
    switch (theme) {
      case 'The Door':
        return {
          ...defaultColors,
          category: highlightColor || doorColors.yellowDark,
          bg: carousel ? doorColors.gray95 : '#fff',
          shadow: rgba(doorColors.navy, 0.15),
          shadowHover: highlightColor || doorColors.yellow,
        }
      default:
        return defaultColors
    }
  }
  const colors = setColors()
  const styles = {
    container: css`
      position: relative;
      display: grid;
      grid-template-columns: ${featured ? '1fr 1fr' : '1fr'};
      grid-template-rows: auto 1fr;
      grid-column-gap: var(--gtr-m);
      min-height: 100%;
      background: ${colors?.bg};
      color: ${colors?.title || '#444'};
      justify-items: flex-start;
      text-decoration: none;
      cursor: pointer;
      box-shadow: calc(-1 * var(--shadow-offset)) var(--shadow-offset) 0
        ${colors?.shadow};
      transition: box-shadow 300ms ease;
      @media (hover: hover) {
        &:hover {
          box-shadow: calc(-1 * var(--shadow-offset-hover))
            var(--shadow-offset-hover) 0 ${colors?.shadowHover};
        }
      }
      ${mq().s} {
        grid-template-columns: ${grid ? '2fr 3fr' : '1fr'};
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
          ? '1em var(--gtr-m) 2.5em 0'
          : '1rem 1em 1.5em'};
      }
      z-index: 1;
      h3 {
        order: 2;
        font-size: var(
          --fs-${featured ? '36' : carousel ? '30' : '24'}
        );
        color: ${colors?.title};
        margin: 0.125em 0 0;
        line-height: 1;
        ${mq().s} {
          font-size: var(--fs-${featured ? '48' : '24'});
        }
      }
    `,
    details: css`
      order: 1;
      h4 {
        font-size: var(--fs-${grid ? '14' : '15'});
        text-transform: uppercase;
        font-weight: 500;
        display: inline-block;
        color: ${colors?.date};
        margin: 0;
        &:nth-of-type(1) {
          color: ${colors?.category};
        }
        ${mq().s} {
          font-size: var(--fs-13);
        }
      }
    `,
    excerpt: css`
      order: 4;
      margin-top: 0.5em;
      color: ${colors?.excerpt};
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
      @media (hover: hover) {
        a:hover > div > & {
          transform: scale3d(1.05, 1.05, 1);
        }
      }
    `,
    icon: css`
      font-size: 90%;
    `,
  }
  return (
    <div css={styles.container} {...props}>
      <GatsbyImageFocused
        css={styles.imageWrap}
        gatsbyImageCss={styles.image}
        image={article.heroImage.thumbnailImageData}
        alt={article.heroImage.alt || article.title}
        originalAspectRatio={article.heroImage.sizes.aspectRatio}
        aspectRatio={16 / 9}
        focalPoint={article.heroImage.focalPoint}
      />
      <div css={styles.text}>
        <h3>{article.title}</h3>
        <div css={styles.details}>
          <h4>
            {article.__typename === 'DatoCmsInternalArticle' &&
              article.category.name}
            {article.__typename === 'DatoCmsExternalArticle' && (
              <Fragment>
                {article.publication}
                &#8196;
                <ExternalLinkIcon css={styles.icon} />
              </Fragment>
            )}
          </h4>
          &#8194;
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
