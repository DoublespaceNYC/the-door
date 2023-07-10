import { AlertBarProps } from '@the-door/common/src/components/AlertBar'
import { ICTABar } from '@the-door/common/src/components/CTABar'
import { FooterProps } from '@the-door/common/src/components/Footer'
import CommonLayout from '@the-door/common/src/components/Layout'
import { MainNavProps } from '@the-door/common/src/components/MainNav'
import { ISocialLink } from '@the-door/common/src/components/SocialLink'
import useLayoutContext from '@the-door/common/src/context/LayoutContext'
import useQueryContext from '@the-door/common/src/context/QueryContext'
import { StructuredText as IStructuredText } from 'datocms-structured-text-utils'
import { PageProps, graphql, useStaticQuery } from 'gatsby'
import { ReactElement, useEffect } from 'react'

import useDocsQuery from '../hooks/useDocsQuery'
import useEventsQuery from '../hooks/useEventsQuery'
import useNewsQuery from '../hooks/useNewsQuery'
import usePartnersQuery from '../hooks/usePartnersQuery'
import { colors } from '../theme/variables'
import BSALogo from './BSALogo'
import BSALogoStacked from './BSALogoStacked'

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
      legalText: IStructuredText
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
                ... on DatoCmsInternalLink {
                  ...InternalLinkFragment
                }
                ... on DatoCmsInternalLinkFiltered {
                  ...InternalLinkFilteredFragment
                }
                ... on DatoCmsExternalLink {
                  ...ExternalLinkFragment
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
            ... on DatoCmsInternalLink {
              ...InternalLinkFragment
            }
            ... on DatoCmsExternalLink {
              ...ExternalLinkFragment
            }
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
            ... on DatoCmsInternalLink {
              ...InternalLinkFragment
            }
            ... on DatoCmsExternalLink {
              ...ExternalLinkFragment
            }
          }
          buttons: highlightedLinks {
            ... on DatoCmsInternalLink {
              ...InternalLinkFragment
            }
            ... on DatoCmsExternalLink {
              ...ExternalLinkFragment
            }
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
          legalText {
            value
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
  const { setAllNews, setAllEvents, setAllPartners, setAllDocs } =
    useQueryContext()
  const { collapsed } = useLayoutContext()
  const { allDocs } = useDocsQuery()
  useEffect(() => {
    setAllNews(allNews)
    setAllEvents(allEvents)
    setAllPartners(allPartners)
    setAllDocs(allDocs)
  }, [
    setAllNews,
    setAllEvents,
    setAllPartners,
    setAllDocs,
    allNews,
    allEvents,
    allPartners,
    allDocs,
  ])

  return (
    <CommonLayout
      location={location}
      collapsed={collapsed}
      nav={{
        logo: BSALogo,
        navItems: nav.navItems,
        buttons: nav.buttons,
        modal: nav.modal,
        breakpoint: nav.breakpoint,
      }}
      footer={{
        logo: BSALogoStacked,
        navItems: footer.navItems,
        buttons: footer.buttons,
        meta: meta,
        legalText: footer.legalText,
      }}
      alert={{
        showAlert: alert.showAlert,
        alert: alert.alert,
      }}
      ctaBar={{
        data: footer.ctaBar,
      }}
      theme={{
        themeName: 'BSA',
        primary: colors.bsaBlue,
        primaryDark: colors.bsaBlueDark,
        secondary: colors.bsaGold,
        secondaryLight: colors.bsaGoldLight,
        secondaryMid: colors.bsaGoldMid,
        secondaryDark: colors.bsaGoldDark,
        tertiary: colors.bsaBlue,
        tertiaryLight: colors.bsaBlueLight,
        tertiaryDark: colors.bsaBlueDark,
        quaternary: colors.bsaGold,
        quaternaryLight: colors.bsaGoldLight,
        quaternaryDark: colors.bsaGoldDark,
        quinary: colors.bsaBlue,
        quinaryLight: colors.bsaBlueLight,
        quinaryDark: colors.bsaBlueDark,
        senary: colors.bsaGold,
        senaryLight: colors.bsaGoldLight,
        senaryDark: colors.bsaGoldDark,
        septenary: colors.bsaBlue,
        septenaryLight: colors.bsaBlueLight,
        septenaryDark: colors.bsaBlueDark,
        gray95: colors.gray95,
        gray92: colors.gray92,
        gray85: colors.gray85,
        gray75: colors.gray75,
        gray66: colors.gray66,
        gray50: colors.gray50,
        gray40: colors.gray40,
        contentColorsArray: [colors.bsaBlue, colors.bsaGold],
        buttonColorsArray: [colors.bsaGold],
      }}
    >
      {children}
    </CommonLayout>
  )
}

export default Layout
