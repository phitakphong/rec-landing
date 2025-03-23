"use client";

import { useTranslation } from "react-i18next";

import React from "react";

export default function PlicyContent() {
  const { t } = useTranslation(["policy-notice"]);
  const checkString = (str: string) => /^((10|[1-9])\. \s?)/.test(str);

  return (
    <>
      <div className="background-policy">
        <div className={`container py-5`}>
          <div className={`row my-5`}>
            <div className={`col-12`}>
              <p className="text-header-eng text-center">Privacy Notice</p>
              <h1 className="text-header-big">{t("H.0")}</h1>
          
            </div>
          </div>
        </div>
      </div>
      <div className={`container py-5 max-width-1140`}>
        <div className="row">
          <div className="col-12">
            <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("H.1") }}></p>
            <p className="text-muted mb-0 mt-3" dangerouslySetInnerHTML={{ __html: t("H.2") }}></p>
            <p className="mt-3">
              <strong className="text-muted mb-0 " dangerouslySetInnerHTML={{ __html: t("H.3") }}></strong>
            </p>
            <p className="text-muted mb-0 mt-3" dangerouslySetInnerHTML={{ __html: t("D.3.1") }}></p>
            <p className="text-muted mb-0 mt-3" dangerouslySetInnerHTML={{ __html: t("D.3.2") }}></p>
            <p className="text-muted mb-0 mt-3" dangerouslySetInnerHTML={{ __html: t("D.3.3") }}></p>
            <p className="text-muted mb-0 mt-3" dangerouslySetInnerHTML={{ __html: t("D.3.4") }}></p>
            <p className="text-muted mb-0 mt-3" dangerouslySetInnerHTML={{ __html: t("D.3.5") }}></p>
            <p className="text-muted mb-0 mt-3" dangerouslySetInnerHTML={{ __html: t("D.3.6") }}></p>

            {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => {
              const content = t(`D.3.6.${num}`);

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
