import { Theme, ThemeProvider } from '@emotion/react'
import { Fragment, ReactNode } from 'react'

import GlobalStyles from '../theme/GlobalStyles'
import AlertBar, { AlertBarProps } from './AlertBar'
import CTABar, { CTABarProps } from './CTABar'
import Footer, { FooterProps } from './Footer'
import MainNav, { MainNavProps } from './MainNav'

type Props = {
  nav: MainNavProps
  ctaBar: CTABarProps
  footer: FooterProps
  children: ReactNode
  alert: AlertBarProps
  collapsed?: boolean
  noFooter?: boolean
  noAlert?: boolean
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
  nav,
  footer,
  alert,
  ctaBar,
  children,
  collapsed,
  noFooter,
  noAlert,
  theme,
}: Props): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AlertBar
        alert={alert.alert}
        showAlert={noAlert ? false : alert.showAlert}
      />
      <MainNav
        logo={nav.logo}
        navItems={nav.navItems}
        buttons={nav.buttons}
        modal={nav.modal}
        breakpoint={nav.breakpoint}
        collapsed={collapsed}
      />
      <main>{children}</main>
      {!noFooter && (
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
