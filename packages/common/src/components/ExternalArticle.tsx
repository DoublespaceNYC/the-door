import { Record } from 'datocms-structured-text-utils'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import { IGatsbyImageFocused } from '../components/GatsbyImageFocused'

interface IArticleImage extends Omit<IGatsbyImageFocused, 'gatsbyImageData'> {
  thumbnailImageData: IGatsbyImageData
}

export interface IExternalArticle extends Record {
  __typename: 'DatoCmsExternalArticle'
  title: string
  excerpt: string
  heroImage: IArticleImage
  url: string
  publication: string
  tags: { name: string }[]
  inLatest: boolean
  publicationDate: string
}

const ExternalArticle = (): JSX.Element => {
  return <article></article>
}

export default ExternalArticle
