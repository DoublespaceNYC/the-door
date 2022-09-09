import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useLayoutEffect,
  useState,
} from 'react'

import { IEvent } from '../components/Event'
import { IExternalArticle } from '../components/ExternalArticle'
import { IInternalArticle } from '../components/InternalArticle'

interface IContext {
  allInternalArticles: IInternalArticle[]
  setAllInternalArticles: Dispatch<SetStateAction<IInternalArticle[]>>
  allExternalArticles: IExternalArticle[]
  setAllExternalArticles: Dispatch<SetStateAction<IExternalArticle[]>>
  allNews: (IInternalArticle | IExternalArticle)[]
  allEvents: IEvent[]
  setAllEvents: Dispatch<SetStateAction<IEvent[]>>
}

const defaultValue = {
  allInternalArticles: [] as IInternalArticle[],
  setAllInternalArticles: () => null,
  allExternalArticles: [] as IExternalArticle[],
  setAllExternalArticles: () => null,
  allNews: [] as (IInternalArticle | IExternalArticle)[],
  allEvents: [] as IEvent[],
  setAllEvents: () => null,
}

const QueryContext = createContext<IContext>(defaultValue)

export const QueryContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [allInternalArticles, setAllInternalArticles] = useState(
    defaultValue.allInternalArticles
  )
  const [allExternalArticles, setAllExternalArticles] = useState(
    defaultValue.allExternalArticles
  )
  const [allNews, setAllNews] = useState(defaultValue.allNews)
  useLayoutEffect(() => {
    setAllNews(
      [...allInternalArticles, ...allExternalArticles].sort((a, b) =>
        b.publicationDate.localeCompare(a.publicationDate)
      )
    )
  }, [allInternalArticles, allExternalArticles])
  const [allEvents, setAllEvents] = useState(defaultValue.allEvents)
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

export default QueryContext
