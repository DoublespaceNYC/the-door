import { css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import {
  StructuredText as IStructuredText,
  Record,
} from 'datocms-structured-text-utils'
import { HTMLAttributes } from 'react'
import { Fragment, SyntheticEvent, useCallback, useState } from 'react'
import { StructuredText } from 'react-datocms'
import { BsCheck2Circle } from 'react-icons/bs'

import { useElementRect } from '../hooks/useElementRect'
import useReadableColor from '../hooks/useReadableColor'
import { absoluteFill, animateIn, buttonStyle } from '../theme/mixins'
import LoadingSpinner from './LoadingSpinner'
import MultilineTextField, {
  IMultilineTextField,
} from './MultilineTextField'
import SelectField, { ISelectField } from './SelectField'
import TextField, { ITextField } from './TextField'

export interface IForm extends Record {
  __typename: 'DatoCmsForm'
  formName: string
  submitButtonText: string
  successMessage: IStructuredText
  formFields: (ITextField | ISelectField | IMultilineTextField)[]
}

export interface IFormBlock extends Record {
  __typename: 'DatoCmsFormBlock'
  form: IForm
}

export type FieldStyles = {
  container: CSSInterpolation
  inputBase: CSSInterpolation
  input: CSSInterpolation
  label: CSSInterpolation
  shrink: CSSInterpolation
  required: CSSInterpolation
}

export type FormColors = {
  fill: string
  border?: string
  text: string
  label: string
  highlight: string
  buttonFill: [string, string]
  buttonText: [string, string]
  buttonBorder?: [string, string]
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: IForm
  colors: FormColors
  formType: 'Netlify' | 'Mailchimp'
  listId?: string
  successCss?: CSSInterpolation
  simpleSuccess?: boolean
}

const Form = ({
  data: { formName, submitButtonText, successMessage, formFields },
  colors,
  formType,
  listId,
  successCss,
  simpleSuccess,
  ...props
}: Props) => {
  const [formRef, setFormRef] = useState<HTMLElement | null>(null)
  const [successRef, setSuccessRef] = useState<HTMLElement | null>(null)

  const { width: formWidth, height: formHeight } =
    useElementRect(formRef)
  const { width: successWidth, height: successHeight } =
    useElementRect(successRef)

  const [formData, setFormData] = useState({})

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleSubmit = useCallback(
    (formData: { [key: string]: string }, formName: string) => {
      const submitFunction = async (data: {
        url: string
        method: string
        headers?: { [key: string]: string }
        body: string
      }) => {
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
          alert(
            `Sorry, there was an error submitting this form: ${error}`
          )
        }
      }
      if (formType === 'Netlify') {
        const encode = (data: { [key: string]: string }) => {
          return Object.keys(data)
            .map(
              key =>
                encodeURIComponent(key) +
                '=' +
                encodeURIComponent(data[key])
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
            ...formData,
          }),
        })
      }
      if (formType === 'Mailchimp') {
        submitFunction({
          url: `/.netlify/functions/mailChimpSubscribe`,
          method: 'POST',
          body: JSON.stringify({ listId, ...formData }),
        })
      }
    },
    [formType, listId]
  )

  const textHighlight = useReadableColor(colors.highlight, colors.fill)
  const styles = {
    wrapper: css`
      position: relative;
      display: grid;
      overflow: hidden;
      width: ${submitted ? successWidth : formWidth}px;
      height: ${submitted ? successHeight : formHeight}px;
      transition: all 300ms ease;
    `,
    form: css`
      grid-area: 1 / 1 / 2 / 2;
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 1em;
      align-items: flex-start;
      justify-content: center;
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
    button: css`
      ${buttonStyle}
      display: flex;
      align-items: center;
      position: relative;
      grid-column: 1 / -1;
      justify-self: flex-start;
      margin-top: 0.5em;
      box-sizing: border-box;
      background: ${colors.buttonFill[0]};
      color: ${colors.buttonText[0]};
      border: ${colors.buttonBorder &&
      `1px solid ${colors.buttonBorder?.[0]}`};
      border-radius: 0.25em;
      transition: all 300ms ease;
      font-size: 112.5%;
      ${formFields.length === 1 &&
      css`
        margin-top: 0;
        align-self: stretch;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      `}
      span {
        color: currentColor;
        position: relative;
        padding-top: 0.1em;
      }
      input {
        ${absoluteFill}
        opacity: 0;
        margin: 0;
        padding: 0;
        border: none;
        cursor: pointer;
      }
      @media (hover: hover) {
        &:hover,
        &:focus-within {
          color: ${colors.buttonText[1]};
          background: ${colors.buttonFill[1]};
          border-color: ${colors.buttonBorder?.[1]};
        }
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
          background-color: ${colors.highlight};
        }
      `}
    `,
    inputBase: css`
      background-color: ${colors.fill};
      border-radius: 0.25em;
      border: ${colors.border && `1px solid ${colors.border}`};
      div:focus-within > & {
        border-color: ${colors.highlight};
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
      padding: 1.25em 0.75em 0.333em;
      line-height: 1.333;
      width: 100%;
      color: ${colors.text};
      background-color: transparent;
    `,
    label: css`
      position: absolute;
      pointer-events: none;
      z-index: 2;
      bottom: 0;
      left: 0.75em;
      color: ${colors.label};
      max-width: 100%;
      line-height: 1.333;
      padding-right: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transform: translate3d(0, -0.667em, 0);
      transition: transform 200ms ease;
      transform-origin: 0 0;
      font-style: italic;
      font-weight: 300;
    `,
    shrink: css`
      transform: translate3d(0, -1.333em, 0) scale3d(0.75, 0.75, 1);
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
  }
  return (
    <div css={styles.wrapper} {...props}>
      <LoadingSpinner css={styles.spinner} color={colors.highlight} />
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
            handleSubmit(formData, formName)
          }}
        >
          {formType === 'Netlify' && (
            <Fragment>
              <input type="hidden" name="bot-field" aria-hidden />
              <input
                type="hidden"
                name="form-name"
                value={formName}
                aria-hidden
              />
            </Fragment>
          )}
          {formFields.map((field, i) => (
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
                  onChange={handleChange}
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
            </Fragment>
          ))}
          <div css={styles.button}>
            <span>{submitButtonText}</span>
            <input
              name="submit"
              type="submit"
              aria-label={submitButtonText}
              value=""
            />
          </div>
        </form>
      )}
    </div>
  )
}

export default Form
