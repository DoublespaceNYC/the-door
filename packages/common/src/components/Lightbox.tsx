import { css } from '@emotion/react'
import { rgba } from 'polished'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import useLightboxContext from '../context/LightboxContext'
import useThemeContext from '../context/ThemeContext'
import { useEscKeyFunction } from '../hooks/useEscKeyFunction'
import useFocusTrap from '../hooks/useFocusTrap'
import { baseGrid, bezier, mq, widthInCols } from '../theme/mixins'
import { doorColors } from '../theme/variables'
import LightboxContent, { ILightboxContent } from './Lightbox__Content'
import ScrollToggle from './ScrollToggle'

type Props = {
  data: ILightboxContent
  open: boolean
  onClose: () => void
  entry: {
    title: string
    path: string
  } | null
  slug: string
  pageTitle?: string
  layout?: 'Full' | 'Centered'
  highlightColor?: string
}

const Lightbox = ({
  data,
  open,
  onClose = () => null,
  entry,
  slug,
  pageTitle,
  layout = 'Full',
  highlightColor,
}: Props): JSX.Element => {
  const { theme } = useThemeContext()

  const portalTarget =
    typeof window !== `undefined` &&
    document.getElementById('lightbox-container')

  const [closing, setClosing] = useState(false)
  const { setOpen: setOpenContext } = useLightboxContext()

  const title = pageTitle || data.seo?.title || (data.title as string)

  const titleSuffix =
    theme === 'The Door' ? ' | The Door' : ' | Broome Street Academy'
  useEffect(() => {
    if (open && !closing) {
      window.history.replaceState(null, '', slug)
      title && (document.title = title + titleSuffix)
    }
  }, [open, closing, slug, title, titleSuffix])
  useEffect(() => {
    if (open) {
      setOpenContext(true)
    }
    if (closing) {
      setOpenContext(false)
    }
  }, [setOpenContext, open, closing])

  const [lightboxRef, setLightboxRef] = useState<HTMLDivElement | null>(null)
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

  const setColors = () => {
    switch (theme) {
      case 'The Door':
        return {
          bg: rgba(doorColors.navyDark, 0.9),
          contentBg: doorColors.gray95,
          buttonBg: doorColors.navy,
        }
    }
  }
  const colors = setColors()
  const styles = {
    background: css`
      position: fixed;
      width: 100vw;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 9;
      transition: background-color ${transitionDuration}ms ease;
      ${loaded &&
      css`
        background-color: ${colors?.bg};
        backdrop-filter: blur(0.333rem) saturate(0);
      `}
      ${(closing || !loaded) &&
      css`
        background-color: transparent;
        backdrop-filter: blur(0);
      `}
    `,
    lightbox: css`
      ${baseGrid}
      box-sizing: border-box;
      position: fixed;
      top: var(--nav-height);
      left: 0;
      overflow-y: scroll;
      width: 100vw;
      height: calc(100% - var(--nav-height));
      z-index: 9;
      transition: opacity ${transitionDuration}ms ease,
        transform ${transitionDuration}ms ease, height 500ms ease,
        top 500ms ease;
      ${loaded &&
      css`
        opacity: 1;
        transform: translate3d(0, 0, 0);
      `}
      ${(closing || !loaded) &&
      css`
        opacity: 0;
        transform: translate3d(-6rem, 0, 0);
      `}
    `,
    content: css`
      grid-row: 1 / 2;
      justify-self: stretch;
      align-self: center;
      display: flex;
      position: relative;
      background: ${colors?.contentBg};
      ${layout === 'Full' &&
      css`
        grid-column: 1 / span 12;
        --grid-w: calc(var(--margin) + ${widthInCols(11, '100vw')});
        ${mq().ms} {
          grid-column: 1 / span 13;
          --grid-w: calc(var(--margin) + ${widthInCols(12, '100vw')});
        }
      `}
      ${layout === 'Centered' &&
      css`
        grid-column: 3 / -3;
        --grid-w: min(calc(${widthInCols(10, '100vw')}), 90ch);
        justify-self: center;
        margin: var(--row-s) 0;
        max-width: 90ch;
        width: 100%;
        ${mq().ms} {
          grid-column: 2 / -2;
          --grid-w: min(calc(${widthInCols(12, '100vw')}), 90ch);
        }
      `}
    `,
    closeButton: css`
      position: fixed;
      z-index: 9;
      flex: 0;
      top: calc(var(--nav-height) + 2rem);
      right: calc(var(--margin) - 0.5rem);
      display: flex;
      padding: 0.5rem;
      color: #fff;
      transition: color 200ms ease, transform 300ms ease-out, opacity 450ms ease,
        top 500ms ease;
      ${loaded &&
      css`
        transform: translate3d(0, 0, 0);
        opacity: 1;
      `}
      ${(closing || !loaded) &&
      css`
        transform: translate3d(6rem, 0, 0);
        opacity: 0;
      `}
      ${mq().ms} {
        background: ${colors?.buttonBg};
        border-radius: 50%;
        padding: 1rem;
        top: calc(var(--nav-height) + 1rem);
        right: calc(var(--margin) - 1rem);
      }
      svg {
        width: 3.75rem;
        height: auto;
        overflow: visible;
        transition: transform 500ms ${bezier.bounce};
        path {
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }
        ${mq().ms} {
          width: 2rem;
          path {
            stroke-width: 3.5;
          }
        }
      }
      @media (hover: hover) {
        &:hover {
          svg {
            transform: translate3d(-0.5rem, 0, 0);
            ${mq().ms} {
              transform: translate3d(-0.333rem, 0, 0);
            }
          }
        }
      }
    `,
    backgroundClose: css`
      position: relative;
      grid-row: 1 / 2;
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
        <div
          css={styles.lightbox}
          ref={node => setLightboxRef(node)}
        >
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
            <LightboxContent
              data={data}
              highlightColor={highlightColor}
            />
          </div>
        </div>
        <button
          css={styles.closeButton}
          aria-label="Close Lightbox"
          onClick={handleClose}
          onKeyPress={handleClose}
        >
          <svg viewBox="0 0 45 45">
            <path d="M43.9706 22H3" />
            <path d="M18.9706 39L2 22.0295L18.9706 5.0589" />
          </svg>
        </button>
      </Fragment>,
      portalTarget
    )
  }
  return <Fragment />
}

export default Lightbox
