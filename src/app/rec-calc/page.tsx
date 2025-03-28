"use client";

import { useTranslation } from "react-i18next";
import Footer from "@/components/footer/Footer";
import React from "react";

import CalcRec from "@/components/calcrec/CalcRec";
import RegisterPea from "@/components/registerpea/RegisterPea";
import Image from "next/image";

export default function RecCalcContent() {
  const { t } = useTranslation(["calc"]);

  return (
    <>
      <div className="background-calrec">
        <div className={`container py-5`}>
          <div className={`row my-5`}>
            <div className={`col-12`}>
              <p className="text-header-eng text-center">REC Calculation</p>
              <h1 className="text-header-big">{t("H_0")}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className={`container mt-5 max-width-1140`}>
        <div className={`row`}>
          <div className={`col-12 col-xxl-7 z-1`}>
            <CalcRec className={`background-calc card card-custom`} />
          </div>
          <div className="col-12 col-xxl-5 d-flex justify-content-center align-items-end mt-5 z-0">
            <Image src="/images/img_calc.png" alt="green2" width={400} height={500} priority />
          </div>
        </div>
      </div>
      <div className="my-5">&emsp;</div>
      <RegisterPea />
    </>
  );
}
