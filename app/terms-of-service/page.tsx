import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
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
              Terms of Service
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
              <p className="leading-7">
                This Terms of Service Agreement (“Agreement”) constitutes a
                legally binding agreement made between you, whether personally
                or on behalf of an entity (“Customer” or “you”) and CATEX
                TECHNOLOGY and its affiliated companies (collectively, “Company”
                or “we” or “us” or “our”), concerning your access to and use of
                the Subscription Service (defined below). Supplemental terms and
                conditions or documents that may be posted on our Website
                (defined below) from time to time, are hereby expressly
                incorporated into this Agreement by reference.
              </p>
              <p className="leading-7 font-medium">
                YOU ACCEPT AND AGREE TO BE BOUND BY THIS AGREEMENT BY
                ACKNOWLEDGING SUCH ACCEPTANCE DURING THE ORDERING PROCESS AND
                ALSO BY CONTINUING TO USE THE SUBSCRIPTION SERVICE. IF YOU DO
                NOT AGREE TO ABIDE BY THIS AGREEMENT, OR TO MODIFICATIONS THAT
                COMPANY MAY MAKE TO THIS AGREEMENT IN THE FUTURE, DO NOT USE OR
                ACCESS OR CONTINUE TO USE OR ACCESS THE SUBSCRIPTION SERVICE.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                A. Definitions
              </h2>
              <ul className="space-y-4 list-none pl-0">
                <li>
                  <strong>“Agreement”</strong> means these Terms of Service and
                  all materials referred or linked to in this document.
                </li>
                <li>
                  <strong>“Company Content”</strong> means all information,
                  data, text, messages, software, sound, music, video,
                  photographs, graphics, images, and tags that we incorporate
                  into the Subscription Service or Consulting Service.
                </li>
                <li>
                  <strong>“Confidential Information”</strong> means all
                  information provided by you or us (“Discloser”) to the other
                  (“Receiver”), whether orally or in writing that is designated
                  as confidential. Confidential Information will include
                  Customer Data and information about the Discloser’s business
                  plans, technical data, and the terms of the Order.
                  Confidential Information does not include any information that
                  (i) is or becomes generally known to the public without breach
                  of any obligation owed to the Discloser or (ii) was known to
                  the Receiver before receipt from the Discloser.
                </li>
                <li>
                  <strong>“Consulting Service”</strong> means the professional
                  services provided to you by us, which may include training
                  services, installation, integration or other Consulting
                  Service.
                </li>
                <li>
                  <strong>“Customer Data”</strong> means all information that
                  you submit or collect via the Subscription Service.
                </li>
                <li>
                  <strong>“Customer Materials”</strong> means all information,
                  data, text, messages, sound, music, video, photographs,
                  graphics, images, and tags that you provide or post, upload,
                  input or submit for public display through the Subscription
                  Service.
                </li>
                <li>
                  <strong>“Information Services”</strong> means third-party
                  services, online communities, review sites and/or other
                  communication facilities (such as Google My Business, Yelp and
                  Facebook) linked to the Subscription Service that contain
                  information and/or reviews about your business.
                </li>
                <li>
                  <strong>“Order” or “Order Form”</strong> means the
                  Company-approved form or online subscription process by which
                  you agree to subscribe to the Subscription Service and
                  purchase the Consulting Service. Most Orders are completed
                  through our online payment process or via in-app purchases.
                </li>
                <li>
                  <strong>“Pricing Page”</strong> means the page on our Website
                  that contains pricing for the Subscription Service.
                </li>
                <li>
                  <strong>“Review Responses”</strong> means your responses and
                  interactions relating to consumer reviews on the Information
                  Services.
                </li>
                <li>
                  <strong>“Sensitive Information”</strong> means (a) credit or
                  debit card numbers; personal financial account information;
                  Social Security numbers or local equivalents; passport
                  numbers; driver’s license numbers or similar identifiers;
                  passwords; racial or ethnic origin; physical or mental health
                  condition or information; or other employment, financial or
                  health information, including any information subject to the
                  Health Insurance Portability and Accountability Act, the
                  Payment Card Industry Data Security Standards, and other
                  regulations, laws or industry standards designed to protect
                  similar information; and (b) any information defined under EU
                  data protection laws as ‘Sensitive Personal Data’.
                </li>
                <li>
                  <strong>“Subscription Fee”</strong> means the amount you pay
                  for the Subscription Service.
                </li>
                <li>
                  <strong>“Subscription Service”</strong> means all of our
                  analytics, review response, landing page, content management
                  applications, tools and platforms that you have subscribed to
                  by an Order Form or that we otherwise make available to you,
                  and are developed, operated, and maintained by us, accessible
                  via our Website or another designated URL, and any ancillary
                  products and services, including website hosting, that we
                  provide to you.
                </li>
                <li>
                  <strong>“Subscription Term”</strong> means the initial term of
                  your subscription to the applicable Subscription Service, as
                  specified on your Order Form(s), and each subsequent renewal
                  term (if any).
                </li>
                <li>
                  <strong>“Third-Party Products”</strong> means non-embedded
                  products and professional services that are provided by third
                  parties which interoperate with or are used in connection with
                  the Subscription Service.
                </li>
                <li>
                  <strong>“Third-Party Sites”</strong> means third-party
                  websites linked to from within the Subscription Service,
                  including Information Services.
                </li>
                <li>
                  <strong>“Users”</strong> means your employees,
                  representatives, consultants, contractors or agents who are
                  authorized to use the Subscription Service for your benefit
                  and have unique user identifications and passwords for the
                  Subscription Service.
                </li>
                <li>
                  <strong>“Website”</strong> means our website located at
                  https://app.localmator.com/.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                B. General Commercial Terms
              </h2>

              <h3 className="text-xl font-semibold mt-6">1. Access</h3>
              <p className="leading-7">
                During the Subscription Term, we will provide you access to use
                the Subscription Service as described in this Agreement and the
                applicable Order. We might provide some or all elements of the
                Subscription Service through third party service providers.
              </p>

              <h3 className="text-xl font-semibold mt-6">
                2. Additional Features
              </h3>
              <p className="leading-7">
                You may subscribe to additional features of the Subscription
                Service by placing an additional Order or activating the
                additional features from within your Company portal (if this
                option is made available by us.). This Agreement will apply to
                all additional Order(s) and all additional features that you
                activate from within your Company portal.
              </p>

              <h3 className="text-xl font-semibold mt-6">3. Availability</h3>
              <p className="leading-7">
                We try to make the Subscription Service available 24 hours a
                day, 7 days a week, except for planned down-time for
                maintenance.
              </p>

              <h3 className="text-xl font-semibold mt-6">
                4. Consulting Service
              </h3>
              <p className="leading-7">
                You may purchase the Consulting Service by placing an Order with
                us. Fees for the Consulting Service are in addition to your
                Subscription Fee. If you purchase a Consulting Service that
                recurs, it will be considered part of your subscription and will
                renew in accordance with your subscription. The Consulting
                Service is performed remotely, unless you and we otherwise
                agree. For Consulting Service performed on-site, you will
                reimburse us our reasonable costs for all expenses incurred in
                connection with the Consulting Service. Any invoices or other
                requests for reimbursements will be due and payable within
                thirty (30) days of the date of the invoice. We might provide
                some or all elements of the Consulting Service through third
                party service providers. The Consulting Service is
                non-cancellable and all fees for the Consulting Service are
                non-refundable.
              </p>

              <h3 className="text-xl font-semibold mt-6">
                5. Fees and Payment
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Subscription Fees.</strong> The Subscription Fee will
                  remain fixed during the Subscription Term unless you: (i)
                  increase the number of locations utilizing the Subscription
                  Service, (ii) upgrade products or base packages, or (iii)
                  subscribe to additional features or products. Once increased,
                  your Subscription Fee will not decrease, even if there is a
                  subsequent reduction in the number of locations until the end
                  of the then-current Subscription Term.
                </li>
                <li>
                  <strong>Fee Adjustments at Renewal.</strong> Prior to renewal
                  of your Subscription Term, you will be notified of any
                  increase in Subscription Fees.
                </li>
                <li>
                  <strong>Payment by credit card.</strong> If you are paying by
                  credit card, you authorize us to charge your credit card or
                  bank account for all fees payable during the Subscription
                  Term. You further authorize us to use a third party to process
                  payments, and consent to the disclosure of your payment
                  information to such third party.
                </li>
                <li>
                  <strong>Payment against invoice.</strong> If you are paying by
                  invoice, we will invoice you during the Subscription Term when
                  fees are payable. All amounts invoiced are due and payable
                  within thirty (30) days from the date of the invoice, unless
                  otherwise specified in the Order Form.
                </li>
                <li>
                  <strong>Payment Information.</strong> You will keep your
                  contact information, billing information and credit card
                  information (where applicable) up to date. Changes may be made
                  on your billing page within your Company portal. All payment
                  obligations are non-cancelable and all amounts paid are
                  non-refundable, except as specifically provided for in this
                  Agreement. All Subscription Fees are due and payable in
                  advance throughout the Subscription Term. If you are a
                  purchasing as an agency on behalf of a client, you agree to be
                  responsible for the Order Form and to guarantee payment of all
                  fees.
                </li>
                <li>
                  <strong>Sales Tax.</strong> All fees are exclusive of taxes,
                  which we will charge as applicable. You agree to pay any taxes
                  applicable to your use of the Subscription Service and
                  performance of a Consulting Service. You shall have no
                  liability for any taxes based upon our gross revenues or net
                  income. At our request, you will provide us with the VAT
                  registration number under which you are registered in your
                  member state. If you are subject to GST, all fees are
                  exclusive of GST. If you are required to deduct or withhold
                  any tax, you must pay the amount deducted or withheld as
                  required by law and pay us an additional amount so that we
                  receive payment in full as if there were no deduction or
                  withholding.
                </li>
                <li>
                  <strong>Late Payments.</strong> We may charge a late fee equal
                  to the lesser of 1½% per month and the highest rate allowable
                  under applicable law.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6">
                6. Use and Limitations of Use
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Review Responses.</strong> The Subscription Service
                  notifies you of consumer reviews appearing on the Information
                  Services and facilitates Review Responses to those reviews. It
                  is your obligation to ensure that all Review Responses are
                  consistent with applicable laws, regulations and proper
                  industry conduct.
                </li>
                <li>
                  <strong>Landing Pages.</strong> The Subscription Service may
                  include functionality for updating content on pages for each
                  of your locations. You are solely responsible to the accuracy
                  of data and information as well as any other content that
                  appears on the landing pages. The landing pages are hosted on
                  our subdomains.
                </li>
                <li>
                  <strong>Use of Information Services.</strong> You agree to use
                  and interact with Information Services only in compliance with
                  any terms of use specified by each Information Service. We do
                  not control the content, messages or information found in the
                  Information Services. We will not have any liability with
                  regards to the Information Services and any actions resulting
                  from your use of or interactions with the Information
                  Services.
                </li>
                <li>
                  <strong>Prohibited and Unauthorized Use.</strong> You will not
                  (i) use or launch any automated system, including, “robots,”
                  “spiders,” or “offline readers,” that sends more request
                  messages to our servers in a given period of time than a human
                  can reasonably produce in the same period by using a
                  conventional browser; (ii) use the Subscription Service in any
                  manner that damages, disables, overburdens, or impairs any of
                  our websites or interferes with any other party’s use of the
                  Subscription Service; (iii) attempt to gain unauthorized
                  access to the Subscription Service; (iv) access the
                  Subscription Service other than through our interface; or (v)
                  use the Subscription Service for any purpose or in any manner
                  that is unlawful or prohibited by this Agreement.
                </li>
                <li>
                  <strong>No Sensitive Information.</strong> YOU AGREE NOT TO
                  USE THE SUBSCRIPTION SERVICE TO COLLECT, MANAGE OR PROCESS
                  SENSITIVE INFORMATION. WE WILL NOT HAVE ANY LIABILITY THAT MAY
                  RESULT FROM YOUR USE OF THE SUBSCRIPTION SERVICE TO COLLECT OR
                  MANAGE SENSITIVE INFORMATION.
                </li>
                <li>
                  <strong>Third-Party Sites and Products.</strong> Third-Party
                  Sites and Products are not under our control. Third-Party
                  Sites and Products are provided to you only as a convenience,
                  and the availability of any Third-Party Site or Product does
                  not mean we endorse, support or warrant the Third-Party Site
                  or Product.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6">
                7. Subscription Term, Termination, Suspension
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Term and Renewal.</strong> Your initial subscription
                  period will be specified in your Order, and your subscription
                  will automatically renew for the shorter of the subscription
                  period, or one year. To prevent renewal of the subscription,
                  notice must be provided to us prior to renewal.
                </li>
                <li>
                  <strong>No Early Termination; No Refunds.</strong> The
                  Subscription Term will end on the expiration date and the
                  subscription cannot be canceled early. We do not provide
                  refunds if you decide to stop using the Company subscription
                  during your Subscription Term.
                </li>
                <li>
                  <strong>Termination for Cause.</strong> Either party may
                  terminate this Agreement for cause, as to any or all
                  Subscription Service: (i) upon thirty (30) days’ notice to the
                  other party of a material breach if such breach remains
                  uncured at the expiration of such period, or (ii) immediately,
                  if the other party becomes the subject of a petition in
                  bankruptcy or any other proceeding relating to insolvency,
                  liquidation or assignment for the benefit of creditors.
                </li>
                <li>
                  <strong>Suspension for Prohibited Acts.</strong> We may
                  suspend any Customer’s access to any or all Subscription
                  Service without notice for: (i) use of the Subscription
                  Service in a way that violates applicable local, state,
                  federal, or foreign laws or regulations or the terms of this
                  Agreement or (ii) repeated instances of posting or uploading
                  material that infringes or is alleged to infringe on the
                  copyright or trademark rights of any person or entity.
                </li>
                <li>
                  <strong>Suspension for Non-Payment.</strong> We will provide
                  you with notice of non-payment of any amount due. Unless the
                  full amount has been paid, we may suspend your access to any
                  or all of the Subscription Service ten (10) days after such
                  notice.
                </li>
                <li>
                  <strong>Suspension for Present Harm.</strong> If your use of
                  the Subscription Service: (i) is being subjected to denial of
                  service attacks or other disruptive activity, (ii) is being
                  used to engage in denial of service attacks or other
                  disruptive activity, (iii) is creating a security
                  vulnerability for the Subscription Service or others, (iv) is
                  consuming excessive bandwidth, or (v) is causing harm to us or
                  others, then we may, with electronic or telephonic notice to
                  you, suspend all or any access to the Subscription Service.
                </li>
                <li>
                  <strong>Fees upon Termination.</strong> If you terminate this
                  Agreement for cause, we will promptly refund any prepaid but
                  unused fees covering use of the Subscription Service after
                  termination. If we terminate this Agreement for cause, you
                  will promptly pay all unpaid fees due through the end of the
                  Subscription Term. Fees are otherwise non-refundable.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6">
                8. Customer Support
              </h3>
              <p className="leading-7">
                Phone, email and in-app support are included at no additional
                cost. Phone support for subscriptions is available from 8:00 am
                to 6:00 pm Central Time, Monday through Friday, excluding
                holidays. We accept email and in-app support questions 24 hours
                per day x 7 days per week. Email and in-app responses are
                provided during phone support hours only. We attempt to respond
                to email and in-app support questions within one business day;
                in practice, our responses are generally even faster. We do not
                promise or guarantee any specific response time.
              </p>

              <h3 className="text-xl font-semibold mt-6">
                9. Retrieval of Customer Data
              </h3>
              <p className="leading-7">
                It is your obligation to retrieve all Customer Data prior to
                termination or expiration of this Agreement. After termination
                or expiration of this Agreement, we will have no obligation to
                maintain or provide you the Customer Data and may, unless
                legally prohibited, delete all Customer Data in our systems or
                otherwise in our control.
              </p>

              <h3 className="text-xl font-semibold mt-6">
                10. Alpha/Beta Services
              </h3>
              <p className="leading-7">
                If we make alpha or beta access to some or all of the
                Subscription Service (the “Alpha/Beta Services”) available to
                you (i) the Alpha/Beta Services are provided “as is” and without
                warranty of any kind, (ii) we may suspend, limit, or terminate
                the Alpha/Beta Services for any reason at any time without
                notice, and (iii) we will not be liable to you for damages of
                any kind related to your use of the Alpha/Beta Services.
              </p>

              <h3 className="text-xl font-semibold mt-6">11. Free Trial</h3>
              <p className="leading-7">
                If you register for a free trial, we will make the applicable
                Subscription Service available to you on a trial basis free of
                charge until the earlier of (a) the end of the free trial period
                (if not terminated earlier) or (b) the start date of your paid
                subscription. Unless you purchase a subscription to the
                applicable Subscription Service before the end of the free
                trial, all of your data in the Subscription Service may be
                permanently deleted at the end of the trial, and we will not
                recover it.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                C. General Legal Terms
              </h2>

              <h3 className="text-xl font-semibold mt-6">1. Customer Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Limits on Company.</strong> We will not use, or allow
                  anyone else to use, Customer Data to contact any individual or
                  company except as you direct or otherwise permit. We will use
                  Customer Data only in order to provide the Subscription
                  Service and Consulting Service to you and only as permitted by
                  applicable law, this Agreement, and our Privacy Policy,
                  located on the Website.
                </li>
                <li>
                  <strong>Aggregate Data.</strong> We may monitor the use of the
                  Subscription Service by all of our customers and use the data
                  gathered in an aggregate and anonymous manner. You agree that
                  we may use and publish such information, provided that such
                  information does not incorporate any Customer Data and/or
                  identify you.
                </li>
                <li>
                  <strong>Safeguards.</strong> We will maintain commercially
                  appropriate administrative, physical, and technical safeguards
                  to protect Customer Data. You consent to the processing of
                  Customer Data in the United States.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6">
                2. Company’s Proprietary Rights
              </h3>
              <p className="leading-7">
                This is an Agreement for access to and use of the Subscription
                Service, and you are not granted a license to any software by
                this Agreement. The Subscription Service and Consulting Service
                are protected by intellectual property laws, they belong to and
                are the property of us or our licensors (if any), and we retain
                all ownership rights to them. You agree not to copy, rent,
                lease, sell, distribute, or create derivative works based on the
                Company Content, the Subscription Service, or the Consulting
                Service in whole or in part, by any means, except as expressly
                authorized in writing by us.
              </p>

              <h3 className="text-xl font-semibold mt-6">
                3. Customer’s Proprietary Rights
              </h3>
              <p className="leading-7">
                As between the parties, you own and retain all rights to the
                Customer Materials and Customer Data. This Agreement does not
                grant us any ownership rights to Customer Materials or Customer
                Data. You grant permission to us and our licensors to use the
                Customer Materials and Customer Data only as necessary to
                provide the Subscription Service and Consulting Service to you
                and as permitted by this Agreement.
              </p>

              <h3 className="text-xl font-semibold mt-6">
                4. Customer Representations
              </h3>
              <p className="leading-7">
                By using the Subscription Services, you represent and warrant
                that: (i) all registration information you submit is truthful
                and accurate; (ii) you will maintain the accuracy of such
                information; (iii) you will keep your password confidential and
                will be responsible for all use of your password and account;
                (iv) your use of the Company Services does not violate any
                applicable law or regulation; and (v) the creation,
                distribution, transmission, public display and performance,
                accessing, downloading and copying of your Customer Content does
                not and will not infringe the proprietary rights, including but
                not limited to the copyright, patent, trademark, trade secret or
                moral rights, of any third party.
              </p>

              <h3 className="text-xl font-semibold mt-6">5. Confidentiality</h3>
              <p className="leading-7">
                The Receiver will: (i) protect the confidentiality of the
                Confidential Information using the same degree of care that it
                uses with its own confidential information of similar nature,
                but with no less than reasonable care, (ii) not use any
                Confidential Information for any purpose outside the scope of
                this Agreement, (iii) not disclose Confidential Information to
                any third party (except our third party service providers), and
                (iv) limit access to Confidential Information to its employees,
                contractors, advisors, and agents.
              </p>

              <h3 className="text-xl font-semibold mt-6">6. Publicity</h3>
              <p className="leading-7">
                You grant us the right to add your name and company logo to our
                customer list, Website, and marketing materials.
              </p>

              <h3 className="text-xl font-semibold mt-6">7. Indemnification</h3>
              <p className="leading-7">
                You will indemnify, defend and hold us harmless, at your
                expense, against any third-party claim, suit, action, or
                proceeding (each, an “Action”) brought against us (and our
                officers, directors, employees, agents, service providers,
                licensors, and affiliates) by a third party not affiliated with
                us to the extent that such Action is based upon or arises out of
                (a) unauthorized or illegal use of the Subscription Service by
                you, (b) your noncompliance with or breach of this Agreement,
                (c) your Review Responses, (d) your use of Third-Party Products,
                or (e) the unauthorized use of the Subscription Service by any
                other person using your User information.
              </p>

              <h3 className="text-xl font-semibold mt-6">
                8. Disclaimers; Limitations of Liability
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Disclaimer of Warranties.</strong> WE AND OUR
                  AFFILIATES AND AGENTS MAKE NO REPRESENTATIONS OR WARRANTIES
                  ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS,
                  SECURITY OR ACCURACY OF THE SUBSCRIPTION SERVICE, DATA MADE
                  AVAILABLE FROM THE SUBSCRIPTION SERVICE, COMPANY CONTENT, OR
                  THE CONSULTING SERVICE FOR ANY PURPOSE.
                </li>
                <li>
                  <strong>No Indirect Damages.</strong> TO THE EXTENT PERMITTED
                  BY LAW, IN NO EVENT SHALL WE BE LIABLE TO YOU FOR ANY
                  INDIRECT, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR
                  LOSS OF PROFITS, REVENUE, DATA OR BUSINESS OPPORTUNITIES.
                </li>
                <li>
                  <strong>Limitation of Liability.</strong> OUR AGGREGATE
                  LIABILITY TO YOU UNDER THIS AGREEMENT WILL BE LIMITED TO THE
                  TOTAL OF FEES PAYABLE FOR THE SUBSCRIPTION SERVICE IN THE
                  THREE MONTH PERIOD PRECEDING THE EVENT GIVING RISE TO A CLAIM.
                </li>
                <li>
                  <strong>Third Party Products.</strong> WE DISCLAIM ALL
                  LIABILITY WITH RESPECT TO THIRD-PARTY PRODUCTS THAT YOU USE.
                  OUR LICENSORS SHALL HAVE NO LIABILITY OF ANY KIND UNDER THIS
                  AGREEMENT.
                </li>
                <li>
                  <strong>Agreement to Liability Limit.</strong> YOU UNDERSTAND
                  AND AGREE THAT ABSENT YOUR AGREEMENT TO THIS LIMITATION OF
                  LIABILITY, WE WOULD NOT PROVIDE THE SUBSCRIPTION SERVICE TO
                  YOU.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6">9. Miscellaneous</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Amendment; No Waiver.</strong> We may update and
                  change any part or all of these Terms of Service, including
                  the fees and charges associated with the use of the
                  Subscription Service.
                </li>
                <li>
                  <strong>Force Majeure.</strong> Neither party will be
                  responsible for failure or delay of performance if caused by:
                  an act of war, hostility, or sabotage; act of god; electrical,
                  internet, or telecommunication outage that is not caused by
                  the obligated party; government restrictions; or other event
                  outside the reasonable control of the obligated party.
                </li>
                <li>
                  <strong>Actions Permitted.</strong> Except for actions for
                  nonpayment or breach of a party’s proprietary rights, no
                  action, regardless of form, arising out of or relating to this
                  Agreement may be brought by either party more than one (1)
                  year after the cause of action has accrued.
                </li>
                <li>
                  <strong>Relationship of the Parties.</strong> You and we agree
                  that no joint venture, partnership, employment, or agency
                  relationship exists between us.
                </li>
                <li>
                  <strong>Compliance with Laws.</strong> We will comply with all
                  U.S. state and federal laws (where applicable) in our
                  provision of the Subscription Service, the Consulting Service
                  and our processing of Customer Data.
                </li>
                <li>
                  <strong>Severability.</strong> If any part of this Agreement
                  or an Order Form is determined to be invalid or unenforceable
                  by applicable law, then the invalid or unenforceable provision
                  will be deemed superseded by a valid, enforceable provision
                  that most closely matches the intent of the original provision
                  and the remainder of this Agreement will continue in effect.
                </li>
                <li>
                  <strong>Notices.</strong> Unless the context of this Agreement
                  clearly requires otherwise, any notice or other communication
                  required by this Agreement, regardless of whether the
                  applicable subsection of this Agreement contemplates email
                  delivery of such notice or communication, may be done via
                  email.
                </li>
                <li>
                  <strong>Entire Agreement.</strong> This Agreement (including
                  each Order), along with our Privacy Policy, is the entire
                  agreement between us for the Subscription Service and the
                  Consulting Service and supersedes all other proposals and
                  agreements, whether electronic, oral or written, between us.
                </li>
                <li>
                  <strong>Assignment.</strong> You will not assign or transfer
                  this Agreement, including any assignment or transfer by reason
                  of merger, reorganization, sale of all or substantially all of
                  your assets, change of control or operation of law, without
                  our prior written consent, which will not be unreasonably
                  withheld.
                </li>
                <li>
                  <strong>No Third Party Beneficiaries.</strong> Nothing in this
                  Agreement, express or implied, is intended to or shall confer
                  upon any third party person or entity any right, benefit or
                  remedy of any nature whatsoever under or by reason of this
                  Agreement.
                </li>
                <li>
                  <strong>Contract for Services.</strong> This Agreement is a
                  contract for the provision of services and not a contract for
                  the sale of goods.
                </li>
                <li>
                  <strong>Authority.</strong> Each party represents and warrants
                  to the other that it has full power and authority to enter
                  into this Agreement and that it is binding upon such party and
                  enforceable in accordance with its terms.
                </li>
                <li>
                  <strong>Survival.</strong> Any provisions of this Agreement
                  that, in order to fulfill the purposes of such provisions,
                  need to survive the termination or expiration of this
                  Agreement, shall be deemed to survive for as long as necessary
                  to fulfill such purposes.
                </li>
                <li>
                  <strong>Precedence.</strong> In the event of a conflict
                  between the terms of this Agreement and an Order, the terms of
                  the Order shall control, but only as to that Order.
                </li>
                <li>
                  <strong>Applicable law and Jurisdiction.</strong> This
                  Agreement is governed by the laws of the State of [State],
                  U.S.A. without reference to conflicts of law principles. Both
                  parties consent to the exclusive jurisdiction and venue of the
                  courts in [County, State], U.S.A. for all disputes arising out
                  of or relating to the use of the Subscription Service or the
                  Consulting Service.
                </li>
              </ul>
              <h3 className="text-xl font-semibold mt-6">10. Contact Us</h3>
              <p className="leading-7">
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg text-sm mt-4">
                <p className="font-medium">CATEX TECHNOLOGY</p>
                <p>4 Unity close adagorge</p>
                <p>Port Harcourt 500272, Rivers</p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:support@localmator.com"
                    className="text-primary hover:underline"
                  >
                    support@localmator.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
