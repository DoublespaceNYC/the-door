import { useCallback, useEffect, useMemo } from 'react'

export const useFocusTrap = (
  element: HTMLElement | null,
  condition: boolean,
  delay = 0
) => {
  const focusableElementTypes =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

  const focusableElements = useMemo(() => {
    return element
      ? Array.from(
          element?.querySelectorAll(
            focusableElementTypes
          ) as NodeListOf<HTMLElement>
        ) || null
      : null
  }, [element, focusableElementTypes])

  const isFocusable =
    condition && focusableElements && focusableElements.length > 0

  useEffect(() => {
    if (isFocusable) {
      setTimeout(() => {
        focusableElements[0].focus()
      }, delay)
    }
  }, [focusableElements, isFocusable, delay])

  const tabFunction = useCallback(
    (e: KeyboardEvent) => {
      const isTabPressed = e.key === 'Tab' || e.keyCode === 9
      if (isFocusable && isTabPressed) {
        const firstFocusableElement = focusableElements[0]
        const lastFocusableElement =
          focusableElements[focusableElements.length - 1]
        if (e.shiftKey) {
          // if shift key pressed for shift + tab combination
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault()
            lastFocusableElement.focus() // add focus for the last focusable element
          }
        } else {
          if (
            document.activeElement === lastFocusableElement ||
            !focusableElements.includes(
              document.activeElement as HTMLElement
            )
          ) {
            // if focused has reached to last focusable element then focus first focusable element after pressing tab
            e.preventDefault()
            firstFocusableElement.focus() // add focus for the first focusable element
          }
        }
      }
    },
    [isFocusable, focusableElements]
  )

  useEffect(() => {
    document.addEventListener('keydown', tabFunction, false)
    return () => {
      document.removeEventListener('keydown', tabFunction, false)
    }
  })
}

export default useFocusTrap
