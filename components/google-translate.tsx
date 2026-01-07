"use client";
import Script from "next/script";

export default function GoogleTranslate() {
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
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
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
      <div id="google_translate_element" style={{ display: "none" }} />
    </>
  );
}
