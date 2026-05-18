import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { darken } from 'polished'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useElementWidth } from '../hooks/useElementRect'
import useReadableColor from '../hooks/useReadableColor'
import { mq } from '../theme/mixins'
import { IAnchorLink } from './AnchorLink'
import DatoLink, { IDatoLink } from './DatoLink'
import DropdownArrow from './DropdownArrow'
import { ITheme } from './Layout'
import PageNavContent from './PageNav__Content'
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
  const [navWrapRef, setNavWrapRef] = useState<HTMLElement | null>(null)
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

  const readableButtonColor = useReadableColor(theme.tertiary, theme.gray95, 3)

  const styles = {
    container: css`
      margin: 0 var(--margin);
      width: 100%;
      max-width: calc(100vw - 2 * var(--margin));
      display: flex;
      justify-content: flex-start;
      box-sizing: border-box;
      font-size: var(--fs-30);
      font-family: var(--display-font);
      ${mq().ms} {
        font-size: var(--fs-24);
      }
      a,
      button {
        flex: none;
        text-decoration: none;
        display: block;
        line-height: 1;
        padding: 0.667em 0.5em;
        ${mq().ms} {
          padding: 0.667em 0.333em;
        }
      }
    `,
    navWrap: css`
      display: grid;
    `,
    horizontalNav: css`
      grid-area: 1 / 1 / 2 / 2;
      flex: 1;
      overflow: hidden;
      > div {
        display: flex;
        flex: 0;
        width: max-content;
        box-sizing: border-box;
        padding: 0 max((var(--gtr-m) - 0.5em), 0.5em);
        ${mq().ms} {
          padding: 0 max((var(--gtr-m) - 0.333em), 0.333em);
        }
        ${(showLanguage || button) &&
        css`
          padding-left: 0.5em;
          ${mq().ms} {
            padding-left: 0.333em;
          }
        `}
      }
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
    dropdownNav: css`
      grid-area: 1 / 1 / 2 / 2;
      position: relative;
      width: fit-content;
      z-index: 3;
      min-height: 100%;
      > button {
        min-height: 100%;
        background: ${theme.gray95};
        color: ${dropdownOpen && theme.secondaryDark};
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
      > div {
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
        width: 100%;
        background: ${theme.gray92};
        transform: translate3d(0, calc(100% - 3rem), 0);
        transition: opacity 300ms ease, transform 300ms ease;
        a {
          width: 100%;
          padding-top: 0.5em;
          padding-bottom: 0.5em;
          box-sizing: border-box;
        }
        ${dropdownOpen &&
        css`
          opacity: 1;
          pointer-events: all;
          transform: translate3d(0, 100%, 0);
        `}
      }
    `,
    arrow: css`
      font-size: 50%;
      transform: translateY(-33%);
      margin-left: 0.5em;
    `,
    ctaButton: css`
      && {
        min-height: 100%;
        color: ${readableButtonColor};
        background: ${theme.gray95};
        @media (hover: hover) {
          &:hover {
            color: ${darken(0.1, readableButtonColor)};
          }
        }
        padding: 0.667em max(var(--gtr-m), 1em);
        ${links.length > 0 &&
        css`
          padding-right: 1em;
        `}
        ${showLanguage &&
        css`
          padding-left: 1em;
          ${mq().ms} {
            padding-left: 0.667em;
          }
        `}
      }
    `,
    divider: css`
      width: 3px;
      justify-self: stretch;
      background: ${theme.gray92};
      ${condensed &&
      css`
        margin: 0;
      `}
    `,
  }

  return (
    <div css={styles.container}>
      {showLanguage && (
        <PageNavLanguage
          currentLocale={currentLocale}
          slugLocales={slugLocales}
        />
      )}
      {(button || links.length > 0) && showLanguage && (
        <div css={styles.divider} />
      )}
      {button && (
        <DatoLink
          data={button}
          css={styles.ctaButton}
          icon={false}
        />
      )}
      {links.length > 0 && button && <div css={styles.divider} />}
      <div css={styles.navWrap}>
        <nav
          css={styles.horizontalNav}
          ref={node => setNavWrapRef(node)}
          aria-hidden={condensed}
        >
          <PageNavContent
            links={links}
            ref={node => setNavRef(node)}
          />
        </nav>
        {condensed && (
          <nav
            css={styles.dropdownNav}
            ref={condensedRef}
          >
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
            <PageNavContent links={links} />
          </nav>
        )}
      </div>
    </div>
  )
}

export default PageNav
