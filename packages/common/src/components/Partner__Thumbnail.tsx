import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Fragment, HTMLAttributes } from 'react'

import LightboxLink from './Lightbox__Link'
import { IPartner } from './Partner__Article'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  data: IPartner
  highlightColor?: string
}

const PartnerThumbnail = ({ data, ...props }: Props): JSX.Element => {
  const styles = {
    link: css`
      aspect-ratio: 3 / 2;
      display: flex;
      border: 1px solid #00000033;
      background: #ffffff66;
      overflow: hidden;
      transition: background 300ms ease;
      > * {
        transition: transform 300ms ease;
      }
      @media (hover: hover) {
        &:hover {
          background: #ffffffcc;
          > * {
            transform: scale3d(1.05, 1.05, 1);
          }
        }
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
  }
  return (
    <LightboxLink
      pageTitle={data.seo?.title || data.name}
      slugPrefix="partners"
      css={styles.link}
      link={
        <Fragment>
          {data.logo.format === 'svg' ? (
            <img
              css={styles.svg}
              src={data.logo.url}
              alt={data.logo.alt || data.name}
            />
          ) : (
            data.logo.gatsbyImageData && (
              <GatsbyImage
                css={styles.gatsbyImage}
                image={data.logo.gatsbyImageData}
                alt={data.logo.alt || data.name}
                objectFit="contain"
              />
            )
          )}
        </Fragment>
      }
      {...props}
      data={data}
    />
  )
}

export default PartnerThumbnail
