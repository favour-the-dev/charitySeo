"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { integrations } from "@/lib/integrations";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntegrationsStore } from "@/lib/integrations-store";

export default function IntegrationsPage() {
  const { connectedAccounts } = useIntegrationsStore();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
          <p className="text-muted-foreground">
            Connect your review platforms to centralize feedback management.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {integrations.map((integration) => {
            const isConnected =
              (connectedAccounts[integration.id]?.length || 0) > 0;

            return (
              <Link
                href={`/integrations/${integration.id}`}
                key={integration.id}
              >
                <Card className="h-full overflow-hidden transition-all hover:shadow-md group cursor-pointer border-2 hover:border-primary/20">
                  <div className="relative h-40 w-full bg-muted/30 flex items-center justify-center p-6">
                    <div className="relative h-24 w-24 transition-opacity duration-300 opacity-70 group-hover:opacity-100">
                      <Image
                        src={integration.image}
                        alt={integration.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    {isConnected && (
                      <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
                        Connected
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {integration.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {integration.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-xs">
                      {integration.category}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
