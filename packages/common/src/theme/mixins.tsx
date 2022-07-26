import { css, keyframes } from '@emotion/react'

import { breakpoints } from './variables'

export const mq = (minMax = 'max') => {
  type breakpoints = typeof breakpoints
  const mqObject: { [Property in keyof breakpoints]: string } =
    Object.create(breakpoints)
  const mqArray = Object.keys(breakpoints) as Array<keyof breakpoints>

  mqArray.forEach(key => {
    mqObject[key] = `@media (${minMax}-width: ${breakpoints[key]}px)`
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
  text-underline-offset: 3px;
  text-decoration-thickness: 2px;
  line-height: 1.5;
  margin: 1em 0;
  font-weight: 500;
`

export const widthInCols = (count: number) =>
  `calc(${count} * var(--col-w) + ${count - 1} * var(--gtr-m))`
