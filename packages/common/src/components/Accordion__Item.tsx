import { css } from '@emotion/react'
import { rgba } from 'polished'
import { ElementType, HTMLAttributes, ReactNode, useState } from 'react'

import useThemeContext from '../context/ThemeContext'
import { useElementHeight } from '../hooks/useElementRect'
import { mq } from '../theme/mixins'
import { doorColors } from '../theme/variables'

interface Props extends HTMLAttributes<HTMLDivElement> {
  heading: string
  subheading?: string
  children: ReactNode
  headingLevel?: number
  open: boolean
  theme: 'Light' | 'Dark'
  layout?: 'Nested'
  onClick: () => void
}

const AccordionItem = ({
  heading,
  subheading,
  children,
  headingLevel = 3,
  open = false,
  layout,
  theme,
  onClick,
  ...props
}: Props): JSX.Element => {
  const Heading = `h${headingLevel}` as ElementType
  const Subheading = `h${headingLevel + 1}` as ElementType
  const [contentsRef, setContentsRef] = useState<HTMLDivElement | null>(
    null
  )
  const contentsHeight = useElementHeight(contentsRef)

  const transitionDuration =
    200 + Math.round(0.25 * (contentsHeight || 0))

  const { theme: metaTheme } = useThemeContext()
  const setColors = () => {
    switch (metaTheme) {
      case 'The Door':
        return {
          heading:
            theme === 'Dark'
              ? ['#fff', doorColors.pinkLight]
              : [doorColors.purple, doorColors.pink],
          subheading:
            theme === 'Dark'
              ? ['#fff', doorColors.pinkLight]
              : ['#666', doorColors.pink],
          button:
            theme === 'Dark'
              ? ['#fff', doorColors.pinkLight]
              : ['#666', doorColors.pink],
          divider: theme === 'Dark' ? '#fff' : rgba('#888', 0.5),
          subdivider:
            theme === 'Dark' ? rgba('#fff', 0.5) : rgba('#888', 0.5),
        }
      default:
        return {
          heading: ['#fff', '#fff'],
          subheading: ['#fff', '#fff'],
          button: ['#fff', '#fff'],
          divider: '#fff',
          subdivider: '#ffffff88',
        }
    }
  }
  const colors = setColors()

  const styles = {
    accordion: css``,
    button: css`
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 2px solid ${colors.divider};
      border-bottom: 1px solid
        ${open ? colors.subdivider : 'transparent'};
      transition: ${open
        ? 'none'
        : `border 0ms ease ${transitionDuration}ms`};
      margin-bottom: -1px;
      div:first-of-type > & {
        border-top: none;
        padding-top: 2px;
      }
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
      margin-right: var(--gtr-s);
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
      text-align: left;
      transition: color 300ms ease;
      ${subheading &&
      css`
        margin-bottom: 0.125em;
      `}
      ${layout === 'Nested' &&
      css`
        font-size: var(--fs-24);
        font-family: var(--body-font);
        letter-spacing: 0;
        text-transform: none;
        margin: 1.25em 0;
        ${subheading &&
        css`
          margin: 1em 0 0.25em;
        `}
        ${mq().s} {
          font-size: var(--fs-21);
        }
      `}
      @media (hover: hover) {
        button:hover > div > & {
          color: ${colors.heading[1]};
        }
      }
    `,
    subheading: css`
      color: ${colors.subheading?.[0]};
      font-style: italic;
      font-size: var(--fs-16);
      font-family: var(--body-font);
      font-weight: 400;
      text-align: left;
      margin: 0 0 1.75em;
      transition: color 300ms ease;
      ${layout === 'Nested' &&
      css`
        margin-bottom: 1.67em;
      `}
      @media (hover: hover) {
        button:hover > div > & {
          color: ${colors.subheading?.[1]};
        }
      }
      ${mq().s} {
        font-size: var(--fs-14);
      }
    `,
    contentsWrap: css`
      overflow: hidden;
      transition: height ${transitionDuration}ms ease-out;
    `,
    contents: css`
      display: grid;
    `,
  }
  return (
    <div css={styles.accordion} {...props}>
      <button onClick={onClick} css={styles.button}>
        <div>
          <Heading css={styles.heading}>{heading}</Heading>
          {subheading && (
            <Subheading css={styles.subheading}>
              {subheading}
            </Subheading>
          )}
        </div>
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
