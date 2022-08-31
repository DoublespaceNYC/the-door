import { css } from '@emotion/react'

import { baseGrid, mq } from '../theme/mixins'
import GatsbyImageFocused, {
  IGatsbyImageFocused,
} from './GatsbyImageFocused'

type Props = {
  title: string
  section?: string
  image: IGatsbyImageFocused
  colors: {
    bg: string
    text: string
    eyebrowBg: string
    eyebrowText: string
  }
}

const PageHero = ({ title, section, image, colors }: Props) => {
  const styles = {
    hero: css`
      width: 100%;
      ${baseGrid}
      grid-template-rows: minmax(25vmax, auto) auto auto var(--row-s);
    `,
    image: css`
      grid-column: 1 / -1;
      grid-row: 1 / 4;
    `,
    gatsbyImage: css`
      min-height: 100%;
    `,
    eyebrow: css`
      grid-column: 2 / -2;
      grid-row: 2 / 3;
      position: relative;
      color: ${colors.eyebrowText};
      background: ${colors.eyebrowBg};
      max-width: fit-content;
      font-size: var(--fs-18);
      margin: 0;
      padding: 0.5em var(--gtr-m) 0.5em;
      line-height: 1;
      text-transform: uppercase;
      font-weight: 500;
      letter-spacing: 0.05em;
      ${mq().ms} {
        font-size: var(--fs-14);
      }
    `,
    title: css`
      grid-column: 2 / -2;
      grid-row: 3 / 5;
      position: relative;
      color: ${colors.text};
      background: ${colors.bg};
      max-width: fit-content;
      font-size: var(--fs-108);
      margin: 0;
      padding: 0.222em var(--gtr-m) 0.333em;
      line-height: 1;
      ${mq().ms} {
        font-size: var(--fs-84);
      }
    `,
  }
  return (
    <header css={styles.hero}>
      <GatsbyImageFocused
        css={styles.image}
        gatsbyImageCss={styles.gatsbyImage}
        image={image.gatsbyImageData}
        alt={image.alt}
        focalPoint={image.focalPoint}
        aspectRatio={8 / 3}
        originalAspectRatio={image.sizes.aspectRatio}
      />
      <div css={styles.eyebrow}>{section}</div>
      <h1 css={styles.title}>{title}</h1>
    </header>
  )
}

export default PageHero
