"use client";

import { useTranslation } from "react-i18next";

import Footer from "../components/footer/Footer";
import React from "react";
import RootLayout from "../layout";

export default function CookiePolicyContent() {
  const { t } = useTranslation(["cookie-policy"]);

  return (
    <RootLayout>
      <div className="background-purple">
        <div className={`container py-5`}>
          <div className={`row my-5`}>
            <div className={`col-12`}>
              <h1 className="text-white full-width text-center">{t("H_0")}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={`container py-5`}>
        <div className="row">
          <div className="col-12">
            <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("H_1") }}></p>
            <strong>
              <p className="text-muted mt-5" dangerouslySetInnerHTML={{ __html: t("H_2") }}></p>
            </strong>
            <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("D_2") }}></p>
            <strong>
              <p className="text-muted mt-5" dangerouslySetInnerHTML={{ __html: t("H_3") }}></p>
            </strong>
            <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("D_3") }}></p>
            <strong>
              <p className="text-muted mt-5" dangerouslySetInnerHTML={{ __html: t("H_4") }}></p>
            </strong>
            <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("D_4_1") }}></p>
            <ul className="text-muted ">
              <li className="mt-3" dangerouslySetInnerHTML={{ __html: t("D_4_2") }}></li>
              <li className="mt-3" dangerouslySetInnerHTML={{ __html: t("D_4_3") }}></li>
              <li className="mt-3" dangerouslySetInnerHTML={{ __html: t("D_4_4") }}></li>
              <li className="mt-3" dangerouslySetInnerHTML={{ __html: t("D_4_5") }}></li>
            </ul>
            <p className="text-muted mt-5 mb-0" dangerouslySetInnerHTML={{ __html: t("D_4_6") }}></p>
          </div>
        </div>
      </div>

      <Footer />
    </RootLayout>
  );
}
