import { Global, css } from '@emotion/react'

const ScrollToggle = (): JSX.Element => {
  const styles = css`
    html {
      overflow: hidden;
    }
  `
  return <Global styles={styles} />
}

export default ScrollToggle
