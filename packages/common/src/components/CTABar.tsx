import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import {
  StructuredText as IStructuredText,
  isParagraph,
} from 'datocms-structured-text-utils'
import { StructuredText, renderNodeRule } from 'react-datocms'

import { buttonStyle, mq } from '../theme/mixins'
import DatoLink, { isDatoLink } from './DatoLink'
import { IExternalLink } from './ExternalLink'
import Form, { IFormEmbed } from './Form'
import { IFormLightboxLink } from './Form__Lightbox'
import { IInternalLink } from './InternalLink'
import { ITheme } from './Layout'

export interface ICTABar extends IStructuredText {
  blocks: (IInternalLink | IExternalLink | IFormLightboxLink | IFormEmbed)[]
}

export type CTABarProps = {
  data: ICTABar
}

const CTABar = ({ data }: CTABarProps): JSX.Element => {
  const theme = useTheme() as ITheme
  // const setColors = () => {
  //   switch (theme) {
  //     case 'The Door':
  //       return {
  //         bg: doorColors.navyDark,
  //         text: '#fff',
  //         boldText: doorColors.blueLight,
  //       }
  //   }
  // }
  // const colors = setColors()
  const styles = {
    section: css`
      position: relative;
      z-index: 2;
      background: ${theme.primaryDark};
      padding: 0.75em var(--margin);
      color: #fff;
      display: flex;
      grid-gap: 1.5em;
      justify-content: center;
      align-items: center;
      ${mq().s} {
        flex-wrap: wrap;
        grid-gap: 1em;
        padding-bottom: 1em;
      }
      h2 {
        line-height: 1.125;
        margin: 0;
        font-size: var(--fs-30);
        ${mq().ml} {
          font-size: var(--fs-30);
        }
        strong {
          color: ${theme.secondaryLight};
          ${mq().m} {
            display: block;
          }
        }
      }
    `,
    form: css`
      flex: none;
      font-size: var(--fs-15);
      form {
        width: min(21em, 40vw);
        max-width: 100%;
      }
      ${mq().s} {
        width: 100%;
        form {
          width: 100%;
        }
      }
    `,
    formSuccess: css`
      font-size: var(--fs-30);
      color: ${theme.secondaryLight};
    `,
    button: css`
      ${buttonStyle}
      background-color: #fff;
      color: ${theme.tertiary};
      font-size: 125%;
      border-radius: 0.2em;
      @media (hover: hover) {
        &:hover {
          background: ${theme.tertiary};
          color: #fff;
        }
      }
    `,
  }
  return (
    <section css={styles.section}>
      <StructuredText
        data={data}
        renderBlock={({ record }) => {
          if (record.__typename === 'DatoCmsFormEmbed') {
            switch (record.form.__typename) {
              case 'DatoCmsForm': {
                return (
                  <Form
                    data={record.form}
                    formType="Netlify"
                    css={styles.form}
                    successCss={styles.formSuccess}
                    simpleSuccess
                    theme="Dark"
                    highlightColor={theme.secondary}
                  />
                )
              }
              default:
                return null
            }
          }
          if (isDatoLink(record)) {
            return (
              <DatoLink
                data={record}
                css={styles.button}
              />
            )
          } else return null
        }}
        customNodeRules={[
          renderNodeRule(isParagraph, ({ children, key }) => {
            return <h2 key={key}>{children}</h2>
          }),
        ]}
      />
    </section>
  )
}

export default CTABar
