import { css } from '@emotion/react'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLElement> {
  open?: boolean
}

const DropdownArrow = ({ open, ...props }: Props): JSX.Element => {
  const style = css`
    display: inline-block;
    position: relative;
    font-size: 66.7%;
    width: 1em;
    height: 0.667em;
    transform: translateY(-10%);
    clip-path: polygon(
      50% 60.9%,
      88.3% 3.6%,
      100% 21.3%,
      50% 96.4%,
      0% 21.3%,
      11.8% 3.6%
    );
    background-color: currentColor;
    transition: clip-path 150ms ease;
    ${open &&
    css`
      clip-path: polygon(
        50% 3.6%,
        100% 78.7%,
        88.3% 96.4%,
        50% 39.1%,
        11.8% 96.4%,
        0% 78.7%
      );
    `}
  `
  return (
    <span
      css={style}
      {...props}
    />
  )
}

export default DropdownArrow
