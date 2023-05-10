import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BackgroundGradient from "../assets/background/landing_gradient.png";
import useScreenWidth from "../components/hooks/useScreenWidth";
import Footer from "../components/layout/Footer";
import MetaHelmet from "../components/MetaHelmet";
import Navbar from "../components/pages/HomeLanding/Header/Navbar";
import { setUserLocation } from "../redux/slices/UserAnalytics";

const TermsAndConditions = ({ meta }) => {
  const { screenWidth } = useScreenWidth();
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
  });
  return (
    <>
      <div className="fixed w-full bg-white z-50 top-0">
        <Navbar />
      </div>
      <div
        className="font-dm-sans w-screen min-h-screen"
        style={
          screenWidth > 768
            ? {
                backgroundImage: `url(${BackgroundGradient.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100vw 80vh",
                backgroundPosition: "50% 0%",
                marginTop: "80px",
              }
            : {}
        }
      >
        <MetaHelmet
          title={meta.title}
          description={meta.description}
          link={meta.link}
        />

        <div className="bg-white w-10/12 mt-12 sm:mt-20 block m-auto p-7   sm:p-16 rounded-3xl">
          <h1 className="text-3xl sm:text-6xl font-bold ">
            Terms & Conditions{" "}
          </h1>

          {/* section-1 */}
          <section className="px-2 py-10">
            <p className="text-lg">
              General: By using ostello application, you, the Customer (“you”,
              “your”, or the “User” in this document) unconditionally agree to
              the terms and conditions that we have provided herein for use of
              ostello Website or mobile application owned and maintained by
              Ostello India Private Limited. This Website or mobile application
              and any individual websites or merchant-specific, city-specific,
              or state-specific sites now or hereinafter contained within or
              otherwise available through external hyperlinks (“Minisites”) with
              our Website or mobile application are private property. All
              interactions on this Website or mobile application must comply
              with these Terms of Use. If you do not wish to agree to the
              outlined terms and conditions (the “Terms of Use” in this
              document) please refrain from using this Website or mobile
              application. The term Website shall include any or all Minisites,
              wherever mentioned. For the purpose of these Terms of Use,
              wherever the context so requires "You" or "User" shall mean any
              natural or legal person who has agreed to become a buyer on the
              Website or mobile application by providing Registration Data while
              registering on the Website or mobile application as Registered
              User using the computer systems or mobile device. Ostello allows
              the User to surf the Website or make purchases without registering
              on the Website. The term "We", "Us", "Our" shall mean Ostello
              India Pvt Ltd or Ostello. The terms Ostello have been used
              interchangeably in the document.
              <br />
              <br />
              CAUTION: PLEASE READ THIS AGREEMENT CAREFULLY. BY BROWSING,
              ACCESSING OR USING THIS WEBSITE OR MOBILE APPLICATION OR BY USING
              ANY FACILITIES OR SERVICES MADE AVAILABLE THROUGH OR ON IT, YOU
              ARE AGREEING TO THE TERMS OF USE THAT APPEAR BELOW (ALL OF WHICH
              ARE CALLED THE “AGREEMENT”). THIS AGREEMENT IS MADE BETWEEN YOU
              AND US. USE OF THE SERVICES AND THE WEBSITE OR MOBILE APPLICATION
              AND ANY PURCHASE MADE THERETO ARE EACH SUBJECT TO THE TERMS OF USE
              SET OUT IN THIS AGREEMENT
              <br />
              <br />
              Amendments and changes: We reserve the right to amend these terms
              and conditions at any time. All amendments to these terms and
              conditions will be posted on-line. Such changes may include, among
              other things, the adding of certain fees or charges. We suggest to
              you, therefore, that you re-read this important notice containing
              our Terms of Use and Privacy Policy from time to time so that you
              stay informed as to any such changes. If we make changes to our
              Terms of Use and Privacy Policy and you continue to use our
              Website or mobile application, you are implicitly agreeing to the
              amended Terms of Use and Privacy Policy. Unless specified
              otherwise, any such deletions or modifications shall be effective
              immediately upon Ostello’s posting thereof. Continued use of any
              of the services provided by Ostello via the Website or mobile
              application (or via other electronic or other communication from
              ostello) including the information services, content and
              transaction capabilities on the Website or mobile application,
              including the ability to make a purchase (all of which are called
              the “Services” in this document) will be deemed to constitute
              acceptance of the new terms and conditions. Ostello may
              immediately terminate these Terms or any Services with respect to
              you, or generally cease offering or deny access to the Services or
              any portion thereof, at any time for any reason.
              {/* <br />
              <br />
              Amendments and changes: We reserve the right to amend these terms
              and conditions at any time. All amendments to these terms and
              conditions will be posted on-line. Such changes may include, among
              other things, the adding of certain fees or charges. We suggest to
              you, therefore, that you re-read this important notice containing
              our Terms of Use and Privacy Policy from time to time so that you
              stay informed as to any such changes. If we make changes to our
              Terms of Use and Privacy Policy and you continue to use our
              Website or mobile application, you are implicitly agreeing to the
              amended Terms of Use and Privacy Policy. Unless specified
              otherwise, any such deletions or modifications shall be effective
              immediately upon Ostello’s posting thereof. Continued use of any
              of the services provided by Ostello via the Website or mobile
              application (or via other electronic or other communication from
              ostello) including the information services, content and
              transaction capabilities on the Website or mobile application,
              including the ability to make a purchase (all of which are called
              the “Services” in this document) will be deemed to constitute
              acceptance of the new terms and conditions. Ostello may
              immediately terminate these Terms or any Services with respect to
              you, or generally cease offering or deny access to the Services or
              any portion thereof, at any time for any reason. */}
            </p>
          </section>

          {/* section-2 */}
          <section className="px-2">
            <h2 className="text-primary text-2xl sm:text-4xl font-bold py-6">
              GENERAL
            </h2>
            <p className="text-lg ">
              User Accounts: In order to use most aspects of the Services, you
              must register for and maintain an active personal user Services
              account (“Account”). You must be at least 18 years of age, or the
              age of legal majority in your jurisdiction (if different than 18),
              to obtain an Account. Account registration requires you to submit
              to ostello certain personal information, such as your name,
              address, mobile phone number, as well as at least one valid
              payment method (either a credit card or accepted payment partner)
              at the time of making payment. You agree to maintain accurate,
              complete, and up-to-date information in your Account. Your failure
              to maintain accurate, complete, and up-to-date Account
              information, including having an invalid or expired payment method
              on file, may result in your inability to access and use the
              Services or Ostello’s termination of these Terms with you. You are
              responsible for all activity that occurs under your Account, and
              you agree to maintain the security and secrecy of your Account
              username and password at all times. Unless otherwise permitted by
              nearbuy in writing, you may only possess one Account <br />
              <br />
              Territory: The Website or mobile application and the Services and
              any purchase are directed solely at those who access the Website
              from the Republic of India. Ostello makes no representation that
              Services (or any goods or services) are available or otherwise
              suitable for use outside the Republic of India. If you choose to
              access the Website or mobile application (or use the Service or
              make a purchase) from locations outside the Republic of India, you
              do so on your own initiative and are responsible for the
              consequences thereof. <br />
              <br />
              Website and/or Mobile Application: ostello provides an interactive
              online service owned and operated by Ostello India Pvt Ltd through
              the Website on the World Wide Web of the Internet (the “Web” or
              “Internet”) and its mobile application, consisting of information
              services, content and transaction capabilities provided by
              ostello, its holding company and its associates, if any, with whom
              it has business relationships (“Business Associates”) including
              but not limited to third parties that provide services in relation
              to creation, production or distribution of content for the Website
              or mobile application (“Third Party Content Providers”), third
              parties that provide advertising services to ostello (“Third Party
              Advertisers”) and third parties that perform functions on behalf
              of ostello like sending out and distributing our administrative
              and promotional emails and text messages (“Third Party Service
              Providers”). <br />
              <br />
              Right to Transfer: The right to use this Website or mobile
              application is personal to the User and is not transferable to any
              other person or entity. The User shall be responsible for
              protecting the confidentiality of User’s password(s), if any.
              Users understand and acknowledge that, although the Internet is
              often a secure environment, sometimes there are interruptions in
              service or events that are beyond the control of ostello, and
              ostello shall not be responsible for any data lost while
              transmitting information on the Internet. <br />
              <br />
              Not on Uninterrupted Basis: While it is Ostello’s objective to
              make the Website or mobile application accessible at all times,
              the Website or mobile application may be unavailable from time to
              time for any reason including, without limitation, routine
              maintenance. You understand and acknowledge that due to
              circumstances both within and outside of the control of ostello,
              access to the Website or mobile application may be interrupted,
              suspended or terminated from time to time. Ostello reserves the
              right, in its sole discretion, to terminate the access to any or
              all ostello website(s) and the related services or any portion
              thereof at any time, without notice.Ostello shall also have the
              right at any time to change or discontinue any aspect or feature
              of the Website or mobile application, including, but not limited
              to, content, graphics, Offers, settings, hours of availability and
              equipment needed for access or use. Further, ostello may
              discontinue disseminating any portion of information or category
              of information, may change or eliminate any transmission method
              and may change transmission speeds or other signal
              characteristics.
            </p>
          </section>

          {/* section-3 */}

          <section className="px-2">
            <h2 className="text-primary text-2xl sm:text-4xl font-bold py-6">
              USER CONDUCT
            </h2>
            <p className="text-lg ">
              {" "}
              Restrictions: The User undertakes without limitation, not to use
              or permit anyone else to use the Service or Website or mobile
              application. to upload, send or receive any information for which
              you have not obtained all necessary licenses and/or approvals
              (from us or third parties); or which constitutes or encourages
              conduct that would be considered a criminal offence, give rise to
              civil liability or otherwise be contrary to the law of or infringe
              the rights of any third party in any country in the world. to
              upload, send or receive any material which is technically harmful
              (including computer viruses, logic bombs, worms, harmful
              components, corrupted data, malicious software, harmful data, or
              anything else which may interrupt, interfere with, corrupt or
              otherwise cause loss, damage, destruction or limitation to the
              functionality of any software or computer equipment). to intercept
              or attempt to intercept any communications transmitted by way of a
              telecommunication system. for a purpose other than which we have
              designed them or intended them to be used. for any fraudulent
              purposes. in any way which is calculated to incite hatred against
              any ethnic, religious or any other minority or is otherwise
              calculated to adversely affect any individual, group or entity. to
              upload, send or receive any material, which is not civil or
              tasteful. to upload, send or receive any material, including User
              Content, which is unlawful, harmful, tortious, threatening,
              abusive, harassing, hateful, racist, homophobic, infringing,
              pornographic, violent, misleading, grossly offensive, of an
              indecent, obscene or menacing character, blasphemous or defamatory
              or of a libellous nature of any person or entity, in contempt of
              court or in breach of confidence, or which infringes the rights of
              another person or entity, including copyrights, trademarks, trade
              secrets, patents, rights of personality, publicity or privacy or
              any other third party rights: to cause annoyance, inconvenience or
              needless anxiety <br />
              <br />
              Forbidden uses: The following uses of the Site and Services are
              expressly prohibited and you undertake not to do (or to permit
              anyone else to do) any of the following: resell the Services or
              Site. furnish false data including false names, addresses and
              contact details and fraudulent use of credit/debit card numbers.
              attempt to circumvent our security or network including accessing
              data not intended for you, logging into a server or Account you
              are not expressly authorized to access, or probe the security of
              other networks (such as running a port scan). access the Services
              (or Site) in such a way as to, or commit any act that would or
              does, impose an unreasonable or disproportionately large burden on
              our infrastructure or that otherwise interrupts or interferes with
              its functionality, efficiency or operation. execute any form of
              network monitoring which will intercept data not intended for you.
              send unsolicited mail messages, including the sending of "junk
              mail" or other advertising material to individuals who did not
              specifically request such material. You are explicitly prohibited
              from sending unsolicited bulk mail messages. This includes bulk
              mailing of commercial advertising, promotional, or informational
              announcements, and political or religious tracts. Such material
              may only be sent to those who have explicitly requested it. If a
              recipient asks to stop receiving email of this nature, you may not
              send that person any further email. create or forward "chain
              letters" or other "pyramid schemes" of any type, whether or not
              the recipient wishes to receive such mailings send malicious
              email, including flooding a user or site with very large or
              numerous emails enter into fraudulent interactions or transactions
              with us, a Seller or a Merchant (which shall include entering into
              interactions or transactions purportedly on behalf of a third
              party where you have no authority to bind that third party or you
              are pretending to be a third party). use the Services or Site (or
              any relevant functionality of either of them) in breach of this
              Agreement. use in an unauthorized manner, or forge, mail header
              information. engage in any unlawful or criminal activity in
              connection with the use of the Services and/or the Site or any
              Voucher. copy or use any User Content for any commercial purposes.
              Any conduct by a User that in Ostello’s exclusive discretion is in
              breach of the Terms of Use or which restricts or inhibits any
              other User from using or enjoying this Website or mobile
              application is strictly prohibited. The User shall not use this
              Website or mobile application to advertise or perform any
              commercial, religious, political or non-commercial solicitation,
              including, but not limited to, the solicitation of users of this
              Website or mobile application to become users of other online or
              offline services directly or indirectly competitive or potentially
              competitive with nearbuy. ostello reserves the right to prevent
              you from using the Website (or mobile application) and the Service
              (or any part of thereof) and to prevent you from making any
              purchase, if your conduct is found to be in question or
              contravention of such Terms as mentioned above or in this
              Agreement.
            </p>
          </section>

          {/* section-4 */}
          <section className="px-2 py-6">
            <h2 className="text-primary text-xl sm:text-2xl font-bold ">
              PURCHASE AND SALE OF PRODUCTS AND/OR SERVICES
            </h2>
            <p className="text-lg ">
              Ostello India Pvt Ltd takes no responsibility for the services
              and/or products for which ostello Vouchers may be redeemed.
              Further, ostello makes no warranty to the Users for the quality,
              safety, usability, or another aspect of the product or service for
              which the ostello Voucher may be redeemed. Some services for which
              ostello Voucher(s) can be redeemed are activities that involve
              potential bodily harm (such as different forms of adventure sports
              and activities.), and for those activities ostello takes no
              responsibility for the service or activity being offered, and the
              User takes responsibility for his or her own actions in utilizing
              the services for which the Ostello Voucher can be redeemed.
            </p>
          </section>

          {/* section-5 */}
          <section className="px-2  py-6">
            <h2 className="text-primary text-xl sm:text-2xl font-bold">
              PROMOTIONAL CODES
            </h2>
            <p className="text-lg ">
              Ostello India Pvt Ltd may, in ostello’s sole discretion, create
              promotional codes that may be redeemed for Account credit, or
              other features or benefits related to the Services and/or a Third
              Party Provider’s services, subject to any additional terms that
              ostello establishes on a per promotional code basis (“Promo
              Codes”). You agree that Promo Codes: must be used for the intended
              audience and purpose, and in a lawful manner. may not be
              duplicated, sold or transferred in any manner, or made available
              to the general public (whether posted to a public form or
              otherwise), unless expressly permitted by ostello. may be disabled
              by ostello at any time for any reason without liability to
              ostello. may only be used pursuant to the specific terms that
              ostello establishes for such Promo Code. are not valid for cash;
              may expire prior to your use; and unless otherwise specified
              cannot be used more than once. Ostello reserves the right to
              withhold or deduct credits or other features or benefits obtained
              through the use of Promo Codes by you or any other user in the
              event that ostello determines or believes that the use or
              redemption of the Promo Code was in error, fraudulent, illegal, or
              in violation of the applicable Promo Code terms or these Terms.
            </p>
          </section>

          {/* section-6 */}
          <section className="px-2 py-6">
            <h2 className="text-primary text-xl sm:text-2xl font-bold ">
              INDEMNIFICATION
            </h2>
            <p className="text-lg ">
              The User agrees to defend, indemnify and hold harmless ostello,
              its subsidiaries and Business Associates, and their respective
              directors, officers, employees and agents from and against all
              claims and expenses, including attorneys’ fees, arising out of (i)
              the use of this Website and/or the mobile application by the User;
              (ii) the use of the Voucher; (iii) the use of the Service or
              Website or mobile application through your password; or (iv) any
              breach of this Agreement by you.
            </p>
          </section>

          {/* section-7 */}
          <section className="px-2 py-6">
            <h2 className="text-primary text-xl sm:text-2xl font-bold ">
              TERMINATION
            </h2>
            <p className="text-lg ">
              ostello may terminate this Agreement at any time. Without limiting
              the foregoing, ostello shall have the right to immediately
              terminate any passwords or accounts of a User in the event of any
              conduct by the User which ostello, in its sole discretion,
              considers being unacceptable, or in the event of any breach by
              User of this Agreement. One User can have only one Account with a
              unique email ID and unique phone number. If ostello has any
              suspicion or knowledge that any of its Users have created multiple
              Accounts with different email addresses or phone numbers
              (including but not limited to account creation by using false
              names or providing misleading data for creating those Accounts or
              using disposable email addresses or disposable phone numbers) to
              generate additional cash back credits or misuse or take undue
              advantage of the promotional benefits being provided on the
              nearbuy Platform, then ostello may while reserving its rights to
              initiate civil and/or criminal proceedings against such User may
              also at its sole discretion terminate, suspend, block, restrict,
              cancel the Account of such User and/or disqualify that User and
              any related Users from availing the services ordered or undue
              benefits availed through these accounts. All such provisions
              wherein the context so requires, including Clauses on Intellectual
              Property Rights, Disclaimer of Warranty, Limitation of Liability,
              License Grant, Indemnification and Termination above will survive
              termination of this Agreement. Our right to terminate this
              Agreement shall not prejudice any other right or remedy we may
              have in respect of any breach or any rights, obligations or
              liabilities accrued prior to termination.
            </p>
          </section>

          {/* section-8 */}
          <section className="px-2 py-6">
            <h2 className="text-primary text-xl sm:text-2xl font-bold ">
              THIRD PARTY CONTENT
            </h2>
            <p className="text-lg ">
              Ostello, similar to an Internet Service Provider, is a distributor
              (and not a publisher) of content supplied by third parties and
              Users. Accordingly, ostello does not have editorial control over
              such content. Any opinions, advice, statements, services, offers,
              or other information or content expressed or made available by
              third parties, including Third Party Content Providers, or any
              other Users are those of the respective author(s) or distributors
              and not of nearbuy. Neither Ostello nor any third-party provider
              of information guarantees the accuracy, completeness, or
              usefulness of any content, nor its merchantability or fitness for
              any particular purpose (refer to the Clause for ‘Disclaimer of
              Warranty, Limitation of Liability’ above for the complete
              provisions governing limitation of liabilities and disclaimers of
              warranty). In many instances, the content available through this
              Website or mobile application represents the opinions and
              judgments of the respective information provider, User, or other
              users not under contract with ostello. Ostello neither endorses
              nor is responsible for the accuracy or reliability of any opinion,
              advice or statement made on the Website by anyone other than
              authorized ostello employee/spokespersons while acting in official
              capacities. Under no circumstances will ostello be liable for any
              loss or damage caused by User’s reliance on information obtained
              through the Website. It is the responsibility of User to evaluate
              the accuracy, completeness or usefulness of any information,
              opinion, advice etc. or other content available through the
              Website. The Website contains links to third-party websites
              maintained by other content providers. These links are provided
              solely as a convenience to you and not as an endorsement by
              ostello of the contents on such third-party websites and ostello
              hereby expressly disclaims any representations regarding the
              content or accuracy of materials on such third-party websites. If
              the User decides to access linked third-party websites, the User
              does so at his/her own risk. Unless you have executed a written
              agreement with ostello expressly permitting you to do so, you may
              not provide a hyperLink href the Website from any other website.
              Ostello reserves the right to revoke its consent to any link at
              any time in its sole discretion.
            </p>
          </section>

          {/* section-8 */}
          <section className="px-2 py-6 mb-40">
            <h2 className="text-primary text-xl sm:text-2xl font-bold ">
              ADVERTISEMENT
            </h2>
            <p className="text-lg ">
              Ostello India Pvt Ltd may places advertisements in different
              locations on the Website and at different points during use of the
              Service. These locations and points may change from time to time -
              but we will always clearly mark which goods and services are
              advertisements (i.e. from persons other than us), so that it is
              clear to you which goods and services are provided on an objective
              basis and which are not (i.e. the advertisements). You are free to
              select or click on advertised goods and services or not as you see
              fit. Any advertisements may be delivered on our behalf by a Third
              Party Advertiser. No personal data (for example your name,
              address, email address or telephone number) will be used during
              the course of serving our advertising, but, on our behalf. <br />
              <br />
              This document is framed in accordance with Information Technology
              Act, 2000, rules framed thereunder and such other applicable and
              the amended provisions pertaining to electronic records in various
              statutes as amended by the Information Technology Act, 2000. This
              is an electronic record which is generated by a computer system
              and does not require any physical or digital signatures
            </p>
          </section>
          {/* <Adsense
            client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
            slot="5986550858"
            style={{ display: "block", marginTop:"10px" }}
            layout="in-article"
            format="fluid"
          /> */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default TermsAndConditions;

export const getStaticProps = async () => {
  const meta = {
    title: "Terms of Use - ostello.co.in",
    description:
      "Terms of Use - ostello.co.in - Information on all tuition centers and institutes in India",
    link: "https://www.ostello.co.in/terms",
  };

  return {
    props: {
      meta,
    },
  };
};
