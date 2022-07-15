import { Global, css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { FC, Fragment, useCallback, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useElementHeight } from '../hooks/useElementRect'

export type MainNavProps = {
  logo: FC<{ css?: CSSInterpolation; fill?: string }>
  linkGroups: {
    text: string
  }[]
  buttons: {
    text: string
  }[]
  colors: {
    bg: string
    logo: string
    text: string
    buttons: string[]
  }
}

const MainNav = ({
  logo,
  linkGroups,
  buttons,
  colors,
}: MainNavProps) => {
  const Logo = logo

  const { ref: scrollRef, inView } = useInView()
  const scrolled = !inView

  const [navRef, setNavRef] = useState<HTMLElement | null>(null)
  const navRefCallback = useCallback((node: HTMLElement) => {
    setNavRef(node)
  }, [])
  const navHeight = useElementHeight(navRef)

  const styles = {
    scrollObserver: css`
      position: absolute;
      top: 0;
      left: 0;
      height: 12rem;
      width: 100%;
      pointer-events: none;
    `,
    navWrap: css`
      position: sticky;
      height: 0;
      overflow: visible;
      top: 0;
      left: 0;
      z-index: 10;
      font-size: var(--fs-48);
      height: 1.5em;
    `,
    nav: css`
      background: ${colors.bg};
      display: grid;
      grid-template-columns: auto 1fr auto;
      padding: 0 var(--margin);
      justify-items: flex-end;
      align-items: stretch;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      > div {
        display: flex;
      }
    `,
    logo: css`
      font-size: var(--fs-48);
      height: 1em;
      margin: 0.25em 0;
      transition: height 300ms ease, margin 300ms ease;
      ${scrolled &&
      css`
        height: 0.875em;
        margin: 0.125em 0;
      `}
    `,
    navItem: css`
      color: ${colors.text};
      height: 100%;
      font-size: var(--fs-18);
      font-family: var(--almaq);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.5em 1em;
    `,
    linkGroup: css``,
    button: css`
      > span {
        padding: 0.125em 0;
        border-top: 2px solid;
        border-bottom: 2px solid;
      }
      ${colors.buttons.map(
        (color, i) => css`
          &:nth-child(${i + 1}) {
            > span {
              border-color: ${color};
            }
          }
        `
      )}
    `,
  }
  return (
    <Fragment>
      <div aria-hidden css={styles.scrollObserver} ref={scrollRef} />
      <div css={styles.navWrap}>
        <nav css={styles.nav} ref={navRefCallback}>
          <Logo css={styles.logo} fill={colors.logo} />
          <div>
            {linkGroups.map((linkGroup, i) => (
              <button css={[styles.navItem, styles.linkGroup]} key={i}>
                <span>{linkGroup.text}</span>
              </button>
            ))}
          </div>
          <div>
            {buttons.map((button, i) => (
              <button css={[styles.navItem, styles.button]} key={i}>
                <span>{button.text}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
      <Global
        styles={css`
          :root {
            --nav-height: ${navHeight}px;
          }
        `}
      />
    </Fragment>
  )
}

export default MainNav
