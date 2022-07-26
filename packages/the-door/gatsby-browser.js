import { CornerPopupContextProvider } from '@the-door/common/src/context/CornerPopupContext'
import { NavButtonModalContextProvider } from '@the-door/common/src/context/NavButtonModalContext'

export const wrapRootElement = ({ element }) => (
  <NavButtonModalContextProvider>
    <CornerPopupContextProvider>{element}</CornerPopupContextProvider>
  </NavButtonModalContextProvider>
)
