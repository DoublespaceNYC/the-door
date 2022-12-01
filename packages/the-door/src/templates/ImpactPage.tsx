import { css } from '@emotion/react'
import GatsbyImageFocused, {
  IGatsbyImageFocused,
} from '@the-door/common/src/components/GatsbyImageFocused'
import PageHero from '@the-door/common/src/components/PageHero'
import PageIntro from '@the-door/common/src/components/PageIntro'
import VectorGraphic, {
  IVectorGraphic,
} from '@the-door/common/src/components/VectorGraphic'
import { baseGrid, mq } from '@the-door/common/src/theme/mixins'
import { Document } from 'datocms-structured-text-utils'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { StructuredText } from 'react-datocms'

import Layout from '../components/Layout'
import Seo, { ISEO } from '../components/Seo'
import { colors } from '../theme/variables'

interface DataProps {
  page: {
    title: string
    heroImage: IGatsbyImageFocused
    intro: {
      value: Document
    }
    graphics: IVectorGraphic[]
    statsHeading: string
    statsIntro: {
      value: Document
    }
    statGroups: {
      heading: string
      featuredStat: [
        {
          number: string
          text: string
        }
      ]
      stats: {
        number: string
        text: string
      }[]
    }[]
    statImages: IGatsbyImageFocused[]
    seo?: ISEO
  }
}

const getStatColorGradient = (i: number) => {
  switch (i % 5) {
    case 0:
      return `${colors.tealDark}, ${colors.teal}`
    case 1:
      return `${colors.greenDark}, ${colors.green}`
    case 2:
      return `${colors.pinkDark}, ${colors.pink}`
    case 3:
      return `${colors.blueDark}, ${colors.blue}`
    case 4:
      return `${colors.purpleDark}, ${colors.purple}`
  }
}

const ImpactPage = ({
  data: { page },
}: PageProps<DataProps>): JSX.Element => {
  const styles = {
    intro: css`
      margin-bottom: var(--row-m);
    `,
    graphicsSection: css`
      display: grid;
      grid-gap: 4em;
      padding: 0 var(--margin) var(--row-l);
      img {
        display: block;
        width: 100%;
        max-width: 90ch;
      }
    `,
    statsIntro: css`
      background: linear-gradient(
        to top right,
        ${colors.purpleDark},
        ${colors.purple}
      );
      color: #fff;
      padding: var(--row-m) var(--margin)
        calc(var(--row-m) + var(--gtr-m));
      h2 {
        font-size: var(--fs-72);
        margin: 0;
      }
      p {
        font-size: var(--fs-21);
        line-height: 1.75;
        max-width: 80ch;
        ${mq().ms} {
          font-size: var(--fs-18);
        }
      }
    `,
    statGroup: (i: number) => css`
      ${baseGrid}
      color: #fff;
      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to top right,
          ${getStatColorGradient(i)}
        );
      }
      h3 {
        position: relative;
        font-size: var(--fs-30);
        text-transform: uppercase;
        margin: 3em 0 0.5em;
        text-align: center;
        ${mq().s} {
          font-size: var(--fs-21);
          margin-top: 2em;
        }
      }
      h4 {
        position: relative;
        text-align: center;
        margin: 0.25em 0;
        font-size: var(--fs-30);
        ${mq().s} {
          font-size: var(--fs-21);
        }
        span {
          display: block;
          &:first-of-type {
            font-family: var(--display-font);
            font-size: var(--fs-108);
            line-height: 1;
            ${mq().s} {
              font-size: var(--fs-72);
            }
          }
          &:last-of-type {
            font-weight: 400;
            line-height: 1.25;
            margin-top: 0.25em;
          }
        }
      }
      div[data-stats] {
        font-size: var(--fs-24);
        margin-bottom: 4em;
        ${mq().s} {
          font-size: var(--fs-21);
          margin-bottom: 3em;
        }
        ${i + 1 === page.statGroups.length &&
        css`
          margin-bottom: 6em;
        `}
      }
      h5 {
        position: relative;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0.333em 0;
        border-top: 2px solid #ffffff33;
        &:last-of-type {
          border-bottom: 2px solid #ffffff33;
        }
        span {
          display: block;
          &:first-of-type {
            font-family: var(--display-font);
            font-size: var(--fs-72);
            line-height: 1;
            margin-right: 0.25em;
            align-self: flex-start;
            ${mq().s} {
              font-size: var(--fs-48);
              margin-right: 0.5em;
            }
          }
          &:last-of-type {
            font-weight: 400;
            line-height: 1.25;
          }
        }
      }
      div[data-image-container] {
        position: absolute;
        height: 100%;
        width: 100%;
        background: ${getStatColorGradient(i)?.split(',')[0]};
        z-index: 2;
        div[data-gatsby-image-wrapper] {
          height: 100%;
        }
        grid-row: 1 / 5;
        ${mq().s} {
          grid-row: 1 / 3;
        }
        ${mq().s} {
          height: calc(100% - 2 * var(--gtr-m));
        }
        ${i + 1 === page.statGroups.length &&
        css`
          height: calc(100% - var(--gtr-m));
        `}
      }
      ${i % 2 !== 0 &&
      css`
        padding: var(--gtr-m) 0;
        h3,
        h4 {
          grid-column: 2 / span 6;
          margin-right: var(--gtr-s);
        }
        div[data-stats] {
          grid-column: span 6 / -2;
          grid-row: 1 / 4;
          margin-top: 4em;
        }
        ${mq().s} {
          h3,
          h4 {
            grid-column: 2 / -2;
          }
          h4 {
            margin-bottom: 1.5em;
          }
          div[data-stats] {
            grid-column: 2 / -2;
            grid-row: auto;
            margin-top: 0;
          }
        }
      `}
      ${i % 2 === 0 &&
      css`
        z-index: 2;
        margin-top: calc(-1 * var(--gtr-m) - 1px);
        h4 {
          margin-bottom: 1.5em;
        }
        ${mq().s} {
          &:after {
            display: block;
            content: '';
            position: absolute;
            width: calc(100% + var(--gtr-m));
            height: 100%;
            top: 0;
            grid-row: 2 / 5;
            background-color: ${getStatColorGradient(
              i + page.statGroups.length - 1
            )?.split(',')[0]};
            z-index: 0;
          }
        }
      `}
      ${i % 4 === 0 &&
      css`
        &:before {
          grid-column: 1 / span 12;
        }
        div[data-image-container] {
          grid-column: span 7 / -1;
          transform: translateY(var(--gtr-m));
        }
        h3,
        h4,
        div[data-stats] {
          grid-column: 2 / span 6;
          margin-right: var(--gtr-s);
        }
        ${mq().s} {
          &:before {
            grid-column: 1 / span 13;
          }
          &:after {
            grid-column: -2 / -1;
            right: 0;
          }
          div[data-stats] {
            margin-top: 1em;
            margin-right: var(--margin);
            grid-column: 2 / -2;
          }
        }
      `}
      ${i % 4 === 2 &&
      css`
        &:before {
          grid-column: span 12 / -1;
        }
        div[data-image-container] {
          grid-column: 1 / span 7;
          transform: translateY(var(--gtr-m));
        }
        h3,
        h4,
        div[data-stats] {
          grid-column: span 6 / -2;
          margin-left: var(--gtr-s);
        }
        ${mq().s} {
          &:before {
            grid-column: span 13 / -1;
          }
          &:after {
            grid-column: 1 / 2;
            left: 0;
          }
          div[data-stats] {
            margin-top: 1em;
            margin-left: var(--margin);
            grid-column: 2 / -2;
          }
        }
      `}
    `,
  }
  return (
    <Layout>
      <PageHero title={page.title} image={page.heroImage} />
      <PageIntro intro={page.intro} css={styles.intro} />
      <section css={styles.graphicsSection}>
        {page.graphics.map((graphic, i) => (
          <VectorGraphic data={graphic} key={i} />
        ))}
      </section>
      <section>
        <div css={styles.statsIntro}>
          <h2>{page.statsHeading}</h2>
          <StructuredText data={page.statsIntro} />
        </div>
        {page.statGroups.map((group, i) => (
          <div key={i} css={styles.statGroup(i)}>
            <h3>{group.heading}</h3>
            <h4>
              <span>{group.featuredStat[0].number}</span>
              <span>{group.featuredStat[0].text}</span>
            </h4>
            <div data-stats>
              {group.stats.map((stat, i) => (
                <h5 key={i}>
                  <span>{stat.number}</span>
                  <span>{stat.text}</span>
                </h5>
              ))}
            </div>
            {!(i % 2) && page.statImages[i / 2] && (
              <GatsbyImageFocused
                data-image-container
                image={page.statImages[i / 2].gatsbyImageData}
                alt={page.statImages[i / 2].alt || ''}
                aspectRatio={1}
                originalAspectRatio={
                  page.statImages[i / 2].sizes.aspectRatio
                }
                focalPoint={page.statImages[i / 2].focalPoint}
              />
            )}
          </div>
        ))}
      </section>
    </Layout>
  )
}

export const Head = ({
  data: {
    page: { title, seo },
  },
}: HeadProps<DataProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description}
    imageUrl={seo?.image?.url}
  />
)

export const data = graphql`
  query {
    page: datoCmsImpactPage {
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
      graphics {
        ...VectorGraphicFragment
      }
      statsHeading
      statsIntro {
        value
      }
      statGroups {
        heading
        featuredStat {
          number
          text
        }
        stats {
          number
          text
        }
      }
      statImages {
        gatsbyImageData(
          width: 960
          imgixParams: {
            q: 50
            ar: "1:1"
            fit: "crop"
            crop: "focalpoint"
          }
        )
        ...ImageFocalData
      }
      seo {
        ...SEOFragment
      }
    }
  }
`

export default ImpactPage
