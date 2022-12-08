import { css } from '@emotion/react'
import { HTMLAttributes } from 'react'

import useQueryContext from '../context/QueryContext'
import { mq } from '../theme/mixins'
import PartnerThumbnail from './Partner__Thumbnail'

interface Props extends HTMLAttributes<HTMLElement> {
  highlightColor: string
}

const PartnersGrid = ({ highlightColor, ...props }: Props): JSX.Element => {
  const { allPartners } = useQueryContext()
  const style = css`
    position: relative;
    z-index: 1;
    grid-column: 2 / -2;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--gtr-m);
    margin-top: 2em;
    ${mq().m} {
      grid-template-columns: repeat(3, 1fr);
    }
    ${mq().s} {
      grid-template-columns: repeat(2, 1fr);
      margin-top: 1em;
    }
  `
  return (
    <section
      {...props}
      css={style}
    >
      {allPartners?.map((partner, i) => (
        <PartnerThumbnail
          data={partner}
          highlightColor={highlightColor}
          key={i}
        />
      ))}
    </section>
  )
}

export default PartnersGrid
