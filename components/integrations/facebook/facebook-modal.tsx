"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, AlertCircle, Check, Search } from "lucide-react";
import { toast } from "react-hot-toast";

import IntegrationService from "@/services/integrations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { facebookPage } from "@/types/types";

export default function FacebookPageModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const workspaceIdStr = searchParams.get("workspace_id");
  // If workspace_id is not in URL, we might need to handle it or error out.
  // However, redirect typically includes it.

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pages, setPages] = useState<facebookPage[]>([]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (workspaceIdStr) {
      fetchPages(parseInt(workspaceIdStr));
    } else {
      setError("Missing workspace ID in URL");
      setLoading(false);
    }
  }, [workspaceIdStr]);

  const fetchPages = async (workspaceId: number) => {
    try {
      setLoading(true);
      const data = await IntegrationService.getConnectedFacebookPages(
        workspaceId
      );

      // Handle various response structures as per previous observation
      let pagesList: facebookPage[] = [];
      if (Array.isArray(data)) {
        pagesList = data;
      } else if (data && "pages" in data && Array.isArray(data.pages)) {
        pagesList = data.pages;
      } else if (data && "data" in data && Array.isArray((data as any).data)) {
        pagesList = (data as any).data;
      }

      setPages(pagesList);
    } catch (err) {
      console.error("Error fetching pages:", err);
      setError("Failed to load Facebook pages.");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePage = (pageId: string) => {
    setSelectedPages((prev) =>
      prev.includes(pageId)
        ? prev.filter((id) => id !== pageId)
        : [...prev, pageId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPages.length === filteredPages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(filteredPages.map((p) => p.id));
    }
  };

  const handleSave = async () => {
    if (selectedPages.length === 0) {
      toast.error("Please select at least one page");
      return;
    }

    try {
      setSaving(true);
      const pagesToSave = pages.filter((p) => selectedPages.includes(p.id));

      await IntegrationService.saveFacebookPages({
        pages: pagesToSave,
      });

      toast.success("Facebook pages connected successfully");

      // Redirect to the Facebook integration detail page
      router.push("/integrations/facebook");
    } catch (err) {
      console.error("Error saving pages:", err);
      toast.error("Failed to connect pages. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!workspaceIdStr && !loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50/50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center py-10">
            <AlertCircle className="h-10 w-10 text-destructive mb-4" />
            <p className="text-center font-medium">
              Invalid Request: Missing Workspace ID
            </p>
            <Button
              onClick={() => router.push("/integrations")}
              className="mt-4"
            >
              Back to Integrations
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg border-2">
        <CardHeader className="border-b space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Image
                src="/authorized/Facebook-Logo.png"
                alt="Facebook"
                width={32}
                height={32}
                className="rounded-full"
              />
              Select Facebook Pages
            </CardTitle>
            {loading && (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            )}
          </div>
          <CardDescription>
            Select the Facebook Pages you want to connect to your workspace.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="p-4 border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10 space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={
                  filteredPages.length > 0 &&
                  selectedPages.length === filteredPages.length
                }
                onCheckedChange={handleSelectAll}
              />
              <label
                htmlFor="select-all"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Select All ({filteredPages.length})
              </label>
            </div>
          </div>

          <ScrollArea className="h-[400px] p-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Fetching pages from Facebook...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-destructive">
                <AlertCircle className="h-8 w-8" />
                <p>{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchPages(parseInt(workspaceIdStr!))}
                >
                  Retry
                </Button>
              </div>
            ) : filteredPages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10">
                <p>No pages found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPages.map((page) => (
                  <div
                    key={page.id}
                    className={`
                                relative flex items-start space-x-3 rounded-lg border p-4 transition-all hover:bg-muted/50 cursor-pointer
                                ${
                                  selectedPages.includes(page.id)
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "border-input"
                                }
                            `}
                    onClick={() => handleTogglePage(page.id)}
                  >
                    <Checkbox
                      checked={selectedPages.includes(page.id)}
                      onCheckedChange={() => handleTogglePage(page.id)}
                      className="mt-1"
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold leading-none">
                          {page.name}
                        </h4>
                        {page.fan_count > 0 && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] h-5"
                          >
                            {new Intl.NumberFormat("en-US", {
                              notation: "compact",
                              maximumFractionDigits: 1,
                            }).format(page.fan_count)}{" "}
                            likes
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {page.category || "No category"}
                      </p>
                      {page.cover?.source && (
                        <div className="mt-2 relative h-20 w-full overflow-hidden rounded-md bg-muted">
                          <Image
                            src={page.cover.source}
                            alt={page.name}
                            fill
                            className="object-cover opacity-80"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t p-6 bg-gray-50/50">
          <div className="text-sm text-muted-foreground">
            {selectedPages.length} selected
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/integrations/facebook")}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || selectedPages.length === 0 || loading}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Connect Pages
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
