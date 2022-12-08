import { css } from '@emotion/react'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { BiChevronDown } from 'react-icons/bi'

import useThemeContext from '../context/ThemeContext'
import { mq } from '../theme/mixins'
import { doorColors } from '../theme/variables'

type Props = {
  options: string[]
  initialOption: string
  onChange: (option: string) => void
}

const PageFilter = ({
  options,
  initialOption,
  onChange,
}: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)

  const [activeOption, setActiveOption] = useState<string | null>(null)

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (dropdownOpen && !ref.current?.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    },
    [dropdownOpen]
  )

  const handleOptionClick = (option: string) => {
    setActiveOption(option)
    setDropdownOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick)
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  const historyStateObj = useRef(null)

  const setOptionFromParams = useCallback(() => {
    historyStateObj.current = window.history.state
    const searchParams = new URLSearchParams(window.location.search)
    setActiveOption(searchParams.get('filter') || initialOption)
  }, [initialOption])
  useLayoutEffect(setOptionFromParams, [setOptionFromParams])

  const setParamsFromOptionChange = useCallback(() => {
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)
    if (
      activeOption &&
      activeOption !== searchParams.get('filter')?.toString()
    ) {
      searchParams.set('filter', activeOption)
      window.history.replaceState(
        historyStateObj.current,
        '',
        url.origin + url.pathname + '?' + searchParams.toString()
      )
    }
  }, [activeOption])
  useEffect(setParamsFromOptionChange, [setParamsFromOptionChange])

  useEffect(() => {
    activeOption && onChange(activeOption)
  }, [activeOption, onChange])

  const { theme } = useThemeContext()
  const setColors = () => {
    const defaultColors = {
      bg: '',
      dropdownBg: '',
      buttonText: '',
      buttonTextHover: '',
      optionText: '',
      optionTextHover: '',
    }
    switch (theme) {
      case 'The Door':
        return {
          bg: doorColors.gray95,
          dropdownBg: doorColors.gray92,
          buttonText: doorColors.blue,
          buttonTextHover: doorColors.blueDark,
          optionText: doorColors.gray50,
          optionTextHover: doorColors.blue,
        }
      default:
        return defaultColors
    }
  }
  const colors = setColors()
  const styles = {
    filter: css`
      font-size: var(--fs-30);
      font-family: var(--display-font);
      display: flex;
      box-sizing: border-box;
      position: relative;
      background: ${colors.bg};
      width: fit-content;
      margin: 0 var(--margin);
      padding: 0;
      z-index: 2;
      ${mq().ms} {
        font-size: var(--fs-24);
        padding: 0 max((var(--gtr-m) - 0.333em), 0.333em);
      }
      button {
        flex: none;
        text-decoration: none;
        display: block;
        line-height: 1;
        position: relative;
        text-align: left;
        padding: 0.667em 1em;
        z-index: 2;
        ${mq().ms} {
          padding: 0.667em 0.333em;
        }
      }
      > button {
        color: ${colors.buttonText};
        background: ${colors.bg};
        transition: color 300ms ease;
        @media (hover: hover) {
          &:hover {
            color: ${colors.buttonTextHover};
          }
        }
      }
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
        align-items: flex-start;
        padding: 0.5em 0;
        min-width: max-content;
        background: ${colors.dropdownBg};
        transform: translate3d(0, calc(100% - 3rem), 0);
        transition: opacity 300ms ease, transform 300ms ease;
        > button {
          color: ${colors.optionText};
          padding: 0.375em 1em;
          width: 100%;
          @media (hover: hover) {
            &:hover {
              color: ${colors.optionTextHover};
            }
          }
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
      font-size: 125%;
      margin: 0 -0.25em -0.2em -0.125em;
      transition: transform 300ms ease;
      ${dropdownOpen &&
      css`
        transform: scale3d(1, -1, 1) translateY(-8%);
      `}
    `,
  }

  return (
    <div
      css={[styles.filter]}
      ref={ref}
    >
      <button onClick={() => setDropdownOpen(prev => !prev)}>
        {activeOption} <BiChevronDown css={styles.arrow} />
      </button>
      <nav>
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default PageFilter
