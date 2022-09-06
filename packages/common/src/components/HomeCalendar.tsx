import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { Link } from 'gatsby'
import { darken, lighten, readableColor, rgba } from 'polished'
import { HTMLAttributes } from 'react'
import { useMemo } from 'react'

import { formateDateTimeRange } from '../helpers'
import { useWindowWidth } from '../hooks/useWindowDimensions'
import { mq, widthInCols } from '../theme/mixins'
import { breakpoints } from '../theme/variables'
import ScrollSlider from './ScrollSlider'

export interface IEvent extends Record {
  title: string
  date: string
  startDateTime: string
  endDateTime: string
  location: string
}

interface Props extends HTMLAttributes<HTMLElement> {
  events: IEvent[]
  colors: {
    bg: string
    heading: string
    eventTitle: [string, string?]
    eventText: [string, string?]
    ctaBg: [string, string?]
    ctaText: [string, string?]
    ctaSlider: [string, string?]
  }
}

const HomeCalendar = ({ events, colors, ...props }: Props) => {
  const filteredEvents = useMemo(() => {
    const today = new Date()
    return events.filter(event => {
      !event.endDateTime && today.setHours(0, 0, 0, 0)
      const startDate = new Date(
        event.endDateTime || event.startDateTime
      )
      if (startDate > today) {
        return true
      }
    })
  }, [events])

  const windowWidth = useWindowWidth()

  const styles = {
    section: css`
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      width: 100%;
      height: 100%;
      z-index: 1;
      position: absolute;
      ${mq().ml} {
        position: relative;
        grid-column: 1 / -1;
        grid-row: 3 / 4;
        z-index: 1;
      }
    `,
    wrap: css`
      background: ${colors.bg};
      width: 100%;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      position: sticky;
      top: calc(var(--nav-height) + 1rem);
      ${mq().ml} {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: var(--row-s) 0 var(--row-m);
      }
    `,
    heading: css`
      font-size: var(--fs-36);
      color: ${colors.heading};
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.025em;
      margin: 1em 3rem 0.5em;
      line-height: 1;
      ${mq().ml} {
        margin: 0 var(--margin) 0.5em;
      }
    `,
    viewAll: css`
      font-family: var(--display-font);
      font-size: var(--fs-21);
      text-transform: uppercase;
      letter-spacing: 0.025em;
      width: 100%;
      color: ${colors.ctaText[0]};
      background: ${colors.ctaBg[0]};
      text-decoration: none;
      padding: 1rem 2rem;
      transition: background 200ms ease, color 300ms ease;
      box-sizing: border-box;
      @media (hover: hover) {
        &:hover {
          background: ${colors.ctaBg[1] || null};
          color: ${colors.ctaText[1] || null};
        }
      }
      ${mq().ml} {
        display: none;
      }
    `,
    eventsSidebar: css`
      flex: 1;
      margin-left: 3rem;
      padding-right: 3rem;
      overflow: auto;
      &:before {
        content: '';
        position: sticky;
        display: block;
        width: 100%;
        height: 1px;
        left: 0;
        top: 0;
        background: ${rgba(
          readableColor(
            colors.bg,
            darken(0.5, colors.bg),
            lighten(0.5, colors.bg),
            false
          ),
          0.5
        )};
      }
    `,
    eventsSlider: css`
      ${mq('min').ml} {
        flex: 1;
        margin-left: 3rem;
        padding-right: 3rem;
        overflow: auto;
        &:before {
          content: '';
          position: sticky;
          display: block;
          width: 100%;
          height: 1px;
          left: 0;
          top: 0;
          background: ${rgba(
            readableColor(
              colors.bg,
              darken(0.5, colors.bg),
              lighten(0.5, colors.bg),
              false
            ),
            0.5
          )};
        }
      }
      ${mq().ml} {
        width: 100vw;
        overflow: hidden;
      }
    `,
    sliderScrollWidth: css`
      ${mq().ml} {
        width: calc(100vw - 2 * var(--margin) + var(--gtr-m));
      }
      ${mq().s} {
        width: calc(${widthInCols(8)} + var(--gtr-m));
      }
    `,
    sliderScrollArea: css`
      scroll-padding-left: var(--margin);
    `,
    sliderContent: css`
      ${mq('min').ml} {
        display: flex;
        flex-direction: column;
        max-width: 100%;
      }
      ${mq().ml} {
        display: grid;
        grid-template-columns: repeat(${filteredEvents.length}, auto);
        grid-gap: var(--gtr-m);
        padding: 0 var(--margin);
        align-items: flex-start;
      }
    `,
    event: css`
      display: flex;
      flex-direction: column;
      cursor: pointer;
      box-sizing: border-box;
      ${mq('min').ml} {
        padding: 1.5rem 0;
        border-bottom: 1px solid
          ${readableColor(
            colors.bg,
            darken(0.125, colors.bg),
            lighten(0.125, colors.bg),
            false
          )};
        &:last-of-type {
          border: none;
          margin-bottom: 2rem;
        }
      }
      ${mq().ml} {
        width: ${widthInCols(filteredEvents.length > 3 ? 3 : 4)};
        padding-top: 1rem;
        border-top: 1px solid
          ${readableColor(
            colors.bg,
            darken(0.25, colors.bg),
            lighten(0.25, colors.bg),
            false
          )};
      }
      ${mq().ms} {
        width: ${widthInCols(filteredEvents.length > 2 ? 4 : 6)};
      }
      ${mq().s} {
        width: ${widthInCols(8)};
      }
      h4 {
        font-family: var(--display-font);
        font-size: var(--fs-24);
        order: 2;
        margin: 0 0 0.125em;
        color: ${colors.eventTitle[0]};
        transition: color 300ms ease;
        width: max-content;
        max-width: 100%;
      }
      h5 {
        font-size: var(--fs-14);
        color: ${colors.eventText[0]};
        font-weight: 500;
      }
      @media (hover: hover) {
        &:hover {
          h4 {
            color: ${colors.eventTitle[1] || null};
          }
          h5 {
            color: ${colors.eventText[1] || null};
          }
        }
      }
      > div {
        order: 1;
        h5 {
          margin: 0;
          text-transform: uppercase;
        }
      }
      > h5 {
        order: 3;
        margin: 0 0 0.25em;
        font-style: italic;
      }
    `,
    noEvents: css`
      font-family: var(--display-font);
      font-size: var(--fs-30);
      line-height: 1.125;
      color: ${colors.eventText};
      margin: 1em 0 2em;
      ${mq().ml} {
        margin: 0;
      }
    `,
  }
  return (
    <section css={styles.section} {...props}>
      <div css={styles.wrap}>
        <h3 css={styles.heading}>Calendar</h3>
        <ScrollSlider
          css={styles.eventsSlider}
          scrollWidthCss={styles.sliderScrollWidth}
          scrollAreaCss={styles.sliderScrollArea}
          contentCss={styles.sliderContent}
          snap={windowWidth ? windowWidth > breakpoints.s : false}
          navStyle="above"
          colors={{
            arrow: [colors.ctaSlider[0]],
            arrowDisabled: rgba(colors.ctaSlider[0], 0.125),
            link: [colors.ctaSlider[0], colors.ctaSlider[1]],
          }}
          link={{
            id: '',
            __typename: 'DatoCmsInternalLink',
            linkText: 'View All',
            link: {
              slug: '/calendar/',
            },
          }}
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, i) => (
              <div key={i} css={styles.event}>
                <h4>{event.title}</h4>
                <div>
                  <h5>
                    {formateDateTimeRange(
                      event.startDateTime,
                      event.endDateTime
                    )}
                  </h5>
                </div>
                <h5>{event.location}</h5>
              </div>
            ))
          ) : (
            <h4 css={styles.noEvents}>
              There are currently no upcoming events.
            </h4>
          )}
        </ScrollSlider>
        {filteredEvents.length > 0 && (
          <Link to="/calendar/" css={styles.viewAll}>
            View Full Calendar
          </Link>
        )}
      </div>
    </section>
  )
}

export default HomeCalendar
