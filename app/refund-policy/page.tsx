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
                At Localmator, we strive to ensure our customers are satisfied
                with our services. However, due to the nature of our digital
                services, we maintain a strict refund policy as outlined below.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                Policy Overview
              </h2>
              <ul className="space-y-4 list-disc pl-5">
                <li className="leading-7">
                  <strong>No Refunds for Processed Payments:</strong> We do not
                  offer refunds (full or partial) for payments that have already
                  been processed. Once a charge has been made, it is
                  non-refundable.
                </li>
                <li className="leading-7">
                  <strong>Cancellation:</strong> You may cancel your
                  subscription at any time to stop future billing. Upon
                  cancellation, you will continue to have access to the service
                  through the end of your current billing period. No further
                  charges will be applied after cancellation.
                </li>
                <li className="leading-7">
                  <strong>Billing Errors:</strong> The only exception to our
                  no-refund policy is in the case of a billing error. If you
                  believe a billing error has occurred, you must contact our
                  support team within 7 days of the charge. We will review the
                  claim, and if verified, issue a refund for the erroneous
                  charge.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                Contact Us
              </h2>
              <p className="leading-7">
                If you have any questions or need to report a billing error,
                please contact us at:
              </p>
              <p className="leading-7">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@localmator.com"
                  className="text-primary hover:underline"
                >
                  support@localmator.com
                </a>
              </p>
              <p className="leading-7">
                <strong>Address:</strong> 3568 Dodge Street, Omaha
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
