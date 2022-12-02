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

interface IQueryContext {
  allInternalArticles: IInternalArticle[]
  setAllInternalArticles: Dispatch<SetStateAction<IInternalArticle[]>>
  allExternalArticles: IExternalArticle[]
  setAllExternalArticles: Dispatch<SetStateAction<IExternalArticle[]>>
  allNews: (IInternalArticle | IExternalArticle)[]
  allEvents: IEvent[]
  setAllEvents: Dispatch<SetStateAction<IEvent[]>>
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
  const [allEvents, setAllEvents] = useState<IEvent[]>([])
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
      }}
    >
      {children}
    </QueryContext.Provider>
  )
}

export default useQueryContext
