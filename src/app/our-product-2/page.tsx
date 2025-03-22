"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";

import styles from "./OurProduct2.module.css";

import RegisterPea from "@/components/registerpea/RegisterPea";

export default function OurProduct2Content() {
  const { t } = useTranslation(["product2", "common"]);

  return (
    <>
      <div>
        <div className={`container py-5`}>
          <div className={`row`}>
            <div className={`col-12 col-lg-7 z-1`}>
              <h1 className="gradient-text">{t("H_1")}</h1>
              <p className="txt-body " dangerouslySetInnerHTML={{ __html: `${t("H_2")}` }}></p>
              <p className="txt-body " dangerouslySetInnerHTML={{ __html: `${t("H_3")}` }}></p>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("D_3_1")}</h5>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("D_3_2")}</h5>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("D_3_3")}</h5>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("D_3_4")}</h5>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("D_3_5")}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 d-flex justify-content-center align-items-end mb-3 z-0">
              <div style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "1/1" }}>
                <Image src="/images/img_prod2.png" alt="green2" fill priority />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="background-gray">
        <div className="container py-5">
          <div className="row">
            <div className="col-12 ">
              <h1 className="gradient-text">{t("H_4")}</h1>
              <p className="txt-body" dangerouslySetInnerHTML={{ __html: `${t("H_4_1")}` }}></p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 ">
              <h2 className="text-black full-width text-center">{t("H_4")}</h2>

              <div className="col-12 px-0 position-relative pt-5">
                {/* <div
                className="bg-purple position-absolute start-50 top-50"
                style={{
                  width: "80%",
                  height: "0.5em",
                  transform: "translate(-50%, -50%)", // ✅ อยู่กึ่งกลางทั้ง X และ Y
                }}
              ></div> */}

                <div className="row d-flex text-center position-relative" style={{ height: "100%" }}>
                  <div className="col-md-3 d-flex flex-column align-items-center ">
                    <Image src="/images/netz1.png" alt="netz1" height={150} width={150} priority />
                    <h5 className="fw-bold mb-1 pt-3">Issuer</h5>
                    <p className="mt-3 text-center text-muted" dangerouslySetInnerHTML={{ __html: t("D_5_1") }}></p>
                  </div>

                  <div className="col-md-3 d-flex flex-column align-items-center ">
                    <Image src="/images/netz2.png" alt="netz2" height={150} width={150} priority />
                    <h5 className="fw-bold mb-1 pt-3">Registrant</h5>
                    <p className="mt-3 text-center text-muted" dangerouslySetInnerHTML={{ __html: t("D_5_2") }}></p>
                  </div>

                  <div className="col-md-3 d-flex flex-column align-items-center ">
                    <Image src="/images/netz3.png" alt="netz3" height={150} width={150} priority />
                    <h5 className="fw-bold mb-1 pt-3">Participant</h5>
                    <p className="mt-3 text-center text-muted" dangerouslySetInnerHTML={{ __html: t("D_5_3") }}></p>
                  </div>

                  <div className="col-md-3 d-flex flex-column align-items-center ">
                    <Image src="/images/netz4.png" alt="netz4" height={150} width={150} priority />
                    <h5 className="fw-bold mb-1 pt-3">Beneficiary</h5>
                    <p className="mt-3 text-center text-muted" dangerouslySetInnerHTML={{ __html: t("D_5_4") }}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 ">
              <p className="txt-body" dangerouslySetInnerHTML={{ __html: `${t("H_4_1")}` }}></p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 my-5 ">
              <h2 className="text-black full-width text-center">{t("H_6")}</h2>

              <div className="col-12 px-0 position-relative pt-5">
                <div className="row d-flex text-center position-relative" style={{ height: "100%" }}>
                  <div className="col-md-3 d-flex flex-column align-items-center ">
                    <Image src="/images/netz1.png" alt="netz1" height={150} width={150} priority />
                    <h5 className="fw-bold mb-1 pt-3">{t("D_6_1")}</h5>
                    <p className="mt-3 text-center text-muted" dangerouslySetInnerHTML={{ __html: t("P_6_1") }}></p>
                  </div>

                  <div className="col-md-3 d-flex flex-column align-items-center ">
                    <Image src="/images/netz1.png" alt="netz1" height={150} width={150} priority />
                    <h5 className="fw-bold mb-1 pt-3">{t("D_6_2")}</h5>
                    <p className="mt-3 text-center text-muted" dangerouslySetInnerHTML={{ __html: t("P_6_2") }}></p>
                  </div>

                  <div className="col-md-3 d-flex flex-column align-items-center ">
                    <Image src="/images/netz1.png" alt="netz1" height={150} width={150} priority />
                    <h5 className="fw-bold mb-1 pt-3">{t("D_6_3")}</h5>
                    <p className="mt-3 text-center text-muted" dangerouslySetInnerHTML={{ __html: t("P_6_3") }}></p>
                  </div>

                  <div className="col-md-3 d-flex flex-column align-items-center ">
                    <Image src="/images/netz1.png" alt="netz1" height={150} width={150} priority />
                    <h5 className="fw-bold mb-1 pt-3">{t("D_6_4")}</h5>
                    <p className="mt-3 text-center text-muted" dangerouslySetInnerHTML={{ __html: t("P_6_4") }}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.backgroundPlatform}`}>
        <div className={`container py-5`}>
          <div className={`row`}>
            <div className={`col-12`}>
              <h1 className="gradient-text">{t("H_7")}</h1>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("H_7_1")}</h5>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("H_7_2")}</h5>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("H_7_3")}</h5>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("H_7_4")}</h5>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("H_7_5")}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="background-gray">
        <div className="container py-5">
          <div className="row">
            <div className="col-12 my-5 ">
              <h2 className="gradient-textfull-width text-center">{t("H_8")}</h2>

              <div className="col-12 mt-5 d-block d-lg-none">
                <div className="" style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "1/1" }}>
                  <Image src={`/images/img_standard.png`} alt="green2" fill style={{ objectFit: "contain" }} priority />
                </div>
              </div>
              <div className="col-12 mt-5 d-none d-lg-block">
                <div className="" style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "4/3" }}>
                  <Image src={`/images/img_standard.png`} alt="green2" fill style={{ objectFit: "contain" }} priority />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegisterPea />
    </>
  );
}
