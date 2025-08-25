import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { rgba } from 'polished'
import { HTMLAttributes } from 'react'

import useReadableColor from '../hooks/useReadableColor'
import { IEvent } from './Event__Article'
import EventThumbnailInnards from './Event__Thumbnail_Innards'
import { ITheme } from './Layout'
import LightboxLink from './Lightbox__Link'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  event: IEvent
  highlightColor?: string
  headingLevel?: number
  layout?: 'Carousel' | 'Home Calendar' | 'Calendar'
}

const EventThumbnail = ({
  event,
  highlightColor,
  layout = 'Carousel',
  headingLevel = 3,
  ...props
}: Props): JSX.Element => {
  const theme = useTheme() as ITheme
  const highlight = highlightColor || theme.quaternary
  const dateColor = useReadableColor(highlight, highlight, 2)
  const styles = {
    container: css`
      position: relative;
      display: grid;
      text-decoration: none;
      grid-template-columns: auto 1fr;
      background: ${layout === 'Home Calendar' ? 'transparent' : theme.gray95};
      color: #444;
      ${layout === 'Carousel' &&
      css`
        margin-bottom: var(--shadow-offset-hover);
        box-shadow: calc(-1 * var(--shadow-offset)) var(--shadow-offset) 0
          ${rgba(theme.primary, 0.15)};
        transition: box-shadow 300ms ease;
        @media (hover: hover) {
          &:hover {
            box-shadow: calc(-1 * var(--shadow-offset-hover))
              var(--shadow-offset-hover) 0 ${dateColor};
          }
        }
      `}
      ${layout === 'Home Calendar' &&
      css`
        padding: 0.25rem 0;
        border-bottom: 1px solid #ddd;
        &:last-of-type {
          border: none;
          margin-bottom: 2rem;
        }
      `}
      > span {
        display: contents;
      }
    `,
  }
  return (
    <LightboxLink
      css={styles.container}
      slugPrefix="/events/"
      data={event}
      highlightColor={highlightColor}
      link={
        <EventThumbnailInnards
          event={event}
          highlightColor={highlightColor}
          layout={layout}
          headingLevel={headingLevel}
        />
      }
      {...props}
    />
  )
}

export default EventThumbnail
