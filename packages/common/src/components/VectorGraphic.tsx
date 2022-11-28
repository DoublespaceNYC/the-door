import { Record } from 'datocms-structured-text-utils'
import { HTMLAttributes } from 'react'

export interface IVectorGraphic extends Record {
  __typename: 'DatoCmsVectorGraphic'
  graphic: {
    url: string
    alt?: string
  }
}

interface Props extends HTMLAttributes<HTMLImageElement> {
  data: IVectorGraphic
}

const VectorGraphic = ({ data, ...props }: Props): JSX.Element => {
  return (
    <img
      src={data.graphic.url}
      alt={data.graphic.alt || ''}
      {...props}
    />
  )
}

export default VectorGraphic
