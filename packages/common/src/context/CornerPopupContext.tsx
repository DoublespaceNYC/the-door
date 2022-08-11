import { ReactNode, createContext, useState, SetStateAction, Dispatch } from 'react'

interface IContext {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const defaultValue = {
  open: false,
  setOpen: () => null,
}

const CornerPopupContext = createContext<IContext>(defaultValue)

export const CornerPopupContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [open, setOpen] = useState(defaultValue.open)
  return (
    <CornerPopupContext.Provider
      value={{
        open,
        setOpen: value => setOpen(value),
      }}
    >
      {children}
    </CornerPopupContext.Provider>
  )
}

export default CornerPopupContext
