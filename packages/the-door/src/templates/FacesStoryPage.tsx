import FacesStory, {
  IFacesStory,
} from '@the-door/common/src/components/Faces__Story'
import { HeadProps, PageProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { colors } from '../theme/variables'

interface QueryProps {
  story: IFacesStory
}

interface ContextProps {
  id: string
}

const FacesStoryPage = ({
  data,
}: PageProps<QueryProps, ContextProps>): JSX.Element => {
  return (
    <Layout>
      <FacesStory
        data={data.story}
        layout="Page"
        highlightColor={colors.purple}
      />
    </Layout>
  )
}

export const Head = ({
  data: {
    story: { title, seo },
  },
}: HeadProps<QueryProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description}
    imageUrl={seo?.image?.url}
  />
)

export const query = graphql`
  query ($id: String!) {
    story: datoCmsFacesStory(id: { eq: $id }) {
      ...FacesStoryFragment
    }
  }
`

export default FacesStoryPage
