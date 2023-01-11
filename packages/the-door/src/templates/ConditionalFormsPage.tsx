import Form, { IForm } from '@the-door/common/src/components/Form'
import { PageProps, graphql } from 'gatsby'
import { Fragment } from 'react'

interface QueryProps {
  allDatoCmsForm: { nodes: IForm[] }
}

const ConditionalFormsPage = ({
  data: { allDatoCmsForm },
}: PageProps<QueryProps>): JSX.Element => {
  return (
    <Fragment>
      {allDatoCmsForm.nodes.map(form => (
        <Form
          data={form}
          key={form.id}
          showAllConditionalFields
        />
      ))}
    </Fragment>
  )
}

export const data = graphql`
  query {
    allDatoCmsForm(filter: { conditionalFields: { glob: "*" } }) {
      nodes {
        ...FormFragment
      }
    }
  }
`

export default ConditionalFormsPage
