import { css } from '@emotion/react'
import { rgba } from 'polished'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import useLightboxContext from '../context/LightboxContext'
import { useEscKeyFunction } from '../hooks/useEscKeyFunction'
import useFocusTrap from '../hooks/useFocusTrap'
import { bezier } from '../theme/mixins'
import { colors } from '../theme/variables'
import LightboxContent, { ILightboxContent } from './LightboxContent'
import ScrollToggle from './ScrollToggle'

type Props = {
  data: ILightboxContent
  open: boolean
  onClose: () => void
  entry: {
    title: string
    path: string
  } | null
}

const Lightbox = ({
  data,
  open,
  onClose = () => null,
  entry,
}: Props): JSX.Element => {
  const slug = '/' + data.slug + '/'

  const { portalTarget } = useLightboxContext()

  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (open && !closing) {
      window.history.replaceState(null, '', slug)
      data.seo.title && (document.title = data.seo.title)
    }
  }, [open, closing, slug, data.seo.title])

  const [lightboxRef, setLightboxRef] = useState<HTMLDivElement | null>(
    null
  )
  useFocusTrap(lightboxRef, open)

  const transitionDuration = 300

  const handleClosing = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, transitionDuration)
  }, [onClose])

  const handleClose = useCallback(() => {
    if (!closing && entry) {
      window.history.replaceState(null, '', entry.path)
      document.title = entry.title
      handleClosing()
    }
  }, [closing, entry, handleClosing])

  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setLoaded(true)
      }, 1)
    } else {
      setLoaded(false)
    }
  }, [open])

  useEscKeyFunction(handleClose)

  const styles = {
    background: css`
      position: fixed;
      width: 100vw;
      height: calc(100 * var(--vh, 1vh));
      top: 0;
      left: 0;
      z-index: 1;
      transition: background-color ${transitionDuration}ms ease,
        backdrop-filter 0ms linear ${transitionDuration}ms;
      ${loaded &&
      css`
        background-color: ${rgba(colors.navy, 0.9)};
        backdrop-filter: blur(0.333rem) saturate(0);
      `}
      ${(closing || !loaded) &&
      css`
        background-color: transparent;
        backdrop-filter: blur(0);
      `}
      ${closing &&
      css`
        transition-delay: 0ms;
      `}
    `,
    lightbox: css`
      display: grid;
      grid-template-columns: var(--margin) 1fr var(--margin);
      grid-template-rows: var(--row-s) auto var(--row-s);
      box-sizing: border-box;
      position: fixed;
      top: 0;
      left: 0;
      overflow-y: scroll;
      width: 100vw;
      height: calc(var(--vh, 1vh) * 100);
      z-index: 11;
      transition: opacity ${transitionDuration}ms ease,
        transform ${transitionDuration}ms ease;
      ${loaded &&
      css`
        opacity: 1;
        transform: translate3d(0, 0, 0);
      `}
      ${(closing || !loaded) &&
      css`
        opacity: 0;
        transform: translate3d(0, 6rem, 0);
      `}
    `,
    content: css`
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      justify-self: center;
      align-self: center;
      display: flex;
      position: relative;
      background: linear-gradient(
        to bottom right,
        ${colors.teal},
        ${colors.tealDark}
      );
      padding-left: var(--margin);
      color: #fff;
    `,
    closeButton: css`
      position: sticky;
      flex: 0;
      align-self: flex-start;
      top: 0;
      display: flex;
      padding: 0.5em;
      margin-top: 0.5em;
      margin-right: 0.5em;
      margin-left: max(calc(var(--margin) - 2.75em), 0px);
      color: ${colors.greenLight};
      transition: color 200ms ease;
      svg {
        width: 1.25em;
        height: auto;
        transition: transform 300ms ${bezier.bounce};
        overflow: visible;
        line {
          fill: none;
          stroke: currentColor;
          stroke-width: 3;
        }
      }
      @media (hover: hover) {
        &:hover {
          color: #fff;
          svg {
            transform: scale3d(1.15, 1.15, 1);
          }
        }
      }
    `,
    backgroundClose: css`
      position: relative;
      grid-row: 1 / 4;
      grid-column: 1 / -1;
      z-index: 0;
      ${closing &&
      css`
        display: none;
      `}
    `,
  }

  if (open && portalTarget) {
    return createPortal(
      <Fragment>
        <ScrollToggle />
        <div css={styles.background} />
        <div css={styles.lightbox} ref={node => setLightboxRef(node)}>
          <div
            css={styles.backgroundClose}
            onClick={handleClose}
            aria-hidden
          />
          <div css={styles.content}>
            <button
              aria-hidden
              tabIndex={-1}
              style={{ width: 0, height: 0 }}
            />
            <LightboxContent data={data} />
            <button
              css={styles.closeButton}
              aria-label="Close Lightbox"
              onClick={handleClose}
              onKeyPress={handleClose}
            >
              <svg viewBox="0 0 12 12">
                <line
                  x1="0.5"
                  y1="0.5"
                  x2="11.5"
                  y2="11.5"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1="11.5"
                  y1="0.5"
                  x2="0.5"
                  y2="11.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </button>
          </div>
        </div>
      </Fragment>,
      portalTarget
    )
  }
  return <Fragment />
}

export default Lightbox
