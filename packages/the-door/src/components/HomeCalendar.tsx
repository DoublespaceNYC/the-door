import { css } from '@emotion/react'
import {
  toAmPm,
  toAmPmRange,
  toDate,
} from '@the-door/common/src/helpers'
import { IEvent } from '@the-door/common/src/types'
import { Link, graphql, useStaticQuery } from 'gatsby'

import { colors } from '../theme/variables'

const HomeCalendar = () => {
  type QueryProps = {
    events: {
      nodes: IEvent[]
    }
  }
  const { events } = useStaticQuery<QueryProps>(graphql`
    query {
      events: allDatoCmsEvent {
        nodes {
          ...EventFragment
        }
      }
    }
  `)
  const styles = {
    section: css`
      width: 30rem;
      min-width: 25vw;
      min-height: 100%;
      max-height: calc(100vh - var(--nav-height));
      background: #fff;
      z-index: 1;
      position: sticky;
      top: var(--nav-height);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    `,
    heading: css`
      font-size: var(--fs-36);
      color: ${colors.yellow};
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.025em;
      margin: 0.5em 3rem 0.25em;
    `,
    viewAll: css`
      font-family: var(--almaq);
      font-size: var(--fs-21);
      text-transform: uppercase;
      letter-spacing: 0.025em;
      width: 100%;
      color: #fff;
      background: #7794ab;
      text-decoration: none;
      padding: 1rem 2rem;
      transition: background 200ms ease;
      box-sizing: border-box;
      &:hover {
        background: ${colors.yellow};
      }
    `,
    events: css`
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
        background: #888888aa;
      }
    `,
    event: css`
      display: flex;
      flex-direction: column;
      padding: 1.5rem 0;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
      &:hover {
        h4 {
          color: ${colors.yellow};
        }
      }
      &:last-of-type {
        border: none;
        margin-bottom: 1rem;
      }
      h4 {
        font-family: var(--almaq);
        font-size: var(--fs-24);
        order: 2;
        margin: 0 0 0.125em;
        color: #333;
        transition: color 300ms ease;
      }
      h5 {
        font-size: var(--fs-15);
        color: #888;
        font-weight: 500;
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
        margin: 0;
        font-style: italic;
      }
    `,
  }
  return (
    <section css={styles.section}>
      <h3 css={styles.heading}>Calendar</h3>
      <div css={styles.events}>
        {events.nodes.map((event, i) => (
          <div key={i} css={styles.event}>
            <h4>{event.title}</h4>
            <div>
              <h5>
                {toDate(event.date)},{' '}
                {event.endTime
                  ? toAmPmRange(event.startTime, event.endTime)
                  : toAmPm(event.startTime)}
              </h5>
            </div>
            <h5>{event.location}</h5>
          </div>
        ))}
      </div>
      <Link to="/calendar/" css={styles.viewAll}>
        View Full Calendar
      </Link>
    </section>
  )
}

export default HomeCalendar
