import ProgramCatalogSection, {
  IProgramCatalogSection,
} from '@the-door/common/src/components/ProgramCatalogSection'

import { colors } from '../theme/variables'

type Props = {
  data: IProgramCatalogSection
}

const TheDoorProgramCatalogSection = ({ data }: Props) => {
  return (
    <ProgramCatalogSection
      data={data}
      colors={{
        bg: `linear-gradient(to top right, ${colors.purpleDark}, ${colors.purple})`,
        heading: '#fff',
        accordionHeading: '#fff',
        accordion: {
          heading: ['#fff', colors.pinkLight],
          subheading: ['#fff', colors.pinkLight],
          button: ['#fff', colors.pinkLight],
          divider: '#fff',
          subdivider: '#ffffff88',
        },
        program: {
          heading: '#fff',
          location: '#ffffffaa',
          body: '#fff',
          link: ['#fff', colors.pinkLight],
          button: ['#fff', colors.pinkLight],
        },
      }}
    />
  )
}

export default TheDoorProgramCatalogSection
