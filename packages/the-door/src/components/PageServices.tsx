import { css } from '@emotion/react'
import { mq } from '@the-door/common/src/theme/mixins'

import { colors } from '../theme/variables'
import ServicesModule from './ServicesModule'

const PageServices = (): JSX.Element => {
  const styles = {
    section: css`
      width: 100vw;
      padding: var(--row-m) 0 var(--row-l);
      background: linear-gradient(
        to top right,
        ${colors.blueDark},
        ${colors.blueMid}
      );
      h2 {
        font-size: var(--fs-72);
        line-height: 1;
        color: #fff;
        margin: 0 var(--margin) 0.5em;
        ${mq().m} {
          margin-right: calc(var(--margin) + 6rem);
        }
      }
    `,
  }
  return (
    <section css={styles.section}>
      <h2>Continue Exploring</h2>
      <ServicesModule bgColor={colors.blueMid} />
    </section>
  )
}

export default PageServices
