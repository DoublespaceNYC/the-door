import { IStructuredText } from '../types'
import { IDatoLink } from './DatoLink'

export interface IAlert extends IStructuredText {
  blocks: IDatoLink[]
}

type Props = {
  alert: IAlert
  colors: {
    bg: string
    text: string
    cta: [string, string]
    urgentBg: string
    urgentText: string
    urgentCta: [string, string]
  }
}

const AlertBar = ({ alert, colors }: Props) => {
  return <div></div>
}

export default AlertBar
