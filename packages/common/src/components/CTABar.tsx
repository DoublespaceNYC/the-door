import { css } from '@emotion/react'
import {
  StructuredText as IStructuredText,
  isParagraph,
} from 'datocms-structured-text-utils'
import { useMemo } from 'react'
import { StructuredText, renderNodeRule } from 'react-datocms'

import useThemeContext from '../context/ThemeContext'
import { mq } from '../theme/mixins'
import { doorColors } from '../theme/variables'
import DatoLink, { ILightboxLink } from './DatoLink'
import { IExternalLink } from './ExternalLink'
import Form, { IFormBlock } from './Form'
import { IInternalLink } from './InternalLink'

export interface ICTABar extends IStructuredText {
  blocks: (IInternalLink | IExternalLink | ILightboxLink | IFormBlock)[]
}

export type CTABarProps = {
  data: ICTABar
}

const CTABar = ({ data }: CTABarProps): JSX.Element => {
  const { theme } = useThemeContext()

  const colors = useMemo(() => {
    switch (theme) {
      case 'The Door':
        return {
          bg: doorColors.navyDark,
          text: '#fff',
          boldText: doorColors.blueLight,
        }
    }
  }, [theme])
  const styles = {
    section: css`
      background: ${colors?.bg};
      padding: 1rem var(--margin);
      color: ${colors?.text};
      display: flex;
      grid-gap: 1.5em;
      justify-content: center;
      align-items: center;
      ${mq().s} {
        flex-wrap: wrap;
      }
      h2 {
        line-height: 1.125;
        margin: 0;
        font-size: var(--fs-30);
        ${mq().ml} {
          font-size: var(--fs-30);
        }
        strong {
          color: ${colors?.boldText};
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
      color: ${colors?.boldText};
    `,
  }
  return (
    <section css={styles.section}>
      <StructuredText
        data={data}
        renderBlock={({ record }) => {
          if (record.__typename === 'DatoCmsFormBlock') {
            return (
              <Form
                data={record.form}
                formType="Netlify"
                css={styles.form}
                successCss={styles.formSuccess}
                simpleSuccess
                theme="Dark"
              />
            )
          }
          if (
            record.__typename === 'DatoCmsExternalLink' ||
            record.__typename === 'DatoCmsInternalLink' ||
            record.__typename === 'DatoCmsLightboxLink'
          ) {
            return <DatoLink data={record} />
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
