import { css } from '@emotion/react'
import { HTMLAttributes } from 'react'
import { HiOutlineDocumentDownload } from 'react-icons/hi'

const DocumentIcon = ({
  ...props
}: HTMLAttributes<HTMLElement>): JSX.Element => {
  const style = css`
    display: inline;
    position: relative;
    svg {
      font-size: 140%;
      position: absolute;
      left: -0.125em;
      top: 0.05em;
    }
  `
  return (
    <span css={style} {...props}>
      &ensp;&ensp;
      <HiOutlineDocumentDownload />
    </span>
  )
}

export default DocumentIcon
