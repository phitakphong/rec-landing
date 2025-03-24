"use client";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/app/globals.css";
import MyNav from "@/components/MyNav";
import I18nProvider from "@/providers/I18nProvider";
import { useEffect, useState } from "react";
import i18next from "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import CookieConsent from "@/components/cookie/CookieConsent";
import Footer from "@/components/footer/Footer";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18next.isInitialized) {
      setIsReady(true);
    }
  }, []);

  return (
    <html lang={isReady ? i18n.language : undefined}>
      <body className={`${isReady ? ibmPlexSansThai.className : undefined}`}>
        <div className="d-flex justify-content-center">
          <div className="w-100">
            {isReady ? (
              <I18nProvider>
                <MyNav />
                {children}
                <CookieConsent />
                <Footer />
              </I18nProvider>
            ) : null}
          </div>
        </div>
      </body>
    </html>
  );
}
