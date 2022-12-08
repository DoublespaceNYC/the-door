import { css } from '@emotion/react'
import { rgba } from 'polished'
import { HTMLAttributes, ReactNode, useState } from 'react'

import AccordionItem from './Accordion__Item'

interface Props extends HTMLAttributes<HTMLDivElement> {
  items: {
    heading: string
    subheading?: string
    contents: ReactNode
  }[]
  headingLevel?: number
  singleOpen?: boolean
  theme: 'Light' | 'Dark'
  layout?: 'Nested'
}

const Accordion = ({
  items,
  headingLevel = 3,
  singleOpen = false,
  theme,
  layout,
  ...props
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
      border-top: 2px solid ${theme === 'Dark' ? '#fff' : rgba('#888', 0.5)};
      border-bottom: 2px solid ${theme === 'Dark' ? '#fff' : rgba('#888', 0.5)};
      ${layout === 'Nested' &&
      css`
        padding-left: var(--gtr-m);
      `}
    `,
  }
  return (
    <div
      css={styles.accordion}
      {...props}
    >
      {items.map((item, i) => (
        <AccordionItem
          layout={layout}
          theme={theme}
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
