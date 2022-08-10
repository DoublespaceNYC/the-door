import { css } from '@emotion/react'
import GatsbyImageFocused, {
  IGatsbyImageFocused,
} from '@the-door/common/src/components/GatsbyImageFocused'
// import { toSlug } from '@the-door/common/src/helpers'
import { useElementHeight } from '@the-door/common/src/hooks/useElementRect'
import { absoluteFill, mq } from '@the-door/common/src/theme/mixins'
import { Link } from 'gatsby'
import { useState } from 'react'

export interface IServicesGroup {
  id: string
  __typename: string
  title: string
  image: IGatsbyImageFocused
  services: {
    title: string
    slug: string
  }[]
}

type Props = {
  serviceGroup: IServicesGroup
  bgColor: string
}

const ServiceModuleGroup = ({ serviceGroup, bgColor }: Props) => {
  const [listRef, setListRef] = useState<HTMLDivElement | null>(null)
  const listHeight = useElementHeight(listRef)

  const styles = {
    serviceGroup: css`
      position: relative;
      padding: 3rem 2rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      min-height: max(50vw, 36rem);
      box-sizing: border-box;
      h3 {
        position: relative;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        font-size: var(--fs-36);
        line-height: 1;
        width: 100%;
        border-bottom: 2px solid #fff;
        margin: 0;
        padding-bottom: 0.5em;
        cursor: default;
      }
    `,
    imageWrap: css`
      ${absoluteFill}
      z-index: 0;
      &:before {
        content: '';
        ${absoluteFill};
        background: linear-gradient(to bottom, transparent, #000000);
        opacity: 0.75;
        z-index: 2;
        transition: opacity 750ms ease;
        div:hover > &,
        div:focus > &,
        div:focus-within > & {
          opacity: 1;
        }
      }
      &:after {
        content: '';
        ${absoluteFill};
        background-color: ${bgColor};
        z-index: 3;
        mix-blend-mode: overlay;
        opacity: 0;
        transition: opacity 750ms ease;
        div:hover > &,
        div:focus > &,
        div:focus-within > & {
          opacity: 1;
        }
      }
    `,
    image: css`
      ${absoluteFill}
      transition: filter 750ms ease;
      div:hover > div > &,
      div:focus > div > &,
      div:focus-within > div > & {
        filter: saturate(0) contrast(0.75);
      }
    `,
    servicesList: css`
      font-size: var(--fs-21);
      min-width: 15ch;
      position: relative;
      overflow: hidden;
      transition: all ${300 + Math.round(0.5 * listHeight)}ms ease-out;
      height: 0;
      margin: 0.5em 0 6rem;
      div:hover > &,
      div:focus > &,
      div:focus-within > & {
        height: ${listHeight}px;
        margin-bottom: 1rem;
        ${mq().m} {
          margin-bottom: 0;
        }
      }
    `,
    servicesListInner: css`
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
    `,
    serviceLink: css`
      font-size: var(--fs-21);
      font-weight: 400;
      color: #fff;
      line-height: 1.333;
      text-decoration: none;
      display: block;
      max-width: fit-content;
      margin: 0;
      padding: 0.5em 0;
      > span {
        background: linear-gradient(#fff, #fff) no-repeat 0
          calc(100% + 3px);
        background-size: 100% 2px;
        transition: background-position 200ms ease;
      }
      &:hover > span {
        background-position: 0 100%;
      }
    `,
  }
  return (
    <div css={styles.serviceGroup}>
      <GatsbyImageFocused
        css={styles.imageWrap}
        gatsbyImageCss={styles.image}
        alt={serviceGroup.image.alt || serviceGroup.title}
        image={serviceGroup.image.gatsbyImageData}
        aspectRatio={0.5}
        originalAspectRatio={serviceGroup.image.sizes.aspectRatio}
        focalPoint={serviceGroup.image.focalPoint}
      />
      <h3>{serviceGroup.title}</h3>
      <div css={styles.servicesList}>
        <div
          css={styles.servicesListInner}
          ref={node => setListRef(node)}
        >
          {serviceGroup.services.map((service, i) => (
            <Link
              to={`/${service.slug}/`}
              key={i}
              css={styles.serviceLink}
            >
              <span>{service.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceModuleGroup
