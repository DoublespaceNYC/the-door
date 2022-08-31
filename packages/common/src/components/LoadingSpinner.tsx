import { css, keyframes } from '@emotion/react'

const LoadingSpinner = ({
  color = 'black',
  speed = 1200,
  count = 12,
  ...props
}) => {
  const spinnerAnimation = keyframes`
    0%, 20%, 80%, 100% {
      transform: translate(-50%, -50%) scale(0.333);
    }
    50% {
      transform: translate(-50%, -50%) scale(1);
    }  
  `
  const spinnerStyle = css`
    display: block;
    position: absolute;
    div {
      position: absolute;
      width: ${200 / count}%;
      padding-bottom: ${200 / count}%;
      background-color: ${color};
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0.333);
      animation: ${spinnerAnimation} ${speed}ms linear infinite;
    }
  `

  return (
    <div css={spinnerStyle} {...props}>
      {[...new Array(count)].map((_, i) => {
        const radians = ((360 / count) * i * Math.PI) / 180
        return (
          <div
            key={i}
            style={{
              animationDelay: `${(i / count - 1) * speed}ms`,
              top: `${Math.sin(radians) * 50 + 50}%`,
              left: `${Math.cos(radians) * 50 + 50}%`,
            }}
          />
        )
      })}
    </div>
  )
}

export default LoadingSpinner
