import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { Document, isLink } from 'datocms-structured-text-utils'
import { StructuredText as IStructuredText } from 'datocms-structured-text-utils'
import parse from 'html-react-parser'
import { FC, HTMLAttributes } from 'react'
import { StructuredText, renderNodeRule } from 'react-datocms/structured-text'

import { baseGrid, mq } from '../theme/mixins'
import { LogoProps } from '../types'
import DatoLink, { IDatoLink } from './DatoLink'
import { IExternalLink } from './ExternalLink'
import FooterCTA from './Footer__CTA'
import { IFormLightboxLink } from './Form__Lightbox'
import { IInternalLink } from './InternalLink'
import { ITheme } from './Layout'
import SocialLink, { ISocialLink } from './SocialLink'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  logo: FC<LogoProps>
  cta?: {
    value: Document
  }
  ctaButtons?: (IFormLightboxLink | IInternalLink | IExternalLink)[]
  navItems: IDatoLink[]
  buttons: IDatoLink[]
  meta: {
    phone: string
    email: string
    address: string
    socials: ISocialLink[]
  }
  legalText: IStructuredText
}
const Footer = ({
  logo,
  cta,
  ctaButtons,
  navItems,
  buttons,
  meta,
  legalText,
  ...props
}: FooterProps): JSX.Element => {
  const Logo = logo

  const theme = useTheme() as ITheme
  const styles = {
    footer: css`
      ${baseGrid}
      background: ${theme.primary};
      color: #fff;
      padding: var(--row-m) 0 0;
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
      grid-row: 1 / 4;
      max-width: min(20rem, 100%);
      margin-bottom: 1em;
      margin-right: var(--gtr-m);
      ${mq().ms} {
        grid-column: 2 / span 5;
        grid-row: 1 / 3;
      }
      ${mq().s} {
        ${!cta &&
        !ctaButtons &&
        css`
          max-width: min(12rem, 100%);
          grid-column: 2 / -2;
          justify-self: center;
        `}
      }
    `,
    meta: css`
      grid-column: 5 / span 3;
      grid-row: 1 / 4;
      > div {
        display: inline-block;
        width: 100%;
      }
      /* ${mq().ml} {
        grid-column: span 5 / span 4;
      } */
      ${mq().ms} {
        grid-column: span 6 / -2;
        grid-row: auto;
      }
      ${mq().s} {
        grid-column: 2 / -2;
        column-count: 2;
        column-gap: 1em;
        margin-top: 1.5em;
      }
    `,
    socials: css`
      && {
        display: flex;
        width: 100%;
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
      }
    `,
    nav: css`
      grid-column: span 6 / -2;
      column-count: 3;
      column-gap: 1em;
      > div {
        display: inline-block;
        min-width: 100%;
        > a {
          margin: 0.375em 0;
        }
      }
      ${mq().ml} {
        grid-column: span 9 / -2;
        margin-top: 1.5em;
      }
      ${mq().ms} {
        grid-column: 2 / -2;
      }
      ${mq().s} {
        column-count: 2;
      }
    `,
    link: css`
      color: #fff;
      display: block;
      text-decoration: none;
      max-width: fit-content;
      line-height: 1.125;
      padding: 0.125em 0;
      margin: 0.375em 0;
      > span {
        text-underline-offset: 0.175em;
        text-decoration-thickness: 2px;
      }
      svg {
        font-size: 110%;
      }
      &[data-type='email'] {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      @media (hover: hover) {
        &:hover > span {
          text-decoration-line: underline;
        }
      }
    `,
    button: css`
      && {
        margin: 0.375em 0 calc(0.625em - 4px);
        > span {
          padding: 0.125em 0;
          border-top: 2px solid;
          border-bottom: 2px solid;
          text-decoration: none;
        }
        ${theme.buttonColorsArray.map(
          (color, i, array) => css`
            div:nth-of-type(${array.length}n + ${i}) > & {
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
      }
    `,
    legalText: css`
      grid-column: 2 / -2;
      font-family: var(--body-font);
      text-transform: none;
      letter-spacing: 0;
      font-size: var(--fs-15);
      text-align: center;
      max-width: 102ch;
      justify-self: center;
      margin-top: calc(var(--row-m) - 2em);
      margin-bottom: 2em;
      font-weight: 300;
      color: #ffffffcc;
      a {
        display: inline-block;
        color: inherit;
        @media (hover: hover) {
          &:hover {
            color: #fff;
          }
        }
      }
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
        <div>
          <a
            css={styles.link}
            href={`tel:${meta.phone.replace(/\D/, '')}`}
            target="_blank"
            rel="noreferrer"
          >
            <span>{meta.phone}</span>
          </a>
        </div>
        <div>
          <a
            css={styles.link}
            href={`mailto:${meta.email}`}
            target="_blank"
            rel="noreferrer"
            data-type="email"
          >
            <span>
              {theme.themeName === 'The Door' ? meta.email : 'Email Us'}
            </span>
          </a>
        </div>
        <div>
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
        </div>
        <div css={styles.socials}>
          {meta.socials.map((social, i) => (
            <SocialLink
              social={social}
              key={i}
            />
          ))}
        </div>
      </div>
      {cta && ctaButtons && (
        <FooterCTA
          cta={cta}
          ctaButtons={ctaButtons}
        />
      )}
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
          <div key={i}>
            <DatoLink
              data={button}
              css={[styles.link, styles.button]}
              icon={false}
            />
          </div>
        ))}
      </nav>
      <div css={styles.legalText}>
        <StructuredText
          data={legalText}
          customNodeRules={[
            renderNodeRule(isLink, ({ node, key, children }) => {
              const metaProps = node.meta?.reduce(
                (a, v) => ({
                  ...a,
                  [v.id]: v.value,
                }),
                {}
              )
              return (
                <a
                  href={node.url}
                  key={key}
                  target="_blank"
                  rel="noreferrer"
                  {...metaProps}
                >
                  {children}
                </a>
              )
            }),
          ]}
        />
      </div>
    </footer>
  )
}

export default Footer
