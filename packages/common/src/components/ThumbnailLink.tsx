import { css } from '@emotion/react'
import type { Record } from 'datocms-structured-text-utils'
import { Link } from 'gatsby'
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image'
import type { HTMLAttributes } from 'react'

import type { IDatoLink } from './DatoLink'
import DatoLink from './DatoLink'

export type IThumbnailLink = Record & {
  __typename: 'DatoCmsThumbnailLink'
  link: IDatoLink[]
  image: { gatsbyImageData: IGatsbyImageData; alt?: string }
}

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  data: IThumbnailLink
}

export const ThumbnailLink = ({ data, ...props }: Props) => {
  const styles = {
    link: css`
      display: block;
      margin-right: 1em;
      margin-top: 2em;
      margin-bottom: 2em;
      width: 35ch;
      max-width: 100%;
      background-color: currentColor;
      > span {
        display: block;
        margin: 0.75em;
        color: #fff;
      }
    `,
    image: css`
      min-width: 100%;
    `,
  }
  return (
    <DatoLink
      css={styles.link}
      data={data.link[0]}
      data-thumbnail
      {...props}
    >
      <GatsbyImage
        css={styles.image}
        image={data.image.gatsbyImageData}
        alt={data.image.alt || ''}
      />
    </DatoLink>
  )
}
