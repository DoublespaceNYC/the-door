import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'

import { toSlug } from '../helpers'
import { IFieldStyles } from './Form'

interface ISelectOption extends Record {
  __typename: 'DatoCmsSelectOption'
  id: string
  label: string
  value: string
}

interface ISelectGroup extends Record {
  __typename: 'DatoCmsSelectGroup'
  id: string
  label: string
  options: ISelectOption[]
}

export interface ISelectField extends Record {
  __typename: 'DatoCmsSelectField'
  label: string
  options: (ISelectOption | ISelectGroup)[]
  required: boolean
}

type Props = {
  data: ISelectField
  onChange: (name: string, value: string) => void
  fieldStyles: IFieldStyles
}

const SelectField = ({
  data: { label, options, required },
  onChange,
  fieldStyles,
}: Props): JSX.Element => {
  const name = toSlug(label)

  const [shrink, setShrink] = useState(false)
  const [value, setValue] = useState('')

  const handleShrink = () => {
    if (value.length > 0) {
      setShrink(true)
    } else {
      setShrink(false)
    }
  }
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const allOptions = [
        ...(options.filter(
          option => option.__typename === 'DatoCmsSelectOption'
        ) as ISelectOption[]),
        ...options
          .filter(option => option.__typename === 'DatoCmsSelectGroup')
          .flatMap(optGroup => optGroup.options as ISelectOption[]),
      ]

      const idToValue =
        allOptions.find(option => option.id === e.target.value)?.value || ''

      setValue(idToValue)
    },
    [options]
  )
  useEffect(() => {
    if (value.length > 0) {
      setShrink(true)
    }
  }, [value])

  useEffect(() => {
    onChange(name, value)
  }, [onChange, name, value])

  const styles = {
    select: css`
      appearance: none;
      cursor: pointer;
      ${!value &&
      css`
        color: transparent;
      `}
    `,
    arrow: css`
      font-size: 125%;
      position: absolute;
      top: 50%;
      right: 0.5em;
      transform: translateY(-50%);
      pointer-events: none;
    `,
  }

  return (
    <div css={fieldStyles.container}>
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
      <BiChevronDown css={styles.arrow} />
      <div css={fieldStyles.inputBase}>
        <select
          css={[fieldStyles.input, styles.select]}
          name={name}
          id={name}
          required={required}
          onChange={handleChange}
          onFocus={handleShrink}
          onBlur={handleShrink}
          defaultValue=""
        >
          <option
            value=""
            disabled
            aria-hidden
          >
            {label}
          </option>
          {options.map((option, i) => {
            if (option.__typename === 'DatoCmsSelectOption') {
              return (
                <option
                  key={i}
                  value={option.id}
                >
                  {option.label}
                </option>
              )
            }
            if (option.__typename === 'DatoCmsSelectGroup') {
              return (
                <optgroup
                  label={option.label}
                  key={i}
                >
                  {option.options.map((subOption, i) => (
                    <option
                      key={i}
                      value={subOption.id}
                    >
                      {subOption.label}
                    </option>
                  ))}
                </optgroup>
              )
            }
          })}
        </select>
      </div>
    </div>
  )
}

export default SelectField
