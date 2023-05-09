import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { rgba } from 'polished'
import { ElementType } from 'react'

import { mq } from '../theme/mixins'
import { ITheme } from './Layout'
import { ILeader } from './Leader__Profile'
import LightboxLink from './Lightbox__Link'

interface Props {
  data: ILeader
  headingLevel?: number
  highlightColor: string
}

const LeaderThumbnail = ({
  data,
  headingLevel = 3,
  highlightColor,
}: Props): JSX.Element => {
  const Heading = `h${headingLevel}` as ElementType
  const Subheading = `h${headingLevel + 1}` as ElementType
  const theme = useTheme() as ITheme
  const styles = {
    link: css`
      display: flex;
      flex-direction: column;
      background: ${theme.gray95};
      box-shadow: calc(-1 * var(--shadow-offset)) var(--shadow-offset) 0
        ${rgba(theme.primary, 0.15)};
      transition: box-shadow 300ms ease;
      @media (hover: hover) {
        &:hover {
          box-shadow: calc(-1 * var(--shadow-offset-hover))
            var(--shadow-offset-hover) 0 ${highlightColor};
        }
      }
    `,
    heading: css`
      font-size: var(--fs-24);
      font-family: var(--body-font);
      margin: 0.5em 1.5rem 0.25em;
      text-align: center;
      color: ${highlightColor};
      ${mq().s} {
        font-size: var(--fs-21);
        margin: 0.5em 1rem 0.25em;
      }
    `,
    subheading: css`
      font-size: var(--fs-16);
      font-family: var(--body-font);
      margin: 0 1.5rem 1.5em;
      text-align: center;
      font-weight: 400;
      font-style: italic;
      color: #666;
      ${mq().s} {
        font-size: var(--fs-14);
        margin: 0 1rem 1em;
      }
    `,
    imageWrap: css`
      position: relative;
      z-index: 1;
      overflow: hidden;
    `,
    image: css`
      transition: transform 500ms ease;
      min-height: 100%;
      @media (hover: hover) {
        a:hover > div > div > & {
          transform: scale3d(1.05, 1.05, 1);
        }
      }
    `,
  }
  return (
    <LightboxLink
      slugPrefix="/leadership/"
      pageTitle={`${data.name}, ${data.title}`}
      highlightColor={highlightColor}
      link={
        <div css={styles.link}>
          <div css={styles.imageWrap}>
            <GatsbyImage
              image={data.headshot.gatsbyImageData}
              alt={data.headshot.alt || `${data.name} | ${data.title}`}
              css={styles.image}
            />
          </div>
          <Heading css={styles.heading}>{data.name}</Heading>
          <Subheading css={styles.subheading}>{data.title}</Subheading>
        </div>
      }
      data={data}
    />
  )
}

export default LeaderThumbnail
