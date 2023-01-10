import { css, useTheme } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { Link } from 'gatsby'
import { mix } from 'polished'
import { Fragment, useMemo, useRef } from 'react'
import { StructuredText } from 'react-datocms'
import { createPortal } from 'react-dom'

import useFocusTrap from '../hooks/useFocusTrap'
import { useWindowWidth } from '../hooks/useWindowDimensions'
import { absoluteFill, mq } from '../theme/mixins'
import { IStructuredText } from '../types'
import DatoLink from './DatoLink'
import GatsbyImageFocused, { IGatsbyImageFocused } from './GatsbyImageFocused'
import { IInternalLink } from './InternalLink'
import { IInternalLinkFiltered } from './InternalLinkFiltered'
import { ITheme } from './Layout'

export interface IServicesGroupLink {
  __typename: 'DatoCmsServicesGroupLink'
  servicesGroup: {
    title: string
    services: {
      title: string
      slug: string
    }[]
  }
}

export interface ILinkGroup {
  __typename: 'DatoCmsLinkGroup'
  linkText: string
  title: string
  description: IStructuredText
  links: (IInternalLink | IInternalLinkFiltered | IServicesGroupLink)[]
  backgroundImage: IGatsbyImageFocused
}

type Props = {
  data: ILinkGroup
  open: boolean
  onOpen: () => void
  onClose: () => void
  onCloseAll: () => void
  portalTarget: HTMLDivElement | null
  breakpoint: number
  buttonCss?: CSSInterpolation
}

const NavLinkGroup = ({
  data: { linkText, title, description, links, backgroundImage },
  open,
  onOpen = () => null,
  onClose = () => null,
  onCloseAll = () => null,
  portalTarget,
  breakpoint,
  buttonCss,
}: Props): JSX.Element => {
  const linkCount = useMemo(() => {
    let sGCount = 0
    links.forEach(link => {
      if (link.__typename === 'DatoCmsServicesGroupLink') {
        sGCount += link.servicesGroup.services.length
      }
    })
    return links.length + sGCount
  }, [links])
  const navRef = useRef(null)

  const transitionDuration = 500

  useFocusTrap(navRef.current, open, transitionDuration)

  const windowWidth = useWindowWidth()

  const theme = useTheme() as ITheme
  const styles = {
    button: css`
      ${open &&
      css`
        span {
          text-decoration-line: underline;
        }
      `}
    `,
    nav: css`
      position: fixed;
      left: 0;
      width: 100%;
      top: calc(var(--nav-height) - 1px);
      height: calc(100% - var(--nav-height) + 1px);
      opacity: 0;
      z-index: 2;
      pointer-events: none;
      overflow: hidden;
      background-color: ${theme.primaryDark};
      color: #fff;
      font-size: var(--fs-24);
      transform: translate3d(0, -100%, 0);
      transition: transform ${transitionDuration}ms ease,
        opacity 0ms linear ${transitionDuration}ms;
      @media (max-width: ${breakpoint}px) {
        transform: translate3d(-100%, 0, 0);
      }
      ${open &&
      css`
        transition: transform ${transitionDuration}ms ease;
        opacity: 1;
        z-index: 3;
        pointer-events: all;
        transform: translate3d(0, 0, 0);
        @media (max-width: ${breakpoint}px) {
          transform: translate3d(0, 0, 0);
        }
      `}
    `,
    content: css`
      ${absoluteFill}
      display: grid;
      grid-template-columns: ${linkCount > 12 ? '1fr 1fr' : '2fr 1fr'};
      grid-template-rows: auto 1fr;
      overflow: hidden;
      ${mq().ml} {
        grid-template-columns: 1fr 1fr;
      }
      ${mq().s} {
        grid-template-columns: 1fr;
        overflow: scroll;
      }
    `,
    linkListWrap: css`
      overflow: scroll;
      grid-column: 2 / 3;
      grid-row: 1 / 4;
      ${mq().s} {
        grid-column: 1 / 2;
        grid-row: auto;
        overflow: visible;
        z-index: 2;
      }
    `,
    linkList: css`
      margin: 0;
      padding: calc(var(--row-l) - 0.5em) var(--margin) var(--row-s);
      column-count: ${linkCount > 12 && '2'};
      column-gap: 1.5em;
      ${mq().ml} {
        column-count: 1;
      }
      @media (max-width: ${breakpoint}px) {
        padding-right: calc(var(--margin) + 1.5em);
        padding-top: calc(var(--row-m) - 0.5em);
      }
      ul {
        margin: 0;
        padding: 0;
        display: inline-block;
        width: 100%;
        margin: 0.5em 0 1.5em;
        &::before {
          content: attr(aria-label);
          color: ${mix(0.5, '#fff', theme.primaryDark)};
          display: block;
          font-family: var(--display-font);
          font-size: var(--fs-21);
          text-transform: uppercase;
          line-height: 1.125;
          letter-spacing: 0.05em;
          padding-bottom: 0.333em;
          margin-bottom: 0.5em;
          border-bottom: 2px solid currentColor;
          max-width: fit-content;
        }
      }
      li {
        display: block;
        width: fit-content;
      }
      a {
        display: block;
        color: #fff;
        max-width: fit-content;
        padding: 0.5em 0;
        text-decoration: none;
        line-height: 1.333;
        span {
          text-underline-offset: 0.125em;
          text-decoration-thickness: 2px;
          text-decoration-skip-ink: auto;
        }
        @media (hover: hover) {
          &:hover > span {
            text-decoration-line: underline;
          }
        }
      }
    `,
    linkAfterGroup: css`
      padding-top: 0.5em;
      border-top: 2px solid ${mix(0.5, '#fff', theme.primaryDark)};
    `,
    closeButton: css`
      display: flex;
      width: 1em;
      padding: 0.25em;
      box-sizing: content-box;
      position: absolute;
      z-index: 10;
      top: 0.75em;
      right: 0.75em;
      color: ${mix(0.5, '#fff', theme.primaryDark)};
      transition: color 300ms ease;
      @media (max-width: ${breakpoint}px) {
        right: calc(var(--margin) - 0.25em);
      }
      ${mq().s} {
        position: fixed;
        color: #fff;
      }
      svg {
        width: 100%;
        transform: scale3d(0.999, 0.999, 1);
        transition: transform 200ms ease;
        path,
        line {
          stroke: currentColor;
          stroke-width: 2;
          fill: transparent;
        }
      }
      @media (hover: hover) {
        &:hover {
          color: #fff;
          svg {
            transform: scale3d(1.25, 1.25, 1);
          }
        }
      }
    `,
    imageWrap: css`
      position: relative;
      grid-column: 1 / 2;
      grid-row: 1 / 4;
      padding: var(--row-l) var(--margin);
      font-size: var(--fs-18);
      h2 {
        position: relative;
        font-size: var(--fs-108);
        margin: -0.125em 0 0.25em;
        line-height: 1;
        z-index: 1;
      }
      p {
        position: relative;
        line-height: 1.5;
        z-index: 1;
      }
      ${mq().s} {
        grid-row: auto;
        padding: var(--row-m) var(--margin) var(--row-s);
        z-index: 1;
        h2 {
          font-size: var(--fs-72);
          margin-top: 0.125em;
        }
      }
    `,
    image: css`
      ${absoluteFill}
      opacity: ${open ? 1 : 0};
      z-index: 0;
      transition: opacity 500ms ease 100ms;
      > div[data-gatsby-image-wrapper] {
        height: 100%;
      }
      ${mq().s} {
        opacity: 0.5;
      }
    `,
  }
  return (
    <Fragment>
      <button
        css={[buttonCss, styles.button]}
        onClick={onOpen}
        aria-label={`open menu for ${linkText}`}
      >
        <span>{linkText}</span>
      </button>
      {portalTarget &&
        createPortal(
          <nav
            css={styles.nav}
            ref={navRef}
          >
            <div css={styles.content}>
              <div css={styles.imageWrap}>
                {backgroundImage && (
                  <GatsbyImageFocused
                    css={styles.image}
                    image={backgroundImage.gatsbyImageData}
                    alt={backgroundImage.alt || ''}
                    focalPoint={backgroundImage.focalPoint}
                    aspectRatio={1}
                    originalAspectRatio={backgroundImage.sizes.aspectRatio}
                  />
                )}
                <h2>{title}</h2>
                {description.value && <StructuredText data={description} />}
              </div>
              <div css={styles.linkListWrap}>
                <ul css={styles.linkList}>
                  {links.map((link, i, array) => {
                    if (link.__typename === 'DatoCmsServicesGroupLink') {
                      return (
                        <li key={i}>
                          <ul aria-label={link.servicesGroup.title}>
                            {link.servicesGroup.services.map((service, i) => {
                              const slug = `/${service.slug}/`
                              return (
                                <li key={i}>
                                  <Link
                                    to={slug}
                                    tabIndex={open ? 0 : -1}
                                    onClick={() => {
                                      if (window.location.pathname === slug) {
                                        onCloseAll()
                                      }
                                    }}
                                  >
                                    <span>{service.title}</span>
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        </li>
                      )
                    } else {
                      return (
                        <li
                          key={i}
                          css={
                            (i > 0 &&
                              array[i - 1].__typename ===
                                'DatoCmsServicesGroupLink' &&
                              styles.linkAfterGroup) ||
                            null
                          }
                        >
                          <DatoLink
                            data={link}
                            tabIndex={open ? 0 : -1}
                            onClick={() => {
                              if (
                                window.location.pathname ===
                                `/${link.link.slug}/`.replace('//', '/')
                              ) {
                                onCloseAll()
                              }
                            }}
                          />
                        </li>
                      )
                    }
                  })}
                </ul>
              </div>
            </div>
            <button
              onClick={onClose}
              css={styles.closeButton}
              tabIndex={open ? 0 : -1}
              aria-label={`close menu for ${linkText}`}
            >
              <svg
                viewBox="0 0 24 24"
                vectorEffect="non-scaling-stroke"
              >
                {windowWidth && windowWidth > breakpoint ? (
                  <Fragment>
                    <path d="M1 1L23 23" />
                    <path d="M1 23L23 1" />
                  </Fragment>
                ) : (
                  <Fragment>
                    <path d="M13 1L2 12L13 23" />
                    <line
                      x1="2"
                      y1="12"
                      x2="24"
                      y2="12"
                    />
                  </Fragment>
                )}
              </svg>
            </button>
          </nav>,
          portalTarget
        )}
    </Fragment>
  )
}

export default NavLinkGroup
