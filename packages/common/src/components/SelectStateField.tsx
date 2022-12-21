import { Record } from 'datocms-structured-text-utils'

import { IFieldStyles } from './Form'
import SelectField, { ISelectOption } from './SelectField'

export interface ISelectStateField extends Record {
  __typename: 'DatoCmsSelectStateField'
  label: string
  required: boolean
}

interface Props {
  data: ISelectStateField
  onChange: (name: string, value: string) => void
  fieldStyles: IFieldStyles
}

const SelectStateField = ({
  data,
  onChange,
  fieldStyles,
}: Props): JSX.Element => {
  const statesList = {
    AZ: 'Arizona',
    AL: 'Alabama',
    AK: 'Alaska',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'District of Columbia',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
  }

  return (
    <SelectField
      data={{
        __typename: 'DatoCmsSelectField',
        id: data.id,
        label: data.label,
        required: data.required,
        options: Object.keys(statesList).map(key => {
          return {
            __typename: 'DatoCmsSelectOption',
            id: key,
            label: key,
            value: statesList[key as keyof typeof statesList],
          } as ISelectOption
        }),
        width: 'Quarter',
      }}
      onChange={onChange}
      fieldStyles={fieldStyles}
      statesList
    />
  )
}

export default SelectStateField
