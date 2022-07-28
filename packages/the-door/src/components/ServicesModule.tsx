import { SerializedStyles, css } from '@emotion/react'
import ScrollSlider from '@the-door/common/src/components/ScrollSlider'
import { graphql, useStaticQuery } from 'gatsby'

import ServiceModuleGroup, {
  IServicesGroup,
} from './ServiceModuleGroup'

type Props = {
  bgColor: string
  css?: SerializedStyles | SerializedStyles[]
}

const ServicesModule = ({ bgColor, ...props }: Props) => {
  type QueryProps = {
    servicesGroups: {
      nodes: IServicesGroup[]
    }
  }
  const { servicesGroups } = useStaticQuery<QueryProps>(graphql`
    query {
      servicesGroups: allDatoCmsServicesGroup(
        sort: { fields: position }
      ) {
        nodes {
          id: originalId
          __typename
          title
          image {
            gatsbyImageData(
              width: 360
              imgixParams: {
                q: 50
                ar: "1:2"
                fit: "crop"
                crop: "focalpoint"
              }
            )
            alt
            sizes {
              aspectRatio
            }
            focalPoint {
              x
              y
            }
          }
          services {
            title
            slug
          }
        }
      }
    }
  `)
  const styles = {
    sliderContent: css`
      display: grid;
      grid-gap: 0.75rem;
      grid-template-columns: repeat(
        ${servicesGroups.nodes.length},
        1fr
      );
      padding: 0 var(--margin);
    `,
    scrollArea: css`
      scroll-padding-left: var(--margin);
    `,
    scrollWidth: css`
      font-size: var(--fs-21);
      width: calc(15ch + 0.75rem + 4rem);
    `,
  }
  return (
    <ScrollSlider
      contentCss={styles.sliderContent}
      scrollAreaCss={styles.scrollArea}
      scrollWidthCss={styles.scrollWidth}
      navStyle="above"
      {...props}
    >
      {servicesGroups.nodes.map((serviceGroup, i) => (
        <ServiceModuleGroup
          serviceGroup={serviceGroup}
          key={i}
          bgColor={bgColor}
        />
      ))}
    </ScrollSlider>
  )
}

export default ServicesModule
