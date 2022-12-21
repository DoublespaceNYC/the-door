import { css } from '@emotion/react'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'

import useThemeContext from '../context/ThemeContext'
import { useElementWidth } from '../hooks/useElementRect'
import { mq } from '../theme/mixins'
import { doorColors } from '../theme/variables'
import AnchorLink, { IAnchorLink } from './AnchorLink'
import DatoLink, { IDatoLink } from './DatoLink'
import DropdownArrow from './DropdownArrow'
import PageNavLanguage, { ILocale } from './PageNav__Language'

type Props = {
  links: IAnchorLink[]
  button?: IDatoLink
  locales?: ILocale[]
}

const PageNav = ({ links, button, locales }: Props): JSX.Element => {
  const [navWrapRef, setNavWrapRef] = useState<HTMLDivElement | null>(null)
  const [navRef, setNavRef] = useState<HTMLElement | null>(null)

  const navWrapWidth = useElementWidth(navWrapRef) || 0
  const navWidth = useElementWidth(navRef) || 0

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

  const { theme } = useThemeContext()
  const setColors = () => {
    switch (theme) {
      case 'The Door':
        return {
          bg: doorColors.gray95,
          divider: doorColors.gray92,
          text: [doorColors.blue, doorColors.blueDark],
          buttonText: [doorColors.pink, doorColors.purple],
          langText: [doorColors.gray50, doorColors.gray40],
        }
      default:
        return {
          bg: '',
          divider: '',
          text: ['', ''],
          buttonText: ['', ''],
          langText: ['', ''],
        }
    }
  }
  const colors = setColors()
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
      && {
        flex: 1;
        color: ${colors.buttonText[0]};
        @media (hover: hover) {
          &:hover {
            color: ${colors.buttonText[1]};
          }
        }
      }
    `,
    divider: css`
      width: 3px;
      margin: 0 0.5em;
      justify-self: stretch;
      background: ${colors.divider};
      ${condensed &&
      css`
        margin: 0;
      `}
    `,
    dropdownNav: css`
      position: relative;
      background: ${colors.bg};
      width: fit-content;
      margin: 0 var(--margin);
      padding: 0 !important;
      z-index: 3;
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
        a {
          width: max-content;
          min-width: 100%;
          max-width: calc(100vw - var(--margin) * 2);
          box-sizing: border-box;
        }
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
      margin-left: 0.333em;
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
          {locales && locales.length > 1 && (
            <PageNavLanguage locales={locales} />
          )}
          {button && (
            <DatoLink
              data={button}
              css={styles.button}
            />
          )}
          {links.length > 0 && button && <div css={styles.divider} />}
          <NavContent />
        </nav>
      </div>
      {condensed && (
        <Fragment>
          <div
            css={[styles.nav, styles.dropdownNav]}
            ref={condensedRef}
          >
            <div css={{ position: 'relative' }}>
              <button onClick={() => setDropdownOpen(prev => !prev)}>
                Jump to section
                <DropdownArrow
                  css={styles.arrow}
                  open={dropdownOpen}
                />
              </button>
              <nav>
                <NavContent />
              </nav>
            </div>
            {links.length > 0 && button && <div css={styles.divider} />}
            {button && (
              <DatoLink
                data={button}
                css={styles.button}
              />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default PageNav
