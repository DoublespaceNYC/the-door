import { css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { lighten } from 'polished'
import { Fragment, useContext, useEffect, useRef } from 'react'
import { StructuredText } from 'react-datocms'
import { createPortal } from 'react-dom'
import { useInView } from 'react-intersection-observer'

import CornerPopupContext from '../context/CornerPopupContext'
import { useEscKeyFunction } from '../hooks/useEscKeyFunction'
import { IStructuredText } from '../types'
import DatoLink, { IDatoLink } from './DatoLink'

interface IPopupBody extends IStructuredText {
  blocks: IDatoLink[]
}

export interface ICornerPopup {
  heading: string
  body: IPopupBody
}

type Props = {
  content: ICornerPopup
  colors: {
    bg: string
    heading: string
    text: string
    ctaBg: string
    ctaText: string
  }
  css?: CSSInterpolation
}

const CornerPopup = ({ content, colors, ...props }: Props) => {
  const isBrowser = typeof window !== `undefined`
  const portalTarget =
    isBrowser && document.getElementById('popup-container')
  const { inView, ref } = useInView({
    triggerOnce: true,
  })
  const triggered = useRef(false)
  const { open, setOpen } = useContext(CornerPopupContext)
  useEffect(() => {
    if (inView && !triggered.current) {
      setOpen(true)
      triggered.current = true
    }
  }, [inView, setOpen, triggered])
  useEscKeyFunction(() => setOpen(false))

  const styles = {
    container: css`
      position: fixed;
      padding: 1rem;
      bottom: 0;
      right: 0;
      overflow: hidden;
      z-index: 10;
      filter: drop-shadow(0 0.167rem 0.333rem #00000033);
      pointer-events: none;
    `,
    content: css`
      background: ${colors.bg};
      color: ${colors.text};
      font-size: var(--fs-15);
      border-radius: 0.75rem;
      padding: 1rem;
      box-sizing: border-box;
      max-width: min(30rem, 100vw);
      line-height: 1.5;
      h2 {
        font-size: var(--fs-30);
        color: ${colors.heading};
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
      width: fit-content;
      font-family: var(--display-font);
      font-size: var(--fs-16);
      line-height: 1;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      text-decoration: none;
      background: ${colors.ctaBg};
      color: ${colors.ctaText};
      border-radius: 0.5rem;
      padding: 1rem;
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
          stroke: ${lighten(0.4, colors.text)};
          transition: stroke 300ms ease;
        }
      }
      &:hover {
        svg path {
          stroke: ${colors.text};
        }
      }
    `,
  }
  return (
    <Fragment>
      <div ref={ref} {...props} />
      {portalTarget &&
        createPortal(
          <div css={styles.container}>
            <div css={styles.content}>
              <h2>{content.heading}</h2>
              <StructuredText
                data={content.body}
                renderBlock={({ record }) => {
                  if (
                    record.__typename === 'DatoCmsInternalLink' ||
                    record.__typename === 'DatoCmsExternalLink' ||
                    record.__typename === 'DatoCmsAssetLink'
                  ) {
                    return <DatoLink link={record} css={styles.cta} />
                  } else return null
                }}
              />
              <button css={styles.close} onClick={() => setOpen(false)}>
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
