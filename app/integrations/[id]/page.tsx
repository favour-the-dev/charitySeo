"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { integrations } from "@/lib/integrations";
import { useIntegrationsStore } from "@/lib/integrations-store";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";

export default function IntegrationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const integration = integrations.find((i) => i.id === id);
  const { connectedAccounts, addAccount, toggleAccountActive, removeAccount } =
    useIntegrationsStore();
  const accounts = connectedAccounts[id] || [];

  const [isConnecting, setIsConnecting] = useState(false);

  if (!integration) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <h2 className="text-xl font-semibold">Integration not found</h2>
          <Button onClick={() => router.push("/integrations")}>
            Back to Integrations
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleConnect = () => {
    setIsConnecting(true);

    // Simulate OAuth delay
    setTimeout(() => {
      const mockAccount = {
        name: `${integration.name} Account`,
        email: `user_${nanoid(4)}@example.com`,
        platformId: `pid_${nanoid(8)}`,
      };

      addAccount(id, mockAccount);
      setIsConnecting(false);
      toast.success(`Successfully connected to ${integration.name}`);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/integrations")}
            className="mt-1 hidden md:flex"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 md:hidden mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/integrations")}
              className="-ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>

          <div className="flex-1 w-full">
            <div className="flex items-center gap-4 mb-4 md:mb-2">
              <div className="relative h-16 w-16 md:h-12 md:w-12 shrink-0">
                <Image
                  src={integration.image}
                  alt={integration.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {integration.name}
              </h1>
            </div>
            <p className="text-muted-foreground text-base md:text-lg">
              {integration.description}
            </p>
          </div>

          <Button
            size="lg"
            onClick={handleConnect}
            disabled={isConnecting}
            className="gap-2 w-full md:w-auto"
          >
            {isConnecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Account
              </>
            )}
          </Button>
        </div>

        {/* Connected Accounts List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Connected Accounts</h3>

          {accounts.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h4 className="text-lg font-medium mb-1">
                  No accounts connected
                </h4>
                <p className="text-muted-foreground max-w-sm mb-4">
                  Connect your {integration.name} account to start syncing
                  reviews and managing feedback.
                </p>
                <Button
                  variant="outline"
                  onClick={handleConnect}
                  disabled={isConnecting}
                >
                  Connect {integration.name}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {accounts.map((account) => (
                <Card key={account.id}>
                  <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4">
                    <div className="flex items-start md:items-center gap-4 w-full md:w-auto">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold truncate">
                            {account.name}
                          </h4>
                          {account.active ? (
                            <Badge
                              variant="default"
                              className="bg-green-500 hover:bg-green-600 h-5"
                            >
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="h-5">
                              Inactive
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {account.email}
                        </p>
                        <p className="text-xs text-muted-foreground md:hidden mt-1">
                          Connected:{" "}
                          {new Date(account.dateConnected).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-6 pl-14 md:pl-0">
                      <div className="hidden md:block text-sm text-muted-foreground mr-4">
                        {new Date(account.dateConnected).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          {account.active ? "Syncing" : "Paused"}
                        </span>
                        <Switch
                          checked={account.active}
                          onCheckedChange={() =>
                            toggleAccountActive(id, account.id)
                          }
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to remove this account?"
                            )
                          ) {
                            removeAccount(id, account.id);
                            toast.success("Account removed");
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
