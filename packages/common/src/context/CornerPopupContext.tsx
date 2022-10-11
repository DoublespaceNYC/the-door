import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface ICornerPopupContext {
  triggered: boolean
  setTriggered: Dispatch<SetStateAction<boolean>>
  closed: boolean
  setClosed: Dispatch<SetStateAction<boolean>>
}

const CornerPopupContext = createContext<
  ICornerPopupContext | undefined
>(undefined)

const useCornerPopupContext = () => {
  return useContext(CornerPopupContext) as ICornerPopupContext
}

export const CornerPopupContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [triggered, setTriggered] = useState(false)
  const [closed, setClosed] = useState(false)
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

export default useCornerPopupContext
