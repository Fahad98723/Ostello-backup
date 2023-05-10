import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { ServerStyleSheet } from "styled-components";
import { GTM_ID } from "../lib/gtm";
import Schema from "../components/Schema";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en-us">
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta
          name="google-site-verification"
          content="n5KZqEu_bixbDbMe-qbvNh-aE-dcO86q7wTW3WhrAEQ"
        />
        <meta name="msvalidate.01" content="B89065AC76E262A059C967E34C3D9541" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=2.0"
        />
        <Head>
          <Schema
            json={{
              "@context": "http://schema.org",
              "@type": "BreadcrumbList",
              url: "https://www.ostello.co.in/",

              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://ostello.co.in/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "About Us",
                  item: "https://ostello.co.in/about-us/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Blogs",
                  item: "https://ostello.co.in/blogs/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Mentor Zone",
                  item: "https://ostello.co.in/mentor/",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Contact Us",
                  item: "https://ostello.co.in/contact-us/",
                },
              ],
            }}
          />

          <Schema
            json={{
              "@context": "http://schema.org",
              "@type": "Organization",
              url: "https://www.ostello.co.in/",
              name: "Ostello",
              founder: "Rajbir Singh",
              foundingDate: "2020",
              foundingLocation: "Delhi",
              description:
                "Book your course at Ostello at the best coaching institutes in Delhi near you. | Compare and Choose from the best teachers through Demo classes | Interact with the toppers and choose what is best for you.",
              logo: "https://www.ostello.co.in/assets/images/ostello-titled-logo.svg",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91 8271469630",
                  email: "ostelloindia@gmail.com",
                  contactType: "customer service",
                },
              ],
              sameAs: [
                "https://www.facebook.com/ostellocare",
                "https://twitter.com/OstelloIndia",
                "https://www.linkedin.com/company/ostello-india/",
                "https://www.youtube.com/channel/UCO0FJ52dFGo4xS6f6NQ-qoQ",
              ],
            }}
          />

          <Script
            type="text/javascript"
            src="https://unpkg.com/default-passive-events"
          />

          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            strategy="worker"
          />
          <Script
            strategy="worker"
            src="https://www.googletagmanager.com/gtag/js?id=G-6P9D6S98K5"
          />

          <Script
            id="google-analytics"
            strategy="worker"
            dangerouslySetInnerHTML={{
              __html: `
                      window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-6P9D6S98K5');
        `,
            }}
          />
        </Head>
        <body>
          <noscript>
            <iframe
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Main />
          <NextScript />

          <div id="root"></div>
        </body>
      </Html>
    );
  }
}
