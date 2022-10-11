import { css } from '@emotion/react'
import {
  StructuredText as IStructuredText,
  Record,
} from 'datocms-structured-text-utils'
import { graphql } from 'gatsby'
import { StructuredText } from 'react-datocms'

import { ledeStyle } from '../theme/mixins'
import Form, { IFormEmbed } from './Form'
import { ISEO } from './Seo'

export interface ILightboxContent extends Record {
  __typename: 'DatoCmsLightbox'
  id: string
  name: string
  content: IStructuredText & {
    blocks: IFormEmbed[]
  }
  slug: string
  seo: ISEO
}

type Props = {
  data: ILightboxContent
}

const LightboxContent = ({ data }: Props): JSX.Element => {
  const styles = {
    article: css`
      margin: var(--row-s) 0;
      min-width: 45ch;
      max-width: 75ch;
      h1 {
        ${ledeStyle}
        line-height: 1.25;
        font-size: var(--fs-48);
        margin: 0 0 0.25em;
      }
    `,
    form: css`
      margin-top: 2em;
    `,
  }
  return (
    <article css={styles.article}>
      <StructuredText
        data={data.content}
        renderBlock={({ record }) => {
          if (record.__typename === 'DatoCmsFormEmbed') {
            return <Form data={record.form} css={styles.form} />
          } else return null
        }}
      />
    </article>
  )
}

export const LightboxContentFragment = graphql`
  fragment LightboxContentFragment on DatoCmsLightboxContent {
    __typename
    id: originalId
    name
    content {
      value
      blocks {
        ... on DatoCmsFormEmbed {
          ...FormEmbedFragment
        }
      }
    }
    slug
    seo {
      ...SEOFragment
    }
  }
`

export default LightboxContent
