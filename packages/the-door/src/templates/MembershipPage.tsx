import { css } from '@emotion/react'
import {
  Anchor,
  IAnchorLink,
} from '@the-door/common/src/components/AnchorLink'
import Form, { IForm } from '@the-door/common/src/components/Form'
import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import PageContent, {
  ILayoutOptions,
  IPageContent,
} from '@the-door/common/src/components/PageContent'
import PageHero from '@the-door/common/src/components/PageHero'
import PageIntro from '@the-door/common/src/components/PageIntro'
import PageNav from '@the-door/common/src/components/PageNav'
import {
  ILocale,
  ISlugLocale,
} from '@the-door/common/src/components/PageNav__Language'
import { renderDescription } from '@the-door/common/src/utils'
import { Document } from 'datocms-structured-text-utils'
import { HeadProps, PageProps, graphql } from 'gatsby'
import { Fragment } from 'react'

import Seo, { ISEO } from '../components/Seo'
import { colors } from '../theme/variables'

interface DataProps {
  page: {
    _allSlugLocales: ISlugLocale[]
    title: string
    heroImage: IGatsbyImageFocused
    intro: {
      value: Document
    }
    join: IPageContent
    formAnchorLink: IAnchorLink[]
    formHeading: string
    form: IForm
    layoutOptions: ILayoutOptions[]
    seo?: ISEO
  }
}

const MembershipPage = ({
  data: {
    page: {
      title,
      heroImage,
      intro,
      join,
      formAnchorLink,
      formHeading,
      form,
      layoutOptions,
      _allSlugLocales,
    },
  },
  pageContext: { locale },
}: PageProps<DataProps, { locale: ILocale }>): JSX.Element => {
  const anchorLinks = [
    ...join.map(block => block.anchorLink[0]),
    formAnchorLink[0],
  ].filter(block => block !== undefined) as IAnchorLink[]

  const styles = {
    formSection: css`
      padding: 0 var(--margin) var(--row-l);
      margin-top: calc(-1 * var(--row-s));
      h2 {
        margin-top: 0;
        font-size: var(--fs-48);
        color: ${colors.pink};
      }
    `,
    form: css`
      font-size: var(--fs-18);
      max-width: 90ch;
    `,
  }
  return (
    <Fragment>
      <PageHero
        title={title}
        image={heroImage}
      />
      <PageNav
        links={anchorLinks}
        currentLocale={locale}
        slugLocales={_allSlugLocales}
      />
      <PageIntro intro={intro} />
      <PageContent
        pageContent={join}
        layoutOptions={layoutOptions[0]}
      />
      <section css={styles.formSection}>
        {formAnchorLink[0] && (
          <Anchor id={formAnchorLink[0].linkText} />
        )}
        <h2>{formHeading}</h2>
        <Form
          data={form}
          css={styles.form}
          highlightColor={colors.pink}
          layout="Page"
        />
      </section>
    </Fragment>
  )
}

export const Head = ({
  data: {
    page: { title, intro, seo },
  },
  pageContext: { locale },
}: HeadProps<DataProps, { locale: ILocale }>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description || renderDescription(intro)}
    imageUrl={seo?.image?.url}
    lang={locale}
  />
)

export const data = graphql`
  query ($locale: String!) {
    page: datoCmsMembershipPage {
      _allSlugLocales {
        locale
        value
      }
      title(locale: $locale)
      heroImage {
        gatsbyImageData(
          layout: FULL_WIDTH
          imgixParams: {
            q: 65
            ar: "8:3"
            fit: "crop"
            crop: "focalpoint"
          }
        )
        ...ImageFocalData
      }
      intro(locale: $locale) {
        value
      }
      join(locale: $locale) {
        ... on DatoCmsContentBlock {
          ...ContentBlockFragment
        }
      }
      formAnchorLink {
        ...AnchorLinkFragment
      }
      formHeading
      form {
        ...FormFragment
      }
      layoutOptions {
        ...LayoutOptionsFragment
      }
      seo(locale: $locale) {
        ...SEOFragment
      }
    }
  }
`

export default MembershipPage
