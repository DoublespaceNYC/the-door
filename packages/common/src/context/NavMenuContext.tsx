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
  return (
    <NavMenuContext.Provider
      value={{
        activeNavIndex,
        setActiveNavIndex: value => setActiveNavIndex(value),
      }}
    >
      {children}
    </NavMenuContext.Provider>
  )
}

export default useNavMenuContext
