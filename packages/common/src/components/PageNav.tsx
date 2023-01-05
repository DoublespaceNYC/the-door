import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'

import { useElementWidth } from '../hooks/useElementRect'
import { mq } from '../theme/mixins'
import AnchorLink, { IAnchorLink } from './AnchorLink'
import DatoLink, { IDatoLink } from './DatoLink'
import DropdownArrow from './DropdownArrow'
import { ITheme } from './Layout'
import PageNavLanguage, { ILocale, ISlugLocale } from './PageNav__Language'

type Props = {
  links: IAnchorLink[]
  button?: IDatoLink
  currentLocale?: ILocale
  slugLocales?: ISlugLocale[]
}

const PageNav = ({
  links,
  button,
  currentLocale,
  slugLocales,
}: Props): JSX.Element => {
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

  const showLanguage = slugLocales && slugLocales.length > 1 && currentLocale

  const theme = useTheme() as ITheme

  const styles = {
    navWrap: css`
      margin: 0 var(--margin);
      width: fit-content;
      max-width: calc(100vw - 2 * var(--margin));
      height: ${condensed && '0px'};
      /* overflow: hidden; */
      display: flex;
      justify-content: flex-start;
      box-sizing: border-box;
      background: ${theme.gray95};
    `,
    nav: css`
      width: max-content;
      font-size: var(--fs-30);
      font-family: var(--display-font);
      display: flex;
      padding: 0 max((var(--gtr-m) - 0.5em), 0.5em);
      box-sizing: border-box;
      ${mq().ms} {
        font-size: var(--fs-24);
        padding: 0 max((var(--gtr-m) - 0.333em), 0.333em);
      }
      ${showLanguage &&
      css`
        padding-left: 0.5em;
      `}
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
      color: ${theme.secondary};
      @media (hover: hover) {
        &:hover {
          color: ${theme.secondaryDark};
        }
      }
    `,
    button: css`
      && {
        flex: 1;
        color: ${theme.tertiary};
        @media (hover: hover) {
          &:hover {
            color: ${theme.tertiaryDark};
          }
        }
      }
    `,
    divider: css`
      width: 3px;
      /* margin: 0 0.5em; */
      justify-self: stretch;
      background: ${theme.gray92};
      ${condensed &&
      css`
        margin: 0;
      `}
    `,
    dropdownNav: css`
      position: relative;
      background: ${theme.gray95};
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
        background: ${theme.gray92};
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
        background: ${theme.gray95};
        transition: color 300ms ease;
      }
      button,
      a {
        position: relative;
        padding: 0.667em;
        color: ${theme.secondary};
        z-index: 2;
        @media (hover: hover) {
          &:hover {
            color: ${theme.secondaryDark};
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
          color: ${theme.secondaryDark};
        }
      `}
    `,
    arrow: css`
      font-size: 50%;
      transform: translateY(-33%);
      margin-left: 0.5em;
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
        {showLanguage && (
          <PageNavLanguage
            currentLocale={currentLocale}
            slugLocales={slugLocales}
          />
        )}
        {links.length > 0 && showLanguage && <div css={styles.divider} />}
        <nav
          css={[styles.nav, styles.horizontalNav]}
          ref={node => setNavRef(node)}
        >
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
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                aria-label="toggle anchor navigation dropdown"
              >
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
