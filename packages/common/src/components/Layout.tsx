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
}: Props): JSX.Element => {
  return (
    <Fragment>
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
    </Fragment>
  )
}

export default Layout
