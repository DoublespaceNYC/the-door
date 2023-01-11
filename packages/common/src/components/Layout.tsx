import { Theme, ThemeProvider, css } from '@emotion/react'
import { WindowLocation } from '@reach/router'
import { Fragment, ReactNode } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'

import GlobalStyles from '../theme/GlobalStyles'
import { absoluteFill } from '../theme/mixins'
import AlertBar, { AlertBarProps } from './AlertBar'
import CTABar, { CTABarProps } from './CTABar'
import Footer, { FooterProps } from './Footer'
import MainNav, { MainNavProps } from './MainNav'

type Props = {
  location: WindowLocation
  nav: MainNavProps
  ctaBar: CTABarProps
  footer: FooterProps
  children: ReactNode
  alert: AlertBarProps
  collapsed?: boolean
  theme: ITheme
}

export interface ITheme extends Theme {
  themeName: 'The Door' | 'BSA'

  primary: string // Navy | BsaBlue
  primaryDark: string
  secondary: string // Blue | BsaGold
  secondaryLight: string
  secondaryMid: string
  secondaryDark: string
  tertiary: string // Pink | BsaBlue
  tertiaryLight: string
  tertiaryDark: string
  quaternary: string // Yellow | BsaGold
  quaternaryLight: string
  quaternaryDark: string
  quinary: string // Purple | BsaBlue
  quinaryLight: string
  quinaryDark: string
  senary: string // Teal | BsaGold
  senaryLight: string
  senaryDark: string
  septenary: string // Green | BsaBlue
  septenaryLight: string
  septenaryDark: string

  gray95: string
  gray92: string
  gray75: string
  gray66: string
  gray50: string
  gray40: string

  contentColorsArray: string[] // Purple, Pink, Teal, Green
  buttonColorsArray: string[]
}

const Layout = ({
  location,
  nav,
  footer,
  alert,
  ctaBar,
  children,
  collapsed,
  theme,
}: Props): JSX.Element => {
  const transitionTimeout = 500

  const mainStyle = css`
    display: grid;
  `
  const transitionStyles = {
    default: css`
      position: relative;
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      opacity: 0;
      transition: opacity 0ms linear ${transitionTimeout / 2}ms;
      z-index: 1;
      &::after {
        content: '';
        display: block;
        ${absoluteFill}
        background: ${theme.primaryDark};
        transition: opacity ${transitionTimeout / 2}ms ease-in
          ${transitionTimeout / 2}ms;
        opacity: 1;
        z-index: 100;
        pointer-events: none;
      }
    `,
    unmounted: null,
    entering: css`
      opacity: 1;
      &::after {
        opacity: 0;
      }
    `,
    entered: css`
      opacity: 1;
      &::after {
        opacity: 0;
      }
    `,
    exiting: css`
      z-index: 2;
      &::after {
        transition-delay: 0ms;
        transition-timing-function: ease-out;
        opacity: 1;
      }
    `,
    exited: css`
      &::after {
        opacity: 1;
      }
    `,
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AlertBar
        alert={alert.alert}
        showAlert={collapsed ? false : alert.showAlert}
      />
      <MainNav
        logo={nav.logo}
        navItems={nav.navItems}
        buttons={nav.buttons}
        modal={nav.modal}
        breakpoint={nav.breakpoint}
        collapsed={collapsed}
      />
      <TransitionGroup
        component={'main'}
        css={mainStyle}
      >
        <Transition
          key={location.key}
          timeout={transitionTimeout}
        >
          {status => (
            <div
              css={[transitionStyles.default, transitionStyles[status]]}
              data-status={status}
            >
              {children}
            </div>
          )}
        </Transition>
      </TransitionGroup>

      {!collapsed && (
        <Fragment>
          <CTABar data={ctaBar.data} />
          <Footer
            logo={footer.logo}
            navItems={footer.navItems}
            buttons={footer.buttons}
            meta={footer.meta}
          />
        </Fragment>
      )}

      <div id="popup-container" />
      <div id="lightbox-container" />
    </ThemeProvider>
  )
}

export default Layout
