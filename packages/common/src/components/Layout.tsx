import { Fragment, ReactNode } from 'react'

import { GlobalStyles } from '../theme/GlobalStyles'
import Footer, { FooterProps } from './Footer'
import MainNav, { MainNavProps } from './MainNav'

type Props = {
  nav: MainNavProps
  footer: FooterProps
  children: ReactNode
}

const Layout = ({ nav, footer, children }: Props) => {
  return (
    <Fragment>
      <GlobalStyles />
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
