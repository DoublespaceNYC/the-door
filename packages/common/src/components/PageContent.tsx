import { Record } from 'datocms-structured-text-utils'

import ContentBlock, { IContentBlock } from './ContentBlock'
import { ShapeType, shapeArray } from './ContentBlockShape'

export type IPageContent = IContentBlock[]

export interface ILayoutOptions extends Record {
  __typename: 'DatoCmsLayoutOptionsBlock'
  startColor: string
  startShape: ShapeType
  startOrientation: 'left' | 'right'
}

type Props = {
  pageContent: IPageContent
  colors: string[]
  layoutOptions: ILayoutOptions
}

const PageContent = ({
  pageContent,
  colors,
  layoutOptions: { startColor, startShape, startOrientation },
}: Props) => {
  const colorIndex = colors.indexOf(startColor)
  const shapeIndex = shapeArray.indexOf(startShape)
  const oddOrientation = startOrientation === 'left' ? 'right' : 'left'
  let blockIndex = -1
  return (
    <div css={{ paddingBottom: 'var(--row-s)' }}>
      {pageContent.map((record, i) => {
        if (record.__typename === 'DatoCmsContentBlock') {
          blockIndex++
          const cI = (blockIndex + colorIndex) % colors.length
          const sI = (blockIndex + shapeIndex) % shapeArray.length
          return (
            <ContentBlock
              block={record}
              color={colors[cI]}
              shape={shapeArray[sI]}
              orientation={
                blockIndex % 2 ? oddOrientation : startOrientation
              }
              key={i}
            />
          )
        }
      })}
    </div>
  )
}

export default PageContent
