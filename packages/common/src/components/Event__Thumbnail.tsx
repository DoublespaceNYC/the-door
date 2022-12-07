import { css } from '@emotion/react'
import { rgba } from 'polished'
import { HTMLAttributes } from 'react'

import useThemeContext from '../context/ThemeContext'
import useReadableColor from '../hooks/useReadableColor'
import { doorColors } from '../theme/variables'
import { IEvent } from './Event__Article'
import EventThumbnailInnards from './Event__Thumbnail_Innards'
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
  const { theme } = useThemeContext()
  const setColors = () => {
    switch (theme) {
      case 'The Door':
        return {
          bg: layout === 'Home Calendar' ? 'transparent' : doorColors.gray95,
          title: '#444',
          text: '#444',
          details: '#888',
          shadow: rgba(doorColors.navy, 0.15),
          divider: '#ddd',
          homeDate: doorColors.gray66,
          highlight: doorColors.yellow,
        }
    }
  }
  const colors = setColors()
  const dateColor = useReadableColor(
    highlightColor || colors?.highlight || '#666',
    highlightColor || colors?.highlight || '#666',
    2
  )
  const styles = {
    container: css`
      position: relative;
      display: grid;
      text-decoration: none;
      grid-template-columns: auto 1fr;
      background: ${colors?.bg};
      color: ${colors?.text};
      ${layout === 'Carousel' &&
      css`
        margin-bottom: var(--shadow-offset-hover);
        box-shadow: calc(-1 * var(--shadow-offset)) var(--shadow-offset) 0
          ${colors?.shadow};
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
        border-bottom: 1px solid ${colors?.divider};
        &:last-of-type {
          border: none;
          margin-bottom: 2rem;
        }
      `}
    `,
  }
  return (
    <LightboxLink
      css={styles.container}
      slugPrefix="/events/"
      content={event}
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
