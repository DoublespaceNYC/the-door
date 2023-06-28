import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { HTMLAttributes, forwardRef } from 'react'

import AnchorLink, { IAnchorLink } from './AnchorLink'
import { ITheme } from './Layout'

interface Props extends HTMLAttributes<HTMLDivElement> {
  links: IAnchorLink[]
  onAnchorClick?: () => void
}

const PageNavContent = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { links, onAnchorClick, ...additionalProps } = props

  const theme = useTheme() as ITheme

  const styles = {
    container: css`
      background: ${theme.gray95};

      /* display: contents; */
    `,
    anchorLink: css`
      color: ${theme.secondary};
      @media (hover: hover) {
        &:hover {
          color: ${theme.secondaryDark};
        }
      }
    `,
  }
  if (links) {
    return (
      <div
        ref={ref}
        css={styles.container}
        {...additionalProps}
      >
        {links.map((link, i) => {
          if (link && link.linkText) {
            return (
              <AnchorLink
                id={link.linkText}
                key={i}
                css={styles.anchorLink}
                onClick={onAnchorClick}
              >
                {link.linkText}
              </AnchorLink>
            )
          }
        })}
      </div>
    )
  } else return null
})

PageNavContent.displayName = 'PageNavContent'

export default PageNavContent
