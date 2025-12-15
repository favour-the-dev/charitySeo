"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { IntegrationCard } from "@/components/integrations/integration-card";
import {
  Globe,
  Facebook,
  Star,
  MessageCircle,
  Mail,
  Twitter,
} from "lucide-react";

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([
    {
      id: "google",
      name: "Google Reviews",
      description: "Sync reviews from your Google Business Profile.",
      icon: Globe,
      connected: true,
    },
    {
      id: "trustpilot",
      name: "Trustpilot",
      description: "Import verified reviews from Trustpilot.",
      icon: Star,
      connected: false,
    },
    {
      id: "facebook",
      name: "Facebook",
      description: "Connect your Facebook Page to manage recommendations.",
      icon: Facebook,
      connected: true,
    },
    {
      id: "yelp",
      name: "Yelp",
      description: "Monitor and respond to Yelp reviews.",
      icon: MessageCircle,
      connected: false,
    },
    {
      id: "email",
      name: "Email Support",
      description: "Turn support emails into review tickets.",
      icon: Mail,
      connected: false,
    },
    {
      id: "twitter",
      name: "Twitter / X",
      description: "Track mentions and feedback on Twitter.",
      icon: Twitter,
      connected: false,
    },
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
          <p className="text-muted-foreground">
            Connect your favorite apps to centralize your customer feedback.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              name={integration.name}
              description={integration.description}
              icon={integration.icon}
              connected={integration.connected}
              onToggle={() => toggleIntegration(integration.id)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
