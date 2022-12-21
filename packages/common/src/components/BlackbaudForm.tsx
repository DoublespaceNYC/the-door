import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
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
    }
  }, [formId])

  const style = css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    #mongo-form {
      width: 100%;
      .BBFormContainer[data-bbox-part-id=${formId}] {
        padding: 0;
        width: 100%;
        font-size: var(--fs-16);
        color: #444;
        .BBFormSection {
          max-width: 100%;
          margin: 0 0 1em;
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
          .BBFormFieldContainer {
            display: flex;
            flex-wrap: wrap;
            color: inherit;
            margin: 0;
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
              font-size: var(--fs-24);
              background: ${highlightColor};
              border: 1px solid ${highlightColor};
            }
            &.BBDFormSectionComments {
              .BBFormFieldContainer {
                margin-left: 0;
                > * {
                  margin-left: 0;
                  width: 100%;
                  max-width: 100%;
                }
              }
            }
            .BBFormFieldLabel {
              width: 6em;
              line-height: 1.25;
              padding: 0.75em 0.5em 0.75em 0;
              width: auto;
              &.BBFormCheckboxLabel {
                padding-left: 0.333em;
              }
            }
            .BBFormTextArea {
              height: auto;
              min-height: 8em;
              padding: 0.75em;
            }
            .BBFormTextbox,
            .BBFormSelectList,
            .BBFormTextArea {
              padding: 0.75em;
              flex: 1;
              max-width: 100%;
            }
            .BBTwoFields {
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
            &.BBFormIndivFields {
              margin: 0;
            }
            .BBFormSummaryTotal {
              width: 0;
              height: 0;
              margin: 0;
              padding: 0;
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
            }
          }
          .BBFormFieldTributeInfo {
            margin-left: 0;
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
