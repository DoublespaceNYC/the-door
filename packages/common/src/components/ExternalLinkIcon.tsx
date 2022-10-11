import { css } from '@emotion/react'
import { HTMLAttributes } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'

const ExternalLinkIcon = ({
  ...props
}: HTMLAttributes<HTMLElement>): JSX.Element => {
  const style = css`
    display: inline;
    position: relative;
    svg {
      font-size: 140%;
      position: absolute;
      left: -0.075em;
      top: 0em;
    }
  `
  return (
    <span css={style} {...props}>
      &ensp;&ensp;&#8202;
      <HiOutlineExternalLink />
    </span>
  )
}

export default ExternalLinkIcon
