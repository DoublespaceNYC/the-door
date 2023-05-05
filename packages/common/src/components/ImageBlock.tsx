import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { render } from 'datocms-structured-text-to-plain-text'
import {
  StructuredText as IStructuredText,
  Record,
} from 'datocms-structured-text-utils'
import { darken, rgba } from 'polished'
import { HTMLAttributes } from 'react'
import { StructuredText } from 'react-datocms'
import { useInView } from 'react-intersection-observer'

import { mq } from '../theme/mixins'
import GatsbyImageFocused, { IGatsbyImageFocused } from './GatsbyImageFocused'
import { ITheme } from './Layout'

export interface IImageBlock extends Record {
  __typename: 'DatoCmsImageBlock'
  caption: IStructuredText
  image: IGatsbyImageFocused
}
interface Props extends HTMLAttributes<HTMLElement> {
  data: IImageBlock
  highlightColor?: string
  layout: 'Page' | 'Lightbox' | 'Calendar'
}

const ImageBlock = ({
  data: { image, caption },
  highlightColor,
  layout,

  ...props
}: Props): JSX.Element => {
  const { inView, ref } = useInView({
    rootMargin: '50% -20%',
  })

  const theme = useTheme() as ITheme

  const styles = {
    block: css`
      display: grid;
      align-self: center;
      grid-template-columns: 1fr;
      margin: 0 0 var(--shadow-offset);
      padding: 0;
      filter: drop-shadow(
        calc(-1 * var(--shadow-offset)) var(--shadow-offset) 0
          ${rgba(theme.primary, 0.15)}
      );
    `,
    media: css`
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      align-self: center;
      justify-self: flex-start;
      display: flex;
      width: 100%;
      max-width: 75%;
      z-index: 1;
      transition: opacity 300ms ease-out;
      opacity: 0.333;
      ${inView &&
      css`
        opacity: 1;
        transition-delay: 300ms;
        transition-duration: 750ms;
      `}
      ${mq().m} {
        max-width: 100%;
      }
      ${layout === 'Calendar' &&
      css`
        max-width: 100%;
      `}
    `,
    caption: css`
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      align-self: center;
      justify-self: flex-end;
      z-index: 2;
      width: calc(25% + var(--gtr-m));
      background: ${layout === 'Lightbox' ? '#fff' : theme.gray95};
      padding: 1em 1.5em;
      overflow: hidden;
      box-sizing: border-box;
      color: #444;
      ${mq().m} {
        grid-row: 2 / 3;
        padding: 0.5em 1.25em;
        width: 100%;
        align-self: flex-start;
        justify-self: flex-start;
      }
      ${layout === 'Calendar' &&
      css`
        grid-row: 2 / 3;
        padding: 0.5em 1.25em;
        width: 100%;
        align-self: flex-start;
        justify-self: flex-start;
      `}
      h3 {
        font-family: var(--display-font);
        font-weight: 700;
        font-size: var(--fs-21);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        line-height: 1.125;
        margin: 0.5em 0;
        ${mq().s} {
          font-size: var(--fs-18);
        }
      }
      p {
        font-size: var(--fs-15);
        line-height: 1.5;
        margin: 0.5em 0;
        ${mq().s} {
          font-size: var(--fs-14);
        }
      }
      a {
        color: ${highlightColor || theme.secondary};
        &:hover {
          color: ${darken(0.1, highlightColor || theme.secondary)};
        }
      }
      > div {
        transition: opacity 500ms ease, transform 750ms ease;
        transition-delay: 1000ms;
        opacity: 0;
        transform: translate3d(-6rem, 0, 0);
        ${inView &&
        css`
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-delay: 300ms;
        `}
      }
    `,
  }
  return (
    <figure
      css={styles.block}
      ref={ref}
      {...props}
    >
      <GatsbyImageFocused
        css={[styles.media]}
        image={image.gatsbyImageData}
        alt={image.alt || render(caption.value) || ''}
        focalPoint={image.focalPoint}
        aspectRatio={3 / 2}
        originalAspectRatio={image.sizes.aspectRatio}
      />
      <figcaption css={styles.caption}>
        <div>
          <div>
            <StructuredText data={caption} />
          </div>
        </div>
      </figcaption>
    </figure>
  )
}

export default ImageBlock
