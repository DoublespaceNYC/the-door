import { SerializedStyles, css } from '@emotion/react'
import { ElementType, ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

import { absoluteFill, bezier, mq } from '../theme/mixins'

type Props = {
  children: ReactNode
  as?: ElementType
  innerAs?: ElementType
  css?: SerializedStyles
  innerCss?: SerializedStyles
  duration?: number
  delay?: number
  triggerOnce?: boolean
}

const AnimateIn = ({
  children,
  as = 'div',
  innerAs = 'div',
  innerCss,
  duration = 1000,
  delay = 100,
  triggerOnce = true,
  ...props
}: Props) => {
  const Element = as
  const InnerElement = innerAs
  const { ref: inViewRef, inView } = useInView({
    rootMargin: '10% 0% -10%',
    triggerOnce: triggerOnce,
  })
  const styles = {
    outer: css`
      position: relative;
    `,
    inner: css`
      position: relative;
      display: block;
      opacity: 0;
      transform: translate3d(0, 6rem, 0);
      transition-property: opacity, transform;
      transition-duration: ${duration}ms;
      transition-timing-function: ${bezier.easeOut};
      transition-delay: ${delay}ms;
      ${inView &&
      css`
        opacity: 1;
        transform: translate3d(0, 0, 0);
      `};
      @media (prefers-reduced-motion) {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      ${mq().s} {
        transform: translate3d(0, 0, 0);
      }
    `,
    sizer: css`
      ${absoluteFill}
      pointer-events: none;
    `,
  }
  return (
    <Element
      css={styles.outer}
      {...props}
    >
      <div
        css={styles.sizer}
        ref={inViewRef}
      />
      <InnerElement css={[styles.inner, innerCss]}>{children}</InnerElement>
    </Element>
  )
}

export default AnimateIn
