import { css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import throttle from 'lodash/throttle'
import { HTMLAttributes, useRef } from 'react'
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import smoothscroll from 'smoothscroll-polyfill'

import { useElementWidth } from '../hooks/useElementRect'
import { linkStyle } from '../theme/mixins'
import DatoLink, { IDatoLink } from './DatoLink'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  navContainer?: HTMLElement | null
  scrollWidthCss?: CSSInterpolation
  scrollAreaCss?: CSSInterpolation
  contentCss?: CSSInterpolation
  navStyle?: 'overlay' | 'above'
  snap?: boolean
  colors?: {
    arrow: [string?, string?]
    arrowDisabled?: string
    link: [string?, string?]
  }
  link?: IDatoLink
}

const ScrollSlider = ({
  children,
  navContainer,
  scrollWidthCss,
  scrollAreaCss,
  contentCss,
  navStyle = 'overlay',
  snap,
  link,
  colors,
  ...props
}: Props): JSX.Element => {
  const [scrollPos, setScrollPos] = useState(0)

  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(
    null
  )
  const contentRefCallback = (node: HTMLDivElement) => {
    setContentRef(node)
  }
  const [sliderRef, setSliderRef] = useState<HTMLDivElement | null>(
    null
  )
  const sliderRefCallback = (node: HTMLDivElement) => {
    setSliderRef(node)
  }
  const [scrollWidthRef, setScrollWidthRef] =
    useState<HTMLDivElement | null>(null)
  const scrollWidthRefCallback = (node: HTMLDivElement) => {
    setScrollWidthRef(node)
  }

  const containerWidth = useElementWidth(sliderRef)
  const contentWidth = useElementWidth(contentRef)
  const scrollWidth = useElementWidth(scrollWidthRef)

  useEffect(() => {
    sliderRef?.scrollTo(0, 0)
  }, [sliderRef])

  useEffect(() => smoothscroll.polyfill(), [])

  const scrollEffect = useCallback(() => {
    contentRef &&
      sliderRef &&
      setScrollPos(
        contentRef.getBoundingClientRect().x -
          sliderRef.getBoundingClientRect().x
      )
  }, [contentRef, sliderRef])
  const handleScroll = throttle(scrollEffect, 50)
  useEffect(() => {
    sliderRef?.addEventListener('scroll', handleScroll)
    return () => {
      sliderRef?.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, sliderRef])

  const handleScrollBack = () => {
    sliderRef?.scrollBy({
      top: 0,
      left: -scrollWidth,
      behavior: 'smooth',
    })
  }
  const handleScrollForward = () => {
    sliderRef?.scrollBy({
      top: 0,
      left: scrollWidth,
      behavior: 'smooth',
    })
  }

  const navRef = useRef<HTMLDivElement | null>(null)
  const navVisible = useMemo(() => {
    return sliderRef && containerWidth < contentWidth - 20
  }, [sliderRef, containerWidth, contentWidth])

  const navPortalTarget = navContainer || navRef.current

  const styles = {
    outer: css`
      position: relative;
      overflow: hidden;
      ${navStyle === 'above' &&
      !navVisible &&
      css`
        margin-top: 1.5rem;
      `}
    `,
    slider: css`
      position: relative;
      > div {
        position: relative;
        display: flex;
        overflow-x: auto;
        overflow-y: visible;
        width: 100%;
        -webkit-overflow-scrolling: touch;
        scroll-snap-type: ${sliderRef && snap
          ? 'x mandatory'
          : 'unset'};
        // Hide scrollbar
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    `,
    content: css`
      position: relative;
      min-height: min-content;
      display: flex;
      box-sizing: content-box;
      > * {
        scroll-snap-align: start;
      }
    `,
    nav: css`
      ${navStyle === 'overlay' &&
      css`
        display: contents;
      `}
      ${navStyle === 'above' &&
      css`
        position: relative;
        padding-right: calc(var(--margin) - 0.67rem);
        margin-bottom: 1rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      `}
    `,
    scrollButton: css`
      display: flex;
      flex: none;
      align-items: center;
      justify-content: center;
      --transformXY: translate(0%, -50%);
      top: 50%;
      transform: var(--transformXY) scale3d(0.999, 0.999, 1);
      transition: transform 400ms cubic-bezier(0.33, 3, 0.25, 0.5);
      svg {
        position: relative;
        width: auto;
        overflow: visible;
        polyline {
          fill: transparent;
          stroke-width: 3;
          stroke: ${colors?.arrow[0] || '#fff'};
          transition: stroke 300ms ease;
        }
      }
      @media (hover: hover) {
        &:hover {
          transform: var(--transformXY) scale3d(1.125, 1.125, 1);
          svg polyline {
            stroke: ${colors?.arrow[1]};
          }
        }
        &:active {
          transform: var(--transformXY) scale3d(1.075, 1.075, 1);
        }
      }
      ${navStyle === 'overlay' &&
      css`
        border: none;
        background-color: transparent;
        position: absolute;
        z-index: 3;
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        width: max(calc(2 * var(--margin)), 2.5rem);
        height: max(calc(4 * var(--margin)), 5rem);
        svg {
          position: absolute;
          height: 50%;
        }
      `}
      ${navStyle === 'above' &&
      css`
        --transformXY: translate(0, 0);
        width: 3rem;
        height: 3rem;
        justify-content: center;
        svg {
          height: 75%;
          left: auto !important;
          right: auto !important;
        }
      `}
    `,
    back: css`
      ${navStyle === 'overlay' &&
      css`
        left: 0%;
      `}
      svg {
        transform: scaleX(-1) translateX(20%);
      }
    `,
    forward: css`
      ${navStyle === 'overlay' &&
      css`
        right: 0%;
      `}
      svg {
        transform: translateX(20%);
      }
    `,
    disabled: css`
      svg polyline {
        stroke: ${colors?.arrowDisabled || '#ffffff33'};
      }
      cursor: default;
      pointer-events: none;
    `,
    link: css`
      ${linkStyle}
      margin: 0 0.5em;
      color: ${colors?.link[0] || null};
      flex: none;
      &:hover {
        @media (hover: hover) {
          color: ${colors?.link[1] || null};
        }
      }
    `,
  }

  return (
    <div css={styles.outer} {...props}>
      <div ref={navRef} />
      {navVisible &&
        navPortalTarget &&
        createPortal(
          <nav css={styles.nav}>
            {link && <DatoLink data={link} css={styles.link} />}
            <button
              css={[
                styles.scrollButton,
                styles.back,
                scrollPos >= -10 && styles.disabled,
              ]}
              onClick={handleScrollBack}
              onKeyPress={handleScrollBack}
              aria-label="scroll back"
            >
              <svg
                width="24px"
                height="48px"
                viewBox="0 0 24 48"
                vectorEffect="non-scaling-stroke"
              >
                <polyline
                  points="1 45.5 22.5 24 1 2.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </button>
            <button
              css={[
                styles.scrollButton,
                styles.forward,
                containerWidth - scrollPos >= contentWidth - 10 &&
                  styles.disabled,
              ]}
              onClick={handleScrollForward}
              onKeyPress={handleScrollForward}
              aria-label="scroll forward"
            >
              <svg width="24px" height="48px" viewBox="0 0 24 48">
                <polyline
                  points="1 45.5 22.5 24 1 2.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </button>
          </nav>,
          navPortalTarget
        )}
      <div css={scrollWidthCss} ref={scrollWidthRefCallback} />
      <div css={styles.slider}>
        <div css={scrollAreaCss} ref={sliderRefCallback}>
          <div
            css={[styles.content, contentCss]}
            ref={contentRefCallback}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollSlider
