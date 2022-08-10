import { Fragment, useMemo } from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'

export interface ISocialLink {
  socialType:
    | 'Facebook'
    | 'Instagram'
    | 'LinkedIn'
    | 'Tiktok'
    | 'Twitter'
    | 'Youtube'
  url: string
}

type Props = {
  social: ISocialLink
}

const SocialLink = ({ social }: Props) => {
  const renderIcon = useMemo(() => {
    switch (social.socialType) {
      case 'Facebook':
        return <FaFacebook />
      case 'Instagram':
        return <FaInstagram />
      case 'LinkedIn':
        return <FaLinkedin />
      case 'Tiktok':
        return <FaTiktok />
      case 'Twitter':
        return <FaTwitter />
      case 'Youtube':
        return <FaYoutube />
      default:
        return <Fragment />
    }
  }, [social.socialType])
  return (
    <a href={social.url} target="_blank" rel="noreferrer">
      {renderIcon}
    </a>
  )
}

export default SocialLink
