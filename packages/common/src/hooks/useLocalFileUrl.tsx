import { useMemo } from 'react'

import useQueryContext from '../context/QueryContext'

const useLocalFileUrl = (localFileId: string) => {
  const { allDocs } = useQueryContext()

  const matchedNode = useMemo(() => {
    return allDocs?.find(node => node?.id === localFileId)
  }, [allDocs, localFileId])

  return matchedNode?.publicURL
}

export default useLocalFileUrl
