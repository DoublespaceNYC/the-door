import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { Document } from 'datocms-structured-text-utils'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { darken } from 'polished'
import { Fragment, HTMLAttributes, ReactNode } from 'react'
import { StructuredText } from 'react-datocms'

import GatsbyImageFocused, {
  IGatsbyImageFocused,
} from '../components/GatsbyImageFocused'
import useReadableColor from '../hooks/useReadableColor'
import { aspectRatio, baseGrid, mq } from '../theme/mixins'
import { renderDescription } from '../utils'
import BlackbaudForm, { IBlackbaudForm } from './BlackbaudForm'
import MediaCarousel, { IMediaCarousel } from './ContentCarousel__Media'
import Form, { IForm } from './Form'
import ImageBlock, { IImageBlock } from './ImageBlock'
import { ITheme } from './Layout'
import VideoBlock, { IVideoBlock } from './VideoBlock'

interface IHeroImage extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
  heroImageData: IGatsbyImageData
}

interface Props extends HTMLAttributes<HTMLElement> {
  layout: 'Page' | 'Lightbox' | 'Calendar'
  title: string
  eyebrow?: ReactNode
  subheading?: ReactNode
  heroImage?: IHeroImage
  lede?: {
    value: Document
  }
  body: {
    value: Document
    blocks?: (IImageBlock | IVideoBlock | IMediaCarousel)[]
  }
  form?: IForm | IBlackbaudForm
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
  const theme = useTheme() as ITheme

  const readableHighlight = useReadableColor(
    highlightColor || theme.secondary,
    layout === 'Lightbox' ? theme.gray95 : '#fff'
  )
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
      ${layout === 'Calendar' &&
      css`
        --grid-w: 50vw;
      `}
      overflow: hidden;
    `,
    hero: css`
      grid-column: 1 / -1;
      margin-bottom: var(--row-s);
      min-height: 18em;
      ${aspectRatio(8 / 3)}
      > [data-gatsby-image-wrapper] {
        height: 100%;
      }
    `,
    title: css`
      grid-column: 2 / -2;
      font-size: var(--fs-108);
      justify-self: flex-start;
      color: ${highlightColor || theme.secondary};
      line-height: 1;
      margin: 0 0 0.125em;
      ${mq().s} {
        font-size: var(--fs-72);
      }
      ${form &&
      css`
        font-size: ${layout === 'Lightbox' ? `var(--fs-60)` : `var(--fs-72)`};
        margin-bottom: 0;
      `}
      ${layout === 'Calendar' &&
      css`
        font-size: var(--fs-72);
      `}
    `,
    eyebrow: css`
      grid-column: 2 / -2;
      margin: 0 0 0.5em;
      text-transform: uppercase;
      font-weight: 500;
      color: #888;
    `,
    subheading: css`
      grid-column: 2 / -2;
      font-size: var(--fs-16);
      font-family: var(--body-font);
      font-weight: 500;
      color: #888;
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
        font-size: var(--fs-36);
        line-height: 1.125;
        text-transform: uppercase;
        margin-bottom: 0.25em;
        /* :first-child */
        margin-top: 1em;
      }
      > *:not(style) + h2 {
        margin-top: 0.5em;
      }
      > p + h2,
      > ul + h2,
      > ol + h2 {
        margin-top: 1em;
      }
      > h3 {
        font-size: var(--fs-24);
        font-family: var(--body-font);
        font-weight: 500;
        line-height: 1.25;
        margin-bottom: 0.5em;
        margin-top: 1.25em;
      }
      > h2 + h3 {
        margin-top: 0.75em;
      }
      > ul + h3,
      > ol + h3 {
        margin-top: 0;
      }
      > h4 {
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
      > p {
        line-height: 1.75;
      }
      > ul,
      > ol {
        line-height: 1.5;
      }
      > p,
      > ul,
      > ol {
        margin-bottom: 0.5em;
        /* first-child */
        margin-top: 1.5em;
      }
      > *:not(style) + p {
        margin-top: 0.5em;
      }
      > *:not(style) + ul,
      > *:not(style) + ol {
        margin-top: 0;
      }
      > *:last-child {
        margin-bottom: 0;
      }
      a {
        color: ${readableHighlight};
        @media (hover: hover) {
          &:hover {
            color: ${darken(0.1, readableHighlight)};
          }
        }
      }
      ${layout === 'Lightbox' &&
      form &&
      css`
        > p,
        > ul,
        > ol {
          /* :first-child */
          margin-top: 1em;
        }
        > *:not(style) + p,
        > *:not(style) + ul,
        > *:not(style) + ol {
          margin-top: 0.5em;
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
      ${layout === 'Page' &&
      css`
        max-width: 90ch;
      `}
    `,
  }
  return (
    <article
      css={styles.article}
      {...props}
    >
      {heroImage && (
        <GatsbyImageFocused
          css={styles.hero}
          image={heroImage.heroImageData}
          alt={heroImage.alt}
          focalPoint={heroImage.focalPoint}
          originalAspectRatio={heroImage.sizes.aspectRatio}
          aspectRatio={16 / 9}
        />
      )}
      {eyebrow && <div css={styles.eyebrow}>{eyebrow}</div>}
      <h1 css={styles.title}>{title}</h1>
      {subheading && <div css={styles.subheading}>{subheading}</div>}
      {lede && renderDescription(lede)?.length && (
        <div css={styles.lede}>
          <StructuredText data={lede} />
        </div>
      )}
      {/* {body.value && (
        <div css={styles.body}>
          <StructuredText
            data={body}
            renderBlock={({ record }) => {
              switch (record.__typename) {
                case 'DatoCmsImageBlock':
                  return (
                    <ImageBlock
                      css={styles.mediaBlock}
                      data={record}
                      highlightColor={highlightColor}
                      layout={layout}
                    />
                  )
                case 'DatoCmsVideoBlock':
                  return (
                    <VideoBlock
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
      )} */}
      {form?.__typename === 'DatoCmsForm' ? (
        <Form
          data={form}
          css={styles.form}
          theme="Light"
          layout={
            layout === 'Page' || layout === 'Lightbox' ? layout : undefined
          }
          highlightColor={highlightColor}
        />
      ) : (
        form?.__typename === 'DatoCmsBlackbaudForm' && (
          <BlackbaudForm
            data={form}
            css={styles.form}
            highlightColor={highlightColor}
          />
        )
      )}
    </article>
  )
}

export default Article
