import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface IContext {
  activeNavIndex: number | null
  setActiveNavIndex: Dispatch<SetStateAction<number | null>>
  burgerOpen: boolean
  setBurgerOpen: Dispatch<SetStateAction<boolean>>
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
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null)
  const [burgerOpen, setBurgerOpen] = useState(false)
  return (
    <NavMenuContext.Provider
      value={{
        activeNavIndex,
        setActiveNavIndex,
        burgerOpen,
        setBurgerOpen,
      }}
    >
      {children}
    </NavMenuContext.Provider>
  )
}

export default useNavMenuContext
