import { HTMLAttributes } from 'react'

export type {
  StructuredText as IStructuredText,
  Record as IRecord,
} from 'datocms-structured-text-utils'

export interface LogoProps extends HTMLAttributes<SVGElement> {
  fill?: string
}

export interface ISEO {
  __typename: 'DatoCmsSeoField'
  title?: string
  description?: string
  twitterCard?: string
  image: {
    url: string
  }
}
