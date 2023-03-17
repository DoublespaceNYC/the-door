import { css } from '@emotion/react'
import ScrollSlider from '@the-door/common/src/components/ScrollSlider'
import { mq } from '@the-door/common/src/theme/mixins'
import { graphql, useStaticQuery } from 'gatsby'
import { HTMLAttributes } from 'react'

import ServiceModuleService, {
  IServiceModuleService,
} from './ServiceModule__Service'

interface Props extends HTMLAttributes<HTMLDivElement> {
  bgColor: string
}

const ServicesModule = ({ bgColor, ...props }: Props): JSX.Element => {
  type QueryProps = {
    services: {
      nodes: IServiceModuleService[]
    }
  }
  const { services } = useStaticQuery<QueryProps>(graphql`
    query {
      services: allDatoCmsService(sort: { position: ASC }) {
        nodes {
          ...ServiceModuleService
        }
      }
    }
  `)
  const styles = {
    sliderContent: css`
      display: grid;
      grid-gap: 0.75rem;
      grid-template-columns: repeat(${services.nodes.length}, 1fr);
      padding: 0 var(--margin);
      min-width: 100%;
      box-sizing: border-box;
    `,
    scrollArea: css`
      scroll-padding-left: var(--margin);
    `,
    scrollWidth: css`
      font-size: var(--fs-21);
      width: calc(15ch + 0.75rem + 4rem);
      ${mq().s} {
        width: calc(15ch + 0.75rem + 3rem);
      }
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
      {services.nodes.map(service => (
        <ServiceModuleService
          data={service}
          bgColor={bgColor}
          key={service.id}
        />
      ))}
    </ScrollSlider>
  )
}

export default ServicesModule
