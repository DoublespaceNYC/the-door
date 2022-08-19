import { Fragment, ReactNode } from 'react'

import { GlobalStyles } from '../theme/GlobalStyles'
import AlertBar, { AlertBarProps } from './AlertBar'
import Footer, { FooterProps } from './Footer'
import MainNav, { MainNavProps } from './MainNav'

type Props = {
  nav: MainNavProps
  footer: FooterProps
  children: ReactNode
  alert: AlertBarProps
}

const Layout = ({ nav, footer, alert, children }: Props) => {
  return (
    <Fragment>
      <GlobalStyles />
      <AlertBar
        alert={alert.alert}
        colors={alert.colors}
        showAlert={alert.showAlert}
      />
      <MainNav
        logo={nav.logo}
        navItems={nav.navItems}
        buttons={nav.buttons}
        colors={nav.colors}
        breakpoint={nav.breakpoint}
      />
      <main>{children}</main>
      <Footer
        logo={footer.logo}
        navItems={footer.navItems}
        buttons={footer.buttons}
        meta={footer.meta}
        colors={footer.colors}
      />
      <div id="popup-container" />
    </Fragment>
  )
}

export default Layout
