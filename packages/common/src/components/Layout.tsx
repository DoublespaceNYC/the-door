import { CSSInterpolation } from '@emotion/serialize'
import { FC, Fragment, ReactNode } from 'react'

import { GlobalStyles } from '../theme/GlobalStyles'
import MainNav, { MainNavProps } from './MainNav'

type Props = {
  nav: MainNavProps
  children: ReactNode
}

const Layout = ({ nav, children }: Props) => {
  return (
    <Fragment>
      <GlobalStyles />
      <MainNav
        logo={nav.logo}
        linkGroups={nav.linkGroups}
        buttons={nav.buttons}
        colors={nav.colors}
      />
      <main>{children}</main>
    </Fragment>
  )
}

export default Layout
