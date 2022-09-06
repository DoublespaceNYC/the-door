import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { HTMLAttributes } from 'react'
import { ElementType } from 'react'
import { StructuredText } from 'react-datocms'

import { buttonStyle, mq } from '../theme/mixins'
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

interface Props extends HTMLAttributes<HTMLDivElement> {
  program: IProgram
  headingLevel?: number
  colors: IProgramColors
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
      grid-column-gap: var(--gtr-s);
      ${mq().s} {
        grid-template-columns: 1fr;
      }
      padding-bottom: 2em;
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
      ${buttonStyle}
      width: fit-content;
      padding-top: 0.6em;
      grid-column: 2 / 3;
      grid-row: 1 / 4;
      align-self: flex-start;
      font-size: var(--fs-21);
      color: ${colors.button[0]};
      border: 1px solid currentColor;
      margin-top: 1.5em;
      @media (hover: hover) {
        &:hover {
          color: ${colors.button[1]};
        }
      }
      ${mq().s} {
        grid-row: auto;
        grid-column: auto;
        margin-top: 1em;
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
