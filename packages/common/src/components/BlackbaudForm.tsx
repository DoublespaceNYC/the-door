import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { darken } from 'polished'
import { HTMLAttributes, useEffect } from 'react'

export interface IBlackbaudForm extends Record {
  __typename: 'DatoCmsBlackbaudForm'
  formName: string
  formId: string
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: IBlackbaudForm
  highlightColor?: string
}

declare global {
  interface Window {
    _bboxDefine: any
    bb$: any
    BBOX: any
    BBOXReCAPTCHAv2: any
    bbox: any
    bboxInit: any
  }
}
const BlackbaudForm = ({
  data: { formId },
  highlightColor,
  ...props
}: Props): JSX.Element => {
  useEffect(() => {
    // const testId = 'fa82fe40-c80a-43ae-9719-8393105cabe4'
    window.bboxInit = () => {
      window.bbox.showForm(formId)
    }
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://bbox.blackbaudhosting.com/webforms/bbox-min.js'
    document.head.appendChild(script)
    return () => {
      window._bboxDefine = undefined
      window.bb$ = undefined
      window.BBOX = undefined
      window.BBOXReCAPTCHAv2 = undefined
      window.bbox = undefined
      window.bboxInit = undefined
      document.head.removeChild(script)
      const headScriptsArray = Array.from(
        document.head.getElementsByTagName('script')
      )
      headScriptsArray.forEach(scriptElement => {
        const UrlsForRemoval = [
          'bbox.blackbaudhosting.com',
          'payments.blackbaud.com',
          'google.com/recaptcha/api.js',
          'gstatic.com/recaptcha/releases/',
        ]
        if (UrlsForRemoval.some(url => scriptElement.src.includes(url))) {
          document.head.removeChild(scriptElement)
        }
      })
    }
  }, [formId])

  const style = css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    #mongo-form {
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
          &.BBDFormSectionComments {
            margin-top: -3em;
            .BBFormFieldContainer {
              margin-left: 0;
              > * {
                margin-left: 0;
                width: 100%;
                max-width: 100%;
                &textarea {
                  flex: none;
                  min-height: 8em;
                }
              }
            }
          }
          .BBFormFieldContainer {
            display: flex;
            flex-wrap: wrap;
            color: inherit;
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
              background: ${highlightColor};
              color: #fff;
              border: 1px solid ${highlightColor};
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
            }
            &.BBTwoFields {
              display: flex;
              .BBFormTextbox,
              .BBFormSelectList {
                &:nth-of-type(1) {
                  margin-right: 0.5em;
                }
                &:nth-of-type(2) {
                  margin-left: 0.5em;
                }
              }
            }
            .BBFormSummaryTotal {
              width: 0;
              height: 0;
              margin: 0;
              padding: 0;
              overflow: hidden;
              position: absolute;
            }
            input[type='submit'].BBFormSubmitbutton {
              font-size: var(--fs-24);
              font-family: var(--display-font);
              text-transform: uppercase;
              letter-spacing: 0.05em;
              filter: none;
              background: ${highlightColor};
              box-shadow: none;
              border-radius: 0;
              padding: 0.5em 0.75em;
              @media (hover: hover) {
                &:hover {
                  opacity: 1;
                  background: ${darken(0.1, highlightColor || '')};
                }
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
    }
  `

  return (
    <div
      css={style}
      id="bbox-root"
      {...props}
    />
  )
}

export default BlackbaudForm
