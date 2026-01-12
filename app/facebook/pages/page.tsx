import { Suspense } from "react";
import FacebookPageModal from "@/components/integrations/facebook/facebook-modal";
export default function FacebookPageSelection() {
  return (
    <>
      <Suspense>
        <FacebookPageModal />
      </Suspense>
    </>
  );
}
