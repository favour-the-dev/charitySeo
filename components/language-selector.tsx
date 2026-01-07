"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "zh-CN", name: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
  { code: "uk", name: "Ukrainian", flag: "🇺🇦" },
  { code: "da", name: "Danish", flag: "🇩🇰" },
  { code: "fi", name: "Finnish", flag: "🇫🇮" },
  { code: "no", name: "Norwegian", flag: "🇳🇴" },
  { code: "el", name: "Greek", flag: "🇬🇷" },
  { code: "cs", name: "Czech", flag: "🇨🇿" },
  { code: "ro", name: "Romanian", flag: "🇷🇴" },
  { code: "hu", name: "Hungarian", flag: "🇭🇺" },
];

export default function LanguageSelector() {
  const [selectedLang, setSelectedLang] = React.useState("en");
  const [isReady, setIsReady] = React.useState(false);

  const getSelectElement = () =>
    document.querySelector(".goog-te-combo") as HTMLSelectElement | null;

  const changeLanguage = (langCode: string) => {
    const selectElement = getSelectElement();

    if (selectElement) {
      selectElement.value = langCode;
      selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      setSelectedLang(langCode);
      return;
    }

    console.warn("Google Translate widget not ready yet");
    setTimeout(() => {
      const retryElement = getSelectElement();
      if (retryElement) {
        retryElement.value = langCode;
        retryElement.dispatchEvent(new Event("change", { bubbles: true }));
        setSelectedLang(langCode);
      }
    }, 400);
  };

  // Check when Google Translate widget is ready
  React.useEffect(() => {
    const checkReady = () => {
      const selectElement = getSelectElement();
      if (selectElement) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    if (!checkReady()) {
      const interval = setInterval(() => {
        if (checkReady()) {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  // Get current language from cookie
  React.useEffect(() => {
    const checkCookie = () => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("googtrans="));

      if (cookie) {
        const lang = cookie.split("/")[2];
        if (lang) setSelectedLang(lang);
      }
    };

    checkCookie();
    const interval = setInterval(() => {
      checkCookie();
      // If the widget just became ready, sync the select value to the cookie language
      if (isReady && selectedLang) {
        const selectElement = getSelectElement();
        if (selectElement && selectElement.value !== selectedLang) {
          selectElement.value = selectedLang;
          selectElement.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    }, 800);
    return () => clearInterval(interval);
  }, [isReady, selectedLang]);

  const currentLanguage =
    languages.find((lang) => lang.code === selectedLang) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[140px] justify-between shadow-none"
          title="Change language"
        >
          <span className="flex items-center gap-2">
            <span className="text-base">{currentLanguage.flag}</span>
            <span className="truncate hidden md:block">
              {currentLanguage.name}
            </span>
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="h-[300px] overflow-y-auto w-[180px]"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="cursor-pointer"
          >
            <span className="flex items-center gap-2 w-full">
              <span className="text-base">{lang.flag}</span>
              <span className="flex-1 truncate">{lang.name}</span>
              {selectedLang === lang.code && (
                <Check className="h-4 w-4 ml-auto" />
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
