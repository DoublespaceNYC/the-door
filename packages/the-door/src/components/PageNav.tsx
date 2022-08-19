import { IAnchorLink } from '@the-door/common/src/components/AnchorLink'
import { IDatoLink } from '@the-door/common/src/components/DatoLink'
import PageNav from '@the-door/common/src/components/PageNav'

import { colors } from '../theme/variables'

type Props = {
  links: IAnchorLink[]
  button?: IDatoLink
}

const TheDoorPageNav = ({ links, button }: Props) => {
  return (
    <PageNav
      links={links}
      button={button}
      colors={{
        bg: colors.gray95,
        divider: colors.gray92,
        text: [colors.blue, colors.blueDark],
        buttonText: [colors.pink, colors.purple],
        langText: [colors.gray50, colors.gray40],
      }}
    />
  )
}

export default TheDoorPageNav
