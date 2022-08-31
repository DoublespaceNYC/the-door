import { css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { ElementType, ReactNode, useState } from 'react'

import { useElementHeight } from '../hooks/useElementRect'

export type IAccordionColors = {
  heading: [string, string]
  subheading?: [string, string]
  button: [string, string]
  divider: string
  subdivider: string
}

type Props = {
  heading: string
  subheading?: string
  children: ReactNode
  colors: IAccordionColors
  headingLevel?: number
  open: boolean
  onClick: () => void
  css?: CSSInterpolation
}

const AccordionItem = ({
  heading,
  subheading,
  children,
  colors,
  headingLevel = 3,
  open = false,
  onClick,
  ...props
}: Props) => {
  const Heading = `h${headingLevel}` as ElementType
  const Subheading = `h${headingLevel + 1}` as ElementType
  const [contentsRef, setContentsRef] = useState<HTMLDivElement | null>(
    null
  )
  const contentsHeight = useElementHeight(contentsRef)

  const styles = {
    accordion: css``,
    button: css`
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 2px solid ${colors.divider};
      border-bottom: 1px solid ${colors.subdivider};
      margin-bottom: -1px;
    `,
    buttonIcon: css`
      flex: none;
      font-size: var(--fs-36);
      width: 1em;
      height: 1em;
      position: relative;
      color: ${colors.button[0]};
      transform: scale3d(0.999, 0.999, 1);
      transition: all 200ms ease;
      margin-right: 0.875em;
      &:before,
      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background-color: currentColor;
        position: absolute;
        top: calc(50% - 1px);
        left: 0%;
        transition: transform 400ms ease;
      }
      &:before {
        transform: ${open
          ? `rotate3d(0, 0, 1, 135deg)`
          : `rotate3d(0, 0, 0, 90deg)`};
      }
      &:after {
        transform: ${open
          ? `rotate3d(0, 0, 1, -135deg)`
          : `rotate3d(0, 0, 1, 90deg)`};
      }
      @media (hover: hover) {
        button:hover > & {
          color: ${colors.button[1]};
          transform: scale3d(1.25, 1.25, 1);
        }
      }
    `,
    heading: css`
      color: ${colors.heading[0]};
      font-size: var(--fs-36);
      text-transform: uppercase;
      letter-spacing: 0.01em;
      line-height: 1.125;
      margin: 0.75em 0;
      transition: color 300ms ease;
      @media (hover: hover) {
        button:hover > & {
          color: ${colors.heading[1]};
        }
      }
    `,
    subheading: css`
      color: ${colors.subheading?.[0]};
      transition: color 300ms ease;
      @media (hover: hover) {
        button:hover > & {
          color: ${colors.subheading?.[1]};
        }
      }
    `,
    contentsWrap: css`
      overflow: hidden;
      transition: height ${200 + Math.round(0.25 * contentsHeight)}ms
        ease-out;
    `,
    contents: css`
      display: grid;
    `,
  }
  return (
    <div css={styles.accordion} {...props}>
      <button onClick={onClick} css={styles.button}>
        <Heading css={styles.heading}>{heading}</Heading>
        {subheading && (
          <Subheading css={styles.subheading}>{subheading}</Subheading>
        )}
        <div css={styles.buttonIcon} />
      </button>
      <div
        css={styles.contentsWrap}
        style={{ height: open ? contentsHeight + 'px' : 0 }}
      >
        <div ref={node => setContentsRef(node)} css={styles.contents}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AccordionItem
