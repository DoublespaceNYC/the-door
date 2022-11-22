import LeaderProfile, {
  ILeader,
} from '@the-door/common/src/components/Leader__Profile'
import { HeadProps, PageProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

interface QueryProps {
  leader: ILeader
}

interface ContextProps {
  id: string
}

const LeaderProfilePage = ({
  data,
}: PageProps<QueryProps, ContextProps>): JSX.Element => {
  return (
    <Layout>
      <LeaderProfile data={data.leader} layout="Page" />
    </Layout>
  )
}

export const Head = ({
  data: {
    leader: { name, title, seo, headshot },
  },
}: HeadProps<QueryProps>): JSX.Element => (
  <Seo
    title={seo?.title || `${name}, ${title}`}
    description={seo?.description}
    imageUrl={seo?.image?.url || headshot.url}
  />
)

export const query = graphql`
  query ($id: String!) {
    leader: datoCmsLeader(id: { eq: $id }) {
      ...LeaderFragment
    }
  }
`

export default LeaderProfilePage
