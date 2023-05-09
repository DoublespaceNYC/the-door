import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { lighten } from 'polished'
import { Fragment, useEffect } from 'react'
import { StructuredText } from 'react-datocms'
import { createPortal } from 'react-dom'
import { useInView } from 'react-intersection-observer'

import useCornerPopupContext from '../context/CornerPopupContext'
import { useEscKeyFunction } from '../hooks/useEscKeyFunction'
import { buttonStyle } from '../theme/mixins'
import { IStructuredText } from '../types'
import DatoLink, { IDatoLink, isDatoLink } from './DatoLink'
import { ITheme } from './Layout'

interface IPopupBody extends IStructuredText {
  blocks?: IDatoLink[]
}

export interface ICornerPopup {
  heading: string
  body: IPopupBody
}

type Props = {
  data: ICornerPopup
  triggerCss?: CSSInterpolation
}

const CornerPopup = ({ data, triggerCss }: Props): JSX.Element => {
  const isBrowser = typeof window !== `undefined`
  const portalTarget = isBrowser && document.getElementById('popup-container')
  const { inView, ref } = useInView({
    triggerOnce: true,
  })
  const { triggered, setTriggered, closed, setClosed } = useCornerPopupContext()
  const open = triggered && !closed

  useEffect(() => {
    if (inView) {
      setTriggered(true)
    }
  }, [inView, setTriggered])
  useEscKeyFunction(() => setClosed(true))

  const theme = useTheme() as ITheme

  const styles = {
    container: css`
      position: fixed;
      padding: 1rem;
      bottom: 0;
      right: 0;
      overflow: hidden;
      z-index: 8;
      filter: drop-shadow(0 0.167rem 0.333rem #00000033);
      pointer-events: none;
    `,
    data: css`
      background: #fff;
      color: #444;
      font-size: var(--fs-15);
      border-radius: 0.75rem;
      padding: 1rem;
      box-sizing: border-box;
      max-width: min(30rem, 100vw);
      line-height: 1.5;
      h2 {
        font-size: var(--fs-30);
        color: ${theme.primary};
        margin: 0;
        line-height: 1;
        padding-right: 1.5rem;
      }
      p {
        margin-top: 0.333em;
      }
      opacity: 0;
      transform: translate3d(100%, 0, 0);
      transition: all 300ms ease;
      ${open &&
      css`
        pointer-events: all;
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: all 500ms ease;
      `}
    `,
    cta: css`
      display: block;
      width: fit-data;
      font-family: var(--display-font);
      font-size: var(--fs-16);
      line-height: 1;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      text-decoration: none;
      background: ${theme.tertiary};
      color: #fff;
      ${buttonStyle};
      padding: 1rem;
      @media (hover: hover) {
        &:hover {
          background: ${theme.tertiaryDark};
          color: #fff;
        }
      }
    `,
    close: css`
      position: absolute;
      top: 0rem;
      right: 0rem;
      display: flex;
      padding: 0.75rem;
      svg {
        width: 1rem;
        height: 1rem;
        path {
          stroke-width: 2;
          stroke: ${lighten(0.4, '#444')};
          transition: stroke 300ms ease;
        }
      }
      &:hover {
        svg path {
          stroke: #444;
        }
      }
    `,
  }
  return (
    <Fragment>
      <div
        ref={ref}
        css={triggerCss}
      />
      {portalTarget &&
        createPortal(
          <div css={styles.container}>
            <div css={styles.data}>
              <h2>{data.heading}</h2>
              <StructuredText
                data={data.body}
                renderBlock={({ record }) => {
                  if (isDatoLink(record)) {
                    return (
                      <DatoLink
                        data={record}
                        css={styles.cta}
                      />
                    )
                  } else return null
                }}
              />
              <button
                css={styles.close}
                onClick={() => setClosed(true)}
                aria-label="close popup"
              >
                <svg viewBox="0 0 12 12">
                  <path d="M1 1L11 11" />
                  <path d="M1 11L11 1" />
                </svg>
              </button>
            </div>
          </div>,
          portalTarget
        )}
    </Fragment>
  )
}

export default CornerPopup
