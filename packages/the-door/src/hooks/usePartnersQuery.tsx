import { IPartner } from '@the-door/common/src/components/Partner__Article'
import { graphql, useStaticQuery } from 'gatsby'

const usePartnersQuery = () => {
  const { allPartners } = useStaticQuery<QueryProps>(graphql`
    query {
      allPartners: allDatoCmsPartner(sort: { position: ASC }) {
        nodes {
          ...PartnerFragment
        }
      }
    }
  `)
  type QueryProps = {
    allPartners: {
      nodes: IPartner[]
    }
  }
  return {
    allPartners: allPartners.nodes,
  }
}

export default usePartnersQuery
