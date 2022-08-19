import PageContent, {
  ILayoutOptions,
  IPageContent,
} from '@the-door/common/src/components/PageContent'

import { colors } from '../theme/variables'

const colorsArray = [
  colors.purple,
  colors.pink,
  colors.teal,
  colors.green,
]

export interface IDoorLayoutOptions extends ILayoutOptions {
  startColor: keyof typeof colors
}

type Props = {
  pageContent: IPageContent
  layoutOptions: IDoorLayoutOptions
}

const TheDoorPageContent = ({ pageContent, layoutOptions }: Props) => {
  return (
    <PageContent
      pageContent={pageContent}
      colors={colorsArray}
      layoutOptions={{
        ...layoutOptions,
        startColor:
          colorsArray[
            colorsArray.indexOf(colors[layoutOptions.startColor])
          ],
      }}
    />
  )
}

export default TheDoorPageContent
