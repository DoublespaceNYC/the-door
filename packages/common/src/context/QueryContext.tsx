import { GatsbyGraphQLType } from 'gatsby'
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
import { IPdfArticle } from '../components/PdfArticle'

type INewsArticle = IInternalArticle | IExternalArticle | IPdfArticle
type IDoc = { id: string; publicURL: string } | null

interface IQueryContext {
  allNews: INewsArticle[]
  setAllNews: Dispatch<SetStateAction<INewsArticle[]>>
  allEvents: IEvent[] | null
  setAllEvents: Dispatch<SetStateAction<IEvent[] | null>>
  allPartners: IPartner[] | null
  setAllPartners: Dispatch<SetStateAction<IPartner[] | null>>
  allDocs: IDoc[] | null
  setAllDocs: Dispatch<SetStateAction<IDoc[] | null>>
}

const QueryContext = createContext<IQueryContext | undefined>(undefined)

const useQueryContext = () => useContext(QueryContext) as IQueryContext

export const QueryContextProvider = ({ children }: { children: ReactNode }) => {
  const [allNews, setAllNews] = useState<INewsArticle[]>([])
  const [allEvents, setAllEvents] = useState<IEvent[] | null>(null)
  const [allPartners, setAllPartners] = useState<IPartner[] | null>(null)
  const [allDocs, setAllDocs] = useState<IDoc[] | null>(null)
  return (
    <QueryContext.Provider
      value={{
        allNews,
        setAllNews: val => setAllNews(val),
        allEvents,
        setAllEvents: val => setAllEvents(val),
        allPartners,
        setAllPartners: val => setAllPartners(val),
        allDocs,
        setAllDocs: val => setAllDocs(val),
      }}
    >
      {children}
    </QueryContext.Provider>
  )
}

export default useQueryContext
