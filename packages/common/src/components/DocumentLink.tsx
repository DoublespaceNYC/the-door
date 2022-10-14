import { Record } from 'datocms-structured-text-utils'
import { graphql } from 'gatsby'
import { Fragment, HTMLAttributes } from 'react'

import DocumentIcon from './DocumentIcon'

export interface IDocumentLink extends Record {
  __typename: 'DatoCmsDocumentLink'
  linkText: string
  document: {
    url: string
  }
}

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  data: IDocumentLink
  icon?: boolean
}

const DocumentLink = ({ data, icon, ...props }: Props): JSX.Element => {
  return (
    <a href={data.document.url} download {...props}>
      <span>
        {data.linkText}
        {icon && (
          <Fragment>
            {' '}
            <DocumentIcon />
          </Fragment>
        )}
      </span>
    </a>
  )
}

export default DocumentLink

export const DocumentLinkFragment = () => graphql`
  fragment DocumentLinkFragment on DatoCmsDocumentLink {
    id: originalId
    __typename
    linkText
    document {
      url
    }
  }
`
