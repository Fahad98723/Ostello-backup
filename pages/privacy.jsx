import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BackgroundGradient from '../assets/background/landing_gradient.png'
import useScreenWidth from '../components/hooks/useScreenWidth'
import Footer from '../components/layout/Footer'
import MetaHelmet from '../components/MetaHelmet'
import Navbar from '../components/pages/HomeLanding/Header/Navbar'
import { setUserLocation } from '../redux/slices/UserAnalytics'

const PrivacyPolicy = ({meta}) => {
  const { screenWidth } = useScreenWidth()
  const dispatch = useDispatch()
  useEffect(()=> {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(function(position) {
      dispatch(setUserLocation({latitude:position.coords.latitude,longitude: position.coords.longitude}))
    });
  })
  return (
    <>
      <div
        className='font-dm-sans w-screen min-h-screen'
        style={
          screenWidth > 768
            ? {
                backgroundImage: `url(${BackgroundGradient.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100vw 80vh',
                backgroundPosition: '50% 0%',
                marginTop:"70px",
              }
            : {}
        }
      >
        <MetaHelmet title={meta.title} description={meta.description} link={meta.link} />
        <div className="fixed w-full bg-white z-50 top-0 shadow">
    <Navbar />
    </div>

        <div className='bg-white w-10/12 mt-12 sm:mt-20 block m-auto p-7   sm:p-16 rounded-3xl'>
          <h1 className='text-3xl sm:text-6xl font-bold '>Privacy Policy </h1>

          {/* section-1 */}
          <section className='px-2'>
            <h2 className='text-primary text-2xl sm:text-4xl font-bold py-6'>
              Intent:
            </h2>
            <p className='text-lg'>
              We know that you care how information about you is used and shared
              and we appreciate your trust in us to do that carefully and
              sensibly. This Privacy Policy explains how we, Ostello India Pvt
              Ltd (trading as “Ostello”), collect, process and use information
              of our users (hereinafter addressed as “you”, “your”, “yourself”).
              We are the operator of the website Ostello , associated mobile
              application and a provider of a range of services thereto. We
              provide a platform where we may list offers for local services,
              goods and travel which are made available by us or other sellers
              (collectively: “Sellers”). This Privacy Policy applies to
              information that we collect through our website, mobile
              application, electronic communications or services (collectively,
              the “Site”). We will routinely update this Privacy Policy to
              improve our practices and to reflect new or different privacy
              practices, such as when we add new services, functionality or
              features to the Site. You can determine when this version of the
              Privacy Policy was adopted by referring to the “Effective Date”
              above. By visiting this Website you agree to be bound by the terms
              and conditions of this Privacy Policy. If you do not agree, please
              do not use or access our Website. By mere use of the Website, you
              expressly consent to our use and disclosure of your personal
              information in accordance with this Privacy Policy. This Privacy
              Policy is incorporated into and subject to the Terms of Use.
            </p>
          </section>

          {/* section-2 */}

          <section className='px-2'>
            <h2 className='text-primary text-2xl sm:text-4xl font-bold py-6'>
              1. Sensitive Personal Data and Information (SPDI):
            </h2>
            <p className='text-lg '>
              Pursuant to the Information Technology Act, 2000, we are required
              to give a disclosure of the SPDI collected by us and how do we use
              it. We may collect and retain the following information from and
              about you if you interact with us through the Site: <br />
              <br /> your email address and Site password; <br /> your payment
              details, billing and delivery addresses, a credit / debit card
              number and a credit / debit card expiration date and/ or other
              payment instrument details; your phone numbers;
              <br /> your location, website browsing patterns (e.g., through
              cookies) and purchase history; other information you actively
              submit to us or we can determine about you based on your
              interactions with our Site and services. <br /> We get access to
              such information when you: <br />
              <br /> register, subscribe, authorize the transfer of, or create
              an account with us; <br /> open or respond to emails; <br />{' '}
              provide information to enroll or participate in programs provided
              on behalf of, or together with other Sellers, merchants,
              co-marketers, distributors, resellers and other business partners,
              with your consent or as necessary to provide services you have
              requested; <br /> visit any page online that displays our ads or
              content; <br />
              purchase products or services on or through the Site; <br />{' '}
              interact or connect with or Link href the Site via integrated
              social networking tools; and post comments to the Site.
            </p>
          </section>

          {/* section-3 */}

          <section className='px-2'>
            <h2 className='text-primary text-2xl sm:text-4xl font-bold py-6'>
              2. Managing User Choices
            </h2>
            <p className='text-lg '>
              You can manage the types of personal data you provide to us and
              can limit how we communicate with you. <br /> You can manage your
              email and notice preferences by logging into your account through
              the Site or by adjusting the settings in our mobile application.{' '}
              <br /> You can also manage your subscriptions by following
              subscription management instructions contained in any commercial
              emails that we send you. <br /> You may update your subscription
              preferences at any time. Please note that even if you decide not
              to subscribe to, or to unsubscribe, from promotional email
              messages, we may still need to contact you with important
              transactional information related to your account and your
              purchases. For example, even if you have unsubscribed from our
              promotional email messages, we will still send you confirmations
              when you make purchases on the Site. You hereby consent to receive
              communications by SMS or calls from Ostello or its affiliates or
              its partners with regard to the services provided by Ostello or as
              facilitated by the Ostello partners. <br /> You may also manage
              how your mobile device and mobile browser share information on and
              about your devices with us, as well as how your mobile browser
              handles cookies by adjusting the privacy and security settings on
              your mobile device. Please refer to instructions provided by your
              mobile service provider and the manufacturer of your device to
              learn how to adjust your settings. <br />
              You may also manage the sharing of certain personal data with us
              when you connect with us through social networking platforms or
              applications. <br /> If you register for customized email
              newsletters containing offers for local services, goods and
              travel, we will work to make information more relevant for you and
              customize newsletters based on information you share with us, your
              location, website browsing preferences (for example, through
              cookies), purchase history or based on other attributes of your
              relationship with us. You can reject and delete cookies and
              unsubscribe from newsletters at any time by clicking links in each
              newsletter you wish to unsubscribe from.
            </p>
          </section>

          {/* section-4 */}
          <section className='px-2'>
            <h2 className='text-primary text-2xl sm:text-4xl font-bold py-6'>
              3. Use of Information
            </h2>
            <p className='text-lg '>
              We process personal data for the following purposes: <br />
              <br /> Operate, maintain and improve the Site; <br /> Provide you
              with personalized direct marketing initiatives via email and
              direct marketing offers; <br /> Facilitate and process orders –
              for example, for vouchers and other goods and services; Facilitate
              table reservation process; <br /> Determine your eligibility for
              certain types of offers, products or services that may be of
              interest to you, and analyze advertising effectiveness; <br />{' '}
              Answer your questions and respond to your requests; <br /> To
              establish and analyze individual and group profiles and customer
              behavior; <br /> Communicate and provide additional information
              that may be of interest to you about us, the Sellers and our
              business partners; <br /> Send you reminders, technical notices,
              updates, security alerts, support and administrative messages,
              service bulletins, marketing messages, and requested information,
              including on behalf of business partners; <br />
              Administer rewards, surveys, contests, or other promotional
              activities or events; <br />
              Manage our everyday business needs, such as administration of the
              Site, analytics, fraud prevention, and enforcement of our
              corporate reporting obligations and Terms of Use or to comply with
              the law; <br /> Comply with our legal obligations, resolve
              disputes, and enforce our agreements; Allows you to sign up for
              special offers from merchants and other business partners through
              the Site; <br /> and to Enhance other information we have about
              you to help us better understand you, determine your interests and
              provide you with more relevant and compelling services.
            </p>
          </section>

          {/* section-5 */}

          <section className='px-2'>
            <h2 className='text-primary text-2xl sm:text-4xl font-bold py-6'>
              4. Disclosure of Information
            </h2>
            <p className='text-lg '>
              We are not in the business of selling or renting personal data. We
              will not share your personal data, except in the following manner:{' '}
              <br />
              <br />
              with the Sellers, so they can sell and deliver to you and provide
              such other ancillary services such as table reservation to serve
              you better; <br /> to report or collect on payments owed to
              Sellers, merchants or other business partners; as necessary to
              perform contractual obligations towards you with business partners
              to the extent you have purchased or redeemed a nearbuy voucher,
              goods or services offered by a business partner or participated in
              an offer, rewards, contest or other activity or program sponsored
              or offered through us or the Sellers on behalf of a business
              partner; in case of a merger, acquisition or reorganization with a
              purchaser of our company or all or substantially all of our
              assets; <br /> to comply with legal orders and government
              requests, or as needed to support auditing, compliance; <br /> to
              combat fraud or criminal activity, and to protect our rights or
              those of our affiliates, business partners and users, or as part
              of legal proceedings affecting nearbuy; <br /> in response to a
              legal process, including to law enforcement agencies, regulators,
              and courts; <br /> or with your consent or as otherwise required
              or permitted by law. <br /> We encourage business partners to
              adopt and post privacy policies. However, while we share personal
              data with business partners only for the above-mentioned purposes,
              their subsequent processing and use of personal data obtained
              through Ostello is governed by their own privacy policies and
              practices and are not subject to our control.
            </p>
          </section>

          {/* section-6 */}

          <section className='px-2'>
            <h2 className='text-primary text-2xl sm:text-4xl font-bold py-6'>
              5. Collection of information
            </h2>
            <p className='text-lg '>
              We collect your personal data when you register, subscribe, create
              an account, make a purchase or redeem vouchers or otherwise
              contact us or communicate with us actively. For example, you
              provide personal data to us when you contact us online for
              customer service and other support using self-help tools, such as
              email, text, or by posting to online communities.Also, through
              other online and offline information from our business partners
              who may report to us redemption, collection, or refund-return
              events.{' '}
            </p>
          </section>

          {/* section-7 */}

          <section className='px-2'>
            <h2 className='text-primary text-2xl sm:text-4xl font-bold py-6'>
              6. Security of Personal Information
            </h2>
            <p className='text-lg '>
              We use strict security measures to ensure the security, integrity
              and privacy of Your Personal Information and to protect your
              Personal Information against unauthorized access or unauthorized
              alteration, disclosure or destruction. For this purpose, we have
              adopted internal reviews of the data collection, storage and
              processing practices and security measures, including offering the
              use of a secure server to guard against unauthorized access to
              systems where we store your personal data. We shall, however, not
              be responsible for any breach of security or for any actions of
              any third parties that receive Your Personal Information. The
              Website is also linked to many other sites and we are not/shall
              not be responsible for their privacy policies or practices as it
              is beyond our control.{' '}
            </p>
          </section>

          {/* section-8 */}

          <section className='px-2 mb-40'>
            <h2 className='text-primary text-2xl sm:text-4xl font-bold py-6'>
              7. User’s Rights in relation to Personal Data
            </h2>
            <p className='text-lg '>
              By keeping your personal data updated you can help us to ensure
              that we can respect your preferences and offer you the goods and
              services that are most relevant to you. <br />
              <br />
              You can access, update, rectify, and delete your information you
              provided to us in your profile by logging into your account or
              contacting us at Ostello/contact While we are ready to assist you
              in managing your subscriptions, closing your account, and removing
              your active profile, we cannot always delete records of past
              interactions and transactions. For example, we may be required to
              retain records relating to previous purchases on the Site for
              financial reporting and compliance reasons.
            </p>
          </section>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default PrivacyPolicy

export const getStaticProps = async () => {
  const meta = {
    title: "Privacy Policy - ostello.co.in",
    description: "Privacy Policy - ostello.co.in - Information on all tuition centers and institutes in India",
    link: "https://www.ostello.co.in/privacy" 
  }

  return {
    props: {
      meta,
    },
  };
};