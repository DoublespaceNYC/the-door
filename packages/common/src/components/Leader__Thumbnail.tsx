import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { rgba } from 'polished'
import { ElementType } from 'react'

import useThemeContext from '../context/ThemeContext'
import { mq } from '../theme/mixins'
import { doorColors } from '../theme/variables'
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
  const { theme } = useThemeContext()
  const setColors = () => {
    const defaultColors = {
      bg: '#f2f2f2',
      shadow: rgba('#444', 0.15),
      shadowHover: highlightColor || '#444',
    }
    switch (theme) {
      case 'The Door':
        return {
          bg: doorColors.gray95,
          shadow: rgba(doorColors.navy, 0.15),
          shadowHover: highlightColor,
        }
      default:
        return defaultColors
    }
  }
  const colors = setColors()
  const styles = {
    link: css`
      display: flex;
      flex-direction: column;
      background: ${colors.bg};
      box-shadow: calc(-1 * var(--shadow-offset)) var(--shadow-offset) 0
        ${colors.shadow};
      transition: box-shadow 300ms ease;
      @media (hover: hover) {
        &:hover {
          box-shadow: calc(-1 * var(--shadow-offset-hover))
            var(--shadow-offset-hover) 0 ${colors.shadowHover};
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
      content={data}
    />
  )
}

export default LeaderThumbnail
