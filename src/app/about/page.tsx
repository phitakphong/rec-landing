"use client";

import { useTranslation } from "react-i18next";

import Footer from "../components/footer/Footer";
import React from "react";
import Partner from "../components/partner/Partner";

export default function AboutContent() {
  const { t } = useTranslation(["about"]);

  return (
    <>
      <div className="background-purple">
        <div className={`container py-5`}>
          <div className={`row my-5`}>
            <div className={`col-12`}>
              <h1 className="text-white full-width text-center">{t("H_1")}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={`container py-5`}>
        <div className="row">
          <div className="col-12">
            <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("H_2") }}></p>
            <strong>
              <p className="text-muted mt-5" dangerouslySetInnerHTML={{ __html: t("H_3") }}></p>
            </strong>
            <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("D_3_1") }}></p>
            <div className="mt-5">
              <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("D_3_2") }}></p>
            </div>
            <div className="mt-5">
              <strong>
                <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("H_4") }}></p>
              </strong>
              <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("D_4") }}></p>
            </div>
            <div className="mt-5">
              <strong>
                <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("H_5") }}></p>
              </strong>
              <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("D_5") }}></p>
            </div>
            <div className="mt-5">
              <strong>
                <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("H_6") }}></p>
              </strong>
              <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("D_6") }}></p>
            </div>
            <div className="mt-5">
              <strong>
                <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("H_7") }}></p>
              </strong>
              <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("D_7") }}></p>
            </div>
          </div>
        </div>
      </div>
      <div className={`py-5`}>
        <div className="container">
          <Partner />
        </div>
      </div>
    </>
  );
}
