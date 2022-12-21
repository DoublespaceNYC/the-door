import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'

import { IFieldStyles } from './Form'

export interface IFormDivider extends Record {
  __typename: 'DatoCmsFormDivider'
}

interface Props {
  fieldStyles: IFieldStyles
}

const FormDivider = ({ fieldStyles }: Props): JSX.Element => {
  const style = css`
    flex-basis: 100%;
    height: 0.5rem;
    border-radius: 0.25rem;
    opacity: 0.5;
  `
  return <div css={[fieldStyles.inputBase, style]} />
}

export default FormDivider
