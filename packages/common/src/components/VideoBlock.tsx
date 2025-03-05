import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import {
  StructuredText as IStructuredText,
  Record,
  isEmptyDocument,
} from 'datocms-structured-text-utils'
import { darken, rgba } from 'polished'
import { HTMLAttributes, useState } from 'react'
import { StructuredText } from 'react-datocms'
import { useInView } from 'react-intersection-observer'
import ReactPlayer from 'react-player'

import { absoluteFill, mq } from '../theme/mixins'
import { ITheme } from './Layout'

export interface IVideoBlock extends Record {
  __typename: 'DatoCmsVideoBlock'
  caption: IStructuredText | null | undefined
  video: { url: string; width: number; height: number }
}
interface Props extends HTMLAttributes<HTMLElement> {
  data: IVideoBlock
  highlightColor?: string
  layout: 'Page' | 'Lightbox' | 'Calendar'
}

const VideoBlock = ({
  data: { video, caption },
  highlightColor,
  layout,
  ...props
}: Props): JSX.Element => {
  const { inView, ref } = useInView({
    rootMargin: '50% -20%',
  })

  const theme = useTheme() as ITheme

  const [playing, setPlaying] = useState(false)

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
      position: relative;
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
      > div {
        position: relative;
        min-width: 100%;
        max-height: 0%;
        padding-bottom: ${(video.height / video.width) * 100}%;
        > div {
          ${absoluteFill}
        }
      }
    `,
    caption: css`
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      align-self: center;
      justify-self: flex-end;
      z-index: 2;
      width: calc(25% + ${playing ? '0%' : 'var(--gtr-m)'});
      transition: width 200ms ease-in-out, height 300ms ease;
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
      <div css={styles.media}>
        <ReactPlayer
          url={video.url}
          playing={inView ? playing : false}
          playsinline
          width="auto"
          height="auto"
          controls
          onPlay={() => setPlaying(true)}
          onStart={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      </div>
      {!isEmptyDocument(caption) && (
        <figcaption css={styles.caption}>
          <div>
            <div>
              <StructuredText data={caption} />
            </div>
          </div>
        </figcaption>
      )}
    </figure>
  )
}

export default VideoBlock
