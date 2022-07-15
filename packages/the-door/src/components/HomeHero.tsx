import { css } from '@emotion/react'
import DatoLink from '@the-door/common/src/components/DatoLink'
import VideoStreamPlayer from '@the-door/common/src/components/VideoStreamPlayer'
import {
  absoluteFill,
  baseGrid,
} from '@the-door/common/src/theme/mixins'
import { IDatoLink } from '@the-door/common/src/types'
import { Fragment } from 'react'

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

const HomeHero = ({ heading, ctaText, ctaLink, video }: Props) => {
  const styles = {
    section: css`
      ${baseGrid}
      grid-template-rows: 1fr auto;
      min-height: 50vw;
      padding: 24rem 0 12rem;
      box-sizing: border-box;
      color: ${colors.navy};
      h1,
      h2 {
        grid-column: 3 / -3;
        position: relative;
        justify-self: flex-start;
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
          &:before {
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
        align-self: flex-end;
        font-size: var(--fs-108);
        margin-top: 0;
        margin-bottom: 0.167em;
        max-width: 15ch;
      }
      h2 {
        font-size: var(--fs-24);
        margin-top: 0;
        margin-bottom: 0;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        color: ${colors.pink};
        > span:before {
          height: 2em;
        }
      }
    `,
    video: css`
      ${absoluteFill}
      object-fit: cover;
    `,
    link: css`
      text-underline-offset: 3px;
      text-decoration-thickness: 2px;
      margin-left: 0.25em;
      color: inherit;
      &:hover {
        color: ${colors.navy};
      }
    `,
  }
  return (
    <section css={styles.section}>
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
      />
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
        </span>{' '}
        <span>
          <span>
            <DatoLink link={ctaLink} css={styles.link} />
          </span>
        </span>
      </h2>
    </section>
  )
}

export default HomeHero
