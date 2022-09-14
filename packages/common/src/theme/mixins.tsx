import { css, keyframes } from '@emotion/react'

import { breakpoints } from './variables'

export const mq = (minMax: 'min' | 'max' = 'max') => {
  type breakpoints = typeof breakpoints
  const mqObject: { [Property in keyof breakpoints]: string } =
    Object.create(breakpoints)
  const mqArray = Object.keys(breakpoints) as Array<keyof breakpoints>

  mqArray.forEach(key => {
    mqObject[key] = `@media (${minMax}-width: ${
      breakpoints[key] + (minMax === 'min' ? 1 : 0)
    }px)`
  })

  return mqObject
}

export const baseGrid = css`
  position: relative;
  display: grid;
  grid-template-columns: calc(0.5 * var(--gtr-m)) repeat(12, 1fr) calc(
      0.5 * var(--gtr-m)
    );
  grid-template-rows: auto;
  grid-column-gap: var(--gtr-m);
  width: 100%;
  ${mq().s} {
    grid-template-columns: var(--gtr-s) repeat(12, 1fr) var(--gtr-s);
  }
`

export const absoluteFill = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const linkStyle = css`
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: underline;
  text-underline-offset: 0.5em;
  text-decoration-thickness: 2px;
  line-height: 2;
  margin: 0.75em 0;
  font-weight: 500;
  max-width: fit-content;
`

export const widthInCols = (count: number) =>
  `calc(${count} * var(--col-w) + ${count - 1} * var(--gtr-m))`

export const buttonStyle = css`
  font-family: var(--display-font);
  text-transform: uppercase;
  line-height: 1;
  letter-spacing: 0.05em;
  text-decoration: none;
  padding: 0.5em 0.75em;
`
export const animateIn = keyframes`
  to {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`
