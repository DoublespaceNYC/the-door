import { css, useTheme } from '@emotion/react'
import { isLink } from 'datocms-structured-text-utils'
import { Link } from 'gatsby'
import { darken } from 'polished'
import { Fragment, HTMLAttributes } from 'react'
import { StructuredText, renderNodeRule } from 'react-datocms'

import useReadableColor from '../hooks/useReadableColor'
import { mq } from '../theme/mixins'
import { IStructuredText } from '../types'
import { ITheme } from './Layout'

interface Props extends HTMLAttributes<HTMLDivElement> {
  intro: IStructuredText
  textColor?: string
}

const PageIntro = ({
  intro,
  textColor = '#333',
  ...props
}: Props): JSX.Element => {
  const theme = useTheme() as ITheme
  const readableColor = useReadableColor(theme.tertiary, '#fff', 4.5)
  const styles = {
    intro: css`
      font-size: var(--fs-21);
      line-height: 1.75;
      margin: calc(var(--row-s) + 1em) var(--margin) var(--row-l);
      color: ${textColor};
      max-width: 80ch;
      ${mq().ms} {
        font-size: var(--fs-18);
      }
      a {
        color: ${readableColor};
        @media (hover: hover) {
          &:hover {
            color: ${darken(0.1, readableColor)};
          }
        }
      }
    `,
  }
  if (intro.value) {
    return (
      <div
        css={styles.intro}
        {...props}
      >
        <StructuredText
          data={intro}
          customNodeRules={[
            renderNodeRule(isLink, ({ node, key, children }) => {
              const metaProps = node.meta?.reduce(
                (a, v) => ({
                  ...a,
                  [v.id]: v.value,
                }),
                {}
              )
              if (node.url[0] === '/') {
                return (
                  <Link
                    to={node.url}
                    key={key}
                  >
                    {children}
                  </Link>
                )
              } else
                return (
                  <a
                    href={node.url}
                    key={key}
                    {...metaProps}
                  >
                    {children}
                  </a>
                )
            }),
          ]}
        />
      </div>
    )
  } else {
    return <Fragment />
  }
}

export default PageIntro
