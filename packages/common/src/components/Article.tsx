import { css } from '@emotion/react'
import { render } from 'datocms-structured-text-to-plain-text'
import {
  Document,
  StructuredText as IStructuredText,
} from 'datocms-structured-text-utils'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { darken } from 'polished'
import { Fragment, HTMLAttributes, ReactNode } from 'react'
import { StructuredText } from 'react-datocms'

import GatsbyImageFocused, {
  IGatsbyImageFocused,
} from '../components/GatsbyImageFocused'
import useThemeContext from '../context/ThemeContext'
import { baseGrid } from '../theme/mixins'
import { doorColors } from '../theme/variables'
import MediaCarousel, { IMediaCarousel } from './ContentCarousel__Media'
import Form, { IForm } from './Form'
import MediaBlock, { IMediaBlock } from './MediaBlock'

interface IHeroImage
  extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
  heroImageData: IGatsbyImageData
}

interface Props extends HTMLAttributes<HTMLElement> {
  layout: 'Page' | 'Lightbox' | 'Calendar'
  title: string
  eyebrow?: ReactNode
  subheading?: ReactNode
  heroImage?: IHeroImage
  lede?: IStructuredText
  body: {
    value: Document
    blocks?: (IMediaBlock | IMediaCarousel)[]
  }
  form?: IForm
  highlightColor?: string
}

const Article = ({
  layout,
  title,
  eyebrow,
  subheading,
  heroImage,
  lede,
  body,
  form,
  highlightColor,
  ...props
}: Props): JSX.Element => {
  const { theme } = useThemeContext()
  const setColors = () => {
    const defaultColors = {
      highlight: '#444',
      highlightHover: '#888',
      text: '#444',
      textLight: '#888',
    }
    switch (theme) {
      case 'The Door':
        return {
          ...defaultColors,
          highlight: highlightColor || doorColors.blue,
          highlightHover: highlightColor
            ? darken(0.1, highlightColor)
            : doorColors.pink,
        }
      default:
        return defaultColors
    }
  }
  const colors = setColors()
  const styles = {
    article: css`
      ${baseGrid}
      padding-bottom: var(--row-l);
      padding-top: ${!heroImage && 'var(--row-m)'};
      ${layout === 'Lightbox' &&
      form &&
      css`
        padding: calc(var(--row-s)) 0;
      `}
    `,
    hero: css`
      grid-column: 1 / -1;
      margin-bottom: var(--row-s);
      min-height: 18em;
      > [data-gatsby-image-wrapper] {
        min-height: 100%;
      }
    `,
    title: css`
      grid-column: 2 / -2;
      font-size: var(--fs-72);
      justify-self: flex-start;
      color: ${colors.highlight};
      line-height: 1.125;
      margin: 0 0 0.125em;
      ${layout === 'Lightbox' &&
      form &&
      css`
        font-size: var(--fs-48);
        margin-bottom: 0;
      `}
    `,
    eyebrow: css`
      grid-column: 2 / -2;
      margin: 0 0 0.5em;
      text-transform: uppercase;
      font-weight: 500;
      color: ${colors.textLight};
    `,
    subheading: css`
      grid-column: 2 / -2;
      font-size: var(--fs-16);
      font-family: var(--body-font);
      font-weight: 500;
      color: ${colors.textLight};
      line-height: 1.25;
      margin-bottom: 0.25em;
    `,
    lede: css`
      grid-column: 2 / -2;
      max-width: 90ch;
      color: #444;
      p {
        font-size: var(--fs-21);
        line-height: 1.75;
        &:last-child {
          margin-bottom: 0.5em;
        }
      }
    `,
    body: css`
      display: contents;
      color: #444;
      max-width: 90ch;
      > h2,
      > h3,
      > h4,
      > p,
      > ul,
      > ol {
        grid-column: 2 / -2;
        max-width: inherit;
      }
      > h2 {
        &:first-child {
          margin-top: 1em;
        }
      }
      > p,
      > ul,
      > ol {
        &:first-child {
          margin-top: 1.5em;
        }
      }
      > *:last-child {
        margin-bottom: 0;
      }
      h2 {
        font-size: var(--fs-36);
        line-height: 1.125;
        text-transform: uppercase;
        margin: 0.5em 0 0.25em;
      }
      > p + h2,
      > ul + h2,
      > ol + h2 {
        margin-top: 1em;
      }
      h3 {
        font-size: var(--fs-24);
        font-family: var(--body-font);
        font-weight: 500;
        line-height: 1.25;
        margin: 1.25em 0 0.5em;
      }
      > h2 + h3 {
        margin-top: 0.75em;
      }
      h4 {
        font-size: var(--fs-16);
        font-family: var(--body-font);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 700;
        line-height: 1.25;
        margin: 1.5em 0 0.5em;
      }
      > h3 + h4 {
        margin-top: 1em;
      }
      p {
        line-height: 1.75;
        margin: 0.5em 0;
      }
      a {
        color: ${colors.highlight};
        @media (hover: hover) {
          &:hover {
            color: ${colors.highlightHover};
          }
        }
      }
      ${layout === 'Lightbox' &&
      form &&
      css`
        > p,
        > ul,
        > ol {
          &:first-child {
            margin-top: 1em;
          }
        }
      `}
    `,
    mediaBlock: css`
      grid-column: 2 / -2;
      margin: 2em 0 2.5em;
    `,
    mediaCarousel: css`
      grid-column: 1 / -1;
      margin: 2em 0 2.5em;
    `,
    form: css`
      grid-column: 2 / -2;
      width: 100%;
      margin: 2em 0 1em;
      max-width: 90ch;
    `,
  }
  return (
    <article css={styles.article} {...props}>
      {heroImage && (
        <GatsbyImageFocused
          css={styles.hero}
          image={heroImage.heroImageData}
          alt={heroImage.alt}
          focalPoint={heroImage.focalPoint}
          originalAspectRatio={heroImage.sizes.aspectRatio}
          aspectRatio={8 / 3}
        />
      )}
      {eyebrow && <div css={styles.eyebrow}>{eyebrow}</div>}
      <h1 css={styles.title}>{title}</h1>
      {subheading && <div css={styles.subheading}>{subheading}</div>}
      {lede?.value && (render(lede.value)?.length || 0) > 0 && (
        <div css={styles.lede}>
          <StructuredText data={lede} />
        </div>
      )}
      {body.value && (
        <div css={styles.body}>
          <StructuredText
            data={body}
            renderBlock={({ record }) => {
              switch (record.__typename) {
                case 'DatoCmsMediaBlock':
                  return (
                    <MediaBlock
                      css={styles.mediaBlock}
                      data={record}
                      highlightColor={highlightColor}
                      layout={layout}
                    />
                  )
                case 'DatoCmsMediaCarousel':
                  return (
                    <MediaCarousel
                      css={styles.mediaCarousel}
                      data={record.media}
                      layout={layout}
                      highlightColor={highlightColor}
                    />
                  )
                default:
                  return <Fragment />
              }
            }}
          />
        </div>
      )}
      {form && (
        <Form
          data={form}
          css={styles.form}
          theme="Light"
          layout={
            layout === 'Page' || layout === 'Lightbox'
              ? layout
              : undefined
          }
          highlightColor={highlightColor}
        />
      )}
    </article>
  )
}

export default Article
