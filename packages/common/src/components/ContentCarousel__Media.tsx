import { css } from '@emotion/react'
import { rgba } from 'polished'
import { HTMLAttributes } from 'react'

import { mq, widthInCols } from '../theme/mixins'
import ContentCarouselMediaBlock, {
  ICarouselMediaBlock,
} from './ContentCarousel__Media__Block'
import ScrollSlider from './ScrollSlider'

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: ICarouselMediaBlock[]
  color: string
}

const ContentCarouselMedia = ({
  data,
  color,
  ...props
}: Props): JSX.Element => {
  const styles = {
    slider: css`
      margin-top: 1rem;
      grid-column: 1 / -1;
      z-index: 2;
      --blockWidth: calc(${widthInCols(12)} - 2 * var(--margin));
      --gap: calc(var(--margin) + 0.5 * var(--gtr-m));
    `,
    sliderContent: css`
      display: grid;
      grid-template-columns: repeat(${data.length}, auto);
      grid-gap: var(--gap);
      padding: 0 calc(var(--margin) * 2) var(--shadow-offset);
    `,
    scrollArea: css`
      scroll-padding-left: calc(var(--margin) * 2);
    `,
    scrollWidth: css`
      width: calc(var(--blockWidth) + var(--gap));
    `,
    block: css`
      width: var(--blockWidth);
    `,
  }
  return (
    <ScrollSlider
      css={styles.slider}
      contentCss={styles.sliderContent}
      scrollAreaCss={styles.scrollArea}
      scrollWidthCss={styles.scrollWidth}
      navStyle="overlay"
      snap
      colors={{
        arrow: [color],
        arrowDisabled: '#00000015',
        link: [color, rgba(color, 0.75)],
      }}
      {...props}
    >
      {data.map((block, i) => (
        <ContentCarouselMediaBlock
          data={block}
          highlightColor={color}
          css={styles.block}
          key={i}
        />
      ))}
    </ScrollSlider>
  )
}

// export const CarouselMediaBlockFragment = graphql`
//   fragment CarouselMediaBlockFragment on DatoCmsCarouselMediaBlock {
//     id: originalId
//     __typename
//     caption {
//       value
//     }
//     media {
//       gatsbyImageData(
//         width: 960
//         imgixParams: {
//           q: 50
//           ar: "3:2"
//           fit: "crop"
//           crop: "focalpoint"
//         }
//       )
//       ...ImageFocalData
//     }
//   }
// `

export default ContentCarouselMedia
