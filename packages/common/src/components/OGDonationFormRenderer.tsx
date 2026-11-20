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
  formVersion: 'Online Giving Donation' | 'Online Giving Donation 2'
}

declare global {
  interface Window {
    BBDonorFormLoader: any
    Blackbaud_GetBlackoutDaysForRecurringDirectDebit: any
    Blackbaud_Init: any
    Blackbaud_Open: any
    Blackbaud_OpenCardNotPresentForm: any
    Blackbaud_OpenCardPresentForm: any
    Blackbaud_OpenDirectDebitForm: any
    Blackbaud_OpenPaymentForm: any
    Blackbaud_OpenStoreCardForm: any
    Blackbaud_OpenStoreDirectDebitForm: any
    Blackbaud_OpenUpdateCardForm: any
    Blackbaud_OpenUpdateDirectDebitForm: any
    bbCheckout2_0: any
  }
}

export const OGDonationFormRenderer = ({
  data: { formId, oGId },
  formVersion,
  highlightColor,
  ...props
}: Props) => {
  const interval = useRef(setInterval(() => {}))

  const [isReady1, setIsReady1] = useState(false)
  const [isReady2, setIsReady2] = useState(false)

  useLayoutEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = (() => {
      switch (formVersion) {
        case 'Online Giving Donation':
          return 'https://sky.blackbaudcdn.net/static/donor-form-loader/2/main.js'
        case 'Online Giving Donation 2':
          return 'https://sky.blackbaudcdn.net/static/og-web-loader/1/main.js'
        default:
          return ''
      }
    })()
    script.setAttribute('data-envid', oGId || '')
    document.head.appendChild(script)
    if (!isReady2) {
      interval.current = setInterval(() => {
        if (window.BBDonorFormLoader) {
          setIsReady1(true)
        }
        if (window.Blackbaud_Init) {
          setIsReady2(true)
        }
      }, 200)
    } else {
      clearInterval(interval.current)
    }

    return () => {
      clearInterval(interval.current)

      // Clean up scripts
      document.head.removeChild(script)
      const UrlsForRemoval = ['payments.blackbaud.com']
      const headScriptsArray = Array.from(
        document.head.getElementsByTagName('script')
      )
      headScriptsArray.forEach(scriptElement => {
        if (UrlsForRemoval.some(url => scriptElement.src.includes(url))) {
          document.head.removeChild(scriptElement)
        }
      })

      // Clean up variables
      window.BBDonorFormLoader = undefined
      window.BBDonorFormLoader = undefined
      window.Blackbaud_GetBlackoutDaysForRecurringDirectDebit = undefined
      window.Blackbaud_Init = undefined
      window.Blackbaud_Open = undefined
      window.Blackbaud_OpenCardNotPresentForm = undefined
      window.Blackbaud_OpenCardPresentForm = undefined
      window.Blackbaud_OpenDirectDebitForm = undefined
      window.Blackbaud_OpenPaymentForm = undefined
      window.Blackbaud_OpenStoreCardForm = undefined
      window.Blackbaud_OpenStoreDirectDebitForm = undefined
      window.Blackbaud_OpenUpdateCardForm = undefined
      window.Blackbaud_OpenUpdateDirectDebitForm = undefined
      window.bbCheckout2_0 = undefined
    }
  }, [formId, oGId, isReady2, formVersion])

  useEffect(() => {
    if (isReady1 && formVersion !== 'Online Giving Donation 2') {
      window.BBDonorFormLoader?.newBlackbaudDonationFormZoned(
        'renxt',
        oGId,
        formId,
        'usa'
      )
    }
  }, [formId, isReady1, oGId, formVersion])

  const formProps = (() => {
    switch (formVersion) {
      case 'Online Giving Donation 2':
        return {
          'data-blackbaud-standard-form-id': formId,
          'data-svc-id': 'renxt',
          id: `blackbaud-donation-form_${formId}`,
        }
      case 'Online Giving Donation':
        return {
          id: `blackbaud-donation-form_${formId}`,
        }
    }
  })()
  const styles = {
    form: css`
      width: 100%;
    `,
  }

  return (
    <div
      css={styles.form}
      {...props}
      {...formProps}
    />
  )
}
