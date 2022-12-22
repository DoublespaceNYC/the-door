import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { ChangeEvent, useCallback, useEffect, useId, useState } from 'react'

import { absoluteFill } from '../theme/mixins'
import { toSlug } from '../utils'
import { IFieldStyles } from './Form'

export interface ICheckboxField extends Record {
  __typename: 'DatoCmsCheckboxField'
  label: string
  required: boolean
}

interface Props {
  data: ICheckboxField
  fieldsetName?: string
  fieldStyles: IFieldStyles
  onChange: (name: string, checked: boolean) => void
}

const CheckboxField = ({
  data: { label, id, required },
  fieldsetName,
  fieldStyles,
  onChange,
}: Props): JSX.Element => {
  const name = toSlug(label)

  const [checked, setChecked] = useState(false)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  }, [])

  useEffect(() => {
    onChange(name, checked)
  }, [onChange, name, checked])

  const uniqueId = useId()

  const styles = {
    inputOption: css`
      position: relative;
      padding: 0.5em;
      box-sizing: border-box;
      max-width: fit-content;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      cursor: pointer;
      label,
      input {
        cursor: inherit;
      }
      input {
        opacity: 0;
        ${absoluteFill}
      }
    `,
  }
  return (
    <div css={[fieldStyles.input, styles.inputOption]}>
      <div
        css={fieldStyles.checkbox}
        data-checked={checked}
      />
      <label
        htmlFor={id + uniqueId}
        css={required && fieldStyles.required}
      >
        {label}
      </label>
      <input
        name={fieldsetName ? toSlug(fieldsetName) : name}
        required={required}
        type="checkbox"
        onChange={handleChange}
        value={id}
        id={id + uniqueId}
      />
    </div>
  )
}

export default CheckboxField
