import { css } from '@emotion/react'
import { HTMLAttributes } from 'react'

import ScrollToggle from './ScrollToggle'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  open: boolean
  onClick: () => void
}

const NavBurger = ({ open, onClick, ...props }: Props): JSX.Element => {
  const style = css`
    position: relative;
    align-self: center;
    box-sizing: content-box;
    width: 1.5em;
    height: 100%;
    min-height: 1.5em;
    border: none;
    appearance: none;
    background-color: transparent;
    cursor: pointer;
    pointer-events: all;
    z-index: 10;
    transition: color 300ms ease;

    span {
      position: absolute;
      height: 2px;
      width: 2rem;
      left: 50%;
      top: calc(50% - 1px);
      background-color: currentColor;
      ${!open &&
      css`
        &:nth-of-type(1) {
          transition: transform 150ms ease 150ms, opacity 0ms ease 150ms;
          transform: translate(-50%, calc(-0.75em + 1px));
        }
        &:nth-of-type(2) {
          transition: transform 150ms ease;
          transform: translate(-50%, 0);
        }
        &:nth-of-type(3) {
          transition: transform 150ms ease;
          transform: translate(-50%, 0);
        }
        &:nth-of-type(4) {
          transition: transform 150ms ease 150ms, opacity 0ms ease 150ms;
          transform: translate(-50%, calc(0.75em - 1px));
        }
      `}

      ${open &&
      css`
        &:nth-of-type(1) {
          transition: transform 150ms ease, opacity 0ms ease 150ms;
          transform: translate(-50%, 0);
          opacity: 0;
        }
        &:nth-of-type(2) {
          transition: transform 150ms ease 150ms;
          transform: translate(-50%, 0) rotate(45deg);
          transition-delay: 150ms;
        }
        &:nth-of-type(3) {
          transition: transform 150ms ease 150ms;
          transform: translate(-50%, 0) rotate(-45deg);
          transition-delay: 150ms;
        }
        &:nth-of-type(4) {
          transition: transform 150ms ease 150ms, opacity 0ms ease 150ms;
          transform: translate(-50%, 0);
          opacity: 0;
        }
      `}
    }
  `
  return (
    <button
      onClick={onClick}
      aria-label="toggle menu"
      css={style}
      {...props}
    >
      <span />
      <span />
      <span />
      <span />
      {open && <ScrollToggle />}
    </button>
  )
}

export default NavBurger
