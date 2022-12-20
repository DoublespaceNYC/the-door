import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'

import { toSlug } from '../utils'
import { IFieldStyles } from './Form'

export interface ISelectOption extends Record {
  __typename: 'DatoCmsSelectOption'
  label: string
  value: string | null
}

export interface ISelectGroup extends Record {
  __typename: 'DatoCmsSelectGroup'
  label: string
  options: ISelectOption[]
}

export interface ISelectField extends Record {
  __typename: 'DatoCmsSelectField'
  label: string
  options: (ISelectOption | ISelectGroup)[]
  required: boolean
  fullWidth: boolean
}

type Props = {
  data: ISelectField
  onChange: (name: string, value: string) => void
  fieldStyles: IFieldStyles
  statesList?: boolean
}

const SelectField = ({
  data: { label, options, required, fullWidth },
  onChange,
  fieldStyles,
  statesList,
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

  useEffect(() => {
    if (value.length > 0) {
      setShrink(true)
    }
  }, [value])

  const allOptions = useMemo(
    () => [
      ...(options.filter(
        option => option.__typename === 'DatoCmsSelectOption'
      ) as ISelectOption[]),
      ...options
        .filter(option => option.__typename === 'DatoCmsSelectGroup')
        .flatMap(optGroup => optGroup.options as ISelectOption[]),
    ],
    [options]
  )

  const [activeOptionLabel, setActiveOptionLabel] = useState<
    string | undefined
  >()

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const idToOptionObject = allOptions.find(
        option => option.id === e.target.value
      )
      setValue(idToOptionObject?.value || idToOptionObject?.label || '')
      setActiveOptionLabel(idToOptionObject?.label || '')
    },
    [allOptions]
  )

  useEffect(() => {
    onChange(name, value)
  }, [onChange, name, value])

  const styles = {
    container: css`
      min-width: ${fullWidth && '100%'};
      ${statesList &&
      css`
        flex: 0.4;
        min-width: 10ch;
      `}
    `,
    select: css`
      appearance: none;
      cursor: pointer;
      color: transparent;
      /* ${!value && css``} */
    `,
    inputValue: css`
      position: absolute;
      display: block;
      pointer-events: none;
      line-height: 1.333;
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
      <BiChevronDown css={styles.arrow} />
      {activeOptionLabel && (
        <div
          css={[fieldStyles.input, styles.inputValue]}
          aria-hidden
        >
          {activeOptionLabel}
        </div>
      )}
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
