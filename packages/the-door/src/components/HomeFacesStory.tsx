import { css } from '@emotion/react'
import GatsbyImageFocused from '@the-door/common/src/components/GatsbyImageFocused'
import { toSlug } from '@the-door/common/src/helpers'
import { linkStyle, mq } from '@the-door/common/src/theme/mixins'
import { Link } from 'gatsby'
import { rgba } from 'polished'
import { useInView } from 'react-intersection-observer'

import { colors } from '../theme/variables'
import { IStory } from '../types'

type Props = {
  story: IStory
}

const HomeFacesStory = ({ story }: Props): JSX.Element => {
  const { ref, inView } = useInView({
    rootMargin: '50% -20%',
  })

  const styles = {
    story: css`
      width: calc(100vw - var(--margin) * 4);
      display: grid;
      grid-template-columns: 1fr;
      ${mq().m} {
        grid-template-rows: auto var(--row-m) auto;
      }
    `,
    text: css`
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      align-self: center;
      justify-self: flex-start;
      z-index: 2;
      max-width: 30ch;
      min-width: 40%;
      background: ${rgba(colors.purpleLight, 0.875)};
      padding: 0 var(--gtr-m);
      overflow: hidden;
      box-sizing: border-box;
      margin: 2rem 0;
      ${mq().m} {
        grid-row: 2 / 4;
        max-width: calc(100% - var(--gtr-m));
      }
      h3 {
        font-size: var(--fs-48);
        margin: 0.67em 0 0.5em;
        line-height: 1;
      }
      p {
        line-height: 1.5;
      }
      > div {
        transition: opacity 500ms ease, transform 750ms ease;
        transition-delay: 1000ms;
        opacity: 0;
        transform: translate3d(6rem, 0, 0);
        ${inView &&
        css`
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-delay: 300ms;
        `}
      }
    `,
    cta: css`
      ${linkStyle}
      display: block;
      color: #fff;
      margin: 1.25em 0 2em;
      max-width: fit-content;
      &:hover {
        color: ${colors.yellow};
      }
    `,
    imageWrap: css`
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      align-self: stretch;
      justify-self: flex-end;
      max-width: 67%;
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
        max-width: calc(100% - 2 * var(--gtr-m));
      }
    `,
    image: css`
      min-height: 100%;
    `,
  }
  return (
    <div css={styles.story} ref={ref}>
      <GatsbyImageFocused
        css={styles.imageWrap}
        gatsbyImageCss={styles.image}
        image={story.image.carouselImageData}
        alt={story.image.alt || story.title}
        aspectRatio={3 / 2}
        originalAspectRatio={story.image.sizes.aspectRatio}
        focalPoint={story.image.focalPoint}
      />
      <div css={styles.text}>
        <div>
          <h3>{story.title}</h3>
          <p>{story.excerpt}</p>
          <Link
            css={styles.cta}
            to={`/faces-of-the-door/${toSlug(story.title)}/`}
          >
            {story.ctaText}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeFacesStory
