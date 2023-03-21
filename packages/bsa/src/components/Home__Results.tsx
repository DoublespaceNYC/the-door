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
import { StructuredText as IStructuredText } from 'datocms-structured-text-utils'
import { StructuredText } from 'react-datocms/structured-text'

import { colors } from '../theme/variables'

interface Props {
  heading: string
  body: IStructuredText
  cta: IDatoLink[]
  image: IGatsbyImageFocused
}

const HomeResults = ({
  heading,
  body,
  cta,
  image,
}: Props): JSX.Element => {
  const styles = {
    section: css`
      ${baseGrid}
      grid-template-rows: auto;
      color: ${colors.bsaBlue};
      background: linear-gradient(
        to bottom right,
        ${colors.gray95},
        ${colors.gray85}
      );
      padding-bottom: var(--row-l);
      ${mq().s} {
        padding-bottom: var(--row-m);
      }
    `,
    decoration: css`
      position: absolute;
      width: calc(100% + var(--gtr-s));
      height: 100%;
      grid-column: 1 / span 7;
      grid-row: 2 / 5;
      background: ${colors.gray85};
      ${mq().ms} {
        height: calc(100% - 2em);
        top: 2em;
      }
      ${mq().ms} {
        grid-row: 3 / 5;
        height: calc(100% + 2em);
        top: -2em;
      }
    `,
    heading: css`
      position: relative;
      grid-column: span 6 / -2;
      grid-row: 1 / 2;
      font-size: var(--fs-108);
      line-height: 1;
      margin-top: var(--row-l);
      margin-bottom: 0.125em;
      margin-left: var(--gtr-s);
      ${mq().ms} {
        grid-column: 2 / -2;
        margin-bottom: 0.333em;
      }
    `,
    body: css`
      position: relative;
      grid-column: span 6 / -2;
      grid-row: 2 / 3;
      line-height: 1.5;
      margin-bottom: var(--row-ll);
      margin-left: var(--gtr-s);
      max-width: 50ch;
      p {
        &:first-of-type {
          mark {
            display: block;
            float: left;
            font-size: 300%;
            font-weight: 700;
            color: inherit;
            background: none;
            line-height: 1;
            font-family: var(--display-font);
            margin-right: 0.25em;
          }
        }
      }
      ul {
        padding-left: 1em;
        margin: 2em 0;
        li {
          padding-left: 0.25em;
          font-size: var(--fs-21);
          font-family: var(--display-font);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          ::marker {
            color: ${colors.bsaGold};
          }
          p {
            margin: 0.75em 0;
          }
        }
      }
      ${mq().s} {
        grid-column: 2 / -2;
        margin-bottom: 3em;
      }
    `,
    cta: css`
      ${linkStyle}
      display: block;
      color: inherit;
      margin-top: 2em;
      @media (hover: hover) {
        &:hover {
          color: ${colors.bsaGoldMid};
        }
      }
    `,
    image: css`
      position: relative;
      grid-column: 2 / span 6;
      grid-row: 1 / 4;
      margin: var(--row-m) 0;
      max-height: 75vw;
      ${mq().ms} {
        grid-row: 2 / 4;
        margin: 0;
      }
      ${mq().s} {
        grid-row: 3 / 4;
        grid-column: 4 / span 10;
        height: 90vw;
        max-height: none;
      }
    `,
    imageInner: css`
      ${absoluteFill}
    `,
  }
  return (
    <section css={styles.section}>
      <div css={styles.decoration} />
      <AnimateIn
        as="h2"
        css={styles.heading}
      >
        {heading}
      </AnimateIn>
      <AnimateIn css={styles.body}>
        <StructuredText data={body.value} />
        <DatoLink
          data={cta[0]}
          css={styles.cta}
          highlightColor={colors.bsaGold}
        />
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

export default HomeResults
