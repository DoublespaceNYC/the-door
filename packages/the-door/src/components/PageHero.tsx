import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import PageHero from '@the-door/common/src/components/PageHero'

import { colors } from '../theme/variables'

type Props = {
  title: string
  section?: string
  image: IGatsbyImageFocused
}
const TheDoorPageHero = ({ title, section, image }: Props) => {
  return (
    <PageHero
      title={title}
      section={section}
      image={image}
      colors={{
        bg: colors.blue,
        text: '#fff',
        eyebrowBg: colors.blueMid,
        eyebrowText: '#fff',
      }}
    />
  )
}

export default TheDoorPageHero
