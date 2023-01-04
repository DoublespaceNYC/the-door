import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import {
  StructuredText as IStructuredText,
  Record,
} from 'datocms-structured-text-utils'
import { darken } from 'polished'
import { HTMLAttributes, useMemo, useRef } from 'react'
import { Fragment, SyntheticEvent, useCallback, useState } from 'react'
import { StructuredText } from 'react-datocms'
import { BsCheck2Circle } from 'react-icons/bs'

import { useElementRect } from '../hooks/useElementRect'
import useReadableColor from '../hooks/useReadableColor'
import { absoluteFill, animateIn, buttonStyle } from '../theme/mixins'
import { toSlug } from '../utils'
import CheckboxArrayField, { ICheckboxArrayField } from './CheckboxArrayField'
import CheckboxField, { ICheckboxField } from './CheckboxField'
import DateField, { IDateField } from './DateField'
import FormDivider, { IFormDivider } from './FormDivider'
import { ITheme } from './Layout'
import LoadingSpinner from './LoadingSpinner'
import MultilineTextField, { IMultilineTextField } from './MultilineTextField'
import SelectField, { ISelectField } from './SelectField'
import SelectStateField, { ISelectStateField } from './SelectStateField'
import TextField, { ITextField } from './TextField'

type IFormField =
  | ITextField
  | ISelectField
  | ISelectStateField
  | IMultilineTextField
  | ICheckboxArrayField
  | ICheckboxField
  | IDateField
  | IFormDivider

export interface IForm extends Record {
  __typename: 'DatoCmsForm'
  formName: string
  submitButtonText: string
  successMessage: IStructuredText
  formFields: IFormField[]
  conditionalFields: string | null
}

export interface IFormEmbed extends Record {
  __typename: 'DatoCmsFormEmbed'
  id: string
  form: IForm
}

export interface IFieldStyles {
  container: CSSInterpolation
  inputBase: CSSInterpolation
  input: CSSInterpolation
  label: CSSInterpolation
  shrink: CSSInterpolation
  required: CSSInterpolation
  checkbox: CSSInterpolation
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: IForm
  formType?: 'Netlify' | 'Mailchimp'
  listId?: string
  successCss?: CSSInterpolation
  simpleSuccess?: boolean
  theme?: 'Light' | 'Dark'
  layout?: 'Page' | 'Lightbox'
  highlightColor?: string
  showAllConditionalFields?: boolean
}

const Form = ({
  data: {
    formName,
    submitButtonText,
    successMessage,
    formFields,
    conditionalFields,
  },
  formType = 'Netlify',
  listId,
  successCss,
  simpleSuccess,
  theme = 'Light',
  highlightColor,
  layout,
  showAllConditionalFields,
  ...props
}: Props): JSX.Element => {
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null)
  const [successRef, setSuccessRef] = useState<HTMLElement | null>(null)

  const { height: formHeight } = useElementRect(formRef)
  const { height: successHeight } = useElementRect(successRef)

  const formData = useRef<{ [key: string]: string }>({})

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = useCallback((name: string, value: string) => {
    formData.current[name] = value
  }, [])

  const handleChangeCheckbox = useCallback((name: string, checked: boolean) => {
    formData.current[name] = checked ? 'true' : 'false'
  }, [])

  const [formSelectFieldData, setFormSelectFieldData] = useState<{
    [key: string]: string
  }>({})

  const handleChangeSelect = useCallback((name: string, value: string) => {
    setFormSelectFieldData(prev => ({
      ...prev,
      [name]: value,
    }))
    formData.current[name] = value
  }, [])

  const formFieldsArray = useMemo(() => {
    interface ISelectJSON {
      label: string
      options: ISelectOptionJSON[]
    }
    interface ISelectOptionJSON {
      option: string
      fields: (string | ISelectJSON)[]
    }
    interface IConditionsJSON {
      fields: (string | ISelectJSON)[]
    }
    const conditionsJSON =
      conditionalFields && (JSON.parse(conditionalFields) as IConditionsJSON)

    if (!showAllConditionalFields && conditionsJSON) {
      const getFieldFromLabel = (label: string) => {
        if (label === 'DIVIDER') {
          return {
            __typename: 'DatoCmsFormDivider',
            id: 'conditionalDivider',
          }
        } else return formFields.find(field => field.label === label) || null
      }

      const recursiveMap = (fields: (string | ISelectJSON)[]): IFormField[] => {
        return fields
          .flatMap(field_i => {
            if (typeof field_i === 'string') {
              return getFieldFromLabel(field_i)
            } else {
              return [
                getFieldFromLabel(field_i.label),
                ...field_i.options.flatMap(field_i_option => {
                  if (
                    typeof field_i_option !== 'string' &&
                    formSelectFieldData[toSlug(field_i.label)] ===
                      field_i_option.option
                  ) {
                    return recursiveMap(field_i_option.fields)
                  }
                }),
              ]
            }
          })
          .filter(Boolean) as IFormField[]
      }
      const newArray = recursiveMap(conditionsJSON.fields)
      return newArray
    } else {
      return formFields
    }
  }, [
    formFields,
    conditionalFields,
    formSelectFieldData,
    showAllConditionalFields,
  ])

  const handleSubmit = useCallback(
    (formData: { [key: string]: string }, formName: string) => {
      const conditionsJSON = conditionalFields && JSON.parse(conditionalFields)
      const sanitizedData = conditionsJSON ? {} : formData
      if (conditionsJSON) {
        const validFormLabels = formFieldsArray.map(
          field =>
            field.__typename !== 'DatoCmsFormDivider' && toSlug(field.label)
        )
        const validFormDataKeys = Object.keys(formData).filter(key =>
          validFormLabels.includes(key)
        )
        for (const key of validFormDataKeys) {
          sanitizedData[key] = formData[key]
        }
      }
      const submitFunction = async (data: {
        url: string
        method: string
        headers?: { [key: string]: string }
        body: string
      }) => {
        console.log(sanitizedData)
        setSubmitting(true)
        try {
          const response = await fetch(data.url, {
            method: data.method,
            headers: data.headers,
            body: data.body,
          })
          if (response) {
            setSubmitting(false)
          }
          if (response.ok) {
            setSubmitted(true)
          } else {
            alert(
              `Sorry, there was an error submitting this form: ${response.status} ${response.statusText}`
            )
          }
        } catch (error) {
          alert(`Sorry, there was an error submitting this form: ${error}`)
        }
      }
      if (formType === 'Netlify') {
        const encode = (data: { [key: string]: string }) => {
          return Object.keys(data)
            .map(
              key =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
            )
            .join('&')
        }
        submitFunction({
          url: '/',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: encode({
            'form-name': formName,
            ...sanitizedData,
          }),
        })
      }
      if (formType === 'Mailchimp') {
        submitFunction({
          url: `/.netlify/functions/mailChimpSubscribe`,
          method: 'POST',
          body: JSON.stringify({ listId, ...sanitizedData }),
        })
      }
    },
    [formType, listId, formFieldsArray, conditionalFields]
  )

  const metaTheme = useTheme() as ITheme
  const setColors = () => {
    switch (theme) {
      case 'Dark':
        return {
          fill: 'transparent',
          border: '#ffffff88',
          text: '#fff',
          label: '#ffffffaa',
          highlight: highlightColor || metaTheme.secondaryLight,
          buttonFill: ['#fff', highlightColor || metaTheme.quaternary],
          buttonText: [highlightColor || metaTheme.quaternary, '#fff'],
        }
      case 'Light':
        return {
          fill: layout === 'Page' ? metaTheme.gray95 : metaTheme.gray92,
          border: 'transparent',
          text: '#444',
          label: '#444444aa',
          highlight: highlightColor || metaTheme.secondary,
          buttonFill: [
            highlightColor || metaTheme.secondary,
            highlightColor ? darken(0.1, highlightColor) : metaTheme.tertiary,
          ],
          buttonText: ['#fff'],
        }
    }
  }
  const colors = setColors()

  // const textHighlight = colors.highlight
  const textHighlight = useReadableColor(
    colors.highlight || '',
    colors.fill || ''
  )
  const styles = {
    wrapper: css`
      position: relative;
      display: grid;
      overflow: hidden;
      width: auto;
      height: ${submitted ? successHeight : formHeight}px;
      transition: all 300ms ease;
      --highlight: ${highlightColor || colors.highlight};
      --textHighlight: ${textHighlight};
    `,
    form: css`
      grid-area: 1 / 1 / 2 / 2;
      align-self: flex-start;
      display: flex;
      flex-wrap: wrap;
      --gap: 1em;
      gap: var(--gap);
      align-items: flex-start;
      justify-content: flex-start;
      opacity: 1;
      transition: opacity 200ms ease-out, transform 300ms ease-out;
      > input[type='hidden'] {
        display: none;
      }
      ${(submitting || submitted) &&
      css`
        opacity: 0;
        transform: translate3d(0, -6rem, 0);
      `}
      ${formFields.length === 1 &&
      css`
        align-self: flex-start;
        display: flex;
        align-items: stretch;
        grid-gap: 0;
      `}
    `,
    buttonWrap: css`
      display: flex;
      flex-basis: 100%;
      margin-top: 0.5em;
      ${formFields.length === 1 &&
      css`
        flex-basis: auto;
        margin-top: 0;
      `}
    `,
    button: css`
      ${buttonStyle}
      align-self: stretch;
      font-size: 125%;
      padding: 0.67em 0.875em;
      display: flex;
      align-items: center;
      position: relative;
      grid-column: 1 / -1;
      justify-self: flex-start;
      box-sizing: border-box;

      transition: all 300ms ease;

      form:invalid & {
        color: #ffffffcc;
        background: #88888888;
      }
      form:not(:invalid) & {
        color: ${colors.buttonText[0]};
        background: ${colors.buttonFill[0]};
        @media (hover: hover) {
          &:hover,
          &:focus-within {
            color: ${colors.buttonText[1]};
            background: ${colors.buttonFill[1]};
          }
        }
      }

      ${formFields.length === 1 &&
      css`
        border-top-right-radius: 0.2em;
        border-bottom-right-radius: 0.2em;
      `}
      span {
        color: currentColor;
        position: relative;
      }
      input {
        ${absoluteFill}
        opacity: 0;
        margin: 0;
        padding: 0;
        border: none;
        cursor: pointer;
      }
    `,
    successMessage: css`
      grid-area: 1 / 1 / 2 / 2;
      opacity: 0;
      transform: translate3d(0, 6rem, 0);
      animation: ${animateIn} 300ms ease-out forwards;
      align-self: flex-start;
      color: ${colors.text};
      ${simpleSuccess &&
      css`
        display: flex;
      `}
    `,
    spinner: css`
      grid-area: 1 / 1 / 2 / 2;
      aspect-ratio: 1 / 1;
      height: 4em;
      width: auto;
      max-height: 75%;
      align-self: center;
      justify-self: center;
      visibility: hidden;
      opacity: 0;
      transition: opacity 500ms ease;
      ${submitting &&
      css`
        visibility: visible;
        opacity: 1;
      `}
    `,
  }
  const fieldStyles = {
    container: css`
      position: relative;
      flex: 1;
      ${!colors.border &&
      css`
        &:after {
          content: '';
          position: absolute;
          bottom: 0px;
          left: 0px;
          width: 100%;
          height: 2px;
        }
        &:focus-within:after {
          background-color: ${highlightColor || colors.highlight};
        }
      `}
    `,
    inputBase: css`
      background-color: ${colors.fill};
      border-radius: 0.25em;
      border: ${colors.border && `1px solid ${colors.border}`};
      div:focus-within > & {
        border-color: ${highlightColor || colors.highlight};
      }
      ${formFields.length === 1 &&
      css`
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 0px solid transparent;
      `}
    `,
    input: css`
      box-sizing: border-box;
      border: none;
      padding: 1.5em 1em 0.5em;
      line-height: 1.333;
      width: 100%;
      color: ${colors.text};
      background-color: transparent;
    `,
    label: css`
      position: absolute;
      pointer-events: none;
      z-index: 2;
      top: 1.5835em;
      left: 1em;
      color: ${colors.label};
      max-width: 100%;
      line-height: 1.333;
      padding-right: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transform: translate3d(0, -0.5em, 0);
      transition: transform 200ms ease;
      transform-origin: 0 0;
      /* font-style: italic; */
      font-weight: 400;
    `,
    shrink: css`
      transform: translate3d(0, -1.25em, 0) scale3d(0.75, 0.75, 1);
      font-weight: 500;
      div:focus-within > & {
        color: ${textHighlight};
      }
    `,
    required: css`
      &:after {
        content: '*';
        display: inline-block;
        font-size: 75%;
        margin-left: 0.125em;
        transform: translateY(-0.125em);
      }
    `,
    checkbox: css`
      width: 1.125em;
      height: 1.125em;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.25em;
      /* background-color: ${colors.fill && darken(0.1, colors.fill)}; */
      border: 2px solid;
      border-color: ${colors.border || 'transparent'};
      box-sizing: border-box;
      margin-top: 0.1em;
      margin-right: 0.333em;
      &:after {
        content: '';
        width: 0.25em;
        height: 0.5em;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform-origin: 75% 50%;
        transform: rotate(45deg);
        visibility: hidden;
      }
      &[data-checked='true'] {
        background-color: ${highlightColor || colors.highlight};
        &:after {
          visibility: visible;
        }
      }
      @media (hover: hover) {
        div:hover > & {
          border-color: ${highlightColor || colors.highlight};
        }
      }
    `,
  }
  return (
    <div
      css={styles.wrapper}
      {...props}
    >
      <LoadingSpinner
        css={styles.spinner}
        color={highlightColor || colors.highlight}
      />
      {submitted ? (
        <div
          ref={node => setSuccessRef(node)}
          css={[styles.successMessage, successCss]}
        >
          {simpleSuccess ? (
            <BsCheck2Circle />
          ) : (
            <StructuredText data={successMessage} />
          )}
        </div>
      ) : (
        <form
          css={styles.form}
          ref={node => setFormRef(node)}
          name={formName}
          data-netlify={formType === 'Netlify'}
          netlify-honeypot={formType === 'Netlify' && 'bot-field'}
          method="post"
          onSubmit={(e: SyntheticEvent) => {
            e.preventDefault()
            handleSubmit(formData.current, formName)
          }}
        >
          {formType === 'Netlify' && (
            <Fragment>
              <input
                type="hidden"
                name="bot-field"
                aria-hidden
              />
              <input
                type="hidden"
                name="form-name"
                value={formName}
                aria-hidden
              />
            </Fragment>
          )}
          {formFieldsArray.map((field, i) => (
            <Fragment key={i}>
              {field.__typename === 'DatoCmsTextField' && (
                <TextField
                  data={field}
                  fieldStyles={fieldStyles}
                  onChange={handleChange}
                  key={i}
                />
              )}
              {field.__typename === 'DatoCmsSelectField' && (
                <SelectField
                  data={field}
                  fieldStyles={fieldStyles}
                  onChange={handleChangeSelect}
                  key={i}
                />
              )}
              {field.__typename === 'DatoCmsSelectStateField' && (
                <SelectStateField
                  data={field}
                  fieldStyles={fieldStyles}
                  onChange={handleChangeSelect}
                  key={i}
                />
              )}
              {field.__typename === 'DatoCmsMultilineTextField' && (
                <MultilineTextField
                  data={field}
                  fieldStyles={fieldStyles}
                  onChange={handleChange}
                  key={i}
                />
              )}
              {field.__typename === 'DatoCmsCheckboxArrayField' && (
                <CheckboxArrayField
                  data={field}
                  fieldStyles={fieldStyles}
                  onChange={handleChange}
                  key={i}
                />
              )}
              {field.__typename === 'DatoCmsCheckboxField' && (
                <CheckboxField
                  data={field}
                  fieldStyles={fieldStyles}
                  onChange={handleChangeCheckbox}
                  key={i}
                />
              )}
              {field.__typename === 'DatoCmsDateField' && (
                <DateField
                  data={field}
                  fieldStyles={fieldStyles}
                  onChange={handleChange}
                  key={i}
                />
              )}
              {field.__typename === 'DatoCmsFormDivider' && (
                <FormDivider
                  fieldStyles={fieldStyles}
                  key={i}
                />
              )}
            </Fragment>
          ))}
          <div css={styles.buttonWrap}>
            <div css={styles.button}>
              <span>{submitButtonText}</span>
              <input
                name="submit"
                type="submit"
                aria-label={submitButtonText}
                value=""
              />
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default Form
