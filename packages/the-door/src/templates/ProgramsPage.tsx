import { css } from '@emotion/react'
import {
  Anchor,
  IAnchorLink,
} from '@the-door/common/src/components/AnchorLink'
import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import PageHero from '@the-door/common/src/components/PageHero'
import PageIntro from '@the-door/common/src/components/PageIntro'
import PageNav from '@the-door/common/src/components/PageNav'
import ProgramBlock, {
  IProgram,
} from '@the-door/common/src/components/ProgramBlock'
import { ISEO } from '@the-door/common/src/types'
import { renderDescription } from '@the-door/common/src/utils'
import { Document } from 'datocms-structured-text-utils'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { Fragment } from 'react'

import Seo from '../components/Seo'
import { colors } from '../theme/variables'

interface DataProps {
  page: {
    title: string
    heroImage: IGatsbyImageFocused
    intro: {
      value: Document
    }
    seo?: ISEO
    programGroups: {
      heading: string
      programs: IProgram[]
    }[]
  }
}

const ProgramsPage = ({
  data: {
    page: { title, heroImage, intro, programGroups },
  },
}: PageProps<DataProps>): JSX.Element => {
  const styles = {
    programGroup: css`
      padding: 0 var(--margin) var(--row-s);
      h2 {
        color: ${colors.purple};
        font-size: var(--fs-36);
        text-transform: uppercase;
        letter-spacing: 0.01em;
        line-height: 1.125;
        margin: 0 0 0.5em;
        padding-bottom: 0.75em;
        border-bottom: 1px solid #aaa;
      }
    `,
    program: css`
      margin-left: var(--gtr-m);
      border-bottom: 1px solid #aaa;
      &:last-of-type {
        border-bottom: none;
      }
      a {
        @media (hover: hover) {
          &:hover {
            color: ${colors.pink};
          }
        }
      }
    `,
  }
  return (
    <Fragment>
      <PageHero
        title={title}
        image={heroImage}
      />
      <PageNav
        links={programGroups.map(
          group =>
            ({
              linkText: group.heading,
            } as IAnchorLink)
        )}
      />
      <PageIntro intro={intro} />
      {programGroups.map((programGroup, i) => (
        <section
          key={i}
          css={styles.programGroup}
        >
          <Anchor id={programGroup.heading} />
          <h2>{programGroup.heading}</h2>
          <div>
            {programGroup.programs.map((program, i) => (
              <ProgramBlock
                css={styles.program}
                program={program}
                key={i}
                headingLevel={3}
                theme={'Light'}
                highlightColor={colors.purple}
              />
            ))}
          </div>
        </section>
      ))}
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
    page: datoCmsProgramsPage {
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
      programGroups {
        ...CatalogGroupFragment
      }
      seo {
        ...SEOFragment
      }
    }
  }
`

export default ProgramsPage
