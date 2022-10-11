import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface IContext {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const NavMenuContext = createContext<IContext | undefined>(undefined)

const useNavMenuContext = () => {
  return useContext(NavMenuContext) as IContext
}

export const NavMenuContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [open, setOpen] = useState(false)
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

export default useNavMenuContext
