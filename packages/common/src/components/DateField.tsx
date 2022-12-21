import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { inputWidth } from '../theme/mixins'
import { toSlug } from '../utils'
import { IFieldStyles } from './Form'

export interface IDateField extends Record {
  __typename: 'DatoCmsDateField'
  label: string
  minDate: string
  maxDate: string
  required: boolean
  width: 'Full' | 'Half' | 'Third' | 'Quarter'
}

type FieldProps = {
  data: IDateField
  onChange: (name: string, value: string) => void
  fieldStyles: IFieldStyles
}

const DateField = ({
  data: { label, minDate, maxDate, required, width },
  onChange,
  fieldStyles,
}: FieldProps): JSX.Element => {
  const name = toSlug(label)
  const [shrink, setShrink] = useState(false)
  const [value, setValue] = useState('')
  const handleFocus = () => {
    if (!shrink) {
      setShrink(true)
    }
  }
  const handleBlur = () => {
    if (value.length > 0) {
      setShrink(true)
    } else {
      setShrink(false)
    }
  }
  useEffect(() => {
    if (value.length > 0) {
      setShrink(true)
    }
  }, [value])

  const handleChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  useEffect(() => {
    onChange(name, value)
  }, [onChange, name, value])

  const styles = {
    container: css`
      ${inputWidth(width)}
    `,
    dateInput: css`
      color: ${value.length === 0 && !shrink && 'transparent'};
    `,
  }
  return (
    <div css={[fieldStyles.container, styles.container]}>
      <label
        htmlFor={name}
        css={[
          fieldStyles.label,
          shrink && fieldStyles.shrink,
          required && fieldStyles.required,
        ]}
      >
        {label}
      </label>
      <div css={fieldStyles.inputBase}>
        <input
          css={[fieldStyles.input, styles.dateInput]}
          type="date"
          value={value}
          name={name}
          id={name}
          required={required}
          onChange={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          min={minDate}
          max={maxDate}
        />
      </div>
    </div>
  )
}

export default DateField
