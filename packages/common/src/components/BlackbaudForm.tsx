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
const BlackbaudForm = ({ data: { formId }, ...props }: Props): JSX.Element => {
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
