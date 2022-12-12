import { css } from '@emotion/react'
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
import ServicesModule from './ServicesModule'

type Props = {
  heading: string
  body: IStructuredText
  bsaHeading: string
  bsaBody: IStructuredText
  bsaLink: IDatoLink
  bsaImage: IGatsbyImageFocused
}

const HomeServices = ({
  heading,
  body,
  bsaHeading,
  bsaBody,
  bsaLink,
  bsaImage,
}: Props): JSX.Element => {
  const styles = {
    section: css`
      ${baseGrid}
      grid-template-rows: calc(var(--row-ll) * 1.1) auto;
      background: linear-gradient(
        to bottom right,
        ${colors.teal},
        ${colors.tealDark}
      );
      color: #fff;
      margin-top: -4rem;
      &:before {
        content: '';
        display: block;
        grid-column: 1 / -1;
      }
      overflow: hidden;
    `,
    decoration: css`
      ${absoluteFill}
      grid-column: span 8 / -1;
      grid-row: 1 / 4;
      height: calc(100% - 4 * var(--row-m));
      background: ${rgba(colors.teal, 0.6)};
      ${mq().m} {
        grid-column: span 7 / -1;
      }
      ${mq().s} {
        grid-column: span 12 / -1;
        grid-row: 1 / 5;
        height: 75%;
      }
    `,
    circle: css`
      grid-column: -1 / 1;
      margin-top: 12rem;
      position: absolute;
      width: 100vw;
      height: 100vw;
      clip-path: circle();
      background: ${rgba(colors.teal, 0.2)};
      left: -33vw;
    `,
    heading: css`
      grid-column: 2 / span 6;
      position: relative;
      font-size: var(--fs-108);
      line-height: 1;
      margin: 0 0 var(--row-m);
      ${mq().s} {
        margin-bottom: 0;
        grid-column: 2 / -2;
      }
    `,
    body: css`
      grid-column: auto / span 6;
      position: relative;
      line-height: 1.5;
      margin-top: var(--gtr-s);
      max-width: 55ch;
      margin-bottom: var(--row-m);
      p:last-of-type {
        margin-bottom: 0rem;
      }
      ${mq().s} {
        margin-top: 0;
        grid-column: 2 / -2;
      }
    `,
    link: css`
      ${linkStyle}
      position: relative;
      display: block;
      color: #fff;
      max-width: fit-content;
      &:hover {
        color: ${colors.purpleDark};
      }
    `,
    services: css`
      grid-column: 1 / -1;
      margin-bottom: var(--row-m);
    `,
    bsaSection: css`
      position: relative;
      grid-column: 2 / -2;
      display: grid;
      grid-template-columns: minmax(45ch, 1fr) 2fr;
      background: ${rgba(colors.teal, 0.6)};
      margin-bottom: var(--row-ll);
      ${mq().ms} {
        grid-template-columns: 1fr;
      }
    `,
    bsaText: css`
      padding: 2em;
      ${mq().ms} {
        grid-row: 2 / 3;
        padding: 1em;
      }
    `,
    bsaHeading: css`
      text-transform: uppercase;
      letter-spacing: 0.025em;
      font-size: var(--fs-36);
      margin: 0.5em 0 0;
    `,
    bsaBody: css`
      line-height: 1.5;
      min-width: 28ch;
    `,
    bsaLink: css`
      margin-bottom: 1em;
    `,
    bsaImage: css`
      min-height: 100%;
    `,
  }
  return (
    <section css={styles.section}>
      <div css={styles.decoration} />
      <div css={styles.circle} />
      <h2 css={styles.heading}>{heading}</h2>
      <div css={styles.body}>
        <StructuredText data={body.value} />
      </div>
      <ServicesModule
        css={styles.services}
        bgColor={colors.teal}
      />
      <section css={styles.bsaSection}>
        <div css={styles.bsaText}>
          <h3 css={styles.bsaHeading}>{bsaHeading}</h3>
          <div css={styles.bsaBody}>
            <StructuredText data={bsaBody.value} />
          </div>

          <DatoLink
            data={bsaLink}
            css={[styles.link, styles.bsaLink]}
          />
        </div>
        <GatsbyImageFocused
          gatsbyImageCss={styles.bsaImage}
          image={bsaImage.gatsbyImageData}
          alt={bsaImage.alt || ''}
          aspectRatio={bsaImage.sizes.aspectRatio}
          focalPoint={bsaImage.focalPoint}
        />
      </section>
    </section>
  )
}

export default HomeServices
