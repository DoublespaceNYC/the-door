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
      color: ${colors.bsaBlue};
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
          to top left,
          ${colors.gray92},
          ${colors.gray95}
        );
      `}
      ${i === 1 &&
      css`
        grid-column: span 9 / -1;
        grid-row: 1 / 2;
        background: ${colors.gray85};
        ${mq().s} {
          grid-column: 1 / span 12;
        }
      `}
      ${i === 2 &&
      css`
        grid-column: span 9 / -1;
        grid-row: 2 / 4;
        background: #fff;
        ${mq().s} {
          grid-column: span 12 / -1;
        }
      `}
      ${i === 3 &&
      css`
        grid-column: 1 / span 7;
        grid-row: 3 / 4;
        background: ${rgba(colors.gray85, 0.8)};
        height: 6rem;
        top: auto;
        ${mq().m} {
          grid-column: 1 / span 6;
          grid-row: 4 / 6;
          height: calc(100% + 1.5rem);
        }
        ${mq().s} {
          grid-column: 1 / span 12;
          grid-row: 5 / 6;
          height: calc(100% - 2rem);
        }
      `}
      ${i === 4 &&
      css`
        grid-column: 1 / span 7;
        grid-row: 4 / 6;
        background: ${rgba(colors.gray66, 0.6)};
        ${mq().m} {
          display: none;
        }
      `}
    `,
    heading: css`
      position: relative;
      grid-column: span 6 / -2;
      grid-row: 3 / 4;
      margin-top: var(--row-m);
      font-size: var(--fs-108);
      line-height: 1;
      margin-bottom: 0.25em;
      ${mq().m} {
        grid-column: 2 / -2;
        grid-row: 2 / 4;
      }
    `,
    body: css`
      position: relative;
      grid-column: span 6 / -2;
      grid-row: 4 / 5;
      margin: 1em 0 var(--row-ll);
      line-height: 1.5;
      max-width: 60ch;
      ${mq().m} {
        grid-column: span 6 / -2;
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
      color: ${colors.bsaBlue};
      &:hover {
        color: ${colors.bsaGoldMid};
      }
    `,
    image: css`
      grid-column: 2 / span 6;
      grid-row: 3 / 7;
      ${absoluteFill}
      width: calc(100% - var(--gtr-s));
      right: auto;
      ${mq().m} {
        grid-row: 4 / 7;
      }
      ${mq().s} {
        grid-column: 2 / -4;
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
              highlightColor={colors.bsaGold}
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
