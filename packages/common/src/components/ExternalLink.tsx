import { Record } from 'datocms-structured-text-utils'
import { graphql } from 'gatsby'
import { Fragment, HTMLAttributes } from 'react'

import ExternalLinkIcon from './ExternalLinkIcon'

export interface IExternalLink extends Record {
  __typename: 'DatoCmsExternalLink'
  id: string
  linkText: string
  url: string
}

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  data: IExternalLink
  icon?: boolean
}

const ExternalLink = ({ data, icon, ...props }: Props): JSX.Element => {
  return (
    <a href={data.url} rel="noreferrer" target="_blank" {...props}>
      <span>
        {data.linkText}
        {icon && (
          <Fragment>
            {' '}
            <ExternalLinkIcon />
          </Fragment>
        )}
      </span>
    </a>
  )
}

export const ExternalLinkFragment = graphql`
  fragment ExternalLinkFragment on DatoCmsExternalLink {
    __typename
    id: originalId
    linkText
    url
  }
`

export default ExternalLink
