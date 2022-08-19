import { Global, css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { Link } from 'gatsby'
import { FC, Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useElementHeight } from '../hooks/useElementRect'
import { useWindowWidth } from '../hooks/useWindowDimensions'
import { absoluteFill } from '../theme/mixins'
import { IExternalLink, IInternalLink } from './DatoLink'
import DatoLink from './DatoLink'
import NavBurger from './NavBurger'
import NavButton, { INavButton } from './NavButton'

interface ILinkGroup {
  __typename: 'DatoCmsLinkGroup'
  linkText: string
  links: IInternalLink[]
}

type INavItem = ILinkGroup | IInternalLink | IExternalLink

export type MainNavProps = {
  logo: FC<{ css?: CSSInterpolation; fill?: string }>
  navItems: INavItem[]
  buttons: INavButton[]
  colors: {
    bg: string
    bgSecondary: string
    logo: string
    text: string
    buttons: string[]
  }
  breakpoint: number
}

const MainNav = ({
  logo,
  navItems,
  buttons,
  colors,
  breakpoint,
}: MainNavProps) => {
  const Logo = logo

  const { ref: scrollRef, inView } = useInView({
    initialInView: true,
  })
  const scrolled = !inView

  const windowWidth = useWindowWidth()

  const [navRef, setNavRef] = useState<HTMLElement | null>(null)
  const navHeight = useElementHeight(navRef)

  const [burgerOpen, setBurgerOpen] = useState(false)

  useEffect(() => {
    if (windowWidth && windowWidth > breakpoint) {
      setBurgerOpen(false)
    }
  }, [windowWidth, breakpoint])

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
    `,
    nav: css`
      display: grid;
      grid-template-columns: auto 1fr auto;
      padding: 0 var(--margin);
      justify-items: flex-end;
      align-items: stretch;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      &:before {
        content: '';
        display: block;
        ${absoluteFill}
        background: ${colors.bg};
        z-index: 1;
      }
    `,
    logoWrap: css`
      display: flex;
      z-index: 2;
    `,
    logo: css`
      align-self: center;
      font-size: var(--fs-48);
      height: 1em;
      margin: 0.25em 0;
      transition: height 300ms ease, margin 300ms ease;
      ${scrolled &&
      css`
        height: 0.875em;
        margin: 0.125em 0;
      `}
    `,
    navItemsGroup: css`
      display: flex;
      z-index: 2;
      font-size: var(--fs-18);
      @media (max-width: ${breakpoint}px) {
        overflow: auto;
        ${absoluteFill}
        height: 100vh;
        background: ${colors.bgSecondary};
        z-index: 0;
        font-size: var(--fs-36);
        padding: calc(var(--nav-height) + 1em) var(--gtr-s) 1.5em;
        box-sizing: border-box;
        align-items: flex-start;
        justify-content: center;
        opacity: 0;
        transform: translate3d(0, -100%, 0);
        transition: transform 300ms ease-in, opacity 0ms linear 300ms;
        ${burgerOpen &&
        css`
          transform: translate3d(0, 0, 0);
          opacity: 1;
          transition: transform 300ms ease-out;
        `}
        > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }
      }
    `,
    navItemsGroupConditional: css`
      display: contents;
      @media (max-width: breakpoint) {
        display: block;
      }
    `,
    navButtonsGroup: css`
      display: flex;
      z-index: 2;
      font-size: var(--fs-18);
    `,
    navItem: css`
      color: ${colors.text};
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
    `,
    navLink: css`
      > span {
        padding: calc(0.125em + 2px) 0;
        background: linear-gradient(currentColor, currentColor)
          no-repeat 0 calc(100% + 3px);
        background-size: 100% 2px;
        transition: background-position 200ms ease;
      }
      @media (hover: hover) {
        &:hover > span {
          background-position: 0 100%;
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
      color: ${colors.text};
      padding: 0 0.75em;
      margin-right: -0.75em;
      @media (max-width: ${breakpoint}px) {
        display: flex;
      }
    `,
  }
  return (
    <Fragment>
      <div aria-hidden css={styles.scrollObserver} ref={scrollRef} />
      <div css={styles.navWrap}>
        <nav css={styles.nav} ref={node => setNavRef(node)}>
          <Link to="/" css={styles.logoWrap}>
            <Logo css={styles.logo} fill={colors.logo} />
          </Link>
          <div css={styles.navItemsGroup}>
            <div css={styles.navItemsGroupConditional}>
              {navItems.map((navItem, i) => {
                if (navItem.__typename === 'DatoCmsLinkGroup') {
                  return (
                    <button
                      css={[styles.navItem, styles.navLink]}
                      key={i}
                    >
                      <span>{navItem.linkText}</span>
                    </button>
                  )
                } else
                  return (
                    <DatoLink
                      css={[styles.navItem, styles.navLink]}
                      link={navItem}
                      key={i}
                    />
                  )
              })}
              {windowWidth &&
                windowWidth <= breakpoint &&
                buttons.map((button, i) => (
                  <NavButton
                    buttonCss={styles.navItem}
                    button={button}
                    color={colors.buttons[i % colors.buttons.length]}
                    key={i}
                  />
                ))}
            </div>
          </div>
          <div css={styles.navButtonsGroup}>
            {buttons.map((button, i) => (
              <NavButton
                css={i + 1 === buttons.length && styles.lastButton}
                buttonCss={[styles.navItem]}
                button={button}
                color={colors.buttons[i % colors.buttons.length]}
                showModal
                key={i}
              />
            ))}
          </div>
          <NavBurger
            open={burgerOpen}
            css={styles.burger}
            onClick={() => setBurgerOpen(prev => !prev)}
          />
        </nav>
      </div>
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
