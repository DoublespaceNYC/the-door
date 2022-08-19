import { css } from '@emotion/react'
import { ReactNode, useState } from 'react'

import AccordionItem, { IAccordionColors } from './AccordionItem'

type Props = {
  items: {
    heading: string
    subheading?: string
    contents: ReactNode
  }[]
  colors: IAccordionColors
  headingLevel?: number
  singleOpen?: boolean
}

const Accordion = ({
  items,
  colors,
  headingLevel = 3,
  singleOpen = false,
}: Props) => {
  const [openItems, setOpenItems] = useState<number[]>([])
  const handleClick = (i: number) => {
    if (singleOpen) {
      openItems.includes(i) ? setOpenItems([]) : setOpenItems([i])
    } else {
      openItems.includes(i)
        ? setOpenItems(prev => [...prev.filter(item => item !== i)])
        : setOpenItems(prev => [...prev, i])
    }
  }
  const styles = {
    accordion: css`
      border-bottom: 2px solid ${colors.divider};
    `,
  }
  return (
    <div css={styles.accordion}>
      {items.map((item, i) => (
        <AccordionItem
          heading={item.heading}
          subheading={item.subheading}
          colors={colors}
          headingLevel={headingLevel}
          key={i}
          onClick={() => handleClick(i)}
          open={openItems.includes(i)}
        >
          {item.contents}
        </AccordionItem>
      ))}
    </div>
  )
}

export default Accordion
