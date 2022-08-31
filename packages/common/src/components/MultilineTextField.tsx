import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { ChangeEvent, Fragment, useEffect, useState } from 'react'

import { toSlug } from '../helpers'
import { absoluteFill } from '../theme/mixins'
import { FieldStyles } from './Form'

export interface IMultilineTextField extends Record {
  __typename: 'DatoCmsMultilineTextField'
  label: string
  required: boolean
}

type FieldProps = {
  data: IMultilineTextField
  onChange: (name: string, value: string) => void
  fieldStyles: FieldStyles
}

const MultilineTextField = ({
  data: { label, required },
  onChange,
  fieldStyles,
}: FieldProps) => {
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

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    onChange(name, value)
  }, [onChange, name, value])

  const styles = {
    sizer: css`
      display: block;
      visibility: hidden;
      min-height: 6em;
    `,
    textArea: css`
      ${absoluteFill}
      resize: none;
      height: 100%;
      border: none;
    `,
    label: css`
      top: 1.5835em;
      bottom: auto;
      line-height: 1.333;
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
          styles.label,
        ]}
      >
        {label}
      </label>
      <div css={fieldStyles.inputBase}>
        <span css={[fieldStyles.input, styles.sizer]}>
          {value.split(/\n/g).map((text, i) => (
            <Fragment key={i}>
              {text}
              <br />
            </Fragment>
          ))}
        </span>
        <textarea
          css={[fieldStyles.input, styles.textArea]}
          name={name}
          id={name}
          required={required}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  )
}

export default MultilineTextField
