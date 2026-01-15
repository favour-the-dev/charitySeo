import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicyPage() {
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
              Refund Policy
            </h1>
            <p className="text-muted-foreground">Last updated: Jan 6th, 2026</p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-foreground">
            <section className="space-y-4">
              <p className="leading-7">
                Welcome to Localmator! By accessing or using our platform, you
                agree to these Terms of Use. Please read them carefully before
                using Localmator. If you do not agree with these terms, please
                do not use our services.
              </p>
              <p className="leading-7">
                We are committed to helping you manage your customer reviews and
                feedback. Before you subscribe or make any payment, please take
                a moment to carefully read and understand our Refund Policy.
              </p>
              <p className="leading-7">
                This policy is designed to clearly outline your rights,
                responsibilities, and options regarding subscription payments
                and cancellations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                1. No Refunds for Processed Payments
              </h2>
              <p className="leading-7">
                Once a subscription payment has been successfully processed,
                Localmator does not offer refunds under any circumstances. This
                includes — but is not limited to — situations such as:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Forgetting to cancel your subscription before renewal</li>
                <li>No longer needing or using the service.</li>
                <li>Event changes or cancellations.</li>
                <li>Unsatisfactory experience after payment.</li>
                <li>Duplicate subscriptions purchased by the user.</li>
              </ul>
              <p className="leading-7 font-medium">
                All payments made to Localmator are final, non-refundable, and
                non-transferable.
              </p>
              <p className="leading-7">
                By subscribing to Localmator, you acknowledge and accept that
                all processed payments are binding and non-refundable.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                2. Managing Your Subscription and Avoiding Future Billing
              </h2>
              <p className="leading-7">
                While payments already made cannot be refunded, you retain full
                control over your subscription moving forward.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  You can cancel your subscription at any time through your
                  Localmator account dashboard.
                </li>
                <li>
                  To avoid being charged for the next billing cycle, you must
                  cancel your subscription before your next renewal date.
                </li>
                <li>
                  After canceling, you will continue to have access to your
                  subscription benefits until the end of your current paid
                  binding period, but no further charges will be made.
                </li>
              </ul>
              <p className="leading-7">
                It is the user’s sole responsibility to manage and monitor their
                subscription status and billing cycles.
              </p>
              <p className="leading-7 font-medium">
                Localmator is not responsible for subscription charges resulting
                from failure to cancel before renewal.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                3. Special Circumstances (Billing Errors Only)
              </h2>
              <p className="leading-7">
                In rare cases where a technical billing error has occurred (such
                as duplicate charges caused by a system glitch), you may be
                eligible for a refund. These special cases include:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  You were charged multiple times for the same subscription
                  within the same billing cycle.
                </li>
                <li>A billing error caused by Localmator’s system.</li>
              </ul>
              <p className="leading-7">
                If you believe a technical billing error has occurred, please
                contact our support team within 7 days of the charge at{" "}
                <a
                  href="mailto:support@localmator.com"
                  className="text-primary hover:underline"
                >
                  support@localmator.com
                </a>
                . Each request will be reviewed individually, and approved
                refunds (if any) will be issued back to your original payment
                method.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                4. Policy Agreement
              </h2>
              <p className="leading-7">
                By purchasing or subscribing to Localmator, you acknowledge and
                agree to abide by this Refund Policy. This policy is binding
                once a payment is processed.
              </p>
              <p className="leading-7">
                We strongly encourage you to carefully consider your purchase
                and ensure that Localmator meets your needs before subscribing.
              </p>
              <p className="leading-7">
                If you have any questions regarding this policy or your account,
                feel free to reach out to us at{" "}
                <a
                  href="mailto:support@localmator.com"
                  className="text-primary hover:underline"
                >
                  support@localmator.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t">
              <h2 className="text-xl font-semibold tracking-tight">Summary</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>No refunds after payment is processed.</li>
                <li>You can cancel anytime to avoid future billing.</li>
                <li>Localmator is not responsible for late cancellations.</li>
                <li>
                  Only billing errors caused by Localmator’s system are eligible
                  for review.
                </li>
              </ul>
              <p className="leading-7 font-medium mt-4">
                📩 For help, contact us at{" "}
                <a
                  href="mailto:support@localmator.com"
                  className="text-primary hover:underline"
                >
                  support@localmator.com
                </a>
                .
              </p>
              <div className="bg-muted p-4 rounded-lg text-sm mt-4">
                <p className="font-medium">CATEX TECHNOLOGY</p>
                <p>4 Unity close adagorge</p>
                <p>Port Harcourt 500272, Rivers</p>
              </div>
              <p className="leading-7 italic">
                Thank you for trusting Localmator.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
