import CommonLayout from '@the-door/common/src/components/Layout'
import { ReactNode } from 'react'

import { colors } from '../theme/variables'
import DoorLogo from './DoorLogo'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <CommonLayout
      nav={{
        logo: DoorLogo,
        linkGroups: [
          { text: 'About' },
          { text: 'What We Offer' },
          { text: 'Broome St Academy' },
          { text: 'The Latest' },
          { text: 'Resources' },
        ],
        buttons: [{ text: 'Join' }, { text: 'Support Us' }],
        colors: {
          bg: colors.navy,
          logo: '#fff',
          text: '#fff',
          buttons: [colors.pink, colors.green],
        },
      }}
    >
      {children}
    </CommonLayout>
  )
}

export default Layout
