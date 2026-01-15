import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="gap-2 pl-0 hover:pl-2 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <div className="border-b pb-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-foreground">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                1. Introduction
              </h2>
              <p className="leading-7">
                At Catex Technology, we take your privacy seriously. This
                Privacy Policy applies to our website
                https://app.localmator.com/ and our platform Localmator. This
                policy explains how Catex Technology collects, uses and protects
                your Information, including data that is personal to you and can
                identify you an as individual. It also describes how you can
                access, update and delete your personal information.
              </p>
              <p className="leading-7">
                We will post any privacy policy changes to this page.
                Additionally, we may provide notice of prominent updates by
                sending you an email or if you are a user of our platform, via a
                notification through the app.
              </p>
              <p className="leading-7">
                Prior to using our services, please read this policy completely
                so there is full clarity on your relationship with us.
              </p>
              <p className="leading-7">
                If you have any questions about this Privacy Policy or our use
                of the information you provide us, please email us at
                support@localmator.com or by mail to:
              </p>
              <div className="bg-muted p-4 rounded-lg text-sm">
                <p className="font-medium">Attn: Privacy</p>
                <p>Localmator</p>
                <p>Address 1: 4 Unity close ada george</p>
                <p>Port Harcourt 500272, Rivers</p>
                <p>Address 2: 3568 Dodge Street Omaha, NE 68131</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                2. Information we collect
              </h2>
              <p className="leading-7">
                We collect information that you provide to us directly, such as
                username, name, address, email, phone number as well as other
                information that could be used to identify you.
              </p>
              <p className="leading-7">
                We may also gather credit card/other payment information, if
                that is provided to us during payment of a contract or for
                services rendered.
              </p>
              <p className="leading-7">
                We also gather technical data automatically about your computer
                or devices and their location, ip address, browser type,
                internet service provider (ISP), operating system, site
                interaction data, date/time stamp, clickstream data, etc using a
                variety of technologies including but not limited to cookies,
                flash cookies, pixels, web beacons, logs and other technologies.
              </p>
              <p className="leading-7">
                Information about you may also be gathered from other sources
                such as third party sites, social networking sites. Contact
                information, search term and search result information may also
                be procured from business information database providers.
              </p>
              <p className="leading-7">
                We send push notifications from time to time to update you about
                feature updates, events or promotions both via email and via
                notification on our platform.
              </p>
              <p className="leading-7">
                We may link information we store within our analytics software
                to Personal Information you submit within our platform or on our
                website.
              </p>
              <p className="leading-7">
                Our website and platform are not intended for or targeted at
                children under the age of 13. We do not knowingly or
                intentionally collect information about children under 13 years
                of age. If you feel that we have gathered data for any child
                under 13, please contact us at support@localmator.com so we may
                take immediate corrective action.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                Google Business Profile Data
              </h2>
              <p className="leading-7">
                Our platform uses the Google Business Profile API to access and
                manage business information on behalf of businesses that
                authorize us. This may include business profile details, posts,
                reviews, and performance insights. We access this data only with
                explicit permission from the business owner or authorized
                manager and use it solely to provide Google Business Profile
                management and insights services. We do not sell or misuse
                Google Business Profile data and comply fully with Google API
                Services User Data Policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                3. How do we use your information?
              </h2>
              <p className="leading-7">
                Our use of your personal information depends on your
                relationship with us. Typically your personal data is used in
                the following manner:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Provision of services in accordance with the contractual
                  obligations to you or your company.
                </li>
                <li>
                  In order to comply with legal obligations such as financial
                  reporting, court orders, warrants, etc in accordance with
                  applicable law.
                </li>
                <li>
                  To communicate with you about our services, promotions,
                  newsletters and special offers or private updates about new
                  features and products.
                </li>
                <li>
                  For Maintaining and improving our site and platform. We may
                  also use your IP addresses to troubleshoot issues, analyze
                  trends, track site/platform navigation, or gather your
                  demographic information to enhance user experience.
                </li>
              </ul>
              <p className="leading-7">
                We may use your personal data as described in this Privacy
                Policy, in our contractual paperwork, or as allowed by
                applicable laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                4. Retention of personal information
              </h2>
              <p className="leading-7">
                The duration for which we retain information about you depends
                on the type of information being retained.
              </p>
              <p className="leading-7">
                We keep your personal data if we have an ongoing legitimate
                contractual or business need to process your personal
                information. For example, we may store your name, phone number
                and email address to contact your about renewing or purchasing
                subscription to our platform. After such time, we either delete
                or anonymize your personal data.
              </p>
              <p className="leading-7">
                If you have elected to receive marketing communications from us,
                we retain information about your marketing preferences for a
                reasonable period of time.
              </p>
              <p className="leading-7">
                We retain information derived from cookies and other tracking
                technologies for a reasonable period of time from the date such
                information was created.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                5. How we share information we collect
              </h2>
              <p className="leading-7">
                We hire other companies and people to perform a wide variety of
                services on our behalf. We may need to share your personal data
                with them to provide information, products and services to you.
                This includes assisting us with marketing, communication,
                advertising, fulfillment of contractual obligations, providing
                support, working on creation and improvement of the
                functionality and features of our site.
              </p>
              <p className="leading-7">
                These third parties are authorized only to use your personal
                data to provide services to us or as required by law.
              </p>
              <p className="leading-7">
                We may share your information with our parent company, sister
                concerns, subsidiaries and they may use your information in
                accordance with this Privacy Policy.
              </p>
              <p className="leading-7">
                We may be required by law to disclose your information, and we
                will try to take steps to limit such disclosure.
              </p>
              <p className="leading-7">
                If there is a Change of Ownership if we are acquired or
                otherwise sell our business, we will transfer all of the
                information to the successor entity. We will try to notify you
                of any change in ownership or sale by either posting it on our
                site or by emailing you at the email address we store in our
                systems.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                6. Transfer of information internationally
              </h2>
              <p className="leading-7">
                To facilitate our global operations, we may share your personal
                data internationally in the circumstances defined in the section
                “How we Share Information we collect”. By using our platform or
                site, you consent to have your personal data transferred in the
                United States or any country where NETSACH TECH LTD or its
                service providers, affiliates and subsidiaries maintain
                facilities.
              </p>
              <p className="leading-7">
                This Privacy Policy shall apply even if we transfer Personal
                Information to other countries.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                7. Technologies we use
              </h2>
              <p className="leading-7">
                <strong>Cookies/Flash Cookies:</strong> We use cookies, flash
                cookies and other collected information to improve and further
                develop and improve our website and platform. We also use
                cookies to keep your session active and customize your
                experience. The cookies are stored in your computer. You can
                delete them or reject them, but if you do, you cannot use our
                service.
              </p>
              <p className="leading-7">
                <strong>Aggregate Non-Identifiable Information:</strong> We use
                aggregate, non-identifiable information to improve our Website
                and for other internal and external business purposes.
              </p>
              <p className="leading-7">
                <strong>Server Logs:</strong> Our server logs record system
                information when you view our website or use our platform.
              </p>
              <p className="leading-7">
                <strong>Pixel Tags/Web Beacons:</strong> We may embed tracking
                pixels or web beacons, on our website, in our platform or in
                emails that we send to you. These allow a web server to read
                certain data from your browser, check if and when you have
                viewed an email or web page, track your ip address and the page
                that was viewed.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                8. Access, update and delete your personal data
              </h2>
              <p className="leading-7">
                Your personal data belongs to you. At any time, you can contact
                us at support@localmator.com to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Update your personal information.</li>
                <li>Delete your personal data from our systems.</li>
                <li>Stop processing your personal data.</li>
                <li>Data delivery to you or a third party.</li>
              </ul>
              <p className="leading-7">
                If you are a user of our Localmator platform, request for
                deletion or to stop processing of your personal data would mean
                loss of access to our platform.
              </p>
              <p className="leading-7">
                You may also be receiving marketing emails from us. You can
                always ‘unsubscribe’ or ‘opt-out’ of those emails within the
                body of the email.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                9. Contact our Data Privacy Officer
              </h2>
              <p className="leading-7">
                Localmator has a Data Privacy Officer (DPO), who is responsible
                for all matters relating to privacy and data protection. The
                Data Privacy officer can be contacted at the following address:
              </p>
              <div className="bg-muted p-4 rounded-lg text-sm">
                <p className="font-medium">Localmator</p>
                <p>Attn: Data Privacy Officer</p>
                {/* <p>3568 Dodge Street</p>
                <p>Omaha, NE 68131</p> */}
                <p>Address 1: 4 Unity close ada george</p>
                <p>Port Harcourt 500272, Rivers</p>
                <p>Address 2: 3568 Dodge Street Omaha, NE 68131</p>
                <div className="mt-4">
                  <p>Email: support@localmator.com</p>
                  {/* <p>Phone: [Phone Number]</p> */}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
