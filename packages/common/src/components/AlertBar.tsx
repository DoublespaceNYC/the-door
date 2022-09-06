import { Global, css } from '@emotion/react'
import { useContext, useState } from 'react'
import { StructuredText } from 'react-datocms'

import NavMenuContext from '../context/NavMenuContext'
import { useElementHeight } from '../hooks/useElementRect'
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
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const alertHeight = useElementHeight(ref)
  const { open: navOpen } = useContext(NavMenuContext)
  const styles = {
    wrap: css`
      transition: height 300ms ease;
      overflow: hidden;
      ${alertHeight &&
      css`
        height: ${alertHeight}px;
      `}
      ${navOpen &&
      css`
        height: 0;
      `}
    `,
    alert: css`
      background: ${colors.bg};
      color: ${colors.text};
      position: relative;
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
    <div css={styles.wrap}>
      <div css={styles.alert} ref={node => setRef(node)}>
        <StructuredText
          data={alert}
          renderBlock={({ record }) => {
            if (isDatoLink(record)) {
              return <DatoLink link={record} css={styles.link} />
            } else return null
          }}
        />
      </div>
      <Global
        styles={css`
          :root {
            --alert-height: ${alertHeight}px;
          }
        `}
      />
    </div>
  )
}

export default AlertBar
