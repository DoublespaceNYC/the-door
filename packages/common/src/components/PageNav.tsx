import { css } from '@emotion/react'

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
  const styles = {
    nav: css`
      max-width: fit-content;
      background: ${colors.bg};
      font-size: var(--fs-30);
      font-family: var(--display-font);
      display: flex;
      margin: 0 var(--margin);
      padding: 0 max((var(--gtr-m) - 0.5em), 0.5em);
      a {
        text-decoration: none;
        display: block;
        line-height: 1;
        padding: 0.7em 0.5em;
      }
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
  }
  return (
    <nav css={styles.nav}>
      {links.map((link, i) => (
        <AnchorLink id={link.linkText} key={i} css={styles.anchorLink}>
          {link.linkText}
        </AnchorLink>
      ))}
      {links.length > 0 && button && <div css={styles.divider} />}
      {button && <DatoLink link={button} css={styles.button} />}
    </nav>
  )
}

export default PageNav
