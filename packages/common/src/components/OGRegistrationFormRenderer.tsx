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
    BBRegistrationFormLoader: any
    iFrameResize: any
    // Blackbaud_GetBlackoutDaysForRecurringDirectDebit: any
    // Blackbaud_Init: any
    // Blackbaud_Open: any
    // Blackbaud_OpenCardNotPresentForm: any
    // Blackbaud_OpenCardPresentForm: any
    // Blackbaud_OpenDirectDebitForm: any
    // Blackbaud_OpenPaymentForm: any
    // Blackbaud_OpenStoreCardForm: any
    // Blackbaud_OpenStoreDirectDebitForm: any
    // Blackbaud_OpenUpdateCardForm: any
    // Blackbaud_OpenUpdateDirectDebitForm: any
    // bbCheckout2_0: any
  }
}

export const OGRegistrationFormRenderer = ({
  data: { formId, envId },
  highlightColor,
  ...props
}: Props) => {
  const interval = useRef(setInterval(() => {}))

  const [isReady1, setIsReady1] = useState(false)
  const [isReady2, setIsReady2] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    // script.async = true
    script.src = 'https://sky.blackbaudcdn.net/static/reg-form-loader/5/main.js'
    document.head.appendChild(script)

    window.BBDonorFormLoader

    return () => {
      // Clean up scripts
      // document.head.removeChild(script)
      // const UrlsForRemoval = ['payments.blackbaud.com']
      // const headScriptsArray = Array.from(
      //   document.head.getElementsByTagName('script')
      // )
      // headScriptsArray.forEach(scriptElement => {
      //   if (UrlsForRemoval.some(url => scriptElement.src.includes(url))) {
      //     document.head.removeChild(scriptElement)
      //   }
      // })
      // Clean up variables
    }
  }, [formId])

  const styles = {
    form: css`
      width: 100%;
    `,
  }

  return (
    <div
      css={styles.form}
      // data-blackbaud-registration-form
      // data-blackbaud-registration-form-envid={envId}
      // data-blackbaud-registration-form-id={formId}
      // data-blackbaud-registration-form-zone="usa"
      // data-blackbaud-registration-form-header-height="0"

      data-blackbaud-registration-form
      data-blackbaud-registration-form-envid="p-iuV2J0KtmEu0x4rOhoISFg"
      data-blackbaud-registration-form-id="68e95cfa-a53a-4e70-b35b-fb9162213f73"
      data-blackbaud-registration-form-zone="usa"
      data-blackbaud-registration-form-header-height="0"
      {...props}
    />
  )
}
