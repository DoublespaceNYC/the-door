import '../fonts/_font-face.css'

import { Global, css } from '@emotion/react'
import emotionNormalize from 'emotion-normalize'

import useThemeContext from '../context/ThemeContext'
import { useWindowHeight } from '../hooks/useWindowDimensions'
import { mq } from './mixins'
import { doorColors } from './variables'

const GlobalStyles = () => {
  const { theme } = useThemeContext()
  const setColors = () => {
    switch (theme) {
      case 'The Door':
        return {
          highlight: doorColors.blue,
          highlightHover: doorColors.pink,
        }
    }
  }
  const colors = setColors()

  const windowHeight = useWindowHeight()

  const globalStyles = css`
    ${emotionNormalize}

    :root {
      ${windowHeight &&
      css`
        --vh: ${windowHeight / 100}px;
      `}

      --sans-serif: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica,
        Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
      --slab-serif: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console,
        monospace;
      --serif: Constantia, 'Lucida Bright', Lucidabright, 'Lucida Serif', Lucida,
        'DejaVu Serif', 'Bitstream Vera Serif', 'Liberation Serif', Georgia,
        serif;

      --display-font: 'Almaq Refined', var(--sans-serif);
      --body-font: 'Brother 1816', var(--sans-serif);

      /* Font Sizes */
      --fs-144: calc(4rem + 6.667vw);
      --fs-108: calc(4rem + 4.167vw);
      --fs-84: calc(3.875rem + 2.6vw);
      --fs-72: calc(3.3125rem + 2.2375vw);
      --fs-60: max(3rem, 2.75rem + 1.875vw);
      --fs-48: max(2.5rem, 2.25rem + 1.458vw);
      --fs-36: max(2.25rem, 2rem + 0.833vw);
      --fs-30: max(2rem, 1.5rem + 0.833vw);
      --fs-24: max(1.667rem, 1.5rem + 0.417vw);
      --fs-21: max(1.5rem, 1.25rem + 0.417vw);
      --fs-18: max(1.333rem, 1rem + 0.417vw);
      --fs-16: max(1.25rem, 0.8333rem + 0.417vw);
      --fs-15: 1.25rem;
      --fs-14: 1.167rem;
      --fs-13: 1.0888rem;

      /* Padding/Gutters/Margins */
      --gtr-s: max(1.25vw, 0.5rem);
      --gtr-m: max(2.5vw, 1rem);
      --gtr-ml: max(3.75vw, 2rem);
      --gtr-l: max(5vw, 3rem);
      --gtr-ll: max(7.5vw, 4.5rem);
      --margin: calc(1.5 * var(--gtr-m));

      --row-s: calc(1rem + 0.416vw + var(--gtr-s));
      --row-m: calc(2rem + 0.833vw + var(--gtr-m));
      --row-l: calc(3rem + 1.25vw + var(--gtr-ml));
      --row-ll: calc(4rem + 1.67vw + var(--gtr-l));

      ${mq().s} {
        --margin: calc(var(--gtr-m) + var(--gtr-s));
      }

      --grid-w: 100vw;
      --col-w: calc(
        (var(--grid-w) - 2 * var(--margin) - 11 * var(--gtr-m)) / 12
      );

      --shadow-offset: min(calc(0.5 * var(--gtr-m)), 1rem);
      --shadow-offset-hover: calc(var(--shadow-offset) * 1.5);
    }

    html {
      font-size: 12px;
      ${mq('min').l} {
        font-size: calc(9px + 0.21vw);
      }
    }
    body {
      font-family: var(--body-font);
      font-size: var(--fs-16);
    }
    h1,
    h2,
    h3 {
      font-family: var(--display-font);
    }
    p {
      line-height: inherit;
    }
    a {
      color: ${colors?.highlight};
      @media (hover: hover) {
        &:hover {
          color: ${colors?.highlightHover};
        }
      }
    }
    a,
    button {
      transition: color 300ms ease, background-color 300ms ease;
    }
    button {
      appearance: none;
      border: none;
      background-color: transparent;
      color: inherit;
      padding: 0;
      cursor: pointer;
    }
    input,
    textarea,
    select {
      border-radius: 0;
      &:focus {
        outline: none;
      }
    }
    *:-webkit-autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        transition: all 0s 99999s;
        border-radius: 0;
      }
    }

    .gatsby-image-wrapper-constrained {
      width: 100%;
      > div {
        max-width: 100% !important;
      }
    }
  `
  return <Global styles={globalStyles} />
}

export default GlobalStyles
