import { css } from '@emotion/react'
import { render } from 'datocms-structured-text-to-plain-text'
import {
  StructuredText as IStructuredText,
  Record,
} from 'datocms-structured-text-utils'
import { darken, rgba } from 'polished'
import { HTMLAttributes } from 'react'
import { StructuredText } from 'react-datocms'
import { useInView } from 'react-intersection-observer'

import useThemeContext from '../context/ThemeContext'
import { mq } from '../theme/mixins'
import { doorColors } from '../theme/variables'
import GatsbyImageFocused, { IGatsbyImageFocused } from './GatsbyImageFocused'
import VideoStreamPlayer from './VideoStreamPlayer'

interface IVideoMedia {
  isImage: false
  video: {
    streamingUrl: string
    thumbnailUrl?: string
  }
}
export interface IMediaBlock extends Record {
  __typename: 'DatoCmsMediaBlock'
  caption: IStructuredText
  asset: IVideoMedia | IGatsbyImageFocused
}
interface Props extends HTMLAttributes<HTMLElement> {
  data: IMediaBlock
  highlightColor?: string
  layout: 'Page' | 'Lightbox' | 'Calendar'
}

const MediaBlock = ({
  data: { asset, caption },
  highlightColor,
  layout,

  ...props
}: Props): JSX.Element => {
  const { inView, ref } = useInView({
    rootMargin: '50% -20%',
  })

  const { theme } = useThemeContext()
  const setColors = () => {
    const defaultColors = {
      textbox: '#f2f2f2',
      shadow: '#44444426',
      text: '#444',
      highlight: highlightColor || '#444',
    }
    switch (theme) {
      case 'The Door':
        return {
          ...defaultColors,
          textbox: layout === 'Lightbox' ? '#fff' : doorColors.gray95,
          shadow: rgba(doorColors.navy, 0.15),
          highlight: highlightColor || doorColors.blue,
        }
      default:
        return defaultColors
    }
  }
  const colors = setColors()
  const styles = {
    block: css`
      display: grid;
      align-self: center;
      grid-template-columns: 1fr;
      margin: 0 0 var(--shadow-offset);
      padding: 0;
      filter: drop-shadow(
        calc(-1 * var(--shadow-offset)) var(--shadow-offset) 0 ${colors.shadow}
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
      background: ${colors.textbox};
      padding: 1em 1.5em;
      overflow: hidden;
      box-sizing: border-box;
      color: ${colors.text};
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
        color: ${colors.highlight};
        &:hover {
          color: ${darken(0.1, colors.highlight)};
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
    <figure css={styles.block} ref={ref} {...props}>
      {asset.isImage ? (
        <GatsbyImageFocused
          css={[styles.media]}
          image={asset.gatsbyImageData}
          alt={asset.alt || render(caption.value) || ''}
          focalPoint={asset.focalPoint}
          aspectRatio={3 / 2}
          originalAspectRatio={asset.sizes.aspectRatio}
        />
      ) : (
        <VideoStreamPlayer
          css={[styles.media]}
          src={asset.video.streamingUrl}
          thumbnail={asset.video.thumbnailUrl}
          playing={!inView ? false : undefined}
          controls
        />
      )}
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

export default MediaBlock
