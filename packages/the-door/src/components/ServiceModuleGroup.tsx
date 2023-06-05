import { css } from '@emotion/react'
import GatsbyImageFocused, {
  IGatsbyImageFocused,
} from '@the-door/common/src/components/GatsbyImageFocused'
// import { toSlug } from '@the-door/common/src/helpers'
import { useElementHeight } from '@the-door/common/src/hooks/useElementRect'
import { absoluteFill, mq } from '@the-door/common/src/theme/mixins'
import { Link } from 'gatsby'
import { useRef, useState } from 'react'

export interface IServicesGroup {
  id: string
  __typename: 'DatoCmsServicesGroup'
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

const ServiceModuleGroup = ({
  serviceGroup,
  bgColor,
}: Props): JSX.Element => {
  const [listRef, setListRef] = useState<HTMLDivElement | null>(null)
  const listHeight = useElementHeight(listRef) || 0
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const styles = {
    serviceGroup: css`
      position: relative;
      padding: 3rem 2rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      min-height: max(50vw, 36rem);
      box-sizing: border-box;
      text-align: left;
      cursor: default;
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
        cursor: default;
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

        button:focus > &,
        button:focus-within > &,
        button:hover > & {
          opacity: 1;
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
        button:focus > &,
        button:focus-within > &,
        button:hover > & {
          opacity: 1;
        }
      }
    `,
    image: css`
      ${absoluteFill}
      transition: filter 750ms ease;

      button:focus > div > &,
      button:focus-within > div > &,
      button:hover > div > & {
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
      button:focus > &,
      button:focus-within > &,
      button:hover > & {
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
    <button
      css={styles.serviceGroup}
      aria-label={`show ${serviceGroup.title} links`}
      ref={buttonRef}
      onClick={() => {
        buttonRef.current?.focus()
      }}
    >
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
    </button>
  )
}

export default ServiceModuleGroup
