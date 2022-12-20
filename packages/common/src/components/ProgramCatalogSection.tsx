import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { Fragment } from 'react'

import useThemeContext from '../context/ThemeContext'
import { doorColors } from '../theme/variables'
import Accordion from './Accordion'
import { Anchor, IAnchorLink } from './AnchorLink'
import ProgramBlock, { IProgram } from './ProgramBlock'

export interface IProgramCatalogSection extends Record {
  __typename: 'DatoCmsCatalogSection'
  anchorLink: [IAnchorLink?]
  heading: string
  catalogGroups: {
    heading: string
    programs: IProgram[]
  }[]
}

type Props = {
  data: IProgramCatalogSection
}

const ProgramCatalogSection = ({
  data: { heading, catalogGroups, anchorLink },
}: Props): JSX.Element => {
  const { theme } = useThemeContext()
  const setColors = () => {
    const defaultColors = {
      bg: 'transparent',
      heading: '#fff',
      accordionHeading: '#fff',
      divider: '#ffffff88',
      highlight: '#fff',
    }
    switch (theme) {
      case 'The Door':
        return {
          ...defaultColors,
          bg: `linear-gradient(to top right, ${doorColors.purpleDark}, ${doorColors.purple})`,
          highlight: doorColors.pink,
        }
      default:
        return defaultColors
    }
  }
  const colors = setColors()
  const styles = {
    section: css`
      background: ${colors.bg};
      position: relative;
      padding: var(--row-l) var(--margin) var(--row-l);
    `,
    heading: css`
      color: ${colors.heading};
      font-size: var(--fs-72);
      margin: 0 0 1em;
      line-height: 1;
    `,
    programBlock: css`
      margin-left: var(--gtr-m);
      border-bottom: 1px solid ${colors.divider};
    `,
    lastBlock: css`
      border-bottom: none;
      margin-bottom: 0.67em;
    `,
    anchor: css`
      position: absolute;
      top: 0;
    `,
  }
  return (
    <section css={styles.section}>
      {anchorLink[0] && (
        <Anchor
          id={anchorLink[0]?.linkText}
          css={styles.anchor}
        />
      )}
      <h2 css={styles.heading}>{heading}</h2>
      <Accordion
        theme="Dark"
        items={catalogGroups.map(item => ({
          heading: item.heading,
          contents: (
            <Fragment>
              {item.programs.map((program, i) => (
                <ProgramBlock
                  css={[
                    styles.programBlock,
                    i === item.programs.length - 1 && styles.lastBlock,
                  ]}
                  program={program}
                  key={i}
                  headingLevel={4}
                  theme="Dark"
                  highlightColor={colors.highlight}
                />
              ))}
            </Fragment>
          ),
        }))}
        headingLevel={3}
      />
    </section>
  )
}

export default ProgramCatalogSection
