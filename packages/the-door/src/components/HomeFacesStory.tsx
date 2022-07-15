import { css } from '@emotion/react'
import { toSlug } from '@the-door/common/src/helpers'
import { linkStyle } from '@the-door/common/src/theme/mixins'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'

import { colors } from '../theme/variables'
import { IStory } from '../types'

type Props = {
  story: IStory
}

const HomeFacesStory = ({ story }: Props) => {
  const { ref, inView } = useInView({
    rootMargin: '50% -20%',
  })

  const styles = {
    story: css`
      width: calc(100vw - var(--margin) * 4);
      display: grid;
      grid-template-columns: 1fr;
    `,
    text: css`
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      align-self: center;
      justify-self: flex-start;
      z-index: 2;
      width: 50ch;
      min-width: 40%;
      background: ${colors.purpleLight}e0;
      padding: 0 var(--gtr-m);
      overflow: hidden;
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
    image: css`
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      align-self: stretch;
      justify-self: flex-end;
      max-width: 67%;
      z-index: 1;
      transition: opacity 300ms ease-out;
      opacity: 0.25;
      ${inView &&
      css`
        opacity: 1;
        transition-delay: 300ms;
        transition-duration: 750ms;
      `}
    `,
  }
  return (
    <div css={styles.story} ref={ref}>
      <GatsbyImage
        css={styles.image}
        image={story.image.carouselImageData}
        alt={story.image.alt || story.title}
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
