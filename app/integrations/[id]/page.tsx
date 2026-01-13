"use client";
import { useState, useEffect } from "react";
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
import {
  ConnectedAccount,
  facebookPage,
  facebookDataType,
  saveFacbookCredentialsPayload,
} from "@/types/types";
import IntegrationService from "@/services/integrations";
import { useWorkspaceStore } from "@/lib/workspace-store";
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
import { useSearchParams } from "next/navigation";
import { SaveConnectedAccountsModal } from "@/components/integrations/save-connected-accounts-modal";

export default function IntegrationDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const action = searchParams.get("action");
  const workspaceIdParam = searchParams.get("workspace_id");
  // const { workspace } = useWorkspaceStore();

  const integration = integrations.find((i) => i.id === id);

  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [modalWorkspaceId, setModalWorkspaceId] = useState<number | null>(null);

  useEffect(() => {
    if (id === "facebook" && action === "save_pages" && workspaceIdParam) {
      setModalWorkspaceId(parseInt(workspaceIdParam));
      setShowSaveModal(true);
      // Clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [id, action, workspaceIdParam]);

  useEffect(() => {
    fetchIntegrations();
  }, [id]);

  const fetchIntegrations = async () => {
    if (id === "facebook") {
      setLoadingAccounts(true);
      try {
        const response = await IntegrationService.getUserIntegrations();
        if (response.facebook_data) {
          const mappedAccounts: ConnectedAccount[] = response.facebook_data.map(
            (fb) => ({
              id: fb.id.toString(),
              name: fb.metadata.name,
              email: undefined, // Not typically active for pages in this context
              active: fb.is_active,
              dateConnected: fb.created_at,
              platformId: fb.metadata.page_id,
            })
          );
          setAccounts(mappedAccounts);
        } else {
          setAccounts([]);
        }
      } catch (error) {
        console.error("Failed to fetch user integrations:", error);
        toast.error("Could not load connected accounts");
      } finally {
        setLoadingAccounts(false);
      }
    } else if (id === "google-business") {
      // Keep existing mock logic for google-business for now, or clear it if supposed to be real.
      // Preserving original mock logic initialization
      setAccounts([
        {
          id: "acc_1",
          name: "Localmator HQ",
          email: "support@localmator.com",
          active: true,
          dateConnected: new Date().toISOString(),
          platformId: "loc_12345",
        },
      ]);
    }
  };

  const displayAccounts = accounts;

  const [isConnecting, setIsConnecting] = useState(false);

  const addLocalAccount = (
    accountData: Omit<ConnectedAccount, "id" | "dateConnected" | "active">
  ) => {
    const newAccount: ConnectedAccount = {
      id: nanoid(),
      dateConnected: new Date().toISOString(),
      active: true,
      ...accountData,
    };
    setAccounts((prev) => [...prev, newAccount]);
  };

  const toggleAccountActive = (accountId: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId ? { ...acc, active: !acc.active } : acc
      )
    );
  };

  const removeAccount = (accountId: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== accountId));
  };

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

  const handleConnect = async () => {
    setIsConnecting(true);

    if (id === "facebook") {
      try {
        const oauthUrl = await IntegrationService.connectFacebook();
        if (oauthUrl) {
          window.location.href = oauthUrl;
          return;
        }
      } catch (error) {
        console.error("Facebook connect error:", error);
        toast.error(`Failed to initiate Facebook connection: ${error}`);
        setIsConnecting(false);
        return;
      }
    }

    // Simulate OAuth delay for others
    setTimeout(() => {
      const mockAccount = {
        name: `${integration.name} Account`,
        email: `user_${nanoid(4)}@example.com`,
        platformId: `pid_${nanoid(8)}`,
      };
      addLocalAccount(mockAccount);
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
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Connected Accounts</h3>
            {loadingAccounts && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>

          {!loadingAccounts && displayAccounts.length === 0 ? (
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
              {displayAccounts.map((account) => (
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
                        {account.email && (
                          <p className="text-sm text-muted-foreground truncate">
                            {account.email}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground md:hidden mt-1">
                          Connected:{" "}
                          {account.dateConnected
                            ? new Date(
                                account.dateConnected
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-6 pl-14 md:pl-0">
                      <div className="hidden md:block text-sm text-muted-foreground mr-4">
                        {account.dateConnected
                          ? new Date(account.dateConnected).toLocaleDateString()
                          : "N/A"}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          {account.active ? "Syncing" : "Paused"}
                        </span>
                        <Switch
                          checked={account.active}
                          onCheckedChange={() =>
                            toggleAccountActive(account.id)
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
                            removeAccount(account.id);
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
      {modalWorkspaceId && (
        <SaveConnectedAccountsModal
          workspaceId={modalWorkspaceId}
          open={showSaveModal}
          onOpenChange={setShowSaveModal}
          onSaved={fetchIntegrations}
        />
      )}
    </DashboardLayout>
  );
}
