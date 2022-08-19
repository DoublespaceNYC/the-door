import { css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { Record } from 'datocms-structured-text-utils'
import { ElementType } from 'react'
import { StructuredText } from 'react-datocms'

import { IStructuredText } from '../types'

export interface IProgram extends Record {
  __typename: 'DatoCmsProgram'
  programTitle: string
  location: string
  description: IStructuredText
  registration: boolean
  url: string
}

export interface IProgramColors {
  heading: string
  location: string
  body: string
  link: [string, string]
  button: [string, string]
}

type Props = {
  program: IProgram
  headingLevel?: number
  colors: IProgramColors
  css?: CSSInterpolation
}

const ProgramBlock = ({
  program: { programTitle, location, description, registration, url },
  colors,
  headingLevel = 4,
  ...props
}: Props) => {
  const Heading = `h${headingLevel}` as ElementType
  const Subheading = `h${headingLevel + 1}` as ElementType
  const styles = {
    block: css`
      display: grid;
      grid-template-columns: 1fr auto;
      grid-auto-flow: dense;
    `,
    heading: css`
      grid-column: 1 / 2;
      color: ${colors.heading};
      font-size: var(--fs-24);
      line-height: 1.25;
      font-weight: 400;
      margin: 1em 0 0;
    `,
    subheading: css`
      grid-column: 1 / 2;
      color: ${colors.location};
      font-size: inherit;
      font-style: italic;
      font-weight: 400;
      margin: 0.67em 0 0;
      line-height: 1.75;
    `,
    body: css`
      grid-column: 1 / 2;
      max-width: 96ch;
      color: ${colors.body};
      line-height: 1.75;
      margin-bottom: 2em;
      p {
        margin: 0.67em 0 0;
      }
      a {
        color: ${colors.link[0]};
        font-weight: 500;
        @media (hover: hover) {
          &:hover {
            color: ${colors.link[1]};
          }
        }
      }
    `,
    button: css`
      grid-column: 2 / 3;
      grid-row: 1 / 4;
      align-self: flex-start;
      color: ${colors.button[0]};
      font-size: var(--fs-21);
      font-family: var(--display-font);
      text-transform: uppercase;
      line-height: 1;
      letter-spacing: 0.05em;
      text-decoration: none;
      border: 1px solid currentColor;
      padding: 0.5em 0.75em;
      margin-top: 1.5em;
      @media (hover: hover) {
        &:hover {
          color: ${colors.button[1]};
        }
      }
    `,
  }
  return (
    <div css={styles.block} {...props}>
      <Heading css={styles.heading}>{programTitle}</Heading>
      {location && (
        <Subheading css={styles.subheading}>{location}</Subheading>
      )}
      <div css={styles.body}>
        <StructuredText data={description} />
      </div>
      {registration && (
        <a
          css={styles.button}
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          Register Now
        </a>
      )}
    </div>
  )
}

export default ProgramBlock
