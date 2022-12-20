import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { darken } from 'polished'
import { HTMLAttributes } from 'react'
import { ElementType } from 'react'
import { StructuredText } from 'react-datocms'

import useReadableColor from '../hooks/useReadableColor'
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

interface Props extends HTMLAttributes<HTMLDivElement> {
  program: IProgram
  headingLevel?: number
  highlightColor: string
  theme: 'Light' | 'Dark'
}

const ProgramBlock = ({
  program: { programTitle, location, description, registration, url },
  headingLevel = 4,
  highlightColor,
  theme,
  ...props
}: Props): JSX.Element => {
  const Heading = `h${headingLevel}` as ElementType
  const Subheading = `h${headingLevel + 1}` as ElementType
  const readableHighlight = useReadableColor(
    highlightColor,
    theme === 'Dark' ? '#333' : '#fff'
  )
  const setColors = () => {
    switch (theme) {
      case 'Dark':
        return {
          heading: '#fff',
          location: '#ffffffaa',
          body: '#fff',
          link: '#fff',
          linkHover: readableHighlight,
        }
      case 'Light':
        return {
          heading: '#333',
          location: '#444',
          body: '#444',
          link: readableHighlight,
          linkHover: darken(0.1, readableHighlight),
        }
    }
  }
  const colors = setColors()
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
      font-family: var(--body-font);
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
        color: ${colors.link};
        font-weight: 500;
        @media (hover: hover) {
          &:hover {
            color: ${colors.linkHover};
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
      color: ${colors.link};
      border: 1px solid currentColor;
      margin-top: 1.5em;
      @media (hover: hover) {
        &:hover {
          color: ${colors.linkHover};
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
    <div
      css={styles.block}
      {...props}
    >
      <Heading css={styles.heading}>{programTitle}</Heading>
      {location && <Subheading css={styles.subheading}>{location}</Subheading>}
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
