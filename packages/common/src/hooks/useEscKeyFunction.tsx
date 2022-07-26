import { useCallback, useEffect } from 'react'

export const useEscKeyFunction = (fn: () => void) => {
  const escFunction = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        fn()
      }
    },
    [fn]
  )
  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)
    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [open, escFunction])
}
