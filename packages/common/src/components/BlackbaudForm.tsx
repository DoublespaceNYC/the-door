import { css, useTheme } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { darken } from 'polished'
import { HTMLAttributes, useEffect } from 'react'

import useReadableColor from '../hooks/useReadableColor'
import { BlackbaudFormRenderer } from './BlackbaudFormRenderer'
import { ITheme } from './Layout'
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
