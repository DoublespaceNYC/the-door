import { AlertBarProps } from '@the-door/common/src/components/AlertBar'
import { ICTABar } from '@the-door/common/src/components/CTABar'
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
    footer: Pick<FooterProps, 'navItems' | 'buttons'> & {
      ctaBar: ICTABar
    }
    alert: Omit<AlertBarProps, 'colors'>
    meta: {
      phone: string
      email: string
      address: string
      socials: ISocialLink[]
    }
  }
  const { nav, footer, alert, meta } =
    useStaticQuery<QueryProps>(graphql`
      query {
        nav: datoCmsMainNav {
          navItems {
            ... on DatoCmsLinkGroup {
              __typename
              linkText
              title
              description {
                value
              }
              links {
                ... on DatoCmsServicesGroupLink {
                  __typename
                  servicesGroup {
                    title
                    services {
                      title
                      slug
                    }
                  }
                }
                ... on DatoCmsInternalLink {
                  ...InternalLinkFragment
                }
              }
              backgroundImage {
                gatsbyImageData(
                  width: 960
                  imgixParams: {
                    q: 60
                    ar: "1:1"
                    fit: "crop"
                    crop: "focalpoint"
                    con: 30
                    sat: 30
                    blendColor: "#000"
                    blendAlpha: 60
                    blendMode: "normal"
                  }
                )
                alt
                focalPoint {
                  x
                  y
                }
                sizes {
                  aspectRatio
                }
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
        footer: datoCmsFooter {
          navItems: links {
            ...InternalLinkFragment
          }
          buttons: highlightedLinks {
            ...InternalLinkFragment
          }
          ctaBar {
            value
            blocks {
              ... on DatoCmsInternalLink {
                ...InternalLinkFragment
              }
              ... on DatoCmsExternalLink {
                ...ExternalLinkFragment
              }
              ... on DatoCmsLightboxLink {
                ...LightboxLinkFragment
              }
              ... on DatoCmsFormBlock {
                ...FormBlockFragment
              }
            }
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
        alert: datoCmsAlertBar {
          showAlert
          alert {
            value
            blocks {
              ... on DatoCmsInternalLink {
                ...InternalLinkFragment
              }
              ... on DatoCmsExternalLink {
                ...ExternalLinkFragment
              }
              ... on DatoCmsLightboxLink {
                ...LightboxLinkFragment
              }
              ... on DatoCmsDocumentLink {
                ...DocumentLinkFragment
              }
            }
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
      alert={{
        showAlert: alert.showAlert,
        alert: alert.alert,
        colors: {
          bg: colors.navyDark,
          text: '#fff',
          cta: ['#fff', colors.yellow],
        },
      }}
      ctaBar={{
        data: footer.ctaBar,
        colors: {
          bg: colors.navyDark,
          text: '#fff',
          boldText: colors.blueLight,
          form: {
            fill: 'transparent',
            border: '#ffffff88',
            text: '#fff',
            label: '#ffffffaa',
            highlight: colors.blueLight,
            buttonFill: ['#fff', colors.pink],
            buttonText: [colors.navy, '#fff'],
          },
        },
      }}
    >
      {children}
    </CommonLayout>
  )
}

export default Layout
