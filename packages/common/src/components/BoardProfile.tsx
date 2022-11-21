import { Document } from 'datocms-structured-text-utils'

export interface IBoardMember {
  id: string
  __typename: 'DatoCmsBoardMember'
  name: string
  title: string
  category: 'Officer' | 'Director' | 'Honorary Board'
  bio?: {
    value: Document
  }
}

// interface Props {
//   data: IBoardMember
// }

// const BoardProfile = ({ data }: Props): JSX.Element => {
//   return <div></div>
// }

// export default BoardProfile
