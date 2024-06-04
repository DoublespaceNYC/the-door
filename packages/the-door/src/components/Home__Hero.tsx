import { css } from '@emotion/react'
import AnimateIn from '@the-door/common/src/components/AnimateIn'
import DatoLink, {
  IDatoLink,
} from '@the-door/common/src/components/DatoLink'
import VideoStreamPlayer from '@the-door/common/src/components/VideoStreamPlayer'
import {
  absoluteFill,
  animateIn,
  baseGrid,
  bezier,
  mq,
} from '@the-door/common/src/theme/mixins'
import { Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { colors } from '../theme/variables'

type Props = {
  heading: string
  ctaText: string
  ctaLink: IDatoLink
  video: {
    video: {
      streamingUrl: string
      thumbnailUrl: string
    }
    customData?: {
      thumbnailTime?: string
    }
  }
}

const HomeHero = ({
  heading,
  ctaText,
  ctaLink,
  video,
}: Props): JSX.Element => {
  const { ref: videoRef, inView: videoInView } = useInView({
    initialInView: true,
  })
  const [isPlaying, setPlaying] = useState(videoInView)
  useEffect(() => {
    if (!document.hidden) {
      setPlaying(videoInView)
    } else {
      setPlaying(false)
    }
  }, [videoInView])

  const styles = {
    section: css`
      ${baseGrid}
      grid-template-rows: 1fr auto;
      min-height: max(
        50vw,
        calc(100vh - 1.5 * var(--fs-48) - var(--row-s))
      );
      padding: calc(var(--row-ll) * 2) 0 calc(var(--row-m) + 2em);
      box-sizing: border-box;
      color: ${colors.navy};
      background: ${colors.navyDark};
      ${mq().s} {
        min-height: calc(85vh - 1.5 * var(--fs-48) - var(--row-m));
        padding: var(--row-ll) 0 var(--row-ll);
        align-items: flex-end;
      }
    `,
    video: css`
      ${absoluteFill};
      background: ${colors.navyDark};
      height: calc(100% + 2px);
      top: -1px;
      bottom: -1px;
      object-fit: cover;
      opacity: 0;
      animation: ${animateIn} 1000ms ${bezier.easeOut} forwards 300ms;
    `,
    text: css`
      grid-column: 2 / -2;
      justify-self: flex-start;
      align-self: flex-end;
      h1,
      h2 {
        line-height: 1.125;
        margin-left: var(--gtr-m);
        > span {
          display: inline-block;
          overflow: visible;
          position: relative;
          > span {
            position: relative;
            z-index: 1;
          }
          &::before {
            content: '';
            position: absolute;
            background: #fff;
            z-index: 0;
            width: calc(100% + 2 * var(--gtr-m));
            height: 1em;
            left: calc(-1 * var(--gtr-m));
            top: 50%;
            transform: translateY(-50%);
            z-index: 0;
          }
        }
      }
      h1 {
        font-size: calc(var(--fs-108) * 1.125);
        margin-top: 0;
        margin-bottom: 0.167em;
        max-width: 14ch;
        ${mq().s} {
          font-size: var(--fs-84);
        }
      }
      h2 {
        font-size: var(--fs-24);
        margin-top: 0.667em;
        margin-bottom: 0;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        color: ${colors.pink};
        > span::before {
          height: 2em;
        }
      }
    `,
    link: css`
      text-underline-offset: 3px;
      text-decoration-thickness: 2px;
      /* margin-left: 0.25em; */
      color: inherit;
      &:hover {
        color: ${colors.navy};
      }
    `,
  }
  return (
    <section
      css={styles.section}
      ref={videoRef}
    >
      <VideoStreamPlayer
        css={styles.video}
        src={video.video.streamingUrl}
        thumbnail={`${video.video.thumbnailUrl}?time=${
          video.customData?.thumbnailTime || 0
        }`}
        autoPlay
        playsInline
        muted
        loop
        playing={isPlaying}
      />
      <AnimateIn
        css={styles.text}
        delay={300}
      >
        <h1>
          {heading.split(/[\s]/).map((word, i) => (
            <Fragment key={i}>
              <span>
                <span>{word}</span>
              </span>{' '}
            </Fragment>
          ))}
        </h1>
        <h2>
          <span>
            <span>{ctaText}</span>
          </span>
          &#8194;
          <span>
            <span>
              <DatoLink
                data={ctaLink}
                css={styles.link}
              />
            </span>
          </span>
        </h2>
      </AnimateIn>
    </section>
  )
}

export default HomeHero
