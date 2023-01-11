import FormLightbox, {
  IFormLightbox,
} from '@the-door/common/src/components/Form__Lightbox'
import { renderDescription } from '@the-door/common/src/utils'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { Fragment } from 'react'

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
    <Fragment>
      <FormLightbox
        data={data.formLightbox}
        layout="Page"
      />
    </Fragment>
  )
}

export const Head = ({
  data: {
    formLightbox: { title, text, seo },
  },
}: HeadProps<QueryProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description || renderDescription(text)}
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
