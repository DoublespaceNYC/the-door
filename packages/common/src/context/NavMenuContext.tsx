import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

interface IContext {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const defaultValue = {
  open: true,
  setOpen: () => null,
}

const NavMenuContext = createContext<IContext>(defaultValue)

export const NavMenuContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [open, setOpen] = useState(defaultValue.open)
  return (
    <NavMenuContext.Provider
      value={{
        open,
        setOpen: value => setOpen(value),
      }}
    >
      {children}
    </NavMenuContext.Provider>
  )
}

export default NavMenuContext
