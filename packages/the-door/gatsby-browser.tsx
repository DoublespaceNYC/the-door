import { CornerPopupContextProvider } from '@the-door/common/src/context/CornerPopupContext'
import { NavButtonModalContextProvider } from '@the-door/common/src/context/NavButtonModalContext'
import { NavMenuContextProvider } from '@the-door/common/src/context/NavMenuContext'
import { GatsbyBrowser } from 'gatsby'
import React from 'react'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => (
  <NavMenuContextProvider>
    <NavButtonModalContextProvider>
      <CornerPopupContextProvider>{element}</CornerPopupContextProvider>
    </NavButtonModalContextProvider>
  </NavMenuContextProvider>
)
