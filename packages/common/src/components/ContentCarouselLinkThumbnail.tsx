import { css } from '@emotion/react'
import { Block } from 'datocms-structured-text-utils'
import { rgba } from 'polished'
import { HTMLAttributes, useContext, useMemo } from 'react'

import ThemeContext from '../context/ThemeContext'
import { mq } from '../theme/mixins'
import { doorColors } from '../theme/variables'

export interface ICarouselLink extends Block {
  __typename: 'DatoCmsCarouselLink'
  title: string
  categorization?: string
  date?: string
  linkType: 'Document' | 'External Link'
  document?: {
    url: string
  }
  url?: string
}

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  link: ICarouselLink
  highlightColor: string
}

const ContentCarouselLinkThumbnail = ({
  link,
  highlightColor,
  ...props
}: Props) => {
  const date = link.date && new Date(link.date)
  const { theme } = useContext(ThemeContext)
  const colors = useMemo(() => {
    if (theme === 'The Door') {
      return {
        bg: doorColors.gray95,
        title: '#444',
        date: '#888',
        shadow: rgba(doorColors.navy, 0.15),
        shadowHover: highlightColor,
      }
    }
  }, [highlightColor, theme])
  const styles = {
    container: css`
      position: relative;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      background: ${colors?.bg};
      justify-items: flex-start;
      text-decoration: none;
      padding: 1em 1em 2em;
      box-sizing: border-box;
      cursor: pointer;
      box-shadow: -1rem 1rem 0 ${colors?.shadow};
      transition: box-shadow 300ms ease;
      @media (hover: hover) {
        &:hover {
          box-shadow: -1rem 1rem 0 ${colors?.shadowHover};
        }
      }
      ${mq().s} {
        grid-template-columns: 1fr;
      }
    `,
    title: css`
      order: 2;
      font-size: var(--fs-30);
      color: ${colors?.title};
      margin: 0.125em 0 0;
      line-height: 1;
      ${mq().s} {
        font-size: var(--fs-24);
      }
    `,
    details: css`
      order: 1;
      h4 {
        font-size: var(--fs-15);
        text-transform: uppercase;
        font-weight: 500;
        display: inline-block;
        color: ${colors?.date};
        margin: 0;
        &:nth-of-type(1) {
          margin-right: 0.75em;
          color: ${highlightColor};
        }
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
        a:hover > div > & {
          transform: scale3d(1.05, 1.05, 1);
        }
      }
    `,
  }
  return (
    <a
      href={
        link.linkType === 'Document'
          ? link.document?.url
          : link.linkType === 'External Link'
          ? link.url
          : ''
      }
      css={styles.container}
      {...props}
    >
      <h3 css={styles.title}>{link.title}</h3>
      <div css={styles.details}>
        <h4>{link.categorization}</h4>
        {date && (
          <h4>
            {date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'America/New_York',
            })}
          </h4>
        )}
      </div>
    </a>
  )
}

export default ContentCarouselLinkThumbnail
