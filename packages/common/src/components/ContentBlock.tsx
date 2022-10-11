import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { rgba } from 'polished'
import { useMemo } from 'react'
import { StructuredText, renderMarkRule } from 'react-datocms'

import useReadableColor from '../hooks/useReadableColor'
import { baseGrid, linkStyle, mq } from '../theme/mixins'
import { IStructuredText } from '../types'
import { Anchor, IAnchorLink } from './AnchorLink'
import ContentBlockShape, { ShapeType } from './ContentBlock__Shape'
import ContentCarousel, { ICarousel } from './ContentCarousel'
import DatoLink, { IDatoLink, isDatoLink } from './DatoLink'
import GatsbyImageFocused, {
  IGatsbyImageFocused,
} from './GatsbyImageFocused'

interface IBody extends IStructuredText {
  blocks?: IDatoLink[]
}

interface ITextBlock extends Record {
  __typename: 'DatoCmsTextBlock'
  body: IBody
}

interface IContentBlockImage
  extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
  narrow: IGatsbyImageData
  medium: IGatsbyImageData
  wide: IGatsbyImageData
}

export interface IContentBlock extends Record {
  __typename: 'DatoCmsContentBlock'
  anchorLink: [IAnchorLink?]
  heading: string
  image: [
    {
      image: IContentBlockImage
      layout: 'narrow' | 'medium' | 'wide'
    }?
  ]
  content: (ITextBlock | ICarousel)[]
}

type Props = {
  block: IContentBlock
  shape: ShapeType
  color: string
  orientation: 'left' | 'right'
}

const ContentBlock = ({
  block: { anchorLink, heading, image, content },
  shape,
  color,
  orientation,
}: Props): JSX.Element => {
  const left = orientation === 'left'
  const right = orientation === 'right'

  const layout = image[0] ? image[0].layout : 'noImg'

  const textSpan = useMemo(() => {
    switch (layout) {
      case 'noImg':
        return {
          l: 8,
          m: 9,
          ms: 12,
        }
      case 'narrow':
        return {
          l: 7,
          m: 8,
          ms: 12,
        }
      case 'medium':
        return {
          l: 6,
          m: 7,
          ms: 12,
        }
      case 'wide':
        return {
          l: 5,
          m: 7,
          ms: 12,
        }
    }
  }, [layout])

  const contentRows = content.length

  const readableColor = useReadableColor(color, '#fff', 3)

  const textGridCss = css`
    ${left &&
    css`
      grid-column: 2 / span var(--text-span);
      ${layout !== 'noImg' &&
      css`
        margin-right: var(--gtr-m);
        ${mq().ms} {
          margin-right: 0;
        }
      `}
    `}
    ${right &&
    css`
      grid-column: span var(--text-span) / -2;
      ${layout !== 'noImg' &&
      css`
        margin-left: var(--gtr-m);
        ${mq().ms} {
          margin-left: 0;
        }
      `}
    `}
  `

  const styles = {
    section: css`
      ${baseGrid}
      grid-template-rows: 1fr var(--gtr-m) auto repeat(${contentRows}, auto) 1fr;
      color: #333;
      margin-bottom: var(--row-l);
      --text-span: ${textSpan.l};
      ${mq().m} {
        --text-span: ${textSpan.m};
      }
      ${mq().ms} {
        grid-template-rows: auto;
        --text-span: ${textSpan.ms};
      }
      &:before {
        content: '';
        display: block;
        grid-row: 1 / 3;
        ${textGridCss}
      }
    `,
    heading: css`
      color: ${color};
      font-size: var(--fs-72);
      z-index: 2;
      position: relative;
      margin: 0 0 0.167em;
      padding-top: calc(0.333em + 3px);
      ${textGridCss}
      &:before {
        content: '';
        position: absolute;
        display: block;
        width: calc(
          100% + var(--col-w) + var(--gtr-m)
            ${layout !== 'noImg' ? '* 2' : ''}
        );
        height: 3px;
        background: ${color};
        top: 0;
        left: ${left ? 0 : 'auto'};
        right: ${right ? 0 : 'auto'};
      }
      ${mq().ms} {
        width: fit-content;
        &:before {
          width: calc(100% + var(--margin));
          max-width: calc(100vw - 2 * var(--margin));
          left: 0;
          right: 0;
        }
      }
    `,
    textBlock: css`
      ${textGridCss}
      &:nth-child(${contentRows + 1}) {
        margin-bottom: 0;
      }
      p {
        margin: 0.5em 0;
        line-height: 1.75;
        max-width: 90ch;
      }
      a {
        color: ${readableColor};
        font-weight: 500;
        display: inline-block;
        @media (hover: hover) {
          &:hover {
            color: ${rgba(readableColor, 0.75)};
          }
        }
      }
      ul {
        padding-inline-start: 1.75em;
        margin-block: 0.5em 0;
        max-width: 90ch;
        box-sizing: border-box;
        li {
          padding-inline-start: 0.25em;
          &::marker {
            color: ${readableColor};
          }
          p {
            line-height: 1.5;
            margin: 0 0 0.75em;
          }
        }
      }
    `,
    image: css`
      grid-row: 1 / span ${contentRows + 4};
      position: relative;
      align-self: flex-start;
      ${left &&
      css`
        grid-column: span calc(12 - var(--text-span)) / -2;
      `}
      ${right &&
      css`
        grid-column: 2 / span calc(12 - var(--text-span));
      `};
      ${mq().ms} {
        grid-row: auto;
        margin-top: calc(var(--row-s) + 0.5em);
        [data-gatsby-image-wrapper] {
          max-height: 100vw;
        }
        ${left &&
        css`
          grid-column: 2 / -2;
        `}
        ${right &&
        css`
          grid-column: 2 / -2;
        `}
      }
      ${layout === 'noImg' &&
      css`
        position: absolute;
        top: 0;
        left: ${right && 0};
        right: ${left && 0};
        width: 100%;
        ${mq().ms} {
          margin-top: calc(var(--row-s) * -1);
          width: 50%;
        }
      `}
    `,
    linkBlock: css`
      ${linkStyle}
    `,
  }
  return (
    <section css={styles.section}>
      {anchorLink[0] && <Anchor id={anchorLink[0].linkText} />}
      <h2 css={styles.heading}>{heading}</h2>
      {content.map((block, i) => {
        if (block.__typename === 'DatoCmsTextBlock') {
          return (
            <div css={styles.textBlock} key={i}>
              <StructuredText
                key={i}
                data={block.body}
                renderBlock={({ record }) => {
                  if (isDatoLink(record)) {
                    return (
                      <DatoLink data={record} css={styles.linkBlock} />
                    )
                  } else return null
                }}
                customMarkRules={[
                  renderMarkRule('h1' || 'h2', ({ children, key }) => {
                    return <h3 key={key}>{children}</h3>
                  }),
                  renderMarkRule('h5' || 'h6', ({ children, key }) => {
                    return <h4 key={key}>{children}</h4>
                  }),
                ]}
              />
            </div>
          )
        }
        if (block.__typename === 'DatoCmsCarousel') {
          return (
            <ContentCarousel
              data={block}
              key={i}
              color={color}
              orientation={orientation}
            />
          )
        }
      })}
      <div css={styles.image}>
        {image[0] && (
          <GatsbyImageFocused
            image={image[0].image[image[0].layout]}
            focalPoint={image[0].image.focalPoint}
            aspectRatio={image[0].image.sizes.aspectRatio}
            alt={image[0].image.alt || ''}
          />
        )}
        <ContentBlockShape
          shape={shape}
          color={color}
          layout={layout}
          orientation={orientation}
        />
      </div>
    </section>
  )
}

export default ContentBlock
