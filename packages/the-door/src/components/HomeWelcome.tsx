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

type Props = {
  heading: string
  body: IStructuredText
  links: IDatoLink[]
  image: {
    gatsbyImageData: IGatsbyImageData
    alt?: string
  }
}

const HomeWelcome = ({ heading, body, links, image }: Props) => {
  const styles = {
    section: css`
      ${baseGrid}
      grid-template-rows: 3rem 6rem auto auto auto 4rem;
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
          #0455a0,
          ${colors.blue}
        );
      `}
      ${i === 1 &&
      css`
        grid-column: 1 / span 9;
        grid-row: 1 / 2;
        background: ${colors.blueDark};
      `}
      ${i === 2 &&
      css`
        grid-column: 1 / span 9;
        grid-row: 2 / 4;
        background: ${colors.blue}99;
      `}
      ${i === 3 &&
      css`
        grid-column: span 8 / -1;
        grid-row: 3 / 4;
        background: ${colors.blueLight}99;
        height: 6rem;
        top: auto;
      `}
      ${i === 4 &&
      css`
        grid-column: span 8 / -1;
        grid-row: 4 / 6;
        background: ${colors.blue}99;
      `}
    `,
    heading: css`
      position: relative;
      grid-column: 2 / span 5;
      grid-row: 3 / 4;
      margin-top: 6rem;
      font-size: var(--fs-108);
      line-height: 1;
      margin-bottom: 0.25em;
      margin-right: var(--gtr-m);
    `,
    body: css`
      position: relative;
      grid-column: 2 / span 5;
      grid-row: 4 / 5;
      margin: 1em 0 0;
      line-height: 1.5;
    `,
    links: css`
      position: relative;
      grid-column: 2 / span 5;
      grid-row: 5 / 6;
      margin-bottom: 12rem;
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
    `,
  }
  return (
    <section css={styles.section}>
      {[...Array(5).keys()].map(i => (
        <div key={i} css={styles.decoration(i)} />
      ))}
      <h2 css={styles.heading}>{heading}</h2>
      <div css={styles.body}>
        <StructuredText data={body.value} />
      </div>
      <div css={styles.links}>
        {links.map((link, i) => (
          <DatoLink link={link} key={i} css={styles.link} />
        ))}
      </div>
      <GatsbyImage
        css={styles.image}
        image={image.gatsbyImageData}
        alt={image.alt || ''}
      />
    </section>
  )
}

export default HomeWelcome
