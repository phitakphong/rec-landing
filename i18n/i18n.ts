"use client"; // ✅ Ensure it's a Client Component

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(HttpBackend) 
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    fallbackLng: "th",
    supportedLngs: ["en", "th"], 
    debug: process.env.NODE_ENV === "development",
    interpolation: { escapeValue: false },
    backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
    ns: ["common", "home"], 
    defaultNS: "common",
  });

export default i18next;
