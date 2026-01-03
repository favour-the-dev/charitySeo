import React from "react";
import { Check, X } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PricingPage = () => {
  const plans = [
    {
      name: "PROFESSIONAL",
      price: "3,000",
      billed: "Billed Annually",
      active: false,
      features: [
        { text: "Setup 20 Events Annually", included: true },
        { text: "Unlimited Photos and Videos upload", included: true },
        { text: "Media expires 30 days after upload", included: true },
        { text: "Event Page expires 14 days after Event date", included: true },
        { text: "Setup Reoccurring Events", included: false },
        { text: "Password protection for Event Page", included: true },
        { text: "Moderation Tools", included: false },
        { text: "100 Editable QR Code Banner Templates", included: false },
        { text: "Custom Domain setup", included: false },
        { text: "Whitelabel Event pages", included: false },
        { text: "Unlimited Workspaces", included: false },
        { text: "Unlimited Sub User Access", included: false },
      ],
    },
    {
      name: "AGENCY",
      price: "4,500",
      billed: "Billed Annually",
      active: false,
      features: [
        { text: "Setup UNLIMITED Events", included: true },
        { text: "Unlimited Photos and Videos upload", included: true },
        { text: "Advanced media storage - Never Expires", included: true },
        { text: "Reoccurring Event Page NEVER Expires", included: true },
        { text: "Setup Reoccurring Events", included: true },
        { text: "Password protection for Event Page", included: true },
        { text: "Moderation Tools", included: true },
        { text: "100 Editable QR Code Banner Templates", included: true },
        { text: "Custom Domain setup", included: false },
        { text: "Whitelabel Event pages", included: false },
        { text: "Unlimited Workspaces", included: false },
        { text: "Unlimited Sub User Access", included: false },
      ],
    },
    {
      name: "ENTERPRISE",
      price: "6,000",
      billed: "Billed Annually",
      active: true,
      features: [
        { text: "Setup UNLIMITED Events", included: true },
        { text: "Unlimited Photos and Videos upload", included: true },
        { text: "Advanced media storage - Never Expires", included: true },
        { text: "Reoccurring Event Page NEVER Expires", included: true },
        { text: "Setup Reoccurring Events", included: true },
        { text: "Password protection for Event Page", included: true },
        { text: "Moderation Tools", included: true },
        { text: "100 Editable QR Code Banner Templates", included: true },
        { text: "Custom Domain setup", included: true },
        { text: "Whitelabel Event pages", included: true },
        { text: "Unlimited Workspaces", included: true },
        { text: "Unlimited Sub User Access", included: true },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-full py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Plans & Pricing
            </h2>
            <p className="text-muted-foreground mt-2">
              Subscribe to the plan that best suits your event needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={cn(
                  "relative flex flex-col transition-all duration-200",
                  plan.active
                    ? "border-primary shadow-lg scale-105 z-10"
                    : "hover:border-primary/50 hover:shadow-md"
                )}
              >
                {plan.active && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="default" className="px-3 py-1">
                      Active Plan
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                    {plan.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col items-center gap-6">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold">₦{plan.price}</span>
                      <span className="text-muted-foreground">/Month</span>
                    </div>
                    <p className="text-xs text-primary font-medium mt-1">
                      {plan.billed}
                    </p>
                  </div>

                  <ul className="space-y-3 w-full text-sm">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                        )}
                        <span
                          className={cn(
                            "leading-tight",
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground line-through"
                          )}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-2">
                  <Button
                    className="w-full"
                    variant={plan.active ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.active ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PricingPage;
