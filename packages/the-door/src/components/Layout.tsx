import { FooterProps } from '@the-door/common/src/components/Footer'
import CommonLayout from '@the-door/common/src/components/Layout'
import { MainNavProps } from '@the-door/common/src/components/MainNav'
import { ISocialLink } from '@the-door/common/src/components/SocialLink'
import { graphql, useStaticQuery } from 'gatsby'
import { ReactNode } from 'react'

import { colors } from '../theme/variables'
import Door50Logo from './Door50Logo'
import DoorLogo from './DoorLogo'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  type QueryProps = {
    nav: Pick<MainNavProps, 'navItems' | 'buttons' | 'breakpoint'>
    footer: Pick<FooterProps, 'navItems' | 'buttons'>
    meta: {
      phone: string
      email: string
      address: string
      socials: ISocialLink[]
    }
  }
  const { nav, footer, meta } = useStaticQuery<QueryProps>(graphql`
    query {
      nav: datoCmsMainNav {
        navItems {
          ... on DatoCmsLinkGroup {
            __typename
            linkText: title
            links {
              ...InternalLinkFragment
            }
          }
          ... on DatoCmsInternalLink {
            ...InternalLinkFragment
          }
          ... on DatoCmsExternalLink {
            ...ExternalLinkFragment
          }
        }
        buttons: highlightedLinks {
          link {
            ...InternalLinkFragment
          }
          modalTooltip
          modalHeading
          modalSubheading
        }
        breakpoint
      }
      footer: datoCmsFooterNav {
        navItems: links {
          ...InternalLinkFragment
        }
        buttons: highlightedLinks {
          ...InternalLinkFragment
        }
      }
      meta: datoCmsMetaContent {
        phone
        email
        address
        socials {
          socialType
          url
        }
      }
    }
  `)
  return (
    <CommonLayout
      nav={{
        logo: DoorLogo,
        navItems: nav.navItems,
        buttons: nav.buttons,
        colors: {
          bg: colors.navy,
          bgSecondary: colors.navyDark,
          logo: '#fff',
          text: '#fff',
          buttons: [colors.pink, colors.green],
        },
        breakpoint: nav.breakpoint,
      }}
      footer={{
        logo: Door50Logo,
        navItems: footer.navItems,
        buttons: footer.buttons,
        meta: meta,
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
