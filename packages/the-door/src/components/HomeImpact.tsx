import { css } from '@emotion/react'
import DatoLink from '@the-door/common/src/components/DatoLink'
import { baseGrid, linkStyle } from '@the-door/common/src/theme/mixins'
import { IDatoLink, IStructuredText } from '@the-door/common/src/types'
import { StructuredText } from 'react-datocms'

import { colors } from '../theme/variables'

type Props = {
  heading: string
  body: IStructuredText
  link: IDatoLink
  stats: {
    number: string
    text: string
  }[]
  cta: string
  ctaLink: IDatoLink
}

const HomeImpact = ({
  heading,
  body,
  link,
  stats,
  cta,
  ctaLink,
}: Props) => {
  const styles = {
    section: css`
      ${baseGrid}
      padding-bottom: 9rem;
      color: #fff;
      background: linear-gradient(
        to top right,
        ${colors.greenDark},
        ${colors.green}
      );
    `,
    heading: css`
      grid-column: 2 / -2;
      text-align: center;
      position: relative;
      font-size: var(--fs-108);
      margin: 0.667em 0 0;
    `,
    body: css`
      grid-column: 2 / -2;
      position: relative;
      text-align: center;
      max-width: 80ch;
      justify-self: center;
      line-height: 1.5;
    `,
    link: css`
      grid-column: 2 / -2;
      position: relative;
      justify-self: center;
      ${linkStyle}
      color: #fff;
      margin: 0.5em 0 3em;
      &:hover {
        color: ${colors.purple};
      }
    `,
    stats: css`
      position: relative;
      grid-column: 2 / -2;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: var(--gtr-m);
      text-align: center;
      background: ${colors.green};
      padding: 0 var(--gtr-m);
      h3 {
        display: flex;
        flex-direction: column;
        font-size: var(--fs-144);
        margin: 0.125em 0 0;
        > span {
          &:nth-of-type(1) {
            font-size: 125%;
            line-height: 1;
          }
          &:nth-of-type(2) {
            font-size: var(--fs-36);
            max-width: 15ch;
            line-height: 1.125;
            margin-bottom: 1em;
          }
        }
      }
    `,
    cta: css`
      grid-column: 2 / -2;
      justify-content: center;
      display: flex;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 50%;
        left: 0;
        top: 0;
        background-color: ${colors.green};
      }
      > div {
        position: relative;
        color: ${colors.green};
        background: #fff;
        font-size: var(--fs-24);
        font-family: var(--almaq);
        text-transform: uppercase;
        letter-spacing: 0.025em;
        padding: 0.5em 1em;
      }
    `,
    ctaLink: css`
      color: ${colors.greenDark};
      text-underline-offset: 3px;
      text-decoration-thickness: 2px;
      &:hover {
        color: ${colors.purple};
      }
    `,
    decoOne: css`
      grid-column: 1 / span 5;
      grid-row: 1 / 6;
      background: ${colors.green}33;
      position: absolute;
      width: 100%;
      height: calc(100% - 15rem);
      transform: translateY(6rem);
      z-index: 0;
    `,
    decoTwo: css`
      grid-column: span 7 / -1;
      grid-row: 4 / 5;
      background: ${colors.green}33;
      position: absolute;
      width: 100%;
      height: calc(100% + 1.5rem);
      transform: translateY(6rem);
      z-index: 0;
    `,
  }
  return (
    <section css={styles.section}>
      <div css={styles.decoOne} />
      <div css={styles.decoTwo} />
      <h2 css={styles.heading}>{heading}</h2>
      <div css={styles.body}>
        <StructuredText data={body.value} />
      </div>
      <DatoLink css={styles.link} link={link} />
      <div css={styles.stats}>
        {stats.map((stat, i) => (
          <h3 key={i}>
            <span>{stat.number}</span>
            <span>{stat.text}</span>
          </h3>
        ))}
      </div>
      <div css={styles.cta}>
        <div>
          <span>{cta}</span>{' '}
          <span>
            <DatoLink link={ctaLink} css={styles.ctaLink} />
          </span>
        </div>
      </div>
    </section>
  )
}

export default HomeImpact
