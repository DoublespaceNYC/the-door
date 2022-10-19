import { css } from '@emotion/react'
import { rgba } from 'polished'
import { ElementType, Fragment, HTMLAttributes } from 'react'

import useThemeContext from '../context/ThemeContext'
import { formatTimeRange } from '../helpers'
import useReadableColor from '../hooks/useReadableColor'
import { mq } from '../theme/mixins'
import { doorColors } from '../theme/variables'
import { IEvent } from './Event__Article'
import LightboxLink from './Lightbox__Link'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  event: IEvent
  highlightColor?: string
  headingLevel?: number
  layout?: 'Carousel' | 'Home Calendar'
}

const EventThumbnail = ({
  event,
  highlightColor,
  layout = 'Carousel',
  headingLevel = 3,
  ...props
}: Props): JSX.Element => {
  const startDate = new Date(event.startDateTime)
  const Heading = `h${headingLevel}` as ElementType
  const Subheading = `h${headingLevel + 1}` as ElementType

  const { theme } = useThemeContext()
  const setColors = () => {
    switch (theme) {
      case 'The Door':
        return {
          bg:
            layout === 'Home Calendar'
              ? 'transparent'
              : doorColors.gray95,
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
        box-shadow: calc(-1 * var(--shadow-offset)) var(--shadow-offset)
          0 ${colors?.shadow};
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
    title: css`
      font-size: var(--fs-30);
      font-family: var(--display-font);
      line-height: 1.125;
      color: ${colors?.title};
      margin: 0 0 0.25em;
      ${mq().s} {
        font-size: var(--fs-24);
      }
      ${layout === 'Home Calendar' &&
      css`
        font-size: var(--fs-24);
        margin: 0 0 0.125em;
        transition: color 300ms ease;
        @media (hover: hover) {
          a:hover > div > & {
            color: ${colors?.highlight};
          }
        }
      `}
    `,
    details: css`
      color: ${colors?.details};
      font-size: var(--fs-15);
      font-family: var(--body-font);
      font-weight: 500;
      margin: 0.25em 0;
      ${mq().s} {
        font-size: var(--fs-13);
      }
      ${layout === 'Home Calendar' &&
      css`
        font-size: var(--fs-14);
        transition: color 300ms ease;
        @media (hover: hover) {
          a:hover > div > & {
            color: ${colors?.highlight};
          }
        }
      `}
    `,
    inlineDate: css`
      text-transform: uppercase;
    `,
    location: css`
      font-style: italic;
    `,
    text: css`
      padding: 0.75em 1em;
      ${layout === 'Home Calendar' &&
      css`
        padding: 0.5em 0 0.5em 0.75em;
      `}
    `,
    date: css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      background-color: ${highlightColor || colors?.highlight};
      color: ${dateColor};
      font-size: var(--fs-48);
      font-family: var(--display-font);
      text-transform: uppercase;
      line-height: 0.8;
      margin: 0;
      padding: 0.333em;
      max-width: 3ch;
      overflow: hidden;
      > span {
        &:nth-of-type(1) {
          font-size: 90%;
        }
        &:nth-of-type(2) {
          font-size: 167%;
          margin: 0 0 0.02em;
        }
      }
      ${mq().ml} {
        font-size: var(--fs-36);
        padding: 0.5em 0.333em;
      }
      ${mq().ms} {
        font-size: var(--fs-30);
        padding: 0.67em 0.333em;
      }
      ${mq().s} {
        font-size: var(--fs-24);
      }
      ${layout === 'Home Calendar' &&
      css`
        font-size: var(--fs-21);
        padding: 0.5em 0.333em;
        max-width: 3.25ch;
        box-sizing: border-box;
        overflow: visible;
        align-self: flex-start;
        background-color: transparent;
        color: ${colors?.homeDate};
        transition: color 300ms ease;
        @media (hover: hover) {
          a:hover > & {
            color: ${colors?.highlight};
          }
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
        <Fragment>
          <div css={styles.date}>
            <span>
              {startDate.toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </span>
            <span>
              {startDate.toLocaleDateString('en-US', {
                day: '2-digit',
              })}
            </span>
            <span>
              {startDate.toLocaleDateString('en-US', {
                month: 'short',
              })}
            </span>
          </div>

          <div css={styles.text}>
            <Heading css={styles.title}>{event.title}</Heading>
            <Subheading css={[styles.details, styles.inlineDate]}>
              {formatTimeRange(event.startDateTime, event.endDateTime)}
            </Subheading>
            <Subheading css={[styles.details, styles.location]}>
              {event.location === 'Off Campus'
                ? event.offCampusLocation
                : event.location}
            </Subheading>
          </div>
        </Fragment>
      }
      {...props}
    />
  )
}

export default EventThumbnail
