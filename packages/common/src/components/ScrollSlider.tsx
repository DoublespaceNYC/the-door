import { SerializedStyles, css } from '@emotion/react'
import throttle from 'lodash/throttle'
import {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import smoothscroll from 'smoothscroll-polyfill'

import { useElementWidth } from '../hooks/useElementRect'
import { linkStyle } from '../theme/mixins'
import DatoLink, { IDatoLink } from './DatoLink'

type Props = {
  children: ReactNode
  scrollWidthCss?: SerializedStyles | SerializedStyles[]
  scrollAreaCss?: SerializedStyles | SerializedStyles[]
  contentCss?: SerializedStyles | SerializedStyles[]
  navStyle?: 'overlay' | 'above'
  snap?: boolean
  colors?: {
    arrow: [string, string?]
    arrowDisabled: string
    link: [string, string?]
  }
  link?: IDatoLink
  css?: SerializedStyles | SerializedStyles[]
}

const ScrollSlider = ({
  children,
  scrollWidthCss,
  scrollAreaCss,
  contentCss,
  navStyle = 'overlay',
  snap,
  link,
  colors,
  ...props
}: Props) => {
  const Link = () => link || <Fragment />

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

  if (typeof window !== 'undefined') {
    smoothscroll.polyfill()
  }

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

  const navVisible = sliderRef && containerWidth < contentWidth - 20

  const styles = {
    outer: css`
      position: relative;
      overflow: hidden;
      ${navVisible &&
      navStyle === 'above' &&
      css`
        margin-top: -4rem;
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
        padding-right: var(--margin);
        margin-bottom: 1rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      `}
    `,
    scrollButton: css`
      display: flex;
      align-items: center;
      justify-content: center;
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
      &:hover {
        @media (hover: hover) {
          svg polyline {
            stroke: ${colors?.arrow[1] || null};
          }
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
        width: max(calc(4 * var(--margin)), 5rem);
        height: max(calc(4 * var(--margin)), 5rem);
        top: 50%;
        --translateXY: translate(-50%, -50%);
        transform: var(--translateXY);
        svg {
          position: absolute;
          height: 50%;
        }
        @media (hover: hover) {
          &:hover {
            transform: var(--translateXY) scale3d(1.125, 1.125, 1);
          }
        }
        &:active {
          transform: var(--translateXY) scale3d(1.075, 1.075, 1);
        }
      `}
      ${navStyle === 'above' &&
      css`
        width: 3rem;
        height: 3rem;
        svg {
          height: 75%;
        }
        @media (hover: hover) {
          &:hover {
            transform: scale3d(1.125, 1.125, 1);
          }
        }
        &:active {
          transform: scale3d(1.075, 1.075, 1);
        }
      `}
    `,
    back: css`
      justify-content: flex-end;
      left: 0;
      svg {
        transform: scaleX(-1);
        right: 20%;
      }
    `,
    forward: css`
      --translateXY: translate(50%, -50%);
      right: 0;
      svg {
        left: 20%;
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
      &:hover {
        @media (hover: hover) {
          color: ${colors?.link[1] || null};
        }
      }
    `,
  }

  return (
    <div css={styles.outer} {...props}>
      {navVisible && (
        <nav css={styles.nav}>
          {link && <DatoLink link={link} css={styles.link} />}
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
        </nav>
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
