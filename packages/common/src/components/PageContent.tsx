import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { HTMLAttributes } from 'react'

import ContentBlock, { IContentBlock } from './ContentBlock'
import { ShapeType, shapeArray } from './ContentBlock__Shape'
import { ITheme } from './Layout'

export type IPageContent = IContentBlock[]

export interface ILayoutOptions extends Record {
  __typename: 'DatoCmsLayoutOptionsBlock'
  startColor: string
  startShape: ShapeType
  startOrientation: 'left' | 'right'
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  pageContent: IPageContent
  layoutOptions: ILayoutOptions
}

const PageContent = ({
  pageContent,
  layoutOptions: { startColor, startShape, startOrientation },
  ...props
}: Props): JSX.Element => {
  const theme = useTheme() as ITheme
  const startColorIndex = +startColor || 0
  const shapeIndex = shapeArray.indexOf(startShape)
  const oddOrientation = startOrientation === 'left' ? 'right' : 'left'
  const style = css`
    padding-bottom: var(--row-s);
    /* Fixes chrome bug that prevents backdrop-filter on lightboxes from rendering correctly */
    backdrop-filter: opacity(1);
  `
  return (
    <div
      css={style}
      {...props}
    >
      {pageContent.map((record, i) => {
        const cI = (i + startColorIndex) % theme.contentColorsArray.length
        const sI = (i + shapeIndex) % shapeArray.length
        return (
          <ContentBlock
            block={record}
            highlightColor={theme.contentColorsArray[cI]}
            shape={shapeArray[sI]}
            orientation={i % 2 ? oddOrientation : startOrientation}
            key={i}
          />
        )
      })}
    </div>
  )
}

export default PageContent
