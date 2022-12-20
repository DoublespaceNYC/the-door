import { css } from '@emotion/react'
import {
  Anchor,
  IAnchorLink,
} from '@the-door/common/src/components/AnchorLink'
import Form, { IForm } from '@the-door/common/src/components/Form'
import { IGatsbyImageFocused } from '@the-door/common/src/components/GatsbyImageFocused'
import PageContact, {
  IContactSection,
} from '@the-door/common/src/components/PageContact'
import PageHero from '@the-door/common/src/components/PageHero'
import PageIntro from '@the-door/common/src/components/PageIntro'
import PageNav from '@the-door/common/src/components/PageNav'
import { renderDescription } from '@the-door/common/src/utils'
import { Document } from 'datocms-structured-text-utils'
import { HeadProps, PageProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo, { ISEO } from '../components/Seo'

interface DataProps {
  page: {
    title: string
    heroImage: IGatsbyImageFocused
    intro: {
      value: Document
    }
    formAnchorLink: IAnchorLink[]
    contactForm: IForm
    directory: IContactSection[]
    seo?: ISEO
    slug: string
  }
}

const ContactPage = ({
  data: {
    page: {
      title,
      heroImage,
      intro,
      formAnchorLink,
      contactForm,
      directory,
    },
  },
}: PageProps<DataProps>): JSX.Element => {
  const styles = {
    intro: css`
      margin-bottom: var(--row-m);
    `,
    formSection: css`
      padding: 0 var(--margin) var(--row-m);
    `,
    form: css`
      font-size: var(--fs-18);
      width: 100%;
      max-width: 90ch;
    `,
  }
  return (
    <Layout>
      <PageHero
        title={title}
        image={heroImage}
      />
      <PageNav
        links={[
          ...formAnchorLink,
          ...directory.flatMap(directory => directory.anchorLink),
        ]}
      />
      <PageIntro
        intro={intro}
        css={styles.intro}
      />
      <section css={styles.formSection}>
        {formAnchorLink[0] && (
          <Anchor id={formAnchorLink[0].linkText} />
        )}
        <Form
          data={contactForm}
          css={styles.form}
        />
      </section>
      {directory[0] && <PageContact data={directory[0]} />}
    </Layout>
  )
}

export const Head = ({
  data: {
    page: { title, intro, seo },
  },
}: HeadProps<DataProps>): JSX.Element => (
  <Seo
    title={seo?.title || title}
    description={seo?.description || renderDescription(intro)}
    imageUrl={seo?.image?.url}
  />
)

export const data = graphql`
  query ($id: String!) {
    page: datoCmsContactPage(id: { eq: $id }) {
      title
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
      intro {
        value
      }
      formAnchorLink {
        ...AnchorLinkFragment
      }
      contactForm {
        ...FormFragment
      }
      directory {
        ...ContactSectionFragment
      }
      seo {
        ...SEOFragment
      }
    }
  }
`

export default ContactPage
