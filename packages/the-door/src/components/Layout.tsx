import { AlertBarProps } from '@the-door/common/src/components/AlertBar'
import { ICTABar } from '@the-door/common/src/components/CTABar'
import { FooterProps } from '@the-door/common/src/components/Footer'
import CommonLayout from '@the-door/common/src/components/Layout'
import { MainNavProps } from '@the-door/common/src/components/MainNav'
import { ISocialLink } from '@the-door/common/src/components/SocialLink'
import useQueryContext from '@the-door/common/src/context/QueryContext'
import useThemeContext from '@the-door/common/src/context/ThemeContext'
import { graphql, useStaticQuery } from 'gatsby'
import { ReactNode, useLayoutEffect } from 'react'

import useEventsQuery from '../hooks/useEventsQuery'
import useNewsQuery from '../hooks/useNewsQuery'
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
                ... on DatoCmsInternalLinkFiltered {
                  ...InternalLinkFilteredFragment
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
              ... on DatoCmsFormLightboxLink {
                ...FormLightboxLinkFragment
              }
              ... on DatoCmsFormEmbed {
                ...FormEmbedFragment
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
              ... on DatoCmsFormLightboxLink {
                ...FormLightboxLinkFragment
              }
              ... on DatoCmsDocumentLink {
                ...DocumentLinkFragment
              }
            }
          }
        }
      }
    `)
  const { allInternalArticles, allExternalArticles } = useNewsQuery()
  const { allEvents } = useEventsQuery()
  const {
    setAllInternalArticles,
    setAllExternalArticles,
    setAllEvents,
  } = useQueryContext()
  useLayoutEffect(() => {
    setAllInternalArticles(allInternalArticles)
    setAllExternalArticles(allExternalArticles)
    setAllEvents(allEvents)
  })
  const { setTheme } = useThemeContext()
  useLayoutEffect(() => {
    setTheme('The Door')
  }, [setTheme])
  return (
    <CommonLayout
      nav={{
        logo: DoorLogo,
        navItems: nav.navItems,
        buttons: nav.buttons,
        breakpoint: nav.breakpoint,
      }}
      footer={{
        logo: Door50Logo,
        navItems: footer.navItems,
        buttons: footer.buttons,
        meta: meta,
      }}
      alert={{
        showAlert: alert.showAlert,
        alert: alert.alert,
      }}
      ctaBar={{
        data: footer.ctaBar,
      }}
    >
      {children}
    </CommonLayout>
  )
}

export default Layout
