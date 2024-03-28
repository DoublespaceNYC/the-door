import { css } from '@emotion/react'
import { HTMLAttributes } from 'react'

import useQueryContext from '../context/QueryContext'
import { mq } from '../theme/mixins'
import { IPartner } from './Partner__Article'
import PartnerThumbnail from './Partner__Thumbnail'

interface Props extends HTMLAttributes<HTMLElement> {
  data: IPartner[]
  highlightColor: string
}

const PartnersGrid = ({
  data,
  highlightColor,
  ...props
}: Props): JSX.Element => {
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
      {data?.map((partner, i) => (
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
