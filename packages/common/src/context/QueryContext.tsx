import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

import { IEvent } from '../components/Event__Article'
import { IExternalArticle } from '../components/ExternalArticle'
import { IInternalArticle } from '../components/InternalArticle'
import { IPartner } from '../components/Partner__Article'

interface IQueryContext {
  allNews: (IInternalArticle | IExternalArticle)[]
  setAllNews: Dispatch<SetStateAction<(IInternalArticle | IExternalArticle)[]>>
  allEvents: IEvent[] | null
  setAllEvents: Dispatch<SetStateAction<IEvent[] | null>>
  allPartners: IPartner[] | null
  setAllPartners: Dispatch<SetStateAction<IPartner[] | null>>
}

const QueryContext = createContext<IQueryContext | undefined>(undefined)

const useQueryContext = () => useContext(QueryContext) as IQueryContext

export const QueryContextProvider = ({ children }: { children: ReactNode }) => {
  const [allNews, setAllNews] = useState<
    (IInternalArticle | IExternalArticle)[]
  >([])
  const [allEvents, setAllEvents] = useState<IEvent[] | null>(null)
  const [allPartners, setAllPartners] = useState<IPartner[] | null>(null)
  return (
    <QueryContext.Provider
      value={{
        allNews,
        setAllNews: val => setAllNews(val),
        allEvents,
        setAllEvents: val => setAllEvents(val),
        allPartners,
        setAllPartners: val => setAllPartners(val),
      }}
    >
      {children}
    </QueryContext.Provider>
  )
}

export default useQueryContext
