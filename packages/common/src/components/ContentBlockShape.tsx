import { css } from '@emotion/react'
import { rgba } from 'polished'
import { Fragment } from 'react'

export type ShapeType =
  | 'brackets'
  | 'circles'
  | 'pie'
  | 'triangles'
  | 'windows'

export const shapeArray = [
  'brackets',
  'pie',
  'windows',
  'circles',
  'triangles',
] as ShapeType[]

type Props = {
  shape: ShapeType
  color: string
  layout: 'noImg' | 'narrow' | 'medium' | 'wide'
  orientation: 'left' | 'right'
}

const ContentBlockShape = ({
  shape,
  color,
  layout,
  orientation,
}: Props) => {
  const gutter = 'calc(-1 * var(--gtr-m))'

  const styles = {
    svg: css`
      position: absolute;
    `,
    noImg: css`
      width: calc(100% + var(--margin));
      top: 0;
      path,
      circle {
        fill: ${rgba(color, 0.1)};
      }
    `,
    wImg: css`
      mix-blend-mode: multiply;
      path,
      circle {
        fill: ${color};
      }
    `,
  }

  if (layout === 'noImg') {
    if (shape === 'brackets') {
      return (
        <svg
          viewBox="0 0 510 458"
          css={[
            styles.svg,
            styles.noImg,
            css`
              ${orientation === 'left' &&
              css`
                left: 0;
              `}
              ${orientation === 'right' &&
              css`
                right: 0;
                transform: scaleX(-1);
              `}
            `,
          ]}
        >
          <path d="M419.04 228.96L304.559 114.48L419.039 0L533.52 114.48L648 228.96L533.52 343.441L419.039 457.921L304.559 343.44L419.04 228.96ZM0 114.48L114.481 228.96L0 343.44L114.48 457.921L228.961 343.441L343.441 228.96L228.961 114.48L114.48 0L0 114.48Z" />
        </svg>
      )
    }
    if (shape === 'circles') {
      return (
        <svg
          viewBox="0 0 474 396"
          css={[
            styles.svg,
            styles.noImg,
            css`
              left: 0;
              ${orientation === 'left' &&
              css`
                right: 0;
                transform: scaleX(-1);
              `}
            `,
          ]}
        >
          <path d="M378 6.8662e-06C324.981 2.2311e-06 282 42.9807 282 96C282 149.019 324.981 192 378 192C431.019 192 474 149.019 474 96C474 42.9807 431.019 1.15013e-05 378 6.8662e-06ZM174 2.2125e-05C120.981 1.74899e-05 78 42.9807 78 96C78 149.019 120.981 192 174 192C227.019 192 270 149.019 270 96C270 42.9807 227.019 2.67601e-05 174 2.2125e-05ZM-126 96C-126 42.9807 -83.0193 1.74899e-05 -30 2.2125e-05C23.0193 2.67601e-05 66 42.9807 66 96C66 149.019 23.0193 192 -30 192C-83.0193 192 -126 149.019 -126 96ZM378 204C324.981 204 282 246.981 282 300C282 353.019 324.981 396 378 396C431.019 396 474 353.019 474 300C474 246.981 431.019 204 378 204ZM78 300C78 246.981 120.981 204 174 204C227.019 204 270 246.981 270 300C270 353.019 227.019 396 174 396C120.981 396 78 353.019 78 300ZM-30 204C-83.0193 204 -126 246.981 -126 300C-126 353.019 -83.0193 396 -30 396C23.0193 396 66 353.019 66 300C66 246.981 23.0193 204 -30 204Z" />
        </svg>
      )
    }
    if (shape === 'pie') {
      return (
        <svg
          viewBox="0 0 420 420"
          css={[
            styles.svg,
            styles.noImg,
            css`
              width: 100%;
              left: 0;
              ${orientation === 'left' &&
              css`
                transform: scaleX(-1);
              `}
            `,
          ]}
        >
          <path d="M8.24065e-08 418.115C12.5583 419.362 25.2955 420 38.1819 420C249.054 420 420 249.054 420 38.1819C420 25.2955 419.362 12.5583 418.115 -8.24065e-08L1.83588e-05 -1.83588e-05L8.24065e-08 418.115Z" />
        </svg>
      )
    }
    if (shape === 'triangles') {
      if (orientation === 'left') {
        return (
          <svg
            viewBox="0 0 474 425"
            css={[
              styles.svg,
              styles.noImg,
              css`
                left: 0;
              `,
            ]}
          >
            <path d="M0 242.5L3.05176e-05 0L210 121.25L105 181.875L0 242.5ZM210 242.5L210 121.25L210 0L420 121.25L315 181.875L210 242.5ZM315 303.125L105 424.375L105 181.875L210 242.5L315 303.125ZM315 303.125L315 181.875L525 303.125L315 424.375L315 303.125Z" />
          </svg>
        )
      } else {
        return (
          <svg
            viewBox="0 0 474 425"
            css={[
              styles.svg,
              styles.noImg,
              css`
                right: 0;
              `,
            ]}
          >
            <path d="M-51 181.875L-51 424.375L159 303.125L54 242.5L-51 181.875ZM159 181.875V303.125L159 424.375L369 303.125L264 242.5L159 181.875ZM264 121.25L54 0L54 242.5L159 181.875L264 121.25ZM264 121.25L264 242.5L474 121.25L264 0V121.25Z" />
          </svg>
        )
      }
    }
    if (shape === 'windows') {
      return (
        <svg
          viewBox="0 0 474 529"
          css={[
            styles.svg,
            styles.noImg,
            css`
              left: 0;
            `,
          ]}
        >
          <path d="M204 354.162L204 0L474 89.8378L474 444L204 354.162ZM3.93095e-05 286.143L0 127L180 186.857L180 346L3.93095e-05 286.143ZM204 379L204 469.108L384 529L384 438.892L204 379Z" />
        </svg>
      )
    }
    return <Fragment />
  } else {
    if (shape === 'brackets') {
      return (
        <Fragment>
          <svg
            viewBox="0 0 216 216"
            css={[
              styles.svg,
              styles.wImg,
              css`
                width: calc(2 * (var(--gtr-m) + var(--col-w)));
                top: ${gutter};
                left: ${gutter};
              `,
            ]}
          >
            <path d="M4.72083e-06 108L0 4.72083e-06L108 0H216V108H108V216H4.72083e-06V108Z" />
          </svg>
          <svg
            viewBox="0 0 216 216"
            css={[
              styles.svg,
              styles.wImg,
              css`
                width: calc(2 * (var(--gtr-m) + var(--col-w)));
                bottom: ${gutter};
                right: ${gutter};
              `,
            ]}
          >
            <path d="M216 108L216 216L108 216H0V108H108V0H216V108Z" />
          </svg>
        </Fragment>
      )
    }
    if (shape === 'circles') {
      return (
        <svg
          viewBox="0 0 600 144"
          css={[
            styles.svg,
            styles.wImg,
            css`
              width: calc(16.67 * var(--gtr-m));
              max-width: calc(100% + 6rem);
              bottom: ${gutter};
              ${orientation === 'left' &&
              css`
                right: ${gutter};
              `}
              ${orientation === 'right' &&
              css`
                left: ${gutter};
              `}
            `,
          ]}
        >
          <circle cx="72" cy="72" r="72" />
          <circle cx="224" cy="72" r="72" />
          <circle cx="376" cy="72" r="72" />
          <circle cx="528" cy="72" r="72" />
        </svg>
      )
    }
    if (shape === 'pie') {
      return (
        <svg
          viewBox="0 0 216 216"
          css={[
            styles.svg,
            styles.wImg,
            css`
              width: calc(6 * var(--gtr-m));
              bottom: ${gutter};
              ${orientation === 'left' &&
              css`
                left: ${gutter};
                transform: scaleX(-1);
              `}
              ${orientation === 'right' &&
              css`
                right: ${gutter};
              `}
            `,
          ]}
        >
          <path d="M0.96955 216C0.328309 209.541 0 202.991 0 196.364C0 87.915 87.915 0 196.364 0C202.991 0 209.541 0.328309 216 0.96955V216H0.96955Z" />
        </svg>
      )
    }
    if (shape === 'triangles') {
      return (
        <svg
          viewBox="0 0 156 372"
          css={[
            styles.svg,
            styles.wImg,
            css`
              width: calc(4.333 * var(--gtr-m));
              bottom: ${gutter};
              ${orientation === 'left' &&
              css`
                right: ${gutter};
                transform: scaleX(-1);
              `}
              ${orientation === 'right' &&
              css`
                left: ${gutter};
              `}
            `,
          ]}
        >
          <path d="M1.44007e-05 192L-7.86805e-06 372L156 282L1.44007e-05 192Z" />
          <path d="M1.44007e-05 0L-7.86805e-06 180L156 90L1.44007e-05 0Z" />
        </svg>
      )
    }
    if (shape === 'windows') {
      return (
        <Fragment>
          <svg
            viewBox="0 0 360 108"
            css={[
              styles.svg,
              styles.wImg,
              css`
                width: calc(10 * var(--gtr-m));
                max-width: 100%;
                top: ${gutter};
                right: ${gutter};
              `,
            ]}
          >
            <path d="M36 0H360L324 108H0L36 0Z" />
          </svg>
          <svg
            viewBox="0 0 360 108"
            css={[
              styles.svg,
              styles.wImg,
              css`
                width: calc(10 * var(--gtr-m));
                max-width: 100%;
                bottom: ${gutter};
                left: ${gutter};
              `,
            ]}
          >
            <path d="M36 0H360L324 108H0L36 0Z" />
          </svg>
        </Fragment>
      )
    }
    return <Fragment />
  }
}

export default ContentBlockShape
