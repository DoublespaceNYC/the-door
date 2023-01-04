import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import parse from 'html-react-parser'
import { FC, HTMLAttributes } from 'react'

import { baseGrid, mq } from '../theme/mixins'
import { LogoProps } from '../types'
import DatoLink, { IDatoLink } from './DatoLink'
import { ITheme } from './Layout'
import SocialLink, { ISocialLink } from './SocialLink'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  logo: FC<LogoProps>
  navItems: IDatoLink[]
  buttons: IDatoLink[]
  meta: {
    phone: string
    email: string
    address: string
    socials: ISocialLink[]
  }
}

const Footer = ({
  logo,
  navItems,
  buttons,
  meta,
  ...props
}: FooterProps): JSX.Element => {
  const Logo = logo

  const theme = useTheme() as ITheme
  const styles = {
    footer: css`
      ${baseGrid}
      background: ${theme.primary};
      color: #fff;
      padding: var(--row-m) 0;
      font-size: var(--fs-21);
      font-family: var(--display-font);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      ${mq().ms} {
        font-size: var(--fs-18);
      }
    `,
    logo: css`
      grid-column: 2 / span 3;
      max-width: min(20rem, 100%);
      margin-bottom: 1em;
      margin-right: var(--gtr-m);
      ${mq().ms} {
        grid-column: 2 / span 5;
      }
    `,
    meta: css`
      grid-column: 5 / span 4;
      ${mq().ms} {
        grid-column: 2 / span 6;
      }
    `,
    socials: css`
      display: flex;
      font-size: var(--fs-30);
      > a {
        display: flex;
        margin: 0.5em 0.25em 0.25em;
        transition: transform 150ms ease;
        color: #fff;
        @media (hover: hover) {
          &:hover {
            transform: scale3d(1.2, 1.2, 1);
          }
        }
        &:first-of-type {
          margin-left: 0;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
    `,
    nav: css`
      grid-column: span 4 / -2;
      column-count: 2;
      column-gap: 1em;
      > div {
        display: inline-block;
        min-width: 100%;
        > a {
          margin: 0.375em 0;
        }
      }
      ${mq().ml} {
        column-count: 1;
      }
      ${mq().ms} {
        grid-row: 1 / 3;
        grid-column: span 6 / -2;
      }
    `,
    link: css`
      color: #fff;
      display: block;
      text-decoration: none;
      max-width: fit-content;
      line-height: 1.125;
      padding: 0.125em 0;
      margin: 0.75em 0;
      > span {
        background: linear-gradient(currentColor, currentColor) no-repeat 0
          calc(100% + 3px);
        background-size: 100% 2px;
        transition: background-position 100ms ease;
      }
      @media (hover: hover) {
        &:hover > span {
          background-position: 0 100%;
        }
      }
    `,
    button: css`
      margin: 0.375em 0 calc(1em - 4px);
      > span {
        padding: 0.125em 0;
        border-top: 2px solid;
        border-bottom: 2px solid;
        background: none;
      }
      ${theme.buttonColorsArray.map(
        (color, i, array) => css`
          &:nth-of-type(${array.length}n + ${i}) {
            > span {
              border-color: ${color};
            }
            @media (hover: hover) {
              &:hover {
                color: ${color};
              }
            }
          }
        `
      )}
    `,
  }
  return (
    <footer
      css={styles.footer}
      {...props}
    >
      <Logo
        css={styles.logo}
        fill="#fff"
      />
      <div css={styles.meta}>
        <a
          css={styles.link}
          href={`tel:${meta.phone.replace(/\D/, '')}`}
          target="_blank"
          rel="noreferrer"
        >
          <span>{meta.phone}</span>
        </a>
        <a
          css={styles.link}
          href={`mailto:${meta.email}`}
          target="_blank"
          rel="noreferrer"
        >
          <span>{meta.email}</span>
        </a>
        <a
          css={styles.link}
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            meta.address
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <span>{parse(meta.address.replace('\n', '<br />'))}</span>
        </a>
        <div css={styles.socials}>
          {meta.socials.map((social, i) => (
            <SocialLink
              social={social}
              key={i}
            />
          ))}
        </div>
      </div>
      <nav css={styles.nav}>
        {navItems.map((navItem, i) => (
          <div key={i}>
            <DatoLink
              css={styles.link}
              data={navItem}
            />
          </div>
        ))}
        {buttons.map((button, i) => (
          <DatoLink
            data={button}
            key={i}
            css={[styles.link, styles.button]}
          />
        ))}
      </nav>
    </footer>
  )
}

export default Footer
