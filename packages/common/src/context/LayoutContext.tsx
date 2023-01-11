import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface IContext {
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

const LayoutContext = createContext<IContext | undefined>(undefined)

const useLayoutContext = () => {
  return useContext(LayoutContext) as IContext
}

export const LayoutContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <LayoutContext.Provider
      value={{
        collapsed,
        setCollapsed: value => setCollapsed(value),
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export default useLayoutContext
