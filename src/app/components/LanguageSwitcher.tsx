"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import i18next from "../../../i18n/i18n";
import { Button } from "reactstrap";
import Image from "next/image";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);
  const [language, setLanguage] = useState("th");

  useEffect(() => {
    if (i18next.isInitialized) {
      setIsReady(true);
    }
    const storedLanguage = localStorage.getItem("language") || "th";
    i18n.changeLanguage(storedLanguage);
    setLanguage(storedLanguage);
  }, []);

  const toggleLanguage = () => {
    if (!isReady) {
      console.warn("i18next is not initialized yet");
      return;
    }
    const newLang = language === "th" ? "en" : "th";
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <Button outline color="link" onClick={toggleLanguage} className="button-content no-border">
      <Image className="me-1" src="/images/lang.svg" height={24} width={24} priority alt={""} />
      {language === "en" ? "EN" : "TH"}
    </Button>
  );
}
