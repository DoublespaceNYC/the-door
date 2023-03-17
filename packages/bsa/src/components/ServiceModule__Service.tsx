import { css } from '@emotion/react'
import GatsbyImageFocused, {
  IGatsbyImageFocused,
} from '@the-door/common/src/components/GatsbyImageFocused'
import { useElementHeight } from '@the-door/common/src/hooks/useElementRect'
import { absoluteFill, mq } from '@the-door/common/src/theme/mixins'
import { Record } from 'datocms-structured-text-utils'
import { Link, graphql } from 'gatsby'
import { useState } from 'react'

export interface IServiceModuleService extends Record {
  __typename: 'DatoCmsService'
  title: string
  excerpt: string
  slug: string
  heroImage: IGatsbyImageFocused
}
interface Props {
  data: IServiceModuleService
  bgColor: string
}

const ServiceModuleService = ({
  data,
  bgColor,
}: Props): JSX.Element => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(
    null
  )
  const contentHeight = useElementHeight(contentRef) || 0
  const styles = {
    service: css`
      position: relative;
      padding: 3rem 2rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      min-height: max(40vw, 36rem);
      box-sizing: border-box;
      text-align: left;
      cursor: pointer;
      text-decoration: none;
      color: #fff;
      h3 {
        position: relative;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        font-size: var(--fs-36);
        line-height: 1;
        width: 100%;
        color: #fff;
        border-bottom: 2px solid #fff;
        margin: 0;
        padding-bottom: 0.5em;
      }
      ${mq().s} {
        padding: 2rem 1.5rem 2rem;
      }
    `,
    imageWrap: css`
      ${absoluteFill}
      z-index: 0;
      &::before {
        content: '';
        ${absoluteFill};
        background: linear-gradient(to bottom, transparent, #000000);
        opacity: 0.75;
        z-index: 2;
        transition: opacity 750ms ease;
        @media (hover: none) {
          a:focus > &,
          a:focus-within > & {
            opacity: 1;
          }
        }
        @media (hover: hover) {
          a:hover > & {
            opacity: 1;
          }
        }
      }
      &::after {
        content: '';
        ${absoluteFill};
        background-color: ${bgColor};
        z-index: 3;
        mix-blend-mode: overlay;
        opacity: 0;
        transition: opacity 750ms ease;
        @media (hover: none) {
          a:focus > &,
          a:focus-within > & {
            opacity: 1;
          }
        }
        @media (hover: hover) {
          a:hover > & {
            opacity: 1;
          }
        }
      }
    `,
    image: css`
      ${absoluteFill}
      transition: filter 750ms ease;
      @media (hover: none) {
        a:focus > div > &,
        a:focus-within > div > & {
          filter: saturate(0) contrast(0.75);
        }
      }
      @media (hover: hover) {
        a:hover > div > & {
          filter: saturate(0) contrast(0.75);
        }
      }
    `,
    content: css`
      font-size: var(--fs-16);
      font-weight: 300;
      min-width: 20ch;
      line-height: 1.5;
      position: relative;
      overflow: hidden;
      transition: all ${300 + Math.round(0.5 * contentHeight)}ms
        ease-out;
      height: 0;
      margin: 0.5em 0 6rem;
      @media (hover: none) {
        a:focus > &,
        a:focus-within > & {
          height: ${contentHeight}px;
          margin-bottom: 2em;
          ${mq().m} {
            margin-bottom: 0;
          }
        }
      }
      @media (hover: hover) {
        a:hover > & {
          height: ${contentHeight}px;
          margin-bottom: 2em;
          ${mq().m} {
            margin-bottom: 0;
          }
        }
      }
    `,
    contentInner: css`
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
    `,
    serviceLink: css`
      font-size: var(--fs-16);
      font-weight: 500;
      text-transform: uppercase;
      color: #fff;
      line-height: 1.333;
      text-decoration: none;
      display: block;
      max-width: fit-content;
      margin: 0;
      padding: 0.5em 0;
      > span {
        text-underline-offset: 0.125em;
        text-decoration-thickness: 2px;
        text-decoration-skip-ink: auto;
      }
      @media (hover: hover) {
        &:hover {
          > span {
            text-decoration-line: underline;
          }
        }
      }
    `,
  }
  return (
    <Link
      css={styles.service}
      to={`/${data.slug}/`}
    >
      <GatsbyImageFocused
        css={styles.imageWrap}
        gatsbyImageCss={styles.image}
        alt={data.heroImage.alt || data.title}
        image={data.heroImage.gatsbyImageData}
        aspectRatio={0.5}
        originalAspectRatio={data.heroImage.sizes.aspectRatio}
        focalPoint={data.heroImage.focalPoint}
      />
      <h3>{data.title}</h3>
      <div css={styles.content}>
        <div
          css={styles.contentInner}
          ref={node => setContentRef(node)}
        >
          <p>{data.excerpt}</p>
        </div>
      </div>
    </Link>
  )
}

export const ServiceModuleServiceFragment = graphql`
  fragment ServiceModuleService on DatoCmsService {
    __typename
    id: originalId
    title
    excerpt
    slug
    heroImage {
      gatsbyImageData(
        width: 360
        imgixParams: {
          q: 50
          ar: "1:2"
          fit: "crop"
          crop: "focalpoint"
        }
      )
      ...ImageFocalData
    }
  }
`

export default ServiceModuleService
