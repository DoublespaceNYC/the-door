import { css } from '@emotion/react'
import AnimateIn from '@the-door/common/src/components/AnimateIn'
import DatoLink, {
  IDatoLink,
} from '@the-door/common/src/components/DatoLink'
import {
  baseGrid,
  linkStyle,
  mq,
} from '@the-door/common/src/theme/mixins'
import { IStructuredText } from '@the-door/common/src/types'
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
}: Props): JSX.Element => {
  const styles = {
    section: css`
      ${baseGrid}
      padding: var(--row-m) 0 var(--row-l);
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
      margin: 0 0 0.125em;
      line-height: 1;
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
      display: inline-block;
      position: relative;
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
      grid-column-gap: var(--gtr-m);
      text-align: center;
      background: ${colors.green};
      padding: 0 var(--gtr-m);
      align-items: center;
      ${mq().ms} {
        grid-template-columns: repeat(2, 1fr);
        padding-bottom: 2rem;
      }
    `,
    stat: (length: number) => css`
      font-size: 10vw;
      line-height: 1;
      margin: 0;
      span {
        display: block;
        &:nth-of-type(1) {
          grid-row: 1 / 2;
          margin-top: 0.125em;
          font-size: ${133 - 10 * length}%;
          align-self: flex-end;
        }
        &:nth-of-type(2) {
          grid-row: 2 / 3;
          font-size: 25%;
          max-width: 15ch;
          margin-bottom: 1em;
          align-self: flex-start;
        }
      }
      ${mq().ms} {
        display: flex;
        flex-direction: column;
        margin: 0;
        > span {
          &:nth-of-type(1) {
            grid-row: auto;
            margin-top: 0.125em;
            font-size: ${200 - 10 * length}%;
            align-self: center;
          }
          &:nth-of-type(2) {
            grid-row: auto;
            font-size: 50%;
            max-width: 100%;
            margin-bottom: 0;
            align-self: center;
          }
        }
      }
    `,
    cta: css`
      grid-column: 2 / -2;
      justify-content: center;
      display: flex;
      position: relative;
      &::before {
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
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        color: ${colors.green};
        background: #fff;
        font-size: var(--fs-24);
        font-family: var(--display-font);
        text-transform: uppercase;
        letter-spacing: 0.025em;
        padding: 0.5em 0.75em;
        > span {
          padding: 0 0.25em;
        }
      }
    `,
    ctaLink: css`
      display: inline-block;
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
      <AnimateIn
        as="h2"
        css={styles.heading}
      >
        {heading}
      </AnimateIn>
      <AnimateIn css={styles.body}>
        <StructuredText data={body.value} />
        <DatoLink
          css={styles.link}
          data={link}
        />
      </AnimateIn>
      <div css={styles.stats}>
        {stats.map((stat, i) => (
          <AnimateIn
            as="h3"
            delay={i * 200 + 100}
            key={i}
            css={styles.stat(stat.number.length)}
          >
            <span>{stat.number}</span>
            <span>{stat.text}</span>
          </AnimateIn>
        ))}
      </div>
      <div css={styles.cta}>
        <div>
          <span>{cta}</span>{' '}
          <span>
            <DatoLink
              data={ctaLink}
              css={styles.ctaLink}
            />
          </span>
        </div>
      </div>
    </section>
  )
}

export default HomeImpact
