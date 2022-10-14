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

const LightboxContext = createContext<IContext | undefined>(undefined)

const useLightboxContext = () => useContext(LightboxContext) as IContext

export const LightboxContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [open, setOpen] = useState(false)
  return (
    <LightboxContext.Provider
      value={{
        open,
        setOpen: value => setOpen(value),
      }}
    >
      {children}
    </LightboxContext.Provider>
  )
}

export default useLightboxContext
