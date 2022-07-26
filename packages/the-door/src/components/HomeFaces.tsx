import { css } from '@emotion/react'
import ScrollSlider from '@the-door/common/src/components/ScrollSlider'
import {
  absoluteFill,
  baseGrid,
  mq,
} from '@the-door/common/src/theme/mixins'
import { IStructuredText } from '@the-door/common/src/types'
import { graphql, useStaticQuery } from 'gatsby'
import { StructuredText } from 'react-datocms'

import { colors } from '../theme/variables'
import { IStory } from '../types'
import HomeFacesStory from './HomeFacesStory'

type Props = {
  heading: string
  body: IStructuredText
}

const HomeFaces = ({ heading, body }: Props) => {
  type QueryProps = {
    stories: {
      nodes: IStory[]
    }
  }
  const { stories } = useStaticQuery<QueryProps>(graphql`
    query {
      stories: allDatoCmsStory {
        nodes {
          ...StoryFragment
        }
      }
    }
  `)
  const styles = {
    section: css`
      ${baseGrid}
      grid-template-rows: auto auto auto calc(var(--row-ll) + var(--row-l));
      background: linear-gradient(
        to bottom right,
        ${colors.purple},
        ${colors.purpleDark}
      );
      color: #fff;
    `,
    heading: css`
      grid-column: 2 / -2;
      font-size: var(--fs-108);
      margin: var(--row-l) 0 0;
      position: relative;
      line-height: 1;
    `,
    body: css`
      grid-column: 2 / -2;
      max-width: 50ch;
      line-height: 1.5;
      > *:last-child {
        margin-bottom: 1rem;
        ${mq().m} {
          margin-bottom: 3rem;
        }
      }
      position: relative;
    `,
    slider: css`
      grid-column: 1 / -1;
      position: relative;
    `,
    sliderContent: css`
      display: grid;
      grid-template-columns: repeat(${stories.nodes.length}, auto);
      grid-gap: calc(var(--margin) + 0.5 * var(--gtr-m));
      padding: 0 calc(var(--margin) * 2);
    `,
    sliderScrollArea: css`
      scroll-padding-left: calc(var(--margin) * 2);
    `,
    sliderScrollWidth: css`
      width: calc(100vw - var(--margin) * 2);
    `,
    decoOne: css`
      background: ${colors.purpleDark}44;
      ${absoluteFill}
      grid-column: span 8 / -1;
      height: 50%;
      top: var(--gtr-m);
    `,
    decoTwo: css`
      ${absoluteFill}
      grid-column: 4 / -4;
      grid-row: 3 / 4;
      background: ${colors.purple}99;
      transform: translateY(6rem);
    `,
  }
  return (
    <section css={styles.section}>
      <div css={styles.decoOne} />
      <div css={styles.decoTwo} />
      <h2 css={styles.heading}>{heading}</h2>
      <div css={styles.body}>
        <StructuredText data={body.value} />
      </div>
      <ScrollSlider
        snap
        navStyle="overlay"
        css={styles.slider}
        scrollAreaCss={styles.sliderScrollArea}
        contentCss={styles.sliderContent}
        scrollWidthCss={styles.sliderScrollWidth}
      >
        {stories.nodes.map((story, i) => (
          <HomeFacesStory key={i} story={story} />
        ))}
      </ScrollSlider>
    </section>
  )
}

export default HomeFaces
