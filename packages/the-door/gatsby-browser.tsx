import { CornerPopupContextProvider } from '@the-door/common/src/context/CornerPopupContext'
import { LightboxContextProvider } from '@the-door/common/src/context/LightboxContext'
import { NavButtonModalContextProvider } from '@the-door/common/src/context/NavButtonModalContext'
import { NavMenuContextProvider } from '@the-door/common/src/context/NavMenuContext'
import { QueryContextProvider } from '@the-door/common/src/context/QueryContext'
import { ThemeContextProvider } from '@the-door/common/src/context/ThemeContext'
import { GatsbyBrowser } from 'gatsby'
import * as React from 'react'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => (
  <ThemeContextProvider>
    <QueryContextProvider>
      <NavMenuContextProvider>
        <NavButtonModalContextProvider>
          <CornerPopupContextProvider>
            <LightboxContextProvider>{element}</LightboxContextProvider>
          </CornerPopupContextProvider>
        </NavButtonModalContextProvider>
      </NavMenuContextProvider>
    </QueryContextProvider>
  </ThemeContextProvider>
)
