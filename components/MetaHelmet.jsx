import Head from 'next/head'
import Schema from './Schema'
const DEFAULT_TITLE =
  "Ostello | World's Largest Marketplace for Coaching Institutes"
const DEFAULT_DESCRIPTION =
  "Book your course at Ostello & choose best coaching near you. Compare & Choose from the best teachers through Demo classes | Interact with the toppers & choose best for you."
const DEFAULT_KEYWORDS =
  'Coaching Institutes in Jangpura, best Coaching institutes in Jangpura, Coaching classes in Jangpura, Coaching in jangpura'
const DEFAULT_SLUG_URL =
  typeof window !== 'undefined'
    ? window?.location?.href
    : 'https://www.ostello.co.in/'

const MetaHelmet = ({
  title,
  description,
  link,
  ogTwitterImage,
  ogType,
  keywords,
  children,
  locations,
  review,
  images,
  rating,
  phonenumber,
  name
}) => {
  return (
    <Head>
      {/* //basic metadata */}
      <title>{title ? `${title}` : DEFAULT_TITLE}</title>
      <meta httpEquiv='x-ua-compatible' content='ie=edge; chrome=1' />
      <meta name='full-screen' content='yes' />
      <meta name='theme-color' content='#F5F5F5' />
      <meta name='google' content='notranslate' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0'
      />
      {description?.length >1 && <meta name='description' content={description} />}
      {keywords?.length >1 && <meta name='keywords' content={keywords} />}
      {/* //twitter metadata */}
      <meta name='twitter:card' content='ostello' />
      {/* <meta name="twitter:site" content={siteMetadata.twitterHandle} /> */}
      <meta name='twitter:title' content={title ? title : DEFAULT_TITLE} />
      <meta
        name='twitter:description'
        content={description ? description : DEFAULT_DESCRIPTION}
      />
      {/* <meta name="twitter:image" content={ogTwitterImage} /> */}
      {/* //canonical link */}
      <link rel='canonical' href={link ? link : DEFAULT_SLUG_URL} />
      {/* //open graph metadata */}
      <meta property='og:locale' content='en_US' />
      {/* <meta property="og:site_name" content={siteMetadata.companyName} /> */}
      {/* <meta property="og:type" content={ogType} /> */}
      <meta property='og:title' content={title ? title : DEFAULT_TITLE} />
      <meta
        property='og:description'
        content={description ? description : DEFAULT_DESCRIPTION}
      />
      {/* <meta property="og:image" content={ogImageUrl} /> */}
      {link?.length && <meta property='og:url' content={link} />}
      {name && phonenumber && locations && rating && review && images && 
      <Schema
      json={{
        '@context': 'http://schema.org',
        '@type': 'LocalBusiness',
        url: link ? link : DEFAULT_SLUG_URL,
        name: name,
        address: `${locations[0]?.area}, ${locations[0]?.state}`,
        image: images[0]?.url || 'https://www.ostello.co.in/assets/images/ostello-titled-logo.svg',
        telephone: phonenumber || "",
        description: description ? description : DEFAULT_DESCRIPTION,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: `${rating}` || "",
          bestRating:"5",
          ratingCount: `${review?.length > 1 ? review?.length : 1}`,
          worstRating:"1"
        },
        review,
        sameAs: [
          'https://www.facebook.com/ostellocare',
          'https://twitter.com/OstelloIndia',
          'https://www.linkedin.com/company/ostello-india/',
          'youtube.com/channel/UCO0FJ52dFGo4xS6f6NQ-qoQ',
        ],
      }}
    />
      }
      {children}
    </Head>
  )
}

export default MetaHelmet
