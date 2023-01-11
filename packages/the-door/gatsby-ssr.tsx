import { CornerPopupContextProvider } from '@the-door/common/src/context/CornerPopupContext'
import { LayoutContextProvider } from '@the-door/common/src/context/LayoutContext'
import { LightboxContextProvider } from '@the-door/common/src/context/LightboxContext'
import { NavButtonModalContextProvider } from '@the-door/common/src/context/NavButtonModalContext'
import { NavMenuContextProvider } from '@the-door/common/src/context/NavMenuContext'
import { QueryContextProvider } from '@the-door/common/src/context/QueryContext'
import { GatsbySSR } from 'gatsby'
import * as React from 'react'

import Layout from './src/components/Layout'

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
  element,
  props,
}) => (
  <QueryContextProvider>
    <NavMenuContextProvider>
      <NavButtonModalContextProvider>
        <CornerPopupContextProvider>
          <LightboxContextProvider>
            <LayoutContextProvider>
              <Layout pageProps={props}>{element}</Layout>
            </LayoutContextProvider>
          </LightboxContextProvider>
        </CornerPopupContextProvider>
      </NavButtonModalContextProvider>
    </NavMenuContextProvider>
  </QueryContextProvider>
)
