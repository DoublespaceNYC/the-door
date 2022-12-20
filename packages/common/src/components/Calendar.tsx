import { css } from '@emotion/react'
import { rgba } from 'polished'
import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import useThemeContext from '../context/ThemeContext'
import { useElementWidth } from '../hooks/useElementRect'
import useReadableColor from '../hooks/useReadableColor'
import { useWindowWidth } from '../hooks/useWindowDimensions'
import { mq } from '../theme/mixins'
import { breakpoints, doorColors } from '../theme/variables'
import EventArticle, { IEvent } from './Event__Article'
import EventThumbnail from './Event__Thumbnail'
import EventThumbnailInnards from './Event__Thumbnail_Innards'

interface Props {
  title: string
  events: IEvent[] | null
}

const Calendar = ({ title, events }: Props): JSX.Element => {
  const { theme } = useThemeContext()
  const setLocations = () => {
    switch (theme) {
      case 'The Door':
        return [
          'All Locations',
          'Manhattan Youth Center',
          'Bronx Youth Center',
          'Off Campus',
        ]
      default:
        return []
    }
  }
  const locations = setLocations()
  const setColors = () => {
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
  }
  const colors = setColors()
  const readableHighlight = useReadableColor(colors.highlight, colors.bg)
  const tags = useMemo(() => {
    const tagArray = events
      ?.map(event => event.tags)
      .flat(1)
      .sort((a, b) => a.position - b.position)
      .map(tag => tag.name)
    return ['All Events', ...new Set(tagArray)]
  }, [events])
  const [locationFilter, setLocationFilter] = useState<string | null>(null)
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const [activeEvent, setActiveEvent] = useState<IEvent | null>(null)

  const optionsSet = useRef(false)

  const [filteredEvents, setFilteredEvents] = useState<IEvent[] | null>(null)
  useEffect(() => {
    if (events && optionsSet.current) {
      const byLocation = () => {
        if (locations && locationFilter && locationFilter !== locations[0]) {
          return events?.filter(event => event.location === locationFilter)
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
      setFilteredEvents(byLocation().filter(value => byTag().includes(value)))
    }
  }, [locationFilter, tagFilter, events, locations, tags])

  const setOptionsFromParams = useCallback(() => {
    if (events && !optionsSet.current) {
      const searchParams = new URLSearchParams(window.location.search)
      setLocationFilter(searchParams.get('location') || locations[0])
      setTagFilter(searchParams.get('tag') || tags[0])
      setActiveEvent(() => {
        return (
          events.find(event => event.id === searchParams.get('event')) || null
        )
      })
      optionsSet.current = true
    }
  }, [events, locations, tags])
  useLayoutEffect(setOptionsFromParams, [setOptionsFromParams])

  useEffect(() => {
    if (filteredEvents) {
      const searchParams = new URLSearchParams(window.location.href)
      setActiveEvent(prev => {
        if (
          (filteredEvents.length > 0 &&
            prev &&
            !filteredEvents.includes(prev)) ||
          !searchParams.get('event')
        ) {
          return filteredEvents[0]
        } else if (filteredEvents.length === 0) {
          return null
        } else return prev
      })
    }
  }, [filteredEvents])

  const historyStateObj = useRef(null)
  const setParamsFromOptionChange = useCallback(() => {
    if (optionsSet.current) {
      historyStateObj.current = window.history.state
      const url = new URL(window.location.href)
      const searchParams = new URLSearchParams(url.search)
      locationFilter &&
        locationFilter !== searchParams.get('location')?.toString() &&
        searchParams.set('location', locationFilter)
      tagFilter &&
        tagFilter !== searchParams.get('tag')?.toString() &&
        searchParams.set('tag', tagFilter)
      activeEvent
        ? activeEvent.id !== searchParams.get('event')?.toString() &&
          searchParams.set('event', activeEvent.id)
        : searchParams.delete('event')

      window.history.replaceState(
        historyStateObj.current,
        '',
        url.origin + url.pathname + '?' + searchParams.toString()
      )
    }
  }, [locationFilter, tagFilter, activeEvent])
  useEffect(setParamsFromOptionChange, [setParamsFromOptionChange])

  const windowWidth = useWindowWidth()

  useEffect(() => {
    if (windowWidth && windowWidth <= breakpoints.m) {
      setActiveEvent(null)
    }
  }, [windowWidth])

  const [filtersOpen, setFiltersOpen] = useState(false)

  const [filtersRef, setFiltersRef] = useState<HTMLDivElement | null>(null)
  const filtersWidth = useElementWidth(filtersRef)

  const styles = {
    container: css`
      height: calc(
        100 * var(--vh, 1vh) - var(--nav-height, 0) - var(--alert-height, 0)
      );
      /* position: fixed;
      top: 0;
      left: 0;
      padding-top: var(--nav-height);
      box-sizing: border-box; 
      height: 100%;
      */
      width: 100%;
      overflow: hidden;
      display: grid;
      grid-template-columns: 2fr 3fr 5fr;
      grid-template-rows: auto 1fr;
      ${mq().m} {
        grid-template-columns: 1fr 2fr;
      }
      ${mq().s} {
        grid-template-columns: 3rem 1fr;
      }
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
      ${mq().s} {
        background: transparent;
        color: ${colors.highlight};
        padding: 0.25em 0 0.5em;
        border-bottom: 1px solid ${rgba(colors.text, 0.67)};
      }
    `,
    filtersColumn: css`
      height: 100%;
      position: relative;
      overflow: auto;
      grid-column: 1 / 2;
      grid-row: 2 / 3;
      background: ${colors.bgShade};
      > div {
        display: flex;
        flex-direction: column;
        padding: 0.5em var(--gtr-m);
        box-sizing: border-box;
      }
      ${mq().s} {
        grid-column: 1 / 3;
        z-index: 2;
        width: auto;
        overflow: hidden;
        width: 3rem;
        transition: width 300ms ease, box-shadow 300ms ease;
        ${filtersOpen &&
        css`
          width: ${filtersWidth}px;
          box-shadow: 0 0 6rem #00000033;
          overflow: scroll;
        `}
        > div {
          position: absolute;
          width: max-content;
          justify-self: stretch;
          opacity: 0;
          top: 3rem;
          height: calc(100% - 3rem);
          right: 0;
          padding: 0.5em var(--margin) 1em;
          transition: opacity 300ms ease;
          ${filtersOpen &&
          css`
            opacity: 1;
          `}
        }
      }
    `,
    filterGroup: css`
      font-size: var(--fs-18);
      padding: 1em 0;
      &:not(:last-of-type) {
        border-bottom: 1px solid ${rgba(colors.textLight, 0.5)};
      }
    `,
    filter: (active: boolean) => css`
      display: block;
      color: ${colors.text};
      text-align: left;
      padding: 0.5em 0;
      transition: color 300ms ease;
      ${mq().s} {
        color: ${colors.textLight};
        font-weight: 500;
      }
      ${active &&
      css`
        font-weight: 700;
        color: ${readableHighlight};
        ${mq().s} {
          font-weight: 500;
          color: ${readableHighlight};
        }
      `};
      @media (hover: hover) {
        &:hover {
          color: ${readableHighlight};
        }
      }
    `,
    filterIcon: css`
      position: sticky;
      top: 0;
      left: 0;
      z-index: 2;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      font-size: 2rem;
      padding: 0.5rem;
      width: 3rem;
      height: 3rem;
      color: #fff;
      background: ${readableHighlight};
      svg {
        line {
          stroke-width: 2;
          stroke: currentColor;
          transition: transform 200ms ease;
          &:nth-of-type(1) {
            transform-origin: 15% 36%;
          }
          &:nth-of-type(2) {
            transform-origin: 50% 50%;
          }
          &:nth-of-type(3) {
            transform-origin: 14% 62%;
          }
          ${filtersOpen &&
          css`
            &:nth-of-type(1) {
              transform: rotate(45deg);
            }
            &:nth-of-type(2) {
              transform: scale(0);
            }
            &:nth-of-type(3) {
              transform: rotate(-45deg);
            }
          `}
        }
        circle {
          fill: currentColor;
          transition: opacity 150ms ease;
          ${filtersOpen &&
          css`
            opacity: 0;
          `}
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
      ${mq().s} {
        padding-top: 1em;
      }
    `,
    eventThumb: (active?: boolean) => css`
      display: flex;
      text-align: left;
      position: relative;
      padding: 1em 0;
      width: 100%;
      box-sizing: border-box;
      border-top: 1px solid ${rgba(colors.text, 0.25)};
      ${mq().s} {
        &:first-of-type {
          border: none;
        }
      }
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
      background: #fff;
    `,
    noMatch: css`
      height: 100%;
      overflow: auto;
      grid-column: 2 / 4;
      grid-row: 1 / 3;
      background: ${colors.bg};
      padding: var(--row-m) var(--margin);
      h2 {
        font-size: var(--fs-48);
        color: ${colors.textLight};
      }
    `,
  }
  return (
    <div css={styles.container}>
      {windowWidth && windowWidth > breakpoints.s && (
        <h1 css={styles.title}>{title}</h1>
      )}
      <section css={styles.filtersColumn}>
        {windowWidth && windowWidth <= breakpoints.s && (
          <button
            onClick={() => setFiltersOpen(prev => !prev)}
            css={styles.filterIcon}
          >
            <svg viewBox="0 0 24 24">
              <line
                y1="5"
                x2="24"
                y2="5"
              />
              <line
                y1="12"
                x2="24"
                y2="12"
              />
              <line
                y1="19"
                x2="24"
                y2="19"
              />
              <circle
                cx="18.5"
                cy="5"
                r="2.5"
              />
              <circle
                cx="15.5"
                cy="19"
                r="2.5"
              />
              <circle
                cx="5.5"
                cy="12"
                r="2.5"
              />
            </svg>
          </button>
        )}
        <div ref={node => setFiltersRef(node)}>
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
        </div>
      </section>
      <section css={styles.eventsColumn}>
        {windowWidth && windowWidth <= breakpoints.s && (
          <h1 css={styles.title}>{title}</h1>
        )}
        {windowWidth &&
          filteredEvents?.map((event, i) => (
            <Fragment key={i}>
              {windowWidth > breakpoints.m ? (
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
              ) : (
                <EventThumbnail
                  headingLevel={2}
                  event={event}
                  layout="Calendar"
                  css={styles.eventThumb()}
                />
              )}
            </Fragment>
          ))}
      </section>
      {windowWidth && windowWidth > breakpoints.m && (
        <section css={styles.activeEventColumn}>
          {activeEvent && (
            <EventArticle
              data={activeEvent}
              layout="Calendar"
              highlightColor={colors.highlight}
            />
          )}
        </section>
      )}

      {filteredEvents?.length === 0 && (
        <section css={styles.noMatch}>
          <h2>Sorry, there are no events that match your selection.</h2>
        </section>
      )}
    </div>
  )
}

export default Calendar
