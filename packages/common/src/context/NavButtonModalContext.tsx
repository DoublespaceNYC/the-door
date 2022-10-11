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

const NavButtonModalContext = createContext<IContext | undefined>(
  undefined
)

const useNavButtonModalContext = () =>
  useContext(NavButtonModalContext) as IContext

export const NavButtonModalContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [open, setOpen] = useState(true)
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

export default useNavButtonModalContext
