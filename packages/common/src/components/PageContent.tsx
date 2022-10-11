import { Record } from 'datocms-structured-text-utils'
import { useMemo } from 'react'

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
  layoutOptions: {
    startColor: startColorName,
    startShape,
    startOrientation,
  },
}: Props): JSX.Element => {
  const { theme } = useThemeContext()
  const colors = useMemo(() => {
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
  }, [theme])

  const startColor = useMemo(() => {
    switch (theme) {
      case 'The Door':
        return doorColors[startColorName as keyof typeof doorColors]
      case 'BSA':
        return bsaColors[startColorName as keyof typeof bsaColors]
      default:
        return colors[0]
    }
  }, [theme, colors, startColorName])

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
