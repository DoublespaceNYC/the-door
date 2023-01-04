import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { Block } from 'datocms-structured-text-utils'
import { rgba } from 'polished'
import { Fragment, HTMLAttributes } from 'react'

import { mq } from '../theme/mixins'
import DocumentIcon from './DocumentIcon'
import ExternalLinkIcon from './ExternalLinkIcon'
import { ITheme } from './Layout'

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
}: Props): JSX.Element => {
  const date = link.date && new Date(link.date)
  const theme = useTheme() as ITheme

  const styles = {
    container: css`
      position: relative;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      background: ${theme.gray95};
      justify-items: flex-start;
      text-decoration: none;
      padding: 1em 1em 2em;
      box-sizing: border-box;
      cursor: pointer;
      margin-bottom: var(--shadow-offset-hover);
      box-shadow: calc(-1 * var(--shadow-offset)) var(--shadow-offset) 0
        ${rgba(theme.primary, 0.15)};
      transition: box-shadow 300ms ease;
      @media (hover: hover) {
        &:hover {
          box-shadow: calc(-1 * var(--shadow-offset-hover))
            var(--shadow-offset-hover) 0 ${highlightColor};
        }
      }
      ${mq().s} {
        grid-template-columns: 1fr;
      }
    `,
    title: css`
      order: 2;
      font-size: var(--fs-30);
      color: #444;
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
        color: #888;
        margin: 0;
        &:nth-of-type(1) {
          color: ${highlightColor};
        }
        ${mq().s} {
          font-size: var(--fs-13);
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
    icon: css`
      font-size: 90%;
    `,
  }
  return (
    <a
      href={
        link.linkType === 'Document'
          ? link.document?.url
          : link.linkType === 'External Link'
          ? link.url
          : '/'
      }
      rel="noreferrer"
      target="_blank"
      css={styles.container}
      {...props}
    >
      <h3 css={styles.title}>{link.title}</h3>
      <div css={styles.details}>
        <h4>
          {link.categorization}
          {link.linkType === 'Document' ? (
            <Fragment>
              &#8196;
              <DocumentIcon css={styles.icon} />
            </Fragment>
          ) : link.linkType === 'External Link' ? (
            <Fragment>
              &#8196;
              <ExternalLinkIcon css={styles.icon} />
            </Fragment>
          ) : (
            '/'
          )}
        </h4>
        &#8194;
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
