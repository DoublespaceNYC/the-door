import { ReactNode, createContext, useState } from 'react'

interface IContext {
  open: boolean
  setOpen: (value: boolean) => void
}

const defaultValue = {
  open: true,
  setOpen: () => null,
}

const NavButtonModalContext = createContext<IContext>(defaultValue)

export const NavButtonModalContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [open, setOpen] = useState(defaultValue.open)
  return (
    <NavButtonModalContext.Provider
      value={{
        open,
        setOpen: value => setOpen(value),
      }}
    >
      {children}
    </NavButtonModalContext.Provider>
  )
}

export default NavButtonModalContext
