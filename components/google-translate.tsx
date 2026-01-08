"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function GoogleTranslate() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Remove the Google Translate iframe from the DOM when it appears
    // const observer = new MutationObserver(() => {
    //   const iframe = document.querySelector(".goog-te-banner-frame");
    //   if (iframe) {
    //     iframe.remove();
    //     document.body.style.top = "0px";
    //   }
    // });

    // observer.observe(document.body, { childList: true, subtree: true });

    // return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Init function */}
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
                { 
                    pageLanguage: 'en',
                    includedLanguages: 'en,es,fr,de,zh-CN,ja,ar,pt,ru,hi,it,ko,tr,vi,pl,nl,id,th,sv,uk,da,fi,no,el,cs,ro,hu',
                    layout: google.translate.TranslateElement.InlineLayout.VERTICAL,
                    autoDisplay: false,
                    multilanguagePage: true
                },
                'google_translate_element'
            );
          }
        `}
      </Script>
      {/* Google Translate script */}
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      {/* Placeholder */}
      <div id="google_translate_element" style={{ height: "25px" }} />
    </>
  );
}
