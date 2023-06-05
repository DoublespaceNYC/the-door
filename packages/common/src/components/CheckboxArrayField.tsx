import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { useCallback, useEffect, useState } from 'react'

import { toSlug } from '../utils'
import CheckboxField, { ICheckboxField } from './CheckboxField'
import { IFieldStyles } from './Form'

export interface ICheckboxArrayField extends Record {
  __typename: 'DatoCmsCheckboxArrayField'
  label: string
  options: ICheckboxField[]
}

interface Props {
  data: ICheckboxArrayField
  onChange: (name: string, value: string) => void
  fieldStyles: IFieldStyles
}

const CheckboxArrayField = ({
  data: { label, options },
  onChange,
  fieldStyles,
}: Props): JSX.Element => {
  const name = toSlug(label)

  const [value, setValue] = useState<string[]>([])

  const handleChange = useCallback(
    (checkboxName: string, checked: boolean) => {
      const checkboxLabel = options.find(
        option => toSlug(option.label) === checkboxName
      )?.label
      checkboxLabel &&
        setValue(prev => {
          const array = Array.from(prev)
          const optIndex = array.indexOf(checkboxLabel)
          optIndex > -1 && array.splice(optIndex, 1)
          checked && array.push(checkboxLabel)
          return array
        })
    },
    [options]
  )

  useEffect(() => {
    onChange(
      name,
      value.join(`
`)
    )
  }, [onChange, name, value])

  const styles = {
    container: css`
      position: relative;
      min-width: 100%;
      padding: 0;
      margin: 0;
      border: none;
    `,
    inputBase: css`
      padding: 0.5em 0.5em 1em;
      display: flex;
      flex-wrap: wrap;
      grid-gap: 0 1em;
      background: transparent;
    `,
    label: css`
      position: relative;
      transform: none;
      top: 0;
      padding: 1.125em 0 0;
      white-space: normal;
    `,
  }

  return (
    <fieldset
      name={name}
      id={name}
      css={[fieldStyles.container, fieldStyles.inputBase, styles.container]}
    >
      <label
        htmlFor={name}
        aria-hidden
        hidden
      >
        {label}
      </label>
      <div>
        <legend css={[fieldStyles.label, styles.label]}>{label}</legend>
      </div>
      <div css={[styles.inputBase]}>
        {options.map((option, i) => (
          <CheckboxField
            key={i}
            data={option}
            fieldsetName={name}
            fieldStyles={fieldStyles}
            onChange={handleChange}
          />
        ))}
      </div>
    </fieldset>
  )
}

export default CheckboxArrayField
