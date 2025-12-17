"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { indexedIntegrations } from "@/lib/integrations";
import {
  ArrowLeft,
  Download,
  Upload,
  AlertCircle,
  Loader2,
  Info,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function IndexedIntegrationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const integration = indexedIntegrations.find((i) => i.id === id);
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "Location added for indexing. Initial fetch may take several minutes."
      );
      setUrl("");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-start gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/integrations")}
            className="mt-1"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <div className="relative h-12 w-12">
                <Image
                  src={integration.image}
                  alt={integration.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                {integration.name}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {integration.description}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Single Location Input */}
          <Card>
            <CardHeader>
              <CardTitle>Add Single Location</CardTitle>
              <CardDescription>
                Enter the public URL or details of the location you want to
                track.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="url">Location URL / Competitor Details</Label>
                  <Input
                    id="url"
                    placeholder={`e.g., https://www.${
                      integration.name.toLowerCase().split(" ")[0]
                    }.com/maps/...`}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md flex items-start gap-3 text-sm text-blue-700 dark:text-blue-300">
                  <Info className="h-5 w-5 shrink-0 mt-0.5" />
                  <p>
                    Note: The initial fetch of reviews and data may take several
                    minutes to complete after submission.
                  </p>
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Start Indexing
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Bulk Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Bulk Upload (20+ Locations)</CardTitle>
              <CardDescription>
                For managing a large number of locations, please use our bulk
                upload process.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="space-y-1">
                  <h4 className="font-medium">1. Download Template</h4>
                  <p className="text-sm text-muted-foreground">
                    Get the Excel template to format your locations correctly.
                  </p>
                </div>
                <Button variant="outline" className="shrink-0 gap-2">
                  <Download className="h-4 w-4" />
                  Download Sample Excel
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="space-y-1">
                  <h4 className="font-medium">2. Submit via Email</h4>
                  <p className="text-sm text-muted-foreground">
                    Send your completed file to our support team for processing.
                  </p>
                </div>
                <div className="text-sm font-medium bg-background px-3 py-2 rounded border">
                  support@charityseo.com
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
