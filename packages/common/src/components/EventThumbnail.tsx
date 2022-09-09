import { css } from '@emotion/react'
import { rgba } from 'polished'
import { HTMLAttributes, useContext, useMemo } from 'react'

import ThemeContext from '../context/ThemeContext'
import { formateDateTimeRange } from '../helpers'
import useReadableColor from '../hooks/useReadableColor'
import { doorColors } from '../theme/variables'
import { IEvent } from './Event'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  event: IEvent
  highlightColor?: string
}

const EventThumbnail = ({
  event,
  highlightColor = '#666',
  ...props
}: Props) => {
  const startDate = new Date(event.startDateTime)

  const dateColor = useReadableColor(highlightColor, highlightColor, 2)
  const { theme } = useContext(ThemeContext)
  const colors = useMemo(() => {
    if (theme === 'The Door') {
      return {
        bg: doorColors.gray95,
        title: '#444',
        text: '#444',
        details: '#888',
        shadow: rgba(doorColors.navy, 0.15),
        shadowHover: dateColor,
      }
    }
  }, [theme, dateColor])
  const styles = {
    container: css`
      position: relative;
      display: grid;
      text-decoration: none;
      grid-template-columns: auto 1fr;
      background: ${colors?.bg};
      color: ${colors?.text};
      box-shadow: -1rem 1rem 0 ${colors?.shadow};
      transition: box-shadow 300ms ease;
      @media (hover: hover) {
        &:hover {
          box-shadow: -1rem 1rem 0 ${colors?.shadowHover};
        }
      }
    `,
    title: css`
      font-size: var(--fs-30);
      color: ${colors?.title};
      margin: 0 0 0.25em;
    `,
    details: css`
      color: ${colors?.details};
      font-size: var(--fs-15);
      font-weight: 500;
      margin: 0.25em 0;
    `,
    inlineDate: css`
      text-transform: uppercase;
    `,
    location: css`
      font-style: italic;
    `,
    text: css`
      padding: 1rem 1.5rem;
    `,
    date: css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      background-color: ${highlightColor};
      color: ${dateColor};
      font-size: var(--fs-48);
      font-family: var(--display-font);
      text-transform: uppercase;
      line-height: 0.8;
      margin: 0;
      padding: 1rem;
      > span {
        &:nth-of-type(2) {
          font-size: 175%;
        }
        &:nth-of-type(3) {
          font-size: 80%;
          line-height: 1;
        }
      }
    `,
  }
  return (
    <a
      href={`/events/${event.slug}/`}
      css={styles.container}
      {...props}
    >
      <div css={styles.date}>
        <span>
          {startDate.toLocaleDateString('en-US', {
            month: 'short',
          })}
        </span>
        <span>
          {startDate.toLocaleDateString('en-US', {
            day: '2-digit',
          })}
        </span>
        <span>
          {startDate.toLocaleDateString('en-US', {
            year: 'numeric',
          })}
        </span>
      </div>
      <div css={styles.text}>
        <h3 css={styles.title}>{event.title}</h3>
        <h4 css={[styles.details, styles.inlineDate]}>
          {formateDateTimeRange(event.startDateTime, event.endDateTime)}
        </h4>
        <h4 css={[styles.details, styles.location]}>
          {event.location === 'Off Campus'
            ? event.offCampusLocation
            : event.location}
        </h4>
      </div>
    </a>
  )
}

export default EventThumbnail
