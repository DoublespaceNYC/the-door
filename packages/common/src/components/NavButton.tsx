import { css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { darken, getContrast, readableColor } from 'polished'
import { useContext, useEffect, useMemo, useState } from 'react'

import NavButtonModalContext from '../context/NavButtonModalContext'
import { useElementWidth } from '../hooks/useElementRect'
import { useEscKeyFunction } from '../hooks/useEscKeyFunction'
import { absoluteFill, mq } from '../theme/mixins'
import DatoLink, { IDatoLink } from './DatoLink'

export interface INavButton {
  link: [IDatoLink]
  modalTooltip: boolean
  modalHeading: string
  modalSubheading: string
}

type Props = {
  button: INavButton
  color: string
  showModal?: boolean
  buttonCss?: CSSInterpolation
  css?: CSSInterpolation
}

const NavButton = ({
  button,
  color,
  showModal,
  buttonCss,
  ...props
}: Props) => {
  const [wrapRef, setWrapRef] = useState<HTMLDivElement | null>(null)
  const wrapWidth = useElementWidth(
    button.modalTooltip ? wrapRef : null
  )

  const { open, setOpen } = useContext(NavButtonModalContext)

  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => setLoaded(true), 500)
  })

  useEscKeyFunction(() => setOpen(false))

  const textColor = useMemo(() => {
    const darkText = () => {
      for (let i = 1; i++; i < 50) {
        if (getContrast(color, darken(0.02 * i, color)) > 4.5) {
          return darken(0.02 * i, color)
        }
      }
    }
    return readableColor(color, darkText(), '#fff', false)
  }, [color])

  const styles = {
    wrap: css`
      display: flex;
      position: relative;
    `,
    button: css`
      > span {
        padding: 0.125em 0;
        border-top: 2px solid;
        border-bottom: 2px solid;
        background: none !important;
        border-color: ${color};
      }
      @media (hover: hover) {
        &:hover {
          color: ${color};
        }
      }
    `,
    modal: css`
      display: ${showModal ? 'block' : 'none'};
      position: absolute;
      right: 0;
      bottom: 0.75rem;
      color: ${textColor};
      font-size: var(--fs-15);
      padding: 1.5rem 1rem 0.75rem;
      max-width: 30ch;
      filter: drop-shadow(0 0.167rem 0.333rem #00000033);
      > span {
        display: block;
        width: max-content;
        position: relative;
        &:first-of-type {
          font-size: var(--fs-18);
          font-family: var(--almaq);
          text-transform: uppercase;
          letter-spacing: 0.025em;
          padding-right: 1.75rem;
        }
      }
      &:before {
        content: '';
        ${absoluteFill};
        background: ${color};
        z-index: 0;
        clip-path: polygon(
          0% 0.75rem,
          calc(100% - ${wrapWidth / 2}px - 0.75rem) 0.75rem,
          calc(100% - ${wrapWidth / 2}px) 0%,
          calc(100% - ${wrapWidth / 2}px + 0.75rem) 0.75rem,
          100% 0.75rem,
          100% 100%,
          0% 100%
        );
      }
      ${loaded &&
      css`
        opacity: 1;
        transform: translate3d(0, 100%, 0);
        transition: all 500ms ease;
      `}
      ${(!open || !loaded) &&
      css`
        pointer-events: none;
        opacity: 0;
        transform: translate3d(0, 75%, 0);
        transition: all 300ms ease;
      `}
      ${mq().s} {
        display: none;
      }
    `,
    close: css`
      position: absolute;
      top: 0.75rem;
      right: 0;
      display: flex;
      padding: 0.5rem;
      opacity: 0.5;
      transition: opacity 300ms ease;
      svg {
        width: 0.75rem;
        height: 0.75rem;
        path {
          stroke-width: 2;
          stroke: ${textColor};
        }
      }
      &:hover {
        opacity: 1;
      }
    `,
  }
  return (
    <div css={styles.wrap} ref={node => setWrapRef(node)} {...props}>
      <DatoLink
        link={button.link[0]}
        css={[styles.button, buttonCss]}
      />
      {button.modalTooltip && (
        <div css={styles.modal}>
          <span>{button.modalHeading}</span>
          <span>{button.modalSubheading}</span>
          <button css={styles.close} onClick={() => setOpen(false)}>
            <svg viewBox="0 0 12 12">
              <path d="M1 1L11 11" />
              <path d="M1 11L11 1" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default NavButton
