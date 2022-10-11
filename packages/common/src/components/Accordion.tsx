import { css } from '@emotion/react'
import { ReactNode, useState } from 'react'

import AccordionItem from './AccordionItem'

type Props = {
  items: {
    heading: string
    subheading?: string
    contents: ReactNode
  }[]
  headingLevel?: number
  singleOpen?: boolean
}

const Accordion = ({
  items,
  headingLevel = 3,
  singleOpen = false,
}: Props): JSX.Element => {
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
      border-bottom: 2px solid #ffffff88;
    `,
  }
  return (
    <div css={styles.accordion}>
      {items.map((item, i) => (
        <AccordionItem
          heading={item.heading}
          subheading={item.subheading}
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
