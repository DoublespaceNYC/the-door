import { css } from '@emotion/react'
import { render } from 'datocms-structured-text-to-plain-text'
import {
  StructuredText as IStructuredText,
  Record,
} from 'datocms-structured-text-utils'
import { rgba } from 'polished'
import { HTMLAttributes, useMemo } from 'react'
import { StructuredText } from 'react-datocms'
import { useInView } from 'react-intersection-observer'

import useThemeContext from '../context/ThemeContext'
import { mq } from '../theme/mixins'
import { doorColors } from '../theme/variables'
import GatsbyImageFocused, {
  IGatsbyImageFocused,
} from './GatsbyImageFocused'
import VideoStreamPlayer from './VideoStreamPlayer'

interface IVideoMedia {
  isImage: false
  video: {
    streamingUrl: string
    thumbnailUrl?: string
  }
}
export interface ICarouselMediaBlock extends Record {
  __typename: 'DatoCmsCarouselMediaBlock'
  caption: IStructuredText
  media: IVideoMedia | IGatsbyImageFocused
}
interface Props extends HTMLAttributes<HTMLDivElement> {
  data: ICarouselMediaBlock
  highlightColor: string
}
const ContentCarouselMediaBlock = ({
  data,
  highlightColor,
  ...props
}: Props): JSX.Element => {
  const { inView, ref } = useInView({
    rootMargin: '50% -20%',
  })
  const { theme } = useThemeContext()
  const colors = useMemo(() => {
    switch (theme) {
      case 'The Door':
        return {
          gray: doorColors.gray95,
          shadow: rgba(doorColors.navy, 0.15),
          text: '#444',
        }
      default:
        return {
          gray: '#f2f2f2',
          shadow: '#44444426',
          text: '#444',
        }
    }
  }, [theme])
  const styles = {
    block: css`
      display: grid;
      align-self: center;
      grid-template-columns: 1fr;

      filter: drop-shadow(
        calc(-1 * var(--shadow-offset)) var(--shadow-offset) 0
          ${colors.shadow}
      );
      ${mq().m} {
        grid-template-rows: auto var(--gtr-m) auto;
      }
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
        grid-row: 1 / 3;
        max-width: calc(100% - var(--gtr-m));
      }
    `,
    caption: css`
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      align-self: center;
      justify-self: flex-end;
      z-index: 2;
      width: calc(25% + var(--gtr-m));
      background: ${colors.gray};
      padding: 1em 1.5em;
      overflow: hidden;
      box-sizing: border-box;
      color: ${colors.text};
      ${mq().m} {
        grid-row: 2 / 4;
        padding: 0.5em 1.25em;
        width: calc(100% - var(--gtr-m));
        align-self: flex-start;
        ${!data.media.isImage &&
        css`
          grid-row: 3 / 5;
        `}
      }
      h3 {
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
        color: ${highlightColor};
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
    <div css={styles.block} ref={ref} {...props}>
      {data.media.isImage ? (
        <GatsbyImageFocused
          css={[styles.media]}
          image={data.media.gatsbyImageData}
          alt={data.media.alt || render(data.caption.value) || ''}
          focalPoint={data.media.focalPoint}
          aspectRatio={3 / 2}
          originalAspectRatio={data.media.sizes.aspectRatio}
        />
      ) : (
        <VideoStreamPlayer
          css={[styles.media]}
          src={data.media.video.streamingUrl}
          thumbnail={data.media.video.thumbnailUrl}
          playing={!inView ? false : undefined}
          controls
        />
      )}
      <div css={styles.caption}>
        <div>
          <StructuredText data={data.caption} />
        </div>
      </div>
    </div>
  )
}

export default ContentCarouselMediaBlock
