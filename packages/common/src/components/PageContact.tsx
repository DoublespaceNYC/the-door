import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { Fragment } from 'react'
import { StructuredText } from 'react-datocms'

import { toSlug } from '../helpers'
import { mq } from '../theme/mixins'
import { IStructuredText } from '../types'
import { Anchor, IAnchorLink } from './AnchorLink'

export interface IContactBlock extends Record {
  __typename: 'DatoCmsContactBlock'
  heading: string
  body: IStructuredText
}

export interface IContactSection extends Record {
  __typename: 'DatoCmsContactSection'
  heading: string
  anchorLink: [IAnchorLink?]
  contactBlocks: IContactBlock[]
}

type Props = {
  data: IContactSection
  colors: {
    bg: string
    text: string
    link: [string, string]
  }
}

const PageContact = ({
  data: { heading, anchorLink, contactBlocks },
  colors,
}: Props) => {
  const styles = {
    section: css`
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: var(--gtr-m);
      grid-row-gap: var(--row-s);
      background: ${colors.bg};
      color: ${colors.text};
      padding: var(--row-m) var(--margin) var(--row-l);
      ${mq().m} {
        grid-template-columns: 1fr 1fr;
      }
      ${mq().s} {
        grid-template-columns: 1fr;
      }
    `,
    heading: css`
      grid-column: ${contactBlocks.length > 2 ? '1 / -1' : 'auto'};
      font-size: var(--fs-72);
      margin: 0 0 0.25em;
      line-height: 1;
      ${mq().m} {
        grid-column: ${contactBlocks.length > 1 ? '1 / -1' : 'auto'};
      }
    `,
    block: css`
      border-top: 3px solid ${colors.text};
      margin-top: ${contactBlocks.length <= 2 ? '1.5em' : '0'};
      ${mq().m} {
        margin-top: ${contactBlocks.length <= 1 ? '1.5em' : '0'};
      }
      ${mq().s} {
        margin-top: 0;
      }
      h3 {
        font-family: var(--body-font);
        font-size: var(--fs-24);
        line-height: 1.25;
        font-weight: 500;
        margin: 0.5em 0;
      }
      p {
        margin: 0.5em 0;
        line-height: 1.333;
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
  }

  if (contactBlocks.length > 0) {
    return (
      <section css={styles.section}>
        {anchorLink[0] && (
          <Anchor
            id={toSlug(anchorLink[0].linkText)}
            css={{ position: 'absolute' }}
          />
        )}
        <h2 css={styles.heading}>{heading}</h2>
        {contactBlocks.map((block, i) => (
          <div css={styles.block} key={i}>
            <h3>{block.heading}</h3>
            <StructuredText data={block.body} />
          </div>
        ))}
      </section>
    )
  }
  return <Fragment />
}

export default PageContact
