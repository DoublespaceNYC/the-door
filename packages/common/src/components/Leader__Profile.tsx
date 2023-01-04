import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { Document } from 'datocms-structured-text-utils'
import { GatsbyImage } from 'gatsby-plugin-image'
import { HTMLAttributes } from 'react'
import { StructuredText } from 'react-datocms'

import { mq } from '../theme/mixins'
import { ISEO } from '../types'
import { IGatsbyImageFocused } from './GatsbyImageFocused'
import { ITheme } from './Layout'

export interface ILeader {
  id: string
  __typename: 'DatoCmsLeader'
  name: string
  title: string
  headshot: IGatsbyImageFocused & {
    url: string
  }
  bio: {
    value: Document
  }
  slug: string
  seo?: ISEO
}

interface Props extends HTMLAttributes<HTMLElement> {
  data: ILeader
  layout: 'Lightbox' | 'Page'
  highlightColor?: string
}

const LeaderProfile = ({
  data: { name, title, headshot, bio },
  layout,
  highlightColor,
  ...props
}: Props): JSX.Element => {
  const theme = useTheme() as ITheme

  const styles = {
    article: css`
      display: grid;
      grid-template-columns: minmax(9rem, 1fr) 2.5fr;
      grid-column-gap: var(--margin);
      padding: var(--row-m) var(--margin) var(--row-m);
      ${mq().ms} {
        grid-template-columns: minmax(9rem, 1fr) 2fr;
      }
      ${layout === 'Page' &&
      css`
        padding: var(--row-l) var(--margin) var(--row-ll);
      `}
    `,
    text: css`
      color: #444;
      max-width: 90ch;
      ${mq().ms} {
        display: contents;
      }
      h1 {
        font-size: var(--fs-72);
        line-height: 1.125;
        margin: 0.25em 0 0.125em;
        color: ${highlightColor || theme.tertiary};
        align-self: flex-start;
        ${mq().ms} {
          font-size: var(--fs-48);
        }
      }
      h2 {
        font-size: var(--fs-21);
        font-family: var(--body-font);
        font-weight: 400;
        font-style: italic;
        color: #666;
        line-height: 1.25;
        margin: 0 0 1.5em;
        ${mq().ms} {
          grid-column: 2 / 3;
          align-self: flex-start;
          font-size: var(--fs-18);
        }
      }
    `,
    title: css`
      align-self: center;
    `,
    bio: css`
      grid-column: 1 / -1;
      p {
        line-height: 1.75;
      }
    `,
    imageWrap: css`
      align-self: flex-start;
      ${mq().ms} {
        margin-bottom: 1em;
      }
    `,
  }
  return (
    <article
      css={styles.article}
      {...props}
    >
      <div css={styles.imageWrap}>
        <GatsbyImage
          image={headshot.gatsbyImageData}
          alt={headshot.alt || `${name} | ${title}`}
        />
      </div>
      <div css={styles.text}>
        <div css={styles.title}>
          <h1>{name}</h1>
          <h2>{title}</h2>
        </div>
        <div css={styles.bio}>
          <StructuredText data={bio} />
        </div>
      </div>
    </article>
  )
}

export default LeaderProfile
