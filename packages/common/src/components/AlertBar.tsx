import { css } from '@emotion/react'
import { StructuredText } from 'react-datocms'

import { IStructuredText } from '../types'
import DatoLink, { IDatoLink, isDatoLink } from './DatoLink'

export interface IAlert extends IStructuredText {
  blocks?: IDatoLink[]
}

export type AlertBarProps = {
  alert: IAlert
  showAlert: boolean
  colors: {
    bg: string
    text: string
    cta: [string, string]
    // urgentBg: string
    // urgentText: string
    // urgentCta: [string, string]
  }
}

const AlertBar = ({ alert, colors }: AlertBarProps) => {
  const styles = {
    alert: css`
      background: ${colors.bg};
      color: ${colors.text};
      z-index: 11;
      text-align: center;
      align-items: baseline;
      justify-content: center;
      font-style: italic;
      font-size: var(--fs-16);
      padding: 0.5em var(--margin);
      p {
        margin: 0 0.167em;
        display: inline;
      }
    `,
    link: css`
      display: inline-block;
      text-decoration: none;
      margin: 0 0.167em;
      color: ${colors.cta[0]};
      &:after {
        display: inline-block;
        content: ' ▶';
        font-size: 75%;
        transform: scaleX(0.67);
        margin-left: 0.25em;
      }
      @media (hover: hover) {
        &:hover {
          color: ${colors.cta[1]};
        }
      }
    `,
  }
  return (
    <div css={styles.alert}>
      <StructuredText
        data={alert}
        renderBlock={({ record }) => {
          if (isDatoLink(record)) {
            return <DatoLink link={record} css={styles.link} />
          } else return null
        }}
      />
    </div>
  )
}

export default AlertBar
