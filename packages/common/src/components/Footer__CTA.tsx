import { css, useTheme } from '@emotion/react'
import { Document, isParagraph } from 'datocms-structured-text-utils'
import { lighten } from 'polished'
import { ComponentProps } from 'react'
import { StructuredText, renderNodeRule } from 'react-datocms'

import useReadableColor from '../hooks/useReadableColor'
import { buttonStyle, mq } from '../theme/mixins'
import DatoLink from './DatoLink'
import { IExternalLink } from './ExternalLink'
import { IFormLightboxLink } from './Form__Lightbox'
import { IInternalLink } from './InternalLink'
import { ITheme } from './Layout'

interface Props extends ComponentProps<'div'> {
  cta: {
    value: Document
  }
  ctaButtons: (IFormLightboxLink | IInternalLink | IExternalLink)[]
}

const FooterCTA = ({ cta, ctaButtons, ...props }: Props): JSX.Element => {
  const theme = useTheme() as ITheme
  const highlightColor =
    theme.themeName === 'The Door' ? theme.septenary : theme.secondary
  const readableHighlight = useReadableColor(highlightColor, theme.primary, 3)
  const readableButton = useReadableColor(highlightColor, '#fff', 3)
  const styles = {
    container: css`
      grid-column: span 6 / -2;
      margin-bottom: 1.5em;
      ${mq().ml} {
        grid-column: span 5 / -2;
      }
      ${mq().ms} {
        grid-column: span 6 / -2;
        grid-row: 1 / 2;
      }
      ${mq().s} {
        margin-bottom: 0;
      }
    `,
    cta: css`
      font-size: inherit;
      color: inherit;
      margin: 0.375em 0;
      line-height: 1.125;
      strong {
        color: ${readableHighlight};
      }
    `,
    buttonContainer: css`
      display: flex;
      flex-wrap: wrap;
      grid-gap: 0.5em;
    `,
    button: css`
      ${buttonStyle}
      color: #fff;
      background: ${readableButton};
      border-radius: 0.25em;
      @media (hover: hover) {
        &:hover {
          background: ${lighten(0.1, readableButton)};
        }
      }
    `,
  }
  return (
    <div
      css={styles.container}
      {...props}
    >
      <h2 css={styles.cta}>
        <StructuredText
          data={cta}
          customNodeRules={[
            renderNodeRule(isParagraph, ({ children, key }) => (
              <span key={key}>{children}</span>
            )),
          ]}
        />
      </h2>
      <div css={styles.buttonContainer}>
        {ctaButtons.map((button, i) => (
          <DatoLink
            css={styles.button}
            data={button}
            highlightColor={highlightColor}
            key={i}
          >
            {button.linkText}
          </DatoLink>
        ))}
      </div>
    </div>
  )
}

export default FooterCTA
