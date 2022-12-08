import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react'

import { IEvent } from '../components/Event__Article'
import { IExternalArticle } from '../components/ExternalArticle'
import { IInternalArticle } from '../components/InternalArticle'
import { IPartner } from '../components/Partner__Article'

interface IQueryContext {
  allInternalArticles: IInternalArticle[]
  setAllInternalArticles: Dispatch<SetStateAction<IInternalArticle[]>>
  allExternalArticles: IExternalArticle[]
  setAllExternalArticles: Dispatch<SetStateAction<IExternalArticle[]>>
  allNews: (IInternalArticle | IExternalArticle)[]
  allEvents: IEvent[] | null
  setAllEvents: Dispatch<SetStateAction<IEvent[] | null>>
  allPartners: IPartner[] | null
  setAllPartners: Dispatch<SetStateAction<IPartner[] | null>>
}

const QueryContext = createContext<IQueryContext | undefined>(undefined)

const useQueryContext = () => useContext(QueryContext) as IQueryContext

export const QueryContextProvider = ({ children }: { children: ReactNode }) => {
  const [allInternalArticles, setAllInternalArticles] = useState<
    IInternalArticle[]
  >([])
  const [allExternalArticles, setAllExternalArticles] = useState<
    IExternalArticle[]
  >([])
  const [allNews, setAllNews] = useState<
    (IInternalArticle | IExternalArticle)[]
  >([])
  useLayoutEffect(() => {
    if (allInternalArticles && allExternalArticles) {
      setAllNews(
        [...allInternalArticles, ...allExternalArticles].sort((a, b) =>
          b.publicationDate.localeCompare(a.publicationDate)
        )
      )
    }
  }, [allInternalArticles, allExternalArticles])
  const [allEvents, setAllEvents] = useState<IEvent[] | null>(null)
  const [allPartners, setAllPartners] = useState<IPartner[] | null>(null)
  return (
    <QueryContext.Provider
      value={{
        allInternalArticles,
        setAllInternalArticles: val => setAllInternalArticles(val),
        allExternalArticles,
        setAllExternalArticles: val => setAllExternalArticles(val),
        allNews,
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
