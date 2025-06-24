import { css } from '@emotion/react'
import type { Record } from 'datocms-structured-text-utils'
import { Link } from 'gatsby'
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image'
import type { HTMLAttributes } from 'react'

import { mq } from '../theme/mixins'
import type { IDatoLink } from './DatoLink'
import DatoLink from './DatoLink'

export type IThumbnailLink = Record & {
  __typename: 'DatoCmsThumbnailLink'
  link: IDatoLink[]
  image: { gatsbyImageData: IGatsbyImageData; alt?: string }
}

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  data: IThumbnailLink | undefined | null
}

export const ThumbnailLink = ({ data, ...props }: Props) => {
  const styles = {
    link: css`
      position: relative;
      display: grid;
      background-color: var(--readable-color);
      text-decoration: none;
      z-index: 5;
      > span {
        display: block;
        margin: 0.75em;
        color: #fff;
      }
      @media (hover: hover) {
        &:hover {
          background-color: var(--readable-color-hover);
        }
      }
    `,
    image: css`
      min-width: 100%;
    `,
  }
  if (!data) return null
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
