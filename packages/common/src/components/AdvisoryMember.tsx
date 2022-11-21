import { css } from '@emotion/react'
import { Document, isParagraph } from 'datocms-structured-text-utils'
import { GatsbyImage } from 'gatsby-plugin-image'
import { StructuredText, renderNodeRule } from 'react-datocms'

import { mq } from '../theme/mixins'
import { IGatsbyImageFocused } from './GatsbyImageFocused'

export interface IAdvisoryMember {
  id: string
  __typename: 'DatoCmsAdvisoryMember'
  name: string
  title: {
    value: Document
  }
  headshot: IGatsbyImageFocused
}

interface Props {
  data: IAdvisoryMember
}

const AdvisoryMember = ({
  data: { name, title, headshot },
}: Props): JSX.Element => {
  const styles = {
    container: css`
      display: grid;
      grid-template-columns: minmax(5rem, 2fr) 5fr;
      grid-gap: 1em;
      margin-bottom: 1em;
    `,
    textbox: css`
      color: #444;
      border-top: 1px solid #999;
      h3 {
        font-size: var(--fs-24);
        font-family: var(--body-font);
        margin: 0.75em 0 0.333em;
        ${mq().s} {
          font-size: var(--fs-21);
        }
      }
      h4 {
        font-size: var(--fs-16);
        font-family: var(--body-font);
        line-height: 1.25;
        margin: 0.125em 0;
        font-weight: 400;
        font-style: italic;
        ${mq().s} {
          font-size: var(--fs-14);
        }
      }
    `,
  }
  return (
    <div css={styles.container}>
      <div>
        <GatsbyImage
          image={headshot.gatsbyImageData}
          alt={headshot.alt || `${name} | ${title}`}
        />
      </div>
      <div css={styles.textbox}>
        <h3>{name}</h3>
        <StructuredText
          data={title}
          customNodeRules={[
            renderNodeRule(isParagraph, ({ children, key }) => (
              <h4 key={key}>{children}</h4>
            )),
          ]}
        />
      </div>
    </div>
  )
}

export default AdvisoryMember
