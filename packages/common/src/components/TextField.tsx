import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { inputWidth } from '../theme/mixins'
import { toSlug } from '../utils'
import { IFieldStyles } from './Form'

export interface ITextField extends Record {
  __typename: 'DatoCmsTextField'
  label: string
  fieldType: 'text' | 'email' | 'tel' | 'zip'
  required: boolean
  width: 'Full' | 'Half' | 'Third' | 'Quarter'
}

type FieldProps = {
  data: ITextField
  onChange: (name: string, value: string) => void
  fieldStyles: IFieldStyles
}

const TextField = ({
  data: { label, fieldType, required, width },
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

  const getFormattedPhoneNum = useCallback((e: any) => {
    let output = ''
    const inputType = e.nativeEvent.inputType
    const input = e.target.value
    input.replace(
      /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/,
      (_: string, g1: string, g2: string, g3: string) => {
        if (g1.length) {
          output += '(' + g1
          if (g1.length === 3) {
            output += ')'
            if (g2.length) {
              output += ' ' + g2
              if (g2.length === 3) {
                output += '-'
                if (g3.length) {
                  output += g3
                }
              }
            }
          }
        }
        if (inputType === 'deleteContentBackward') {
          if (input.length === 4 || input.length === 9) {
            output = output.slice(0, -2)
          }
          if (input.length === 6 || input.length === 10) {
            output = output.slice(0, -1)
          }
        }
      }
    )
    return output
  }, [])

  const handleChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const handleChangePhone = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(() => getFormattedPhoneNum(e))
    },
    [getFormattedPhoneNum]
  )

  useEffect(() => {
    onChange(name, value)
  }, [onChange, name, value])

  const styles = {
    container: css`
      ${inputWidth(width)}
      ${fieldType === 'zip' &&
      css`
        min-width: 15ch;
        /* flex: 0.6; */
      `}
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
          css={[fieldStyles.input]}
          value={value}
          name={name}
          type={fieldType}
          required={required}
          onChange={fieldType === 'tel' ? handleChangePhone : handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          inputMode={fieldType === 'zip' ? 'numeric' : undefined}
          pattern={
            fieldType === 'zip'
              ? '^(?(^00000(|-0000))|(d{5}(|-d{4})))$'
              : undefined
          }
        />
      </div>
    </div>
  )
}

export default TextField
