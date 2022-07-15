import { css } from '@emotion/react'
import DatoLink from '@the-door/common/src/components/DatoLink'
import {
  absoluteFill,
  baseGrid,
  linkStyle,
} from '@the-door/common/src/theme/mixins'
import { IDatoLink, IStructuredText } from '@the-door/common/src/types'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { StructuredText } from 'react-datocms'

import { colors } from '../theme/variables'
import ServicesModule from './ServicesModule'

type Props = {
  heading: string
  body: IStructuredText
  link: IDatoLink
  bsaHeading: string
  bsaBody: IStructuredText
  bsaLink: IDatoLink
  bsaImage: {
    gatsbyImageData: IGatsbyImageData
    alt?: string
  }
}

const HomeServices = ({
  heading,
  body,
  link,
  bsaHeading,
  bsaBody,
  bsaLink,
  bsaImage,
}: Props) => {
  const styles = {
    section: css`
      ${baseGrid}
      grid-template-rows: 16rem auto;
      background: linear-gradient(
        to bottom right,
        ${colors.teal},
        #00424b
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
      grid-row: 1 / 3;
      height: calc(100% + 6rem);
      background: ${colors.teal}99;
    `,
    circle: css`
      grid-column: -1 / 1;
      margin-top: 12rem;
      position: absolute;
      width: 100vw;
      height: 100vw;
      clip-path: circle();
      background: ${colors.teal}33;
      left: -33vw;
    `,
    heading: css`
      grid-column: 2 / span 6;
      position: relative;
      font-size: var(--fs-108);
      line-height: 1;
      margin: 0 0 6rem;
    `,
    body: css`
      grid-column: auto / span 6;
      position: relative;
      line-height: 1.5;
      margin-top: 1.5rem;
      margin-right: var(--gtr-m);
      p:last-of-type {
        margin-bottom: 2em;
      }
    `,
    link: css`
      ${linkStyle}
      position: relative;
      display: block;
      color: #fff;
      margin-bottom: 6rem;
      max-width: fit-content;
      &:hover {
        color: ${colors.purpleDark};
      }
    `,
    services: css`
      grid-column: 1 / -1;
      margin-bottom: 6rem;
    `,
    bsaSection: css`
      position: relative;
      grid-column: 2 / -2;
      display: grid;
      grid-template-columns: 1fr 2fr;
      background: ${colors.teal}99;
      margin-bottom: 12rem;
    `,
    bsaText: css`
      padding: 2em;
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
        <DatoLink link={link} css={styles.link} />
      </div>
      <ServicesModule css={styles.services} bgColor={colors.teal} />
      <section css={styles.bsaSection}>
        <div css={styles.bsaText}>
          <h3 css={styles.bsaHeading}>{bsaHeading}</h3>
          <div css={styles.bsaBody}>
            <StructuredText data={bsaBody.value} />
          </div>

          <DatoLink
            link={bsaLink}
            css={[styles.link, styles.bsaLink]}
          />
        </div>
        <GatsbyImage
          image={bsaImage.gatsbyImageData}
          alt={bsaImage.alt || ''}
        />
      </section>
    </section>
  )
}

export default HomeServices
