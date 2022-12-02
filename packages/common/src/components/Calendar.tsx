import { css } from '@emotion/react'
import { rgba } from 'polished'
import { Fragment, useEffect, useMemo, useState } from 'react'

import useThemeContext from '../context/ThemeContext'
import useReadableColor from '../hooks/useReadableColor'
import { doorColors } from '../theme/variables'
import EventArticle, { IEvent } from './Event__Article'
import EventThumbnailInnards from './Event__Thumbnail_Innards'

interface Props {
  title: string
  events: IEvent[]
}

const Calendar = ({ title, events }: Props): JSX.Element => {
  const { theme } = useThemeContext()
  const locations = useMemo(() => {
    switch (theme) {
      case 'The Door':
        return [
          'All Locations',
          'Manhattan Youth Center',
          'Bronx Youth Center',
          'Off Campus',
        ]
    }
  }, [theme])
  const colors = useMemo(() => {
    const defaultColors = {
      text: '#444',
      textMid: '#666',
      textLight: '#888',
      highlight: '',
      bg: '',
      bgShade: '',
    }
    switch (theme) {
      case 'The Door':
        return {
          ...defaultColors,
          highlight: doorColors.blue,
          bg: doorColors.gray95,
          bgShade: doorColors.gray92,
        }
      default:
        return defaultColors
    }
  }, [theme])
  const readableHighlight = useReadableColor(colors.highlight, colors.bg)
  const tags = useMemo(() => {
    let tagArray = events
      .map(event => event.tags)
      .flat(1)
      .sort((a, b) => a.position - b.position)
      .map(tag => tag.name)
    console.log(tagArray)
    return ['All Events', ...new Set(tagArray)]
  }, [events])
  const [locationFilter, setLocationFilter] = useState<string | null>(null)
  const [tagFilter, setTagFilter] = useState<string | null>(null)

  useEffect(() => {
    if (!locationFilter && locations) {
      setLocationFilter(locations[0])
    }
    if (!tagFilter && tags) {
      setTagFilter(tags[0])
    }
  }, [locations, locationFilter, tags, tagFilter])

  const filteredEvents = useMemo(() => {
    const byLocation = () => {
      if (locations && locationFilter && locationFilter !== locations[0]) {
        return events.filter(event => event.location === locationFilter)
      } else return events
    }
    const byTag = () => {
      if (tagFilter && tagFilter !== tags[0]) {
        return events.filter(
          event =>
            tagFilter && event.tags.map(tag => tag.name).includes(tagFilter)
        )
      } else return events
    }
    return byLocation().filter(value => byTag().includes(value))
  }, [locationFilter, tagFilter, events])

  const [activeEvent, setActiveEvent] = useState<IEvent | null>(null)
  useEffect(() => {
    if (filteredEvents) {
      if (!activeEvent || !filteredEvents.includes(activeEvent)) {
        setActiveEvent(filteredEvents[0])
      }
    }
  }, [filteredEvents])

  const styles = {
    container: css`
      height: calc(100vh - var(--nav-height, 0) - var(--alert-height, 0));
      overflow: hidden;
      display: grid;
      grid-template-columns: 2fr 3fr 5fr;
      grid-template-rows: auto 1fr;
    `,
    title: css`
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      background: ${colors.highlight};
      color: #fff;
      font-size: var(--fs-48);
      line-height: 1;
      margin: 0;
      padding: 0.5em var(--gtr-m) 0.25em var(--gtr-m);
    `,
    filtersColumn: css`
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;
      grid-column: 1 / 2;
      grid-row: 2 / 3;
      background: ${colors.bgShade};
      padding: 0.5em var(--gtr-m) 0.5em var(--gtr-m);
      box-sizing: border-box;
    `,
    filterGroup: css`
      font-size: var(--fs-18);
      padding: 1em 0;
      &:not(:last-of-type) {
        border-bottom: 1px solid ${colors.textLight};
      }
    `,
    filter: (active: boolean) => css`
      display: block;
      color: ${colors.text};
      padding: 0.5em 0;
      transition: color 300ms ease;
      ${active &&
      css`
        font-weight: 700;
        color: ${readableHighlight};
      `};
      @media (hover: hover) {
        &:hover {
          color: ${readableHighlight};
        }
      }
    `,
    eventsColumn: css`
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;
      grid-column: 2 / 3;
      grid-row: 1 / 3;
      background: ${colors.bg};
      padding: 2em var(--gtr-m) var(--row-s);
      box-sizing: border-box;
    `,
    eventThumb: (active: boolean) => css`
      display: flex;
      text-align: left;
      position: relative;
      padding: 1em 0;
      width: 100%;
      box-sizing: border-box;
      border-top: 1px solid ${rgba(colors.text, 0.25)};
      &:last-of-type {
        border-bottom: 1px solid ${rgba(colors.text, 0.25)};
      }
      &:before {
        display: block;
        content: '';
        position: absolute;
        left: calc(-0.5 * var(--gtr-m));
        width: calc(100% + var(--gtr-m));
        top: 0.5em;
        height: calc(100% - 1em);
        transition: background-color 300ms ease;
        ${active &&
        css`
          background: ${colors.bgShade};
        `}
      }
      @media (hover: hover) {
        &:hover {
          &:before {
            background: ${colors.bgShade};
          }
        }
      }
      h2 {
        transition: color 300ms ease;
        ${active &&
        css`
          color: ${readableHighlight};
        `}
      }
    `,
    activeEventColumn: css`
      height: 100%;
      overflow: auto;
      grid-column: 3 / 4;
      grid-row: 1 / 3;
    `,
  }
  return (
    <div css={styles.container}>
      <h1 css={styles.title}>{title}</h1>
      <section css={styles.filtersColumn}>
        {locations && (
          <div css={styles.filterGroup}>
            {locations.map((location, i) => (
              <button
                key={i}
                onClick={() => setLocationFilter(location)}
                css={styles.filter(location === locationFilter)}
              >
                {location}
              </button>
            ))}
          </div>
        )}
        {tags && (
          <div css={styles.filterGroup}>
            {tags.map((tag, i) => (
              <button
                key={i}
                onClick={() => setTagFilter(tag)}
                css={styles.filter(tag === tagFilter)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </section>
      <section css={styles.eventsColumn}>
        {filteredEvents.map((event, i) => (
          <button
            key={i}
            onClick={() => setActiveEvent(event)}
            css={styles.eventThumb(event === activeEvent)}
          >
            <EventThumbnailInnards
              headingLevel={2}
              event={event}
              layout="Calendar"
            />
          </button>
        ))}
      </section>
      <section css={styles.activeEventColumn}>
        {activeEvent && (
          <EventArticle
            data={activeEvent}
            layout="Calendar"
            highlightColor={colors.highlight}
          />
        )}
      </section>
    </div>
  )
}

export default Calendar
