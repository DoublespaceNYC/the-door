import { css } from '@emotion/react'
import { Record, isLink } from 'datocms-structured-text-utils'
import { Link } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { darken } from 'polished'
import { Fragment } from 'react'
import { StructuredText, renderMarkRule, renderNodeRule } from 'react-datocms'

import useReadableColor from '../hooks/useReadableColor'
import { baseGrid, buttonStyle, linkStyle, mq } from '../theme/mixins'
import { IStructuredText } from '../types'
import { Anchor, IAnchorLink } from './AnchorLink'
import ContentBlockShape, { ShapeType } from './ContentBlock__Shape'
import ContentCarousel, { ICarousel } from './ContentCarousel'
import DatoLink, { IDatoLink, isDatoLink } from './DatoLink'
import GatsbyImageFocused, { IGatsbyImageFocused } from './GatsbyImageFocused'
import VectorGraphic, { IVectorGraphic } from './VectorGraphic'

interface ITextBlockLink extends Record {
  __typename: 'DatoCmsTextBlockLink'
  link: [IDatoLink]
}

interface ITextBlockButton extends Record {
  __typename: 'DatoCmsTextBlockButton'
  link: [IDatoLink]
}

interface IBody extends IStructuredText {
  blocks?: (ITextBlockLink | ITextBlockButton)[]
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
  layout: 'No Image' | 'Narrow Image' | 'Medium Image' | 'Wide Image'
  image: IContentBlockImage
  content: (ITextBlock | ICarousel | IVectorGraphic)[]
}

type Props = {
  block: IContentBlock
  shape: ShapeType
  highlightColor: string
  orientation: 'left' | 'right'
}

const ContentBlock = ({
  block: { anchorLink, heading, image, content, layout },
  shape,
  highlightColor,
  orientation,
}: Props): JSX.Element => {
  const left = orientation === 'left'
  const right = orientation === 'right'

  const setTextSpan = () => {
    switch (layout) {
      case 'No Image':
        return {
          l: 8,
          m: 9,
          ms: 12,
        }
      case 'Narrow Image':
        return {
          l: 7,
          m: 8,
          ms: 12,
        }
      case 'Medium Image':
        return {
          l: 6,
          m: 7,
          ms: 12,
        }
      case 'Wide Image':
        return {
          l: 5,
          m: 7,
          ms: 12,
        }
    }
  }
  const textSpan = setTextSpan()

  const contentRows = content.length

  const readableColor = useReadableColor(highlightColor, '#fff', 3)

  const textGridCss = css`
    ${left &&
    css`
      grid-column: 2 / span var(--text-span);
      ${layout !== 'No Image' &&
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
      ${layout !== 'No Image' &&
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
      grid-template-rows:
      1fr calc(2 * var(--gtr-m)) auto repeat(${contentRows}, auto)
      1fr;
      color: #333;
      margin-top: calc(-1 * var(--gtr-m));
      margin-bottom: var(--row-m);
      --text-span: ${textSpan.l};
      ${mq().m} {
        --text-span: ${textSpan.m};
      }
      ${mq().ms} {
        grid-template-rows: auto;
        --text-span: ${textSpan.ms};
        margin-bottom: var(--row-l);
      }
      &::before {
        content: '';
        display: block;
        grid-row: 1 / 3;
        ${textGridCss}
      }
    `,
    heading: css`
      color: ${highlightColor};
      font-size: var(--fs-72);
      z-index: 2;
      line-height: 1;
      position: relative;
      margin: 0 0 0.25em;
      padding-top: calc(0.375em + 3px);
      ${textGridCss}
      &::before {
        content: '';
        position: absolute;
        display: block;
        width: calc(
          100% + var(--col-w) + var(--gtr-m)
            ${layout !== 'No Image' ? '* 2' : ''}
        );
        height: 3px;
        background: ${highlightColor};
        top: 0;
        left: ${left ? 0 : 'auto'};
        right: ${right ? 0 : 'auto'};
      }
      ${mq().ms} {
        width: fit-content;
        &::before {
          width: calc(100% + var(--margin));
          max-width: calc(100vw - 2 * var(--margin));
          left: 0;
          right: 0;
        }
      }
    `,
    textBlock: css`
      ${textGridCss}
      h3 {
        font-size: var(--fs-30);
        line-height: 1.125;
        text-transform: uppercase;
        margin: 0.75em 0 0.333em;
        color: #444;
      }
      > p + h3,
      > ul + h3,
      > ol + h3 {
        margin-top: 1em;
      }
      h4 {
        font-size: var(--fs-24);
        font-family: var(--body-font);
        font-weight: 500;
        line-height: 1.25;
        margin: 1.25em 0 0.5em;
        color: #444;
      }
      > h3 + h4 {
        margin-top: 0.75em;
      }
      h5 {
        font-size: var(--fs-16);
        font-family: var(--body-font);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 700;
        line-height: 1.25;
        margin: 1.5em 0 0.5em;
      }
      > h4 + h5 {
        margin-top: 1em;
      }
      p {
        line-height: 1.75;
        margin: 0.5em 0;
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
            color: ${darken(0.1, readableColor)};
          }
        }
      }
      ul,
      ol {
        padding-inline-start: 1.5em;
        margin-block: 0.5em 1.25em;
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
      margin: var(--gtr-m) 0;
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
      ${layout === 'No Image' &&
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
    textBlockLink: css`
      ${linkStyle}
      display: block;
      max-width: fit-content;
    `,
    textBlockButton: css`
      && {
        ${buttonStyle}
        font-size: var(--fs-21);
        margin: 0.75em 0 1em;
        background: ${readableColor};
        color: #fff;
        @media (hover: hover) {
          &:hover {
            background: ${darken(0.1, readableColor)};
            color: #fff;
          }
        }
      }
    `,
    graphic: css`
      ${textGridCss}
      width: 100%;
      max-width: 90ch;
      margin-top: 1.5em;
      margin-bottom: 1.5em;
    `,
  }
  return (
    <section
      css={styles.section}
      data-layout={layout}
    >
      {anchorLink[0] && <Anchor id={anchorLink[0].linkText} />}
      <h2 css={styles.heading}>{heading}</h2>
      {content.map((block, i) => {
        switch (block.__typename) {
          case 'DatoCmsTextBlock':
            return (
              <div
                css={styles.textBlock}
                key={i}
              >
                <StructuredText
                  key={i}
                  data={block.body}
                  renderBlock={({ record }) => {
                    if (isDatoLink(record.link[0])) {
                      return (
                        <DatoLink
                          data={record.link[0]}
                          css={
                            record.__typename === 'DatoCmsTextBlockButton'
                              ? styles.textBlockButton
                              : styles.textBlockLink
                          }
                          highlightColor={highlightColor}
                          icon={false}
                        />
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
                  customNodeRules={[
                    renderNodeRule(isLink, ({ node, key, children }) => {
                      const metaProps = node.meta?.reduce(
                        (a, v) => ({
                          ...a,
                          [v.id]: v.value,
                        }),
                        {}
                      )
                      if (node.url[0] === '/') {
                        return (
                          <Link
                            to={node.url}
                            key={key}
                          >
                            {children}
                          </Link>
                        )
                      } else
                        return (
                          <a
                            href={node.url}
                            key={key}
                            {...metaProps}
                          >
                            {children}
                          </a>
                        )
                    }),
                  ]}
                />
              </div>
            )
          case 'DatoCmsCarousel':
            return (
              <ContentCarousel
                data={block}
                key={i}
                highlightColor={highlightColor}
                orientation={orientation}
              />
            )
          case 'DatoCmsVectorGraphic':
            return (
              <VectorGraphic
                data={block}
                css={styles.graphic}
                key={i}
              />
            )
          default:
            return <Fragment key={i} />
        }
      })}
      <div css={styles.image}>
        {layout !== 'No Image' && image && (
          <GatsbyImageFocused
            image={
              layout === 'Narrow Image'
                ? image.narrow
                : layout === 'Medium Image'
                ? image.medium
                : image.wide
            }
            focalPoint={image.focalPoint}
            aspectRatio={image.sizes.aspectRatio}
            alt={image.alt || ''}
          />
        )}
        <ContentBlockShape
          shape={shape}
          color={highlightColor}
          layout={layout}
          orientation={orientation}
        />
      </div>
    </section>
  )
}

export default ContentBlock
