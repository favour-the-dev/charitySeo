import { Suspense } from "react";
import SettingsPageComponent from "@/components/settings/settings-page";
export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsPageComponent />
    </Suspense>
  );
}
