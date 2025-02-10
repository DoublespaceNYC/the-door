import { Record } from 'datocms-structured-text-utils'
import { HTMLAttributes } from 'react'

import { BlackbaudFormRenderer } from './BlackbaudFormRenderer'
import { OnlineGivingFormRenderer } from './OnlineGivingFormRenderer'

export interface IBlackbaudForm extends Record {
  __typename: 'DatoCmsBlackbaudForm'
  formName: string
  formId: string
  oGId: string
  bboxVersion: '1.0' | '2.0' | 'Online Giving'
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: IBlackbaudForm
  highlightColor?: string
}

const BlackbaudForm = ({ data, ...props }: Props) => {
  switch (data.bboxVersion) {
    case '1.0':
    case '2.0':
      return (
        <BlackbaudFormRenderer
          data={data}
          {...props}
        />
      )
    case 'Online Giving':
      return (
        <OnlineGivingFormRenderer
          data={data}
          {...props}
        />
      )
  }
}

export default BlackbaudForm
