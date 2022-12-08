import { Global, css } from '@emotion/react'
import { Fragment, useMemo, useState } from 'react'
import { StructuredText } from 'react-datocms'
import { useInView } from 'react-intersection-observer'

import useLightboxContext from '../context/LightboxContext'
import useNavMenuContext from '../context/NavMenuContext'
import useThemeContext from '../context/ThemeContext'
import { useElementHeight } from '../hooks/useElementRect'
import { mq } from '../theme/mixins'
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

const AlertBar = ({ alert, showAlert }: AlertBarProps): JSX.Element => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const { inView, ref: inViewRef } = useInView()
  const alertHeight = useElementHeight(ref)
  const { open: navOpen } = useNavMenuContext()
  const { open: lightboxOpen } = useLightboxContext()

  const { theme } = useThemeContext()

  const colors = useMemo(() => {
    const defaultColors = {
      bg: '',
      text: '#fff',
      cta: '#fff',
      ctaHover: '',
    }
    switch (theme) {
      case 'The Door':
        return {
          ...defaultColors,
          bg: doorColors.navyDark,
          ctaHover: doorColors.yellow,
        }
      default:
        return defaultColors
    }
  }, [theme])

  const styles = {
    wrap: css`
      position: relative;
      transition: height 300ms ease;
      overflow: hidden;
      z-index: 11;
      height: 0;
      ${alertHeight &&
      css`
        height: ${alertHeight}px;
      `}
      ${inView &&
      (navOpen || lightboxOpen) &&
      css`
        height: 0;
      `}
      ${!showAlert &&
      css`
        height: 0;
      `}
    `,
    alert: css`
      background: ${colors.bg};
      color: ${colors.text};
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
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
      ${mq().ms} {
        font-size: var(--fs-14);
      }
    `,
    link: css`
      display: inline-block;
      text-decoration: none;
      margin: 0 0.167em;
      color: ${colors.cta};
      &:after {
        display: inline-block;
        content: ' ▶';
        font-size: 75%;
        transform: scaleX(0.67);
        margin-left: 0.25em;
      }
      @media (hover: hover) {
        &:hover {
          color: ${colors.ctaHover};
        }
      }
    `,
    inView: css`
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      width: 1px;
      height: ${alertHeight}px;
    `,
  }
  return (
    <Fragment>
      <div css={styles.wrap}>
        <div
          css={styles.alert}
          ref={node => setRef(node)}
        >
          <StructuredText
            data={alert}
            renderBlock={({ record }) => {
              if (isDatoLink(record)) {
                return (
                  <DatoLink
                    data={record}
                    css={styles.link}
                  />
                )
              } else return null
            }}
          />
        </div>
        <Global
          styles={css`
            :root {
              --alert-height: ${showAlert ? alertHeight : 0}px;
            }
          `}
        />
      </div>
      <div
        ref={inViewRef}
        css={styles.inView}
      />
    </Fragment>
  )
}

export default AlertBar
