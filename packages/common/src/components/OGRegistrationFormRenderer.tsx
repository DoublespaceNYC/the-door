import { css } from '@emotion/react'
import {
  type ComponentProps,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import type { IBlackbaudForm } from './BlackbaudForm'

type Props = ComponentProps<'div'> & {
  data: IBlackbaudForm
  highlightColor?: string
}

declare global {
  interface Window {
    BBEventRegistrationFormLoader: any
    iFrameResize: any
  }
}

export const OGRegistrationFormRenderer = ({
  data: { formId, envId },
  highlightColor,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://sky.blackbaudcdn.net/static/reg-form-loader/5/main.js'

    document.head.appendChild(script)

    return () => {
      // Clean up scripts
      document.head.removeChild(script)

      // Clean up variables
      window.BBEventRegistrationFormLoader = undefined
      window.iFrameResize = undefined
    }
  }, [])

  const interval = useRef(setInterval(() => {}))

  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    if (!isReady) {
      interval.current = setInterval(() => {
        const hasIframe = (ref.current?.childElementCount || 0) > 0
        console.log('tick')
        console.log(window.BBEventRegistrationFormLoader)
        console.log(`childElementCount: ${ref.current?.childElementCount}`)
        if (window.BBEventRegistrationFormLoader && !hasIframe) {
          window.BBEventRegistrationFormLoader.newEventRegistrationForm(window)
          setIsReady(true)
          clearInterval(interval.current)
        }
      }, 200)
    } else {
      clearInterval(interval.current)
    }
    return () => {
      clearInterval(interval.current)
    }
  }, [isReady])

  const styles = {
    form: css`
      width: 100%;
    `,
  }

  return (
    <div
      css={styles.form}
      data-blackbaud-registration-form
      data-blackbaud-registration-form-envid={envId}
      data-blackbaud-registration-form-id={formId}
      data-blackbaud-registration-form-zone="usa"
      data-blackbaud-registration-form-header-height="0"
      ref={ref}
      {...props}
    />
  )
}
