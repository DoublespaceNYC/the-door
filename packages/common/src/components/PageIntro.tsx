import { css } from '@emotion/react'
import { Fragment, HTMLAttributes } from 'react'
import { StructuredText } from 'react-datocms'

import { mq } from '../theme/mixins'
import { IStructuredText } from '../types'

interface Props extends HTMLAttributes<HTMLDivElement> {
  intro: IStructuredText
  textColor?: string
}

const PageIntro = ({
  intro,
  textColor = '#333',
  ...props
}: Props): JSX.Element => {
  const styles = {
    intro: css`
      font-size: var(--fs-21);
      line-height: 1.75;
      margin: calc(var(--row-s) + 1em) var(--margin) var(--row-l);
      color: ${textColor};
      max-width: 80ch;
      ${mq().ms} {
        font-size: var(--fs-18);
      }
    `,
  }
  if (intro.value) {
    return (
      <div
        css={styles.intro}
        {...props}
      >
        <StructuredText data={intro} />
      </div>
    )
  } else {
    return <Fragment />
  }
}

export default PageIntro
