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

const HomeWhyBSA = ({
  heading,
  body,
  cta,
  image,
}: Props): JSX.Element => {
  const styles = {
    section: css`
      ${baseGrid}
      grid-template-rows: auto;
      color: #fff;
      background: linear-gradient(
        to bottom right,
        ${colors.bsaBlueLighter},
        ${colors.bsaBlue}
      );
    `,
    decoration: css`
      position: absolute;
      width: 100%;
      height: 100%;
      grid-column: 1 / span 9;
      grid-row: 1 / 3;
      background: ${colors.bsaBlueLighter};
    `,
    heading: css`
      position: relative;
      grid-column: 2 / span 6;
      grid-row: 1 / 2;
      font-size: var(--fs-108);
      line-height: 1;
      margin-top: var(--row-l);
      margin-bottom: 0.333em;
      ${mq().m} {
        grid-column: 2 / -2;
        grid-row: 2 / 4;
      }
    `,
    body: css`
      position: relative;
      grid-column: 2 / span 7;
      grid-row: 2 / 4;
      line-height: 1.5;
      margin-bottom: var(--row-ll);
      padding-top: 1.5em;
      padding-left: var(--gtr-m);
      padding-right: calc(2 * var(--gtr-m) + var(--col-w));
      background-color: ${colors.bsaBlue};
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
      ${mq().m} {
        grid-column: 2 / -2;
      }
    `,
    cta: css`
      display: block;
      max-width: fit-content;
      padding: 0.5em 0.75em;
      background: #fff;
      color: ${colors.bsaBlue};
      font-size: var(--fs-24);
      font-family: var(--display-font);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-decoration: none;
      line-height: 1;
      transform: translateY(1em);
      @media (hover: hover) {
        &:hover {
          background: ${colors.bsaGold};
          color: #fff;
        }
      }
    `,
    image: css`
      position: relative;
      grid-column: span 6 / -2;
      grid-row: 1 / 4;
      margin: var(--row-m) 0;
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

export default HomeWhyBSA
