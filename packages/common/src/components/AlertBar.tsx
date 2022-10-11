import { Global, css } from '@emotion/react'
import { useMemo, useState } from 'react'
import { StructuredText } from 'react-datocms'

import useNavMenuContext from '../context/NavMenuContext'
import useThemeContext from '../context/ThemeContext'
import { useElementHeight } from '../hooks/useElementRect'
import { doorColors } from '../theme/variables'
import { IStructuredText } from '../types'
import DatoLink, { IDatoLink, isDatoLink } from './DatoLink'

export interface IAlert extends IStructuredText {
  blocks?: IDatoLink[]
}

export type AlertBarProps = {
  alert: IAlert
  showAlert: boolean
}

const AlertBar = ({ alert }: AlertBarProps): JSX.Element => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const alertHeight = useElementHeight(ref)
  const { open: navOpen } = useNavMenuContext()

  const { theme } = useThemeContext()

  const colors = useMemo(() => {
    switch (theme) {
      case 'The Door':
        return {
          bg: doorColors.navyDark,
          text: '#fff',
          cta: ['#fff', doorColors.yellow],
        }
      default:
        return {
          bg: '#444',
          text: '#fff',
          cta: ['#fff', '#fff'],
        }
    }
  }, [theme])

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
              return <DatoLink data={record} css={styles.link} />
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
