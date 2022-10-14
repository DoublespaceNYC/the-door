import { css } from '@emotion/react'
import { Link } from 'gatsby'
import { rgba } from 'polished'
import { HTMLAttributes, useRef } from 'react'

import useThemeContext from '../context/ThemeContext'
import { useWindowWidth } from '../hooks/useWindowDimensions'
import { mq, widthInCols } from '../theme/mixins'
import { breakpoints, doorColors } from '../theme/variables'
import { IEvent } from './Event__Article'
import EventThumbnail from './Event__Thumbnail'
import ScrollSlider from './ScrollSlider'

interface Props extends HTMLAttributes<HTMLElement> {
  events: IEvent[]
}

const HomeCalendar = ({ events, ...props }: Props): JSX.Element => {
  const windowWidth = useWindowWidth()

  const sliderNavRef = useRef<HTMLDivElement | null>(null)

  const { theme } = useThemeContext()
  const setColors = () => {
    switch (theme) {
      case 'The Door':
        return {
          bg: '#fff',
          heading: doorColors.yellow,
          eventTitle: ['#444', doorColors.yellow],
          eventText: ['#888'],
          ctaBg: [doorColors.gray50, doorColors.yellow],
          ctaText: ['#fff'],
          ctaSlider: [doorColors.navy, doorColors.yellow],
          dividerTop: '#80808080',
          divider: '#ddd',
        }
    }
  }
  const colors = setColors()
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
      background: ${colors?.bg};
      width: 100%;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      /* position: sticky;
      top: calc(var(--nav-height) + 1rem); */
      ${mq().ml} {
        width: 100%;
        max-height: none;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: var(--row-s) 0 var(--row-m);
      }
    `,
    heading: css`
      font-size: var(--fs-36);
      color: ${colors?.heading};
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.025em;
      margin: 1em 3rem 0.5em;
      line-height: 1;
      ${mq().ml} {
        margin: 0.25em var(--margin) 0.5em;
      }
    `,
    viewAll: css`
      font-family: var(--display-font);
      font-size: var(--fs-21);
      text-transform: uppercase;
      letter-spacing: 0.025em;
      width: 100%;
      color: ${colors?.ctaText[0]};
      background: ${colors?.ctaBg[0]};
      text-decoration: none;
      padding: 1rem 2rem;
      transition: background 200ms ease, color 300ms ease;
      box-sizing: border-box;
      @media (hover: hover) {
        &:hover {
          background: ${colors?.ctaBg[1] || null};
          color: ${colors?.ctaText[1] || null};
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
        background: ${colors?.dividerTop};
      }
    `,
    sliderNav: css``,
    eventsSlider: css`
      ${mq('min').ml} {
        flex: 1;
        margin-left: 3rem;
        margin-top: 0;
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
          background: ${colors?.dividerTop};
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
        grid-template-columns: repeat(${events.length}, auto);
        grid-gap: var(--gtr-m);
        padding: 0 var(--margin);
        align-items: flex-start;
      }
    `,
    event: css`
      ${mq().ml} {
        width: ${widthInCols(4)};
        align-self: stretch;
      }
      ${mq().m} {
        width: ${widthInCols(6)};
      }
      ${mq().s} {
        width: ${widthInCols(9)};
      }
    `,
    noEvents: css`
      font-family: var(--display-font);
      font-size: var(--fs-30);
      line-height: 1.125;
      color: ${colors?.eventText};
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
        <div ref={sliderNavRef} css={styles.sliderNav} />
        <ScrollSlider
          css={styles.eventsSlider}
          scrollWidthCss={styles.sliderScrollWidth}
          scrollAreaCss={styles.sliderScrollArea}
          contentCss={styles.sliderContent}
          snap={windowWidth ? windowWidth > breakpoints.s : false}
          navContainer={sliderNavRef.current}
          navStyle="above"
          colors={{
            arrow: [colors?.ctaSlider[0] as string],
            arrowDisabled:
              colors?.ctaSlider[0] && rgba(colors?.ctaSlider[0], 0.125),
            link: [colors?.ctaSlider[0], colors?.ctaSlider[1]],
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
          {events.length > 0 ? (
            events.map((event, i) => (
              <EventThumbnail
                css={styles.event}
                event={event}
                key={i}
                headingLevel={4}
                layout={
                  windowWidth
                    ? windowWidth >= breakpoints.ml
                      ? 'Home Calendar'
                      : 'Carousel'
                    : 'Home Calendar'
                }
              />
            ))
          ) : (
            <h4 css={styles.noEvents}>
              There are currently no upcoming events.
            </h4>
          )}
        </ScrollSlider>
        {events.length > 0 && (
          <Link to="/calendar/" css={styles.viewAll}>
            View Full Calendar
          </Link>
        )}
      </div>
    </section>
  )
}

export default HomeCalendar
