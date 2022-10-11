import { Fragment, ReactNode } from 'react'

import { GlobalStyles } from '../theme/GlobalStyles'
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
}

const Layout = ({
  nav,
  footer,
  alert,
  ctaBar,
  children,
}: Props): JSX.Element => {
  return (
    <Fragment>
      <GlobalStyles />
      <AlertBar alert={alert.alert} showAlert={alert.showAlert} />
      <MainNav
        logo={nav.logo}
        navItems={nav.navItems}
        buttons={nav.buttons}
        breakpoint={nav.breakpoint}
      />
      <main>{children}</main>
      <CTABar data={ctaBar.data} />
      <Footer
        logo={footer.logo}
        navItems={footer.navItems}
        buttons={footer.buttons}
        meta={footer.meta}
      />
      <div id="popup-container" />
    </Fragment>
  )
}

export default Layout
