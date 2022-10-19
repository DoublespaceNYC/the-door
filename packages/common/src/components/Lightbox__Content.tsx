import { Fragment } from 'react'

import EventArticle, { IEvent } from './Event__Article'
import Faces_Story, { IFacesStory } from './Faces_Story'
import FormLightbox, { IFormLightbox } from './Form__Lightbox'
import InternalArticle, { IInternalArticle } from './InternalArticle'
import LeaderProfile, { ILeader } from './Leader__Profile'

export type ILightboxContent =
  | IInternalArticle
  | IEvent
  | IFormLightbox
  | ILeader
  | IFacesStory

interface Props {
  data: ILightboxContent
  highlightColor?: string
}

const LightboxContent = ({
  data,
  highlightColor,
}: Props): JSX.Element => {
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
      return <LeaderProfile data={data} layout="Lightbox" />
    case 'DatoCmsFacesStory':
      return (
        <Faces_Story
          data={data}
          layout="Lightbox"
          highlightColor={highlightColor}
        />
      )
    default:
      return <Fragment />
  }
}

export default LightboxContent
