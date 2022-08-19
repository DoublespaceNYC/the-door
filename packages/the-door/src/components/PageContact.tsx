import PageContact, {
  IContactSection,
} from '@the-door/common/src/components/PageContact'

import { colors } from '../theme/variables'

type Props = {
  data: IContactSection
}

const TheDoorPageContact = ({ data }: Props) => {
  return (
    <PageContact
      data={data}
      colors={{
        bg: colors.blue,
        text: '#fff',
        link: ['#fff', '#ffffffbf'],
      }}
    />
  )
}

export default TheDoorPageContact
