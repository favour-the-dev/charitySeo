"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function FacebookCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspace_id");
  // https://app.localmator.com/integrations/facebook/select?workspace_id=12#_=_
  useEffect(() => {
    if (workspaceId) {
      router.push(
        `/integrations/facebook?action=save_pages&workspace_id=${workspaceId}`
      );
    } else {
      router.push("/integrations/facebook");
    }
  }, [workspaceId, router]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export default function FacebookCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <FacebookCallbackContent />
    </Suspense>
  );
}
