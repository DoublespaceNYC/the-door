import { css } from '@emotion/react'
import { Fragment } from 'react'
import { StructuredText } from 'react-datocms'

import { mq } from '../theme/mixins'
import { IStructuredText } from '../types'

type Props = {
  intro: IStructuredText
  textColor?: string
}

const PageIntro = ({ intro, textColor = '#333' }: Props) => {
  const styles = {
    intro: css`
      font-size: var(--fs-21);
      line-height: 1.75;
      margin: var(--row-m) var(--margin) var(--row-ll);
      color: ${textColor};
      max-width: 80ch;
      ${mq().ms} {
        font-size: var(--fs-18);
        margin-bottom: var(--row-l);
      }
    `,
  }
  if (intro.value) {
    return (
      <div css={styles.intro}>
        <StructuredText data={intro} />
      </div>
    )
  } else {
    return <Fragment />
  }
}

export default PageIntro
