import { AlertBarProps } from '@the-door/common/src/components/AlertBar'
import { ICTABar } from '@the-door/common/src/components/CTABar'
import { FooterProps } from '@the-door/common/src/components/Footer'
import CommonLayout from '@the-door/common/src/components/Layout'
import { MainNavProps } from '@the-door/common/src/components/MainNav'
import { ISocialLink } from '@the-door/common/src/components/SocialLink'
import useLayoutContext from '@the-door/common/src/context/LayoutContext'
import useQueryContext from '@the-door/common/src/context/QueryContext'
import { PageProps, graphql, useStaticQuery } from 'gatsby'
import { ReactElement, useEffect } from 'react'

import useEventsQuery from '../hooks/useEventsQuery'
import useNewsQuery from '../hooks/useNewsQuery'
import usePartnersQuery from '../hooks/usePartnersQuery'
import { colors } from '../theme/variables'
import Door50Logo from './Door50Logo'
import DoorLogo from './DoorLogo'

interface Props {
  children: ReactElement
  pageProps: PageProps
}

const Layout = ({
  children,
  pageProps: { location },
}: Props): JSX.Element => {
  type QueryProps = {
    nav: Pick<
      MainNavProps,
      'navItems' | 'buttons' | 'modal' | 'breakpoint'
    >
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
            ...InternalLinkFragment
          }
          modal: highlightModal {
            modalHeading
            modalSubheading
            highlightedLinkNumber
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
  const { allNews } = useNewsQuery()

  const { allEvents } = useEventsQuery()
  const { allPartners } = usePartnersQuery()
  const { setAllNews, setAllEvents, setAllPartners } = useQueryContext()
  const { collapsed } = useLayoutContext()
  useEffect(() => {
    setAllNews(allNews)
    setAllEvents(allEvents)
    setAllPartners(allPartners)
  }, [
    setAllNews,
    setAllEvents,
    setAllPartners,
    allNews,
    allEvents,
    allPartners,
  ])

  return (
    <CommonLayout
      location={location}
      collapsed={collapsed}
      nav={{
        logo: DoorLogo,
        navItems: nav.navItems,
        buttons: nav.buttons,
        modal: nav.modal,
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
      theme={{
        themeName: 'The Door',
        primary: colors.navy,
        primaryDark: colors.navyDark,
        secondary: colors.blue,
        secondaryLight: colors.blueLight,
        secondaryMid: colors.blueMid,
        secondaryDark: colors.blueDark,
        tertiary: colors.pink,
        tertiaryLight: colors.pinkLight,
        tertiaryDark: colors.pinkDark,
        quaternary: colors.yellow,
        quaternaryLight: colors.yellowLight,
        quaternaryDark: colors.yellowDark,
        quinary: colors.purple,
        quinaryLight: colors.purpleLight,
        quinaryDark: colors.purpleDark,
        senary: colors.teal,
        senaryLight: colors.tealLight,
        senaryDark: colors.tealDark,
        septenary: colors.green,
        septenaryLight: colors.greenLight,
        septenaryDark: colors.greenDark,
        gray95: colors.gray95,
        gray92: colors.gray92,
        gray75: colors.gray75,
        gray66: colors.gray66,
        gray50: colors.gray50,
        gray40: colors.gray40,
        contentColorsArray: [
          colors.purple,
          colors.pink,
          colors.teal,
          colors.green,
        ],
        buttonColorsArray: [colors.pink, colors.green],
      }}
    >
      {children}
    </CommonLayout>
  )
}

export default Layout
