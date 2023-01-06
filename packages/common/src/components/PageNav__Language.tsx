import { css, useTheme } from '@emotion/react'
import { Link } from 'gatsby'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HiOutlineGlobe } from 'react-icons/hi'

import DropdownArrow from './DropdownArrow'
import { ITheme } from './Layout'

export type ILocale = 'en' | 'es' | 'fr'

export type ISlugLocale = {
  locale: ILocale
  value: string
}

interface Props {
  currentLocale: ILocale
  slugLocales: ISlugLocale[]
}

const PageNavLanguage = ({
  currentLocale,
  slugLocales,
}: Props): JSX.Element => {
  const localePrefix = (locale: string) => (locale === 'en' ? '' : '/' + locale)

  const ref = useRef<HTMLDivElement>(null)

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (dropdownOpen && !ref.current?.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    },
    [dropdownOpen]
  )

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick)
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  const theme = useTheme() as ITheme

  const styles = {
    container: css`
      display: flex;
      flex: none;
      box-sizing: border-box;
      position: relative;
      width: fit-content;
      padding: 0;
      z-index: 3;
      > button {
        transition: color 300ms ease;
        padding: 0.667em 0.667em 0.667em 0.75em;
        background: ${theme.gray95};
      }
      button,
      a {
        flex: none;
        text-decoration: none;
        text-transform: uppercase;
        display: block;
        line-height: 1;
        position: relative;
        text-align: left;
        z-index: 3;
        box-sizing: border-box;
        color: ${theme.gray50};
        @media (hover: hover) {
          &:hover {
            color: ${theme.primary};
          }
        }
      }
      nav {
        position: absolute;
        min-width: 100%;
        z-index: 1;
        box-sizing: border-box;
        bottom: 0;
        left: 0;
        opacity: 0;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0.25em 0;
        background: ${theme.gray92};
        transform: translate3d(0, calc(100% - 3rem), 0);
        transition: opacity 300ms ease, transform 300ms ease;
        > a {
          padding: 0.375em 0.75em 0.375em 1.575em;
          width: 100%;
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
    globe: css`
      font-size: 75%;
      transform: translateY(5%);
      margin-right: 0.1em;
      line-height: 1;
      display: inline-flex;
    `,
  }
  return (
    <div
      ref={ref}
      css={styles.container}
    >
      <button
        onClick={() => setDropdownOpen(prev => !prev)}
        aria-label="toggle filters list"
      >
        <HiOutlineGlobe css={styles.globe} />
        {currentLocale}
        <DropdownArrow
          css={styles.arrow}
          open={dropdownOpen}
        />
      </button>
      <nav>
        {slugLocales.map((slugLocale, i) => {
          if (slugLocale.locale !== currentLocale) {
            return (
              <Link
                to={`${localePrefix(slugLocale.locale)}/${slugLocale.value}/`}
                key={i}
              >
                {slugLocale.locale}
              </Link>
            )
          }
        })}
      </nav>
    </div>
  )
}

export default PageNavLanguage
