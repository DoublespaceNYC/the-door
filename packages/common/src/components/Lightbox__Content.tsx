import { Fragment } from 'react'

import EventArticle, { IEvent } from './Event__Article'
import FacesStory, { IFacesStory } from './Faces__Story'
import FormLightbox, { IFormLightbox } from './Form__Lightbox'
import InternalArticle, { IInternalArticle } from './InternalArticle'
import LeaderProfile, { ILeader } from './Leader__Profile'
import PartnerArticle, { IPartner } from './Partner__Article'
import TertiaryPageContent, { ITertiaryPage } from './TertiaryPageContent'

export type ILightboxContent =
  | IInternalArticle
  | IEvent
  | IFormLightbox
  | ILeader
  | IFacesStory
  | ITertiaryPage
  | IPartner

interface Props {
  data: ILightboxContent
  highlightColor?: string
}

const LightboxContent = ({ data, highlightColor }: Props): JSX.Element => {
  switch (data.__typename) {
    case 'DatoCmsInternalArticle':
      return (
        <InternalArticle
          data={data}
          layout="Lightbox"
          highlightColor={highlightColor}
        />
      )
    case 'DatoCmsEvent':
      return (
        <EventArticle
          data={data}
          layout="Lightbox"
          highlightColor={highlightColor}
        />
      )
    case 'DatoCmsFormLightbox':
      return (
        <FormLightbox
          data={data}
          layout="Lightbox"
          highlightColor={highlightColor}
        />
      )
    case 'DatoCmsLeader':
      return (
        <LeaderProfile
          data={data}
          layout="Lightbox"
        />
      )
    case 'DatoCmsFacesStory':
      return (
        <FacesStory
          data={data}
          layout="Lightbox"
          highlightColor={highlightColor}
        />
      )
    case 'DatoCmsTertiaryPage':
      return (
        <TertiaryPageContent
          data={data}
          layout="Lightbox"
          highlightColor={highlightColor}
        />
      )
    case 'DatoCmsPartner':
      return (
        <PartnerArticle
          data={data}
          highlightColor={highlightColor}
        />
      )
    default:
      return <Fragment />
  }
}

export default LightboxContent
