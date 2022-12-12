import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'

import useThemeContext from '../context/ThemeContext'
import { bsaColors, doorColors } from '../theme/variables'
import ContentBlock, { IContentBlock } from './ContentBlock'
import { ShapeType, shapeArray } from './ContentBlock__Shape'

export type IPageContent = IContentBlock[]

export interface ILayoutOptions extends Record {
  __typename: 'DatoCmsLayoutOptionsBlock'
  startColor: string
  startShape: ShapeType
  startOrientation: 'left' | 'right'
}

type Props = {
  pageContent: IPageContent
  layoutOptions: ILayoutOptions
}

const PageContent = ({
  pageContent,
  layoutOptions: { startColor: startColorName, startShape, startOrientation },
}: Props): JSX.Element => {
  const { theme } = useThemeContext()
  const setColorsArray = () => {
    switch (theme) {
      case 'The Door':
        return [
          doorColors.purple,
          doorColors.pink,
          doorColors.teal,
          doorColors.green,
        ]
      default:
        return ['#888']
    }
  }
  const colorsArray = setColorsArray()

  const setStartColor = () => {
    switch (theme) {
      case 'The Door':
        return doorColors[startColorName as keyof typeof doorColors]
      case 'BSA':
        return bsaColors[startColorName as keyof typeof bsaColors]
      default:
        return colorsArray[0]
    }
  }
  const startColor = setStartColor()

  const colorIndex = colorsArray.indexOf(startColor)
  const shapeIndex = shapeArray.indexOf(startShape)
  const oddOrientation = startOrientation === 'left' ? 'right' : 'left'
  let blockIndex = -1
  const style = css`
    padding-bottom: var(--row-s);
    /* Fixes chrome bug that prevents backdrop-filter on lightboxes from rendering correctly */
    backdrop-filter: opacity(1);
  `
  return (
    <div css={style}>
      {pageContent.map((record, i) => {
        if (record.__typename === 'DatoCmsContentBlock') {
          blockIndex++
          const cI = (blockIndex + colorIndex) % colorsArray.length
          const sI = (blockIndex + shapeIndex) % shapeArray.length
          return (
            <ContentBlock
              block={record}
              highlightColor={colorsArray[cI]}
              shape={shapeArray[sI]}
              orientation={blockIndex % 2 ? oddOrientation : startOrientation}
              key={i}
            />
          )
        }
      })}
    </div>
  )
}

export default PageContent
