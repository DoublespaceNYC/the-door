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
import ServicesModule from './ServicesModule'

type Props = {
  heading: string
  body: IStructuredText
}

const HomeServices = ({ heading, body }: Props): JSX.Element => {
  const styles = {
    section: css`
      ${baseGrid}
      grid-template-rows: calc(var(--row-ll) * 1.1) auto;
      background: linear-gradient(
        to bottom left,
        ${colors.bsaGoldLight},
        ${colors.bsaGoldMid}
      );
      color: #fff;
      margin-top: -4rem;
      &::before {
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
      background: ${rgba(colors.bsaGoldDark, 0.6)};
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
      background: ${rgba(colors.bsaGoldDark, 0.2)};
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
        color: ${colors.bsaBlue};
      }
    `,
    services: css`
      grid-column: 1 / -1;
      margin-bottom: var(--row-l);
    `,
  }
  return (
    <section css={styles.section}>
      <div css={styles.decoration} />
      <div css={styles.circle} />
      <AnimateIn
        as="h2"
        css={styles.heading}
      >
        {heading}
      </AnimateIn>
      <AnimateIn css={styles.body}>
        <StructuredText data={body.value} />
      </AnimateIn>
      <ServicesModule
        css={styles.services}
        bgColor={colors.bsaBlue}
      />
    </section>
  )
}

export default HomeServices
