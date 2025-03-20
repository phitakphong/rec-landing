"use client";

import { useTranslation } from "react-i18next";

import Footer from "../components/footer/Footer";
import React from "react";

export default function TermsContent() {
  const { t } = useTranslation(["terms"]);
  const checkString = (str: string) => /^((10|[1-9])\. \s?)/.test(str);

  return (
    <>
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
              <p className="text-muted mt-3" dangerouslySetInnerHTML={{ __html: t("H_2") }}></p>
            </strong>
            {Array.from({ length: 32 }, (_, i) => i + 1).map((num) => {
              const content = t(`D_2_${num}`);

              if (checkString(content)) {
                return <strong key={num} className="text-muted mt-3" dangerouslySetInnerHTML={{ __html: content }}></strong>;
              } else {
                return <p key={num} className="text-muted mt-3" dangerouslySetInnerHTML={{ __html: content }}></p>;
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}
