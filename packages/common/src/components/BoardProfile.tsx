import { Document } from 'datocms-structured-text-utils'
import { IGatsbyImageData } from 'gatsby-plugin-image'

export interface IBoardMember {
  id: string
  __typename: 'DatoCmsBoardMember'
  name: string
  title: string
  category: 'Officer' | 'Director' | 'Honorary Board'
  bio?: {
    value: Document
  }
  image:
    | {
        gatsbyImageData: IGatsbyImageData
      }
    | null
    | undefined
}

// interface Props {
//   data: IBoardMember
// }

// const BoardProfile = ({ data }: Props): JSX.Element => {
//   return <div></div>
// }

// export default BoardProfile
