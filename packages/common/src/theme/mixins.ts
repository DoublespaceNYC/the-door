import { css, keyframes } from '@emotion/react'

import { breakpoints } from './variables'

export const mq = (minMax: 'min' | 'max' = 'max') => {
  type breakpoints = typeof breakpoints
  const mqObject: { [Property in keyof breakpoints]: string } =
    Object.create(breakpoints)
  const mqArray = Object.keys(breakpoints) as Array<keyof breakpoints>

  mqArray.forEach(key => {
    mqObject[key] = `@media (${minMax}-width: ${breakpoints[key] + (minMax === 'min' ? 1 : 0)
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

export const widthInCols = (
  count: number,
  gridWidth = 'var(--grid-w)',
  gutter = 'var(--gtr-m)',
  margin = 'var(--margin)'
) =>
  `calc(${count} * calc(
    (${gridWidth} - 2 * ${margin} - 11 * ${gutter}) / 12
  ) + ${count - 1} * ${gutter})`

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
export const bezier = {
  bounce: `cubic-bezier(0.33, 3, 0.25, 0.5)`,
  easeOut: `cubic-bezier(0.25, 0.5, 0.33, 1)`,
}

export const inputWidth = (width: 'Full' | 'Half' | 'Third' | 'Quarter') => {
  switch (width) {
    case 'Full':
      return css`
        flex-basis: 100%;
      `
    case 'Half':
      return css`
        flex-basis: calc(50% - 0.5 * var(--gap));
        ${mq().s} {
          flex-basis: 100%;
        }
      `
    case 'Third':
      return css`
        flex-basis: calc(33.3% - var(--gap));
        ${mq().s} {
          flex-basis: 100%;
        }
      `
    case 'Quarter':
      return css`
        flex-basis: calc(25% - 1.5 * var(--gap));
        ${mq().s} {
          flex-basis: calc(50% - 0.5 * var(--gap));
        }
      `
  }
}
export const aspectRatio = (ar: number) => css`
  aspect-ratio: ${ar};
  @supports not (aspect-ratio: ${ar}) {
    &::before {
      content: '';
      float: left;
      padding-top: calc((${ar}) * 100%);
    }
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
`
