import { css } from '@emotion/react'
import { IFacesStory } from '@the-door/common/src/components/Faces__Story'
import GatsbyImageFocused, {
  IGatsbyImageFocused,
} from '@the-door/common/src/components/GatsbyImageFocused'
import LightboxLink from '@the-door/common/src/components/Lightbox__Link'
import PageHero from '@the-door/common/src/components/PageHero'
import PageIntro from '@the-door/common/src/components/PageIntro'
import {
  absoluteFill,
  baseGrid,
  linkStyle,
  mq,
  widthInCols,
} from '@the-door/common/src/theme/mixins'
import { renderDescription } from '@the-door/common/src/utils'
import { Document } from 'datocms-structured-text-utils'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { rgba } from 'polished'
import { Fragment } from 'react'

import Seo, { ISEO } from '../components/Seo'
import { colors } from '../theme/variables'

interface DataProps {
  page: {
    title: string
    heroImage: IGatsbyImageFocused
    intro: {
      value: Document
    }
    seo?: ISEO
    slug: string
  }
  stories: {
    nodes: IFacesStory[]
  }
}

const getStoryColors = (i: number) => {
  switch (i % 5) {
    case 0:
      return [colors.pink, colors.pinkDark]
    case 1:
      return [colors.green, colors.greenDark]
    case 2:
      return [colors.blue, colors.blueDark]
    case 3:
      return [colors.yellow, colors.yellowDark]
    case 4:
      return [colors.purple, colors.purpleDark]
    case 5:
      return [colors.teal, colors.tealDark]
    default:
      return []
  }
}

const FacesPage = ({
  data: { page, stories },
}: PageProps<DataProps>): JSX.Element => {
  const styles = {
    intro: css`
      margin-bottom: var(--row-m);
    `,
    story: (i: number) => css`
      ${baseGrid}
      padding-bottom: var(--row-s);
      &::before {
        display: block;
        content: '';
        ${absoluteFill}
        background: linear-gradient(
          to bottom ${i % 2 ? 'right' : 'left'},
          ${getStoryColors(i)[0]},
          ${getStoryColors(i)[1]}
        );
        transform: translateY(var(--row-s));
      }
      &:last-of-type {
        margin-bottom: calc(var(--row-s) - 1px);
      }
    `,
    image: (i: number) => css`
      position: relative;
      grid-row: 1 / 2;
      min-height: 100%;
      ${i % 2 === 0
        ? css`
            grid-column: 2 / span 9;
          `
        : css`
            grid-column: span 9 / -2;
          `}
      ${mq().s} {
        grid-column: 2 / span 11;
      }
      div[data-gatsby-image-wrapper] {
        height: 100%;
      }
    `,
    textbox: (i: number) => css`
      position: relative;
      background: ${rgba(getStoryColors(i)[1], 0.9)};
      color: #fff;
      align-self: center;
      font-size: var(--fs-18);
      padding: 2em 3em;
      margin: calc(var(--row-s) * 2) 0 var(--row-s);
      width: ${widthInCols(5)};
      min-width: min(36ch, 100%);
      box-sizing: border-box;
      grid-column: 2 / -2;
      grid-row: 1 / 2;
      ${i % 2 === 0
        ? css`
            justify-self: flex-end;
          `
        : css`
            justify-self: flex-start;
          `}

      ${mq().ms} {
        padding: 1.5em 2em;
      }
      ${mq().s} {
        grid-row: 2 / 3;
        margin-top: calc(-1 * var(--row-s));
        width: ${widthInCols(11)};
        justify-self: flex-end;
        min-width: 0;
        font-size: var(--fs-16);
      }
      h2 {
        font-size: var(--fs-72);
        line-height: 1;
        margin: 0 0 0.333em;
        ${mq().s} {
          font-size: var(--fs-48);
        }
      }
      p {
        line-height: 1.5;
        margin: 0.5em 0;
      }
      a {
        ${linkStyle}
        display: block;
        color: #fff;
        padding: 0.5em 0;
        margin: 1em 0 0;
        @media (hover: hover) {
          &:hover {
            color: #ffffffaa;
          }
        }
      }
    `,
  }
  return (
    <Fragment>
      <PageHero
        title={page.title}
        image={page.heroImage}
      />
      <PageIntro
        intro={page.intro}
        css={styles.intro}
      />
      <section>
        {stories.nodes.map((story, i) => (
          <div
            key={i}
            css={styles.story(i)}
          >
            <GatsbyImageFocused
              css={styles.image(i)}
              image={story.image.carouselImageData}
              alt={story.image.alt || story.title}
              aspectRatio={3 / 2}
              originalAspectRatio={story.image.sizes.aspectRatio}
              focalPoint={story.image.focalPoint}
            />
            <div css={styles.textbox(i)}>
              <h2>{story.title}</h2>
              <p>{story.excerpt}</p>
              <LightboxLink
                slugPrefix={page.slug}
                link={story.ctaText}
                data={story}
                highlightColor={getStoryColors(i)[0]}
              />
            </div>
          </div>
        ))}
      </section>
    </Fragment>
  )
}

export const Head = ({
  data: {
    page: { title, intro, seo },
  },
}: HeadProps<DataProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description || renderDescription(intro)}
    imageUrl={seo?.image?.url}
  />
)

export const data = graphql`
  query {
    page: datoCmsFacesPage {
      title
      heroImage {
        gatsbyImageData(
          layout: FULL_WIDTH
          imgixParams: {
            q: 65
            ar: "8:3"
            fit: "crop"
            crop: "focalpoint"
          }
        )
        ...ImageFocalData
      }
      intro {
        value
      }
      seo {
        ...SEOFragment
      }
      slug
    }
    stories: allDatoCmsFacesStory(sort: { position: ASC }) {
      nodes {
        ...FacesStoryFragment
      }
    }
  }
`

export default FacesPage
