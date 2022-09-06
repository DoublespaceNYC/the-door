import { css } from '@emotion/react'
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { BiChevronDown } from 'react-icons/bi'

import { useElementWidth } from '../hooks/useElementRect'
import { mq } from '../theme/mixins'
import AnchorLink, { IAnchorLink } from './AnchorLink'
import DatoLink, { IDatoLink } from './DatoLink'

type Props = {
  links: IAnchorLink[]
  button?: IDatoLink
  colors: {
    bg: string
    text: [string, string]
    divider: string
    buttonText: [string, string]
    langText: [string, string]
  }
}

const PageNav = ({ links, button, colors }: Props) => {
  const [navWrapRef, setNavWrapRef] = useState<HTMLDivElement | null>(
    null
  )
  const [navRef, setNavRef] = useState<HTMLElement | null>(null)

  const navWrapWidth = useElementWidth(navWrapRef)
  const navWidth = useElementWidth(navRef)

  const condensed = navWidth > navWrapWidth

  const condensedRef = useRef<HTMLDivElement>(null)

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (!condensedRef.current?.contains(e.target as Node)) {
      setDropdownOpen(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick)
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  const styles = {
    navWrap: css`
      margin: 0 var(--margin);
      width: calc(100vw - 2 * var(--margin));
      height: ${condensed && '0px'};
      overflow: hidden;
      box-sizing: border-box;
    `,
    nav: css`
      width: max-content;
      background: ${colors.bg};
      font-size: var(--fs-30);
      font-family: var(--display-font);
      display: flex;
      padding: 0 max((var(--gtr-m) - 0.5em), 0.5em);
      box-sizing: border-box;
      ${mq().ms} {
        font-size: var(--fs-24);
        padding: 0 max((var(--gtr-m) - 0.333em), 0.333em);
      }
      a,
      button {
        flex: none;
        text-decoration: none;
        display: block;
        line-height: 1;
        padding: 0.7em 0.5em;
        ${mq().ms} {
          padding: 0.667em 0.333em;
        }
      }
    `,
    horizontalNav: css`
      ${condensed &&
      css`
        visibility: hidden;
        pointer-events: none;
      `}
    `,
    anchorLink: css`
      color: ${colors.text[0]};
      @media (hover: hover) {
        &:hover {
          color: ${colors.text[1]};
        }
      }
    `,
    button: css`
      color: ${colors.buttonText[0]};
      @media (hover: hover) {
        &:hover {
          color: ${colors.buttonText[1]};
        }
      }
    `,
    divider: css`
      width: 3px;
      margin: 0 0.5em;
      justify-self: stretch;
      background: ${colors.divider};
    `,
    dropdownNav: css`
      position: relative;
      background: ${colors.bg};
      width: fit-content;
      margin: 0 var(--margin);
      padding: 0 !important;
      nav {
        position: absolute;
        z-index: 1;
        box-sizing: border-box;
        bottom: 0;
        left: 0;
        opacity: 0;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        padding: 0.5em 0;
        min-width: 100%;
        background: ${colors.divider};
        transform: translate3d(0, calc(100% - 3rem), 0);
        transition: opacity 300ms ease, transform 300ms ease;
      }
      button {
        background: ${colors.bg};
        transition: color 300ms ease;
      }
      button,
      a {
        position: relative;
        padding: 0.667em;
        color: ${colors.text[0]};
        z-index: 2;
        @media (hover: hover) {
          &:hover {
            color: ${colors.text[1]};
          }
        }
      }
      ${dropdownOpen &&
      css`
        nav {
          opacity: 1;
          pointer-events: all;
          transform: translate3d(0, 100%, 0);
        }
        > button {
          color: ${colors.text[1]};
        }
      `}
    `,
    arrow: css`
      font-size: 125%;
      margin: 0 -0.125em -0.2em;
      transition: transform 300ms ease;
      ${dropdownOpen &&
      css`
        transform: scale3d(1, -1, 1) translateY(-8%);
      `}
    `,
  }
  const NavContent = () => (
    <Fragment>
      {links.map((link, i) => (
        <AnchorLink
          id={link.linkText}
          key={i}
          css={styles.anchorLink}
          onClick={() => setDropdownOpen(false)}
        >
          {link.linkText}
        </AnchorLink>
      ))}
      {links.length > 0 && button && <div css={styles.divider} />}
      {button && <DatoLink link={button} css={styles.button} />}
    </Fragment>
  )
  return (
    <Fragment>
      <div
        css={styles.navWrap}
        ref={node => setNavWrapRef(node)}
        aria-hidden={condensed}
      >
        <nav
          css={[styles.nav, styles.horizontalNav]}
          ref={node => setNavRef(node)}
        >
          <NavContent />
        </nav>
      </div>
      {condensed && (
        <div css={[styles.nav, styles.dropdownNav]} ref={condensedRef}>
          <button onClick={() => setDropdownOpen(prev => !prev)}>
            Jump to section <BiChevronDown css={styles.arrow} />
          </button>
          <nav>
            <NavContent />
          </nav>
        </div>
      )}
    </Fragment>
  )
}

export default PageNav
