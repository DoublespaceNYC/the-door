import FormLightbox, {
  IFormLightbox,
} from '@the-door/common/src/components/Form__Lightbox'
import { render } from 'datocms-structured-text-to-plain-text'
import { HeadProps, PageProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

interface QueryProps {
  formLightbox: IFormLightbox
}

interface ContextProps {
  id: string
}

const FormPage = ({
  data,
}: PageProps<QueryProps, ContextProps>): JSX.Element => {
  return (
    <Layout>
      <FormLightbox
        data={data.formLightbox}
        layout="Page"
      />
    </Layout>
  )
}

export const Head = ({
  data: {
    formLightbox: { title, text, seo },
  },
}: HeadProps<QueryProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description || text.value ? render(text) : null}
    imageUrl={seo?.image?.url}
  />
)

export const query = graphql`
  query ($id: String!) {
    formLightbox: datoCmsFormLightbox(id: { eq: $id }) {
      ...FormLightboxFragment
    }
  }
`

export default FormPage
