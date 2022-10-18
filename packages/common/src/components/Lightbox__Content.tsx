import { Fragment } from 'react'

import EventArticle, { IEvent } from './Event__Article'
import FormLightbox, { IFormLightbox } from './Form__Lightbox'
import InternalArticle, { IInternalArticle } from './InternalArticle'
import LeaderProfile, { ILeader } from './Leader__Profile'

export type ILightboxContent =
  | IInternalArticle
  | IEvent
  | IFormLightbox
  | ILeader

interface Props {
  data: ILightboxContent
}

const LightboxContent = ({ data }: Props): JSX.Element => {
  switch (data.__typename) {
    case 'DatoCmsInternalArticle':
      return <InternalArticle data={data} layout="Lightbox" />
    case 'DatoCmsEvent':
      return <EventArticle data={data} layout="Lightbox" />
    case 'DatoCmsFormLightbox':
      return <FormLightbox data={data} layout="Lightbox" />
    case 'DatoCmsLeader':
      return <LeaderProfile data={data} layout="Lightbox" />
    default:
      return <Fragment />
  }
}

export default LightboxContent
