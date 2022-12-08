import { css } from '@emotion/react'
import { Document, Record } from 'datocms-structured-text-utils'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { darken } from 'polished'
import { HTMLAttributes } from 'react'
import { StructuredText } from 'react-datocms'

import useReadableColor from '../hooks/useReadableColor'
import { mq } from '../theme/mixins'
import { ISEO } from '../types'

export interface IPartner extends Record {
  __typename: 'DatoCmsPartner'
  name: string
  description: {
    value: Document
  }
  logo: {
    format: 'svg' | 'png'
    url: string
    gatsbyImageData: IGatsbyImageData | null
    alt: string | null
  }
  seo: ISEO
  slug: string
}

interface Props extends HTMLAttributes<HTMLElement> {
  data: IPartner
  highlightColor?: string
}

const PartnerArticle = ({
  data: { name, description, logo },
  highlightColor,
  ...props
}: Props): JSX.Element => {
  const readableHighlight = useReadableColor(highlightColor || '#000', '#fff')
  const styles = {
    article: css`
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 2fr;
      grid-column-gap: var(--gtr-m);
      padding: var(--row-s) var(--margin) var(--row-s) var(--gtr-m);
      box-sizing: border-box;
      ${mq().ms} {
        grid-template-columns: 1fr;
        padding: var(--row-s) var(--margin);
      }
      a {
        color: ${readableHighlight};
        @media (hover: hover) {
          &:hover {
            color: ${darken(0.1, readableHighlight)};
          }
        }
      }
    `,
    imageWrap: css`
      aspect-ratio: 3 / 2;
      display: flex;
      margin: 0;
      position: sticky;
      top: 0;
      align-self: flex-start;
      ${mq().ms} {
        position: relative;
        justify-self: center;
        width: 100%;
        max-width: 36rem;
      }
    `,
    svg: css`
      width: 100%;
      height: 100%;
      object-fit: contain;
    `,
    gatsbyImage: css`
      height: 100%;
    `,
    description: css`
      padding: var(--row-m) 0 var(--row-m) var(--margin);
      box-sizing: border-box;
      border-left: 1px solid #00000033;
      color: #333;
      p {
        line-height: 1.75;
      }
      ${mq().ms} {
        border-left: none;
        border-top: 1px solid #00000033;
        padding: var(--row-s) 0;
      }
    `,
  }
  return (
    <article
      css={styles.article}
      {...props}
    >
      <h1 css={styles.imageWrap}>
        {logo.format === 'svg' ? (
          <img
            css={styles.svg}
            src={logo.url}
            alt={logo.alt || name}
            title={name}
          />
        ) : (
          logo.gatsbyImageData && (
            <GatsbyImage
              css={styles.gatsbyImage}
              image={logo.gatsbyImageData}
              alt={logo.alt || name}
              objectFit="contain"
              title={name}
            />
          )
        )}
      </h1>
      <div css={styles.description}>
        <StructuredText data={description} />
      </div>
    </article>
  )
}

export default PartnerArticle
