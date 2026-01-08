"use client";
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const containerId = "google_translate_element";
    const scriptSrc =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

    type GoogleTranslateWindow = Window & {
      google?: {
        translate?: {
          TranslateElement?: new (
            options: Record<string, unknown>,
            container: string
          ) => unknown;
        };
      };
      googleTranslateElementInit?: () => void;
    };

    const w = window as GoogleTranslateWindow;

    w.googleTranslateElementInit = () => {
      const TranslateElement = w.google?.translate?.TranslateElement;
      if (!TranslateElement) return;

      const container = document.getElementById(containerId);
      if (!container) return;

      // Prevent duplicate init across remounts/rerenders.
      const containerWithFlag = container as HTMLElement & {
        __googleTranslateInitialized?: boolean;
      };
      if (containerWithFlag.__googleTranslateInitialized) return;
      containerWithFlag.__googleTranslateInitialized = true;

      new TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "en,es,fr,de,zh-CN,ja,ar,pt,ru,hi,it,ko,tr,vi,pl,nl,id,th,sv,uk,da,fi,no,el,cs,ro,hu",
          // Keep inline layout to match existing UX.
          layout: (w.google as any).translate.TranslateElement.InlineLayout
            .VERTICAL,
          autoDisplay: false,
          multilanguagePage: true,
        },
        containerId
      );
    };

    const existing = document.querySelector(
      'script[data-google-translate="true"]'
    ) as HTMLScriptElement | null;

    if (!existing) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.defer = true;
      script.setAttribute("data-google-translate", "true");
      document.head.appendChild(script);
      return;
    }

    // Script already exists (route navigation / remount). If it's already loaded, re-init.
    if (w.google?.translate?.TranslateElement) {
      w.googleTranslateElementInit?.();
      return;
    }

    existing.addEventListener(
      "load",
      () => {
        w.googleTranslateElementInit?.();
      },
      { once: true }
    );
  }, []);

  return (
    <div
      id="google_translate_element"
      className="h-6"
      suppressHydrationWarning
    />
  );
}
