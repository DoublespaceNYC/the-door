import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

interface IContext {
  triggered: boolean
  setTriggered: Dispatch<SetStateAction<boolean>>
  closed: boolean
  setClosed: Dispatch<SetStateAction<boolean>>
}

const defaultValue = {
  triggered: false,
  setTriggered: () => null,
  closed: false,
  setClosed: () => null,
}

const CornerPopupContext = createContext<IContext>(defaultValue)

export const CornerPopupContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [triggered, setTriggered] = useState(defaultValue.triggered)
  const [closed, setClosed] = useState(defaultValue.closed)
  return (
    <CornerPopupContext.Provider
      value={{
        triggered,
        setTriggered: value => setTriggered(value),
        closed,
        setClosed: value => setClosed(value),
      }}
    >
      {children}
    </CornerPopupContext.Provider>
  )
}

export default CornerPopupContext
