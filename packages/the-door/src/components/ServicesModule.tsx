import { SerializedStyles, css } from '@emotion/react'
import ScrollSlider from '@the-door/common/src/components/ScrollSlider'
import { graphql, useStaticQuery } from 'gatsby'

import { IServiceGroup } from '../types'
import ServiceModuleGroup from './ServiceModuleGroup'

type Props = {
  bgColor: string
  css?: SerializedStyles | SerializedStyles[]
}

const ServicesModule = ({ bgColor, ...props }: Props) => {
  type QueryProps = {
    serviceGroups: {
      nodes: IServiceGroup[]
    }
  }
  const { serviceGroups } = useStaticQuery<QueryProps>(graphql`
    query {
      serviceGroups: allDatoCmsServiceGroup(
        sort: { fields: position }
      ) {
        nodes {
          ...ServiceGroupFragment
        }
      }
    }
  `)
  const styles = {
    sliderContent: css`
      display: grid;
      grid-gap: 0.75rem;
      grid-template-columns: repeat(${serviceGroups.nodes.length}, 1fr);
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
      {serviceGroups.nodes.map((serviceGroup, i) => (
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
