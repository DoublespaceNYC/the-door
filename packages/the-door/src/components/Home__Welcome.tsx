import { css } from '@emotion/react'
import AnimateIn from '@the-door/common/src/components/AnimateIn'
import DatoLink, {
  IDatoLink,
} from '@the-door/common/src/components/DatoLink'
import GatsbyImageFocused, {
  IGatsbyImageFocused,
} from '@the-door/common/src/components/GatsbyImageFocused'
import {
  absoluteFill,
  baseGrid,
  linkStyle,
  mq,
} from '@the-door/common/src/theme/mixins'
import { IStructuredText } from '@the-door/common/src/types'
import { rgba } from 'polished'
import { StructuredText } from 'react-datocms'

import { colors } from '../theme/variables'

type Props = {
  heading: string
  body: IStructuredText
  links: IDatoLink[]
  image: IGatsbyImageFocused
}

const HomeWelcome = ({
  heading,
  body,
  links,
  image,
}: Props): JSX.Element => {
  const styles = {
    section: css`
      ${baseGrid}
      grid-template-rows: 3rem var(--row-m) auto auto auto 4rem;
      margin-top: -3rem;
      color: #fff;
      z-index: 2;
    `,
    decoration: (i: number) => css`
      ${absoluteFill};
      z-index: 0;
      ${i === 0 &&
      css`
        grid-column: 1 / -1;
        grid-row: 2 / 6;
        background: linear-gradient(
          to top right,
          ${colors.blueDark},
          ${colors.blue}
        );
      `}
      ${i === 1 &&
      css`
        grid-column: 1 / span 9;
        grid-row: 1 / 2;
        background: ${colors.blueMid};
        ${mq().s} {
          grid-column: 1 / span 12;
        }
      `}
      ${i === 2 &&
      css`
        grid-column: 1 / span 9;
        grid-row: 2 / 4;
        background: ${rgba(colors.blue, 0.6)};
        ${mq().s} {
          grid-column: 1 / span 12;
        }
      `}
      ${i === 3 &&
      css`
        grid-column: span 8 / -1;
        grid-row: 3 / 4;
        background: ${rgba(colors.blueLight, 0.6)};
        height: 6rem;
        top: auto;
        ${mq().m} {
          grid-column: span 7 / -1;
          grid-row: 4 / 6;
          height: calc(100% + 1.5rem);
        }
        ${mq().s} {
          grid-column: span 12 / -1;
          grid-row: 5 / 6;
          height: calc(100% - 2rem);
        }
      `}
      ${i === 4 &&
      css`
        grid-column: span 8 / -1;
        grid-row: 4 / 6;
        background: ${rgba(colors.blue, 0.6)};
        ${mq().m} {
          display: none;
        }
      `}
    `,
    heading: css`
      position: relative;
      grid-column: 2 / span 6;
      grid-row: 3 / 4;
      max-width: 10ch;
      margin-top: var(--row-m);
      font-size: var(--fs-108);
      line-height: 1;
      margin-bottom: 0.25em;
      margin-right: var(--gtr-m);
      ${mq().m} {
        grid-column: 2 / -2;
        grid-row: 2 / 4;
      }
    `,
    body: css`
      position: relative;
      grid-column: 2 / span 5;
      grid-row: 4 / 5;
      margin: 1em 0 var(--row-ll);
      line-height: 1.5;
      ${mq().m} {
        grid-column: 2 / span 6;
      }
      ${mq().s} {
        grid-column: 2 / -2;
        margin: 0 0 2em;
      }
    `,
    links: css`
      margin-top: 1.5em;
    `,
    link: css`
      display: block;
      max-width: fit-content;
      ${linkStyle}
      color: #fff;
      &:hover {
        color: ${colors.pinkLight};
      }
    `,
    image: css`
      grid-column: span 6 / -2;
      grid-row: 3 / 7;
      ${absoluteFill}
      ${mq().m} {
        grid-row: 4 / 7;
      }
      ${mq().s} {
        grid-column: 4 / -2;
        grid-row: 5 / 7;
        height: 90vw;
        position: relative;
      }
    `,
    imageInner: css`
      ${absoluteFill}
    `,
  }
  return (
    <section css={styles.section}>
      {[...Array(5).keys()].map(i => (
        <div
          key={i}
          css={styles.decoration(i)}
        />
      ))}
      <AnimateIn
        as="h2"
        css={styles.heading}
      >
        {heading}
      </AnimateIn>
      <AnimateIn css={styles.body}>
        <StructuredText data={body.value} />
        <div css={styles.links}>
          {links.map((link, i) => (
            <DatoLink
              data={link}
              key={i}
              css={styles.link}
              highlightColor={colors.blue}
            />
          ))}
        </div>
      </AnimateIn>
      <GatsbyImageFocused
        css={styles.image}
        gatsbyImageCss={styles.imageInner}
        image={image.gatsbyImageData}
        alt={image.alt || ''}
        focalPoint={image.focalPoint}
        aspectRatio={4 / 5}
        originalAspectRatio={image.sizes.aspectRatio}
      />
    </section>
  )
}

export default HomeWelcome
