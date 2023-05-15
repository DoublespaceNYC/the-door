import { Record } from 'datocms-structured-text-utils'
import { graphql } from 'gatsby'
import { Fragment, HTMLAttributes } from 'react'

import useLocalFileUrl from '../hooks/useLocalFileUrl'
import DocumentIcon from './DocumentIcon'

export interface IDocumentLink extends Record {
  __typename: 'DatoCmsDocumentLink'
  linkText: string
  document: {
    localFileId: string
    url: string
  }
}

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  data: IDocumentLink
  icon?: boolean
}

const DocumentLink = ({ data, icon, ...props }: Props): JSX.Element => {
  const localFileUrl = useLocalFileUrl(data.document.localFileId)
  return (
    <a
      href={localFileUrl || data.document.url}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
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
      localFileId
      url
    }
  }
`
