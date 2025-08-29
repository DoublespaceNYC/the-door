import { Global, css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { Link } from 'gatsby'
import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useInView } from 'react-intersection-observer'

import useLightboxContext from '../context/LightboxContext'
import useNavMenuContext from '../context/NavMenuContext'
import { useElementHeight } from '../hooks/useElementRect'
import { useEscKeyFunction } from '../hooks/useEscKeyFunction'
import { useWindowWidth } from '../hooks/useWindowDimensions'
import { absoluteFill, mq } from '../theme/mixins'
import { LogoProps } from '../types'
import DatoLink from './DatoLink'
import { IExternalLink } from './ExternalLink'
import { IInternalLink } from './InternalLink'
import { ITheme } from './Layout'
import NavBurger from './NavBurger'
import NavButton, { IHighlightedLinkModal } from './NavButton'
import NavLinkGroup, { ILinkGroup } from './NavLinkGroup'
import ScrollToggle from './ScrollToggle'

type INavItem = ILinkGroup | IInternalLink | IExternalLink

export type MainNavProps = {
  logo: FC<LogoProps>
  navItems: INavItem[]
  buttons: IInternalLink[]
  modal: IHighlightedLinkModal[]
  breakpoint: number
  collapsed?: boolean
}

const MainNav = ({
  logo,
  navItems,
  buttons,
  modal,
  breakpoint,
  collapsed,
}: MainNavProps): JSX.Element => {
  const Logo = logo

  const { ref: scrollRef, inView } = useInView({
    initialInView: true,
  })
  const { open: lightboxOpen } = useLightboxContext()
  const scrolled = !inView || lightboxOpen

  const windowWidth = useWindowWidth() || Infinity

  const [navRef, setNavRef] = useState<HTMLElement | null>(null)
  const navHeight = useElementHeight(navRef)

  const navItemsGroupRef = useRef<HTMLDivElement>(null)
  const dropdownContainerRef = useRef<HTMLDivElement>(null)

  const { activeNavIndex, setActiveNavIndex, burgerOpen, setBurgerOpen } =
    useNavMenuContext()

  useEffect(() => {
    if (windowWidth && windowWidth > breakpoint) {
      setBurgerOpen(false)
    }
  }, [windowWidth, breakpoint, setBurgerOpen])

  useEscKeyFunction(() => {
    setActiveNavIndex(null)
    setBurgerOpen(false)
  })

  const handleLinkClick = () => {
    setActiveNavIndex(null)
    setBurgerOpen(false)
  }

  const theme = useTheme() as ITheme

  const styles = {
    scrollObserver: css`
      position: absolute;
      top: 0;
      left: 0;
      height: 12rem;
      width: 100%;
      pointer-events: none;
    `,
    navWrap: css`
      position: sticky;
      height: 0;
      overflow: visible;
      top: 0;
      left: 0;
      z-index: 10;
      font-size: var(--fs-48);
      height: 1.5em;
      pointer-events: none;
      transition: height 300ms ease;
      ${mq().s} {
        height: 1.25em;
      }
      ${collapsed &&
      css`
        height: 1.125em;
      `}
    `,
    nav: css`
      display: grid;
      grid-template-columns: auto 1fr auto;
      padding: 0 var(--margin) 0 var(--gtr-m);
      justify-items: flex-end;
      align-items: stretch;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      pointer-events: all;
      &::before {
        content: '';
        display: block;
        ${absoluteFill}
        background: ${theme.primary};
        z-index: 4;
      }
    `,
    logoWrap: css`
      display: flex;
      z-index: 5;
    `,
    logo: css`
      align-self: center;
      font-size: var(--fs-48);
      height: 1em;
      margin: 0.25em 0;
      transition: height 300ms ease, margin 300ms ease;
      ${(scrolled || collapsed) &&
      css`
        height: 0.875em;
        margin: 0.125em 0;
      `}
      ${mq().s} {
        height: 1em;
        margin: 0.125em 0;
      }
    `,
    navItemsGroup: css`
      display: contents;
    `,
    navItemsGroupConditional: css`
      display: flex;
      z-index: 5;
      font-size: var(--fs-18);
      > div {
        display: flex;
        min-height: 100%;
      }
      @media (max-width: ${breakpoint}px) {
        display: block;
        overflow: auto;
        pointer-events: none;
        position: fixed;
        left: 0;
        width: 100%;
        top: calc(var(--nav-height) - 1px);
        height: calc(100% - var(--nav-height) + 1px);
        background: ${theme.primaryDark};
        z-index: 0;
        font-size: var(--fs-36);
        opacity: 0;
        transform: translate3d(0, -100%, 0);
        transition: transform 300ms ease-in, opacity 0ms linear 300ms,
          filter 300ms ease;
        > div {
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 1em var(--margin) 1.5em;
        }
        ${burgerOpen &&
        css`
          pointer-events: all;
          transform: translate3d(0, 0, 0);
          opacity: 1;
          transition: transform 300ms ease-out, filter 1000ms ease;
        `}
        ${activeNavIndex !== null &&
        css`
          filter: brightness(0.5);
        `}
      }
    `,
    navButtonsGroup: css`
      display: flex;
      z-index: 5;
      font-size: var(--fs-18);
    `,
    navItem: css`
      color: #fff;
      font-size: inherit;
      font-family: var(--display-font);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.5em 1em;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      text-decoration: none;
      white-space: nowrap;

      @media (max-width: ${breakpoint}px) {
        padding: 0.5em 0.75em;
      }
      ${mq().s} {
        padding: 0.5em;
      }
    `,
    navLink: css`
      > span {
        padding: calc(0.125em + 2px) 0;
        text-underline-offset: calc(0.333em + 1px);
        text-decoration-thickness: 2px;

        /* Icon CSS */
        > span {
          font-size: 80%;
          svg {
            transform: translate(0.1em, -0.2em);
          }
        }
      }
      @media (hover: hover) {
        &:hover > span {
          text-decoration-line: underline;
        }
      }
    `,
    lastButton: css`
      font-size: var(--fs-18);
      margin-right: -1em;
      @media (max-width: ${breakpoint}px) {
        margin-right: 0;
      }
    `,
    burger: css`
      font-size: var(--fs-18);
      display: none;
      color: #fff;
      padding: 0 0.75em;
      margin-right: -0.75em;
      @media (max-width: ${breakpoint}px) {
        display: flex;
      }
    `,
    dropdownContainer: css`
      position: fixed;
      width: 100vw;
      height: 100%;
      left: 0;
      top: 0;
      pointer-events: none;
      overflow: hidden;
      ${activeNavIndex !== null &&
      css`
        pointer-events: all;
      `}
    `,
  }
  return (
    <Fragment>
      <div
        aria-hidden
        css={styles.scrollObserver}
        ref={scrollRef}
      />
      <div css={styles.navWrap}>
        <nav
          css={styles.nav}
          ref={node => setNavRef(node)}
        >
          <Link
            to="/"
            css={styles.logoWrap}
            onClick={handleLinkClick}
          >
            <Logo
              css={styles.logo}
              fill="#fff"
            />
          </Link>
          <div
            css={styles.navItemsGroup}
            ref={navItemsGroupRef}
          >
            {dropdownContainerRef.current &&
              navItemsGroupRef.current &&
              createPortal(
                <nav css={styles.navItemsGroupConditional}>
                  <div>
                    {navItems.map((navItem, i) => {
                      if (navItem.__typename === 'DatoCmsLinkGroup') {
                        return (
                          <NavLinkGroup
                            data={navItem}
                            onOpen={() => setActiveNavIndex(i)}
                            onClose={() => {
                              setActiveNavIndex(null)
                            }}
                            onCloseAll={handleLinkClick}
                            open={activeNavIndex === i}
                            buttonCss={[styles.navItem, styles.navLink]}
                            portalTarget={dropdownContainerRef.current}
                            breakpoint={breakpoint}
                            key={i}
                          />
                        )
                      } else
                        return (
                          <DatoLink
                            css={[styles.navItem, styles.navLink]}
                            data={navItem}
                            key={i}
                          />
                        )
                    })}
                    {windowWidth <= breakpoint &&
                      buttons.map((button, i) => (
                        <NavButton
                          buttonCss={styles.navItem}
                          button={button}
                          color={
                            theme.buttonColorsArray[
                              i % theme.buttonColorsArray.length
                            ]
                          }
                          key={i}
                          onClick={handleLinkClick}
                        />
                      ))}
                  </div>
                </nav>,
                windowWidth <= breakpoint
                  ? dropdownContainerRef.current
                  : navItemsGroupRef.current
              )}
          </div>
          <div css={styles.navButtonsGroup}>
            {(theme.themeName === 'The Door' ||
              (windowWidth && windowWidth >= breakpoint)) &&
              buttons.map((button, i) => (
                <NavButton
                  css={i + 1 === buttons.length && styles.lastButton}
                  buttonCss={[styles.navItem]}
                  button={button}
                  color={
                    theme.buttonColorsArray[i % theme.buttonColorsArray.length]
                  }
                  modal={
                    modal[0]?.highlightedLinkNumber === i + 1
                      ? modal[0]
                      : undefined
                  }
                  key={i}
                  onClick={handleLinkClick}
                />
              ))}
          </div>
          <NavBurger
            open={burgerOpen}
            css={styles.burger}
            onClick={() => {
              if (burgerOpen) {
                setBurgerOpen(false)
                setActiveNavIndex(null)
              } else {
                setBurgerOpen(true)
              }
            }}
          />
          <div
            css={styles.dropdownContainer}
            ref={dropdownContainerRef}
          />
        </nav>
      </div>
      {activeNavIndex !== null && <ScrollToggle />}
      <Global
        styles={css`
          :root {
            --nav-height: ${navHeight}px;
          }
        `}
      />
    </Fragment>
  )
}

export default MainNav
