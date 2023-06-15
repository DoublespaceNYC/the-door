// @ts-nocheck

import { css, useTheme } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { darken } from 'polished'
import { HTMLAttributes, useEffect } from 'react'

import useReadableColor from '../hooks/useReadableColor'
import { ITheme } from './Layout'

export interface IBlackbaudForm extends Record {
  __typename: 'DatoCmsBlackbaudForm'
  formName: string
  formId: string
  bboxVersion: '1.0' | '2.0'
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: IBlackbaudForm
  highlightColor?: string
}

declare global {
  interface Window {
    bb$: any
    bbCheckout2_0: any
    bbFormToggleGivingLevels: any
    bbox: any
    bboxInit: any
    bboxInit2: any
    bboxApi: any

    _bboxDefine: any

    BBOX: any
    BBOXBillingSection: any
    BBOXDesignationSection: any
    BBOXDonationForm: any
    BBOXForm: any
    BBOXFormAddressBlock: any
    BBOXGiftSection: any
    BBOXGiftAttributesSection: any
    BBOXPaymentSection: any
    BBOXReCAPTCHAv2: any
    BBOXRecurrenceSection: any
    BBOXSectionScripts: any
    BBOXTributeSection: any
    BBOXValidation: any

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

    _MongoServerUrlBase: any
    _MongoServerUrl: any
  }
}
const BlackbaudForm = ({
  data: { formId, bboxVersion },
  highlightColor,
  ...props
}: Props): JSX.Element => {
  const theme = useTheme() as ITheme

  const readableHighlight = useReadableColor(
    highlightColor || theme.secondary,
    '#fff',
    3
  )
  useEffect(() => {
    const script = document.createElement('script')
    script.async = true

    switch (bboxVersion) {
      case '1.0':
        window.bboxInit = () => {
          window.bbox.showForm(formId)
        }
        script.src = 'https://bbox.blackbaudhosting.com/webforms/bbox-min.js'
        break
      case '2.0':
        window.bboxInit2 = [
          () => {
            window.bboxApi.showForm(formId)
          },
        ]
        script.src =
          'https://bbox.blackbaudhosting.com/webforms/bbox-2.0-min.js'
        break
    }

    document.head.appendChild(script)

    return () => {
      // Clean up scripts
      document.head.removeChild(script)
      const UrlsForRemoval = [
        'bbox.blackbaudhosting.com',
        'payments.blackbaud.com',
        'google.com/recaptcha/api.js',
        'gstatic.com/recaptcha/releases/',
      ]
      const headScriptsArray = Array.from(
        document.head.getElementsByTagName('script')
      )
      headScriptsArray.forEach(scriptElement => {
        if (UrlsForRemoval.some(url => scriptElement.src.includes(url))) {
          document.head.removeChild(scriptElement)
        }
      })
      // Clean up links
      const headLinkArray = Array.from(
        document.head.getElementsByTagName('link')
      )
      headLinkArray.forEach(linkElement => {
        if (linkElement.href.includes('bbox.blackbaudhosting.com')) {
          document.head.removeChild(linkElement)
        }
      })
      // Clean up iframes
      const iframeArray = Array.from(
        document.body.getElementsByTagName('iframe')
      )
      iframeArray.forEach(iframeElement => {
        if (iframeElement.name.includes('easyXDM')) {
          document.body.removeChild(iframeElement)
        }
      })

      // Clean up variables
      window.bb$ = undefined
      window.bbCheckout2_0 = undefined
      window.bbFormToggleGivingLevels = undefined
      window.bbox = undefined
      window.bboxInit = undefined
      window.bboxInit2 = undefined
      window.bboxApi = undefined
      window._bboxDefine = undefined
      window.BBOX = undefined
      window.BBOXBillingSection = undefined
      window.BBOXDesignationSection = undefined
      window.BBOXDonationForm = undefined
      window.BBOXForm = undefined
      window.BBOXFormAddressBlock = undefined
      window.BBOXGiftSection = undefined
      window.BBOXGiftAttributesSection = undefined
      window.BBOXPaymentSection = undefined
      window.BBOXReCAPTCHAv2 = undefined
      window.BBOXRecurrenceSection = undefined
      window.BBOXSectionScripts = undefined
      window.BBOXTributeSection = undefined
      window.BBOXValidation = undefined
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
      window._MongoServerUrlBase = undefined
      window._MongoServerUrl = undefined
    }
  }, [formId])

  // useEffect(() => {
  //   window.bboxInit2 = [
  //     () => {
  //       window.bboxApi.showForm(formId)
  //     },
  //   ]
  //   const script = document.createElement('script')
  //   script.async = true
  //   script.src = 'https://bbox.blackbaudhosting.com/webforms/bbox-2.0-min.js'
  //   document.head.appendChild(script)
  // }, [formId])

  const style = css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    #mongo-form {
      margin-top: 1em;
      width: 100%;
      .BBFormContainer[data-bbox-part-id='${formId}'] {
        padding: 0;
        width: 100%;
        font-size: var(--fs-16);
        color: #444;
        .BBFormSection {
          max-width: 100%;
          margin: 0 0 2em;
          .BBFormSectionHeading {
            font-size: var(--fs-15);
            font-weight: 500;
            text-transform: uppercase;
            padding: 0 0 0.5em;
            margin: 0 0 1em;
            label {
              font-size: inherit;
            }
          }
          .BBFormSubSectionHeading {
            font-size: var(--fs-18);
            color: #333;
          }
          &.BBDFormSectionComments {
            margin-top: -3em;
            .BBFormFieldContainer {
              margin-left: 0;
              > * {
                margin-left: 0;
                width: 100%;
                max-width: 100%;
              }
              > textarea {
                flex: none;
                min-height: 8em;
              }
            }
          }
          .BBFormFieldContainer {
            display: flex;
            flex-wrap: wrap;
            color: inherit;
            width: 100%;
            margin: 0 0 1em;
            .BBFormRadioLabelGivingLevel {
              font-size: var(--fs-21);
              color: #444;
              background: #fff;
              border: 1px solid currentColor;
              border-radius: 0.25em;
              padding: 0.5em;
            }
            .BBFormRadioLabelGivingLevelNotSelected {
            }
            .BBFormRadioLabelGivingLevelSelected {
              font-size: var(--fs-21);
              background: ${readableHighlight};
              color: #fff;
              border: 1px solid ${readableHighlight};
            }
            .BBFormGiftOtherAmount {
              min-width: 12ch;
              margin: -0.375em;
              border: 1px solid transparent;
              background: transparent;
              color: #fff;
              font-size: var(--fs-18);
              padding: 0.5em;
              &:focus {
                box-shadow: none;
              }
              &::placeholder {
                color: #ffffff88;
              }
            }
            .BBFormFieldLabel {
              font-size: inherit;
              line-height: 1.25;
              padding: 0.75em 0.5em 0.75em 0;
              width: auto;
              min-width: 6em;
              &.BBFormCheckboxLabel {
                padding-left: 0.333em;
              }
            }
            .BBFormRadioItem {
              margin: 0 0.5em 0.5em 0;
            }
            .BBFormTextArea {
              height: auto;
              min-height: 4em;
              padding: 0.75em;
            }
            .BBFormTextbox,
            .BBFormSelectList,
            .BBFormTextArea {
              padding: 0.75em;
              flex: 1;
              max-width: 100%;
              line-height: 1.25;
            }
            .BBFormSummaryTotal {
              width: 0;
              height: 0;
              margin: 0;
              padding: 0;
              overflow: hidden;
              position: absolute;
            }
          }
          input[type='submit'].BBFormSubmitbutton {
            font-size: var(--fs-24);
            font-family: var(--display-font);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            filter: none;
            background: ${readableHighlight};
            box-shadow: none;
            border-radius: 0;
            padding: 0.5em 0.75em;
            transition: background-color 300ms ease;
            color: #fff;
            border: none;
            @media (hover: hover) {
              &:hover {
                opacity: 1;
                background: ${readableHighlight &&
                darken(0.1, readableHighlight)};
              }
            }
          }
          .BBTwoFields {
            display: flex;
            .BBFormTextbox,
            .BBFormSelectList {
              margin: 0 1em 0 0;
              &:last-child {
                margin-right: 0;
              }
            }
          }
          .BBFormIndivFields {
            margin: 0;
          }
          .BBFormFieldTributeInfo {
            margin-left: 0;
          }
        }
        #reCAPTCHASection {
          margin: 0;
          * {
            margin: 0;
          }
        }
      }
      .BBFormErrorBlock {
        max-width: 100%;
        padding: 1em;
        border-radius: 0.5em;
      }
      .grecaptcha-badge {
        position: absolute !important;
      }
    }
  `

  return (
    <div
      css={style}
      id={`bbox-root${bboxVersion === '2.0' && '-' + formId}`}
      {...props}
    />
  )
}

export default BlackbaudForm
