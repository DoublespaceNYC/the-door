import { css } from '@emotion/react'
import Accordion from '@the-door/common/src/components/Accordion'
import AdvisoryMember, {
  IAdvisoryMember,
} from '@the-door/common/src/components/AdvisoryMember'
import {
  Anchor,
  IAnchorLink,
} from '@the-door/common/src/components/AnchorLink'
import { IBoardMember } from '@the-door/common/src/components/BoardProfile'
import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import { ILeader } from '@the-door/common/src/components/Leader__Profile'
import LeaderThumbnail from '@the-door/common/src/components/Leader__Thumbnail'
import PageHero from '@the-door/common/src/components/PageHero'
import PageIntro from '@the-door/common/src/components/PageIntro'
import PageNav from '@the-door/common/src/components/PageNav'
import { baseGrid, mq } from '@the-door/common/src/theme/mixins'
import { render } from 'datocms-structured-text-to-plain-text'
import { Document } from 'datocms-structured-text-utils'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { rgba } from 'polished'
import { StructuredText } from 'react-datocms'

import Layout from '../components/Layout'
import Seo, { ISEO } from '../components/Seo'
import { colors } from '../theme/variables'

type QueryProps = {
  page: {
    title: string
    heroImage: IGatsbyImageFocused
    intro: {
      value: Document
    }
    leadershipAnchor: [IAnchorLink]
    leadershipHeading: string
    leadershipBody: {
      value: Document
    }
    boardAnchor: [IAnchorLink]
    boardHeading: string
    advisoryAnchor: [IAnchorLink]
    advisoryHeading: string
    seo: ISEO
  }
  leaders: { nodes: ILeader[] }
  boardOfficers: { nodes: IBoardMember[] }
  boardDirectors: { nodes: IBoardMember[] }
  boardHonorary: { nodes: IBoardMember[] }
  advisory: { nodes: IAdvisoryMember[] }
}

const LeadershipPage = ({
  data: {
    page: {
      title,
      heroImage,
      intro,
      leadershipAnchor,
      leadershipHeading,
      leadershipBody,
      boardAnchor,
      boardHeading,
      advisoryAnchor,
      advisoryHeading,
    },
    leaders,
    boardOfficers,
    boardDirectors,
    boardHonorary,
    advisory,
  },
}: PageProps<QueryProps>): JSX.Element => {
  const styles = {
    leadership: css`
      ${baseGrid}
      margin-bottom: var(--row-l);
      color: #444;
      h2 {
        color: ${colors.pink};
        font-size: var(--fs-72);
        z-index: 2;
        position: relative;
        margin: 0 0 0.167em;
        padding-top: calc(0.333em + 3px);
        grid-column: 2 / span 8;
        &:before {
          content: '';
          position: absolute;
          display: block;
          width: calc(100% + var(--col-w) + var(--gtr-m) * 2);
          height: 3px;
          background: currentColor;
          top: 0;
          left: 0;
        }
        ${mq().m} {
          grid-column: 2 / span 9;
        }
        ${mq().ms} {
          grid-column: 2 / -2;
          width: fit-content;
          &:before {
            width: calc(100% + var(--margin));
            max-width: calc(100vw - 2 * var(--margin));
            left: 0;
            right: 0;
          }
        }
      }
      p {
        grid-column: 2 / span 8;
        margin: 0.5em 0;
        line-height: 1.75;
        max-width: 90ch;
        ${mq().m} {
          grid-column: 2 / span 9;
        }
        ${mq().ms} {
          grid-column: 2 / -2;
        }
      }
    `,
    leadershipGrid: css`
      grid-column: 2 / -2;
      margin-top: var(--row-s);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: var(--gtr-m);
      ${mq().ml} {
        grid-template-columns: repeat(3, 1fr);
      }
      ${mq().ms} {
        grid-template-columns: repeat(2, 1fr);
      }
      > a {
        display: flex;
      }
    `,
    boardSection: css`
      padding: var(--row-s) var(--margin) var(--row-l);
      background: ${colors.gray95};
      h2 {
        font-size: var(--fs-72);
        color: ${colors.purple};
        margin: 0;
        padding: 0.5em 0;
        border-bottom: 2px solid ${rgba('#888', 0.5)};
      }
      h3 {
        color: ${colors.purple};
        font-size: var(--fs-36);
        text-transform: uppercase;
        letter-spacing: 0.01em;
        line-height: 1.125;
        padding: 1em 0;
        margin: 0;
        text-align: left;
      }
    `,
    boardBio: css`
      color: #444;
      margin: 1em 0 2em var(--gtr-m);
      p {
        margin: 1em 0;
        line-height: 1.75;
        max-width: 100ch;
      }
    `,
    honoraryGrid: css`
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: var(--gtr-m);
      ${mq().ml} {
        grid-template-columns: repeat(3, 1fr);
      }
      ${mq().ms} {
        grid-template-columns: repeat(2, 1fr);
      }
      > div {
        border-top: 2px solid ${rgba('#888', 0.5)};
      }
      h4 {
        color: #555;
        font-size: var(--fs-24);
        font-family: var(--body-font);
        letter-spacing: 0;
        text-transform: none;
        margin: 1em 0 0.25em;
        ${mq().s} {
          font-size: var(--fs-21);
        }
      }
      h5 {
        color: #666;
        font-style: italic;
        font-size: var(--fs-16);
        font-family: var(--body-font);
        font-weight: 400;
        margin: 0;
        ${mq().s} {
          font-size: var(--fs-14);
        }
      }
    `,
    advisorySection: css`
      padding: var(--row-s) var(--margin) var(--row-ll);
      h2 {
        font-size: var(--fs-72);
        color: ${colors.teal};
      }
      > div {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: var(--gtr-m);
        ${mq().m} {
          grid-template-columns: 1fr 1fr;
          grid-column-gap: var(--gtr-ml);
        }
        ${mq().s} {
          grid-template-columns: 1fr;
        }
      }
    `,
  }
  return (
    <Layout>
      <PageHero title={title} image={heroImage} />
      <PageNav
        links={[leadershipAnchor[0], boardAnchor[0], advisoryAnchor[0]]}
      />
      <PageIntro intro={intro} />
      <section css={styles.leadership}>
        <Anchor id={leadershipAnchor[0].linkText} />
        <h2>{leadershipHeading}</h2>
        <StructuredText data={leadershipBody} />
        <div css={styles.leadershipGrid}>
          {leaders.nodes.map((leader, i) => (
            <LeaderThumbnail
              data={leader}
              highlightColor={colors.pink}
              key={i}
            />
          ))}
        </div>
      </section>
      <section css={styles.boardSection}>
        <Anchor id={boardAnchor[0].linkText} />
        <h2>{boardHeading}</h2>
        <section>
          <h3>Officers</h3>
          <Accordion
            theme="Light"
            layout="Nested"
            headingLevel={4}
            items={boardOfficers.nodes.map(member => ({
              heading: member.name,
              subheading: member.title,
              contents: (
                <div css={styles.boardBio}>
                  <StructuredText data={member.bio} />
                </div>
              ),
            }))}
          />
        </section>
        <section>
          <h3>Directors</h3>
          <Accordion
            theme="Light"
            layout="Nested"
            headingLevel={4}
            items={boardDirectors.nodes.map(member => ({
              heading: member.name,
              subheading: member.title,
              contents: (
                <div css={styles.boardBio}>
                  <StructuredText data={member.bio} />
                </div>
              ),
            }))}
          />
        </section>
        <section>
          <h3>Honorary Board</h3>
          <div css={styles.honoraryGrid}>
            {boardHonorary.nodes.map((member, i) => (
              <div key={i}>
                <h4>{member.name}</h4>
                {member.title && <h5>{member.title}</h5>}
              </div>
            ))}
          </div>
        </section>
      </section>
      <section css={styles.advisorySection}>
        <Anchor id={advisoryAnchor[0].linkText} />
        <h2>{advisoryHeading}</h2>
        <div>
          {advisory.nodes.map((member, i) => (
            <AdvisoryMember key={i} data={member} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const Head = ({
  data: {
    page: { title, intro, seo },
  },
}: HeadProps<QueryProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description || intro.value ? render(intro) : null}
    imageUrl={seo?.image?.url}
  />
)

export const query = graphql`
  query {
    page: datoCmsLeadershipPage {
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
      leadershipAnchor {
        ...AnchorLinkFragment
      }
      leadershipHeading
      leadershipBody {
        value
      }
      boardAnchor {
        ...AnchorLinkFragment
      }
      boardHeading
      advisoryAnchor {
        ...AnchorLinkFragment
      }
      advisoryHeading
      seo {
        ...SEOFragment
      }
    }
    leaders: allDatoCmsLeader(sort: { position: ASC }) {
      nodes {
        ...LeaderFragment
      }
    }
    boardOfficers: allDatoCmsBoardMember(
      sort: { position: ASC }
      filter: { category: { eq: "Officer" } }
    ) {
      nodes {
        ...BoardMemberFragment
      }
    }
    boardDirectors: allDatoCmsBoardMember(
      sort: { position: ASC }
      filter: { category: { eq: "Director" } }
    ) {
      nodes {
        ...BoardMemberFragment
      }
    }
    boardHonorary: allDatoCmsBoardMember(
      sort: { position: ASC }
      filter: { category: { eq: "Honorary Board" } }
    ) {
      nodes {
        ...BoardMemberFragment
      }
    }
    advisory: allDatoCmsAdvisoryMember(sort: { position: ASC }) {
      nodes {
        ...AdvisoryMemberFragment
      }
    }
  }
`
export default LeadershipPage
