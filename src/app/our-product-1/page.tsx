"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";

// import styles from "./OurProduct1.module.css";

import RegisterPea from "../components/registerpea/RegisterPea";
import Footer from "../components/footer/Footer";
import RootLayout from "../layout";

export default function OurProduct1Content() {
  const { t } = useTranslation(["product1", "common"]);

  return (
    <RootLayout>
      <div>
        <div className={`container py-5`}>
          <div className={`row`}>
            <div className={`col-12 col-lg-6 z-1`}>
              <h1 className="gradient-text">{t("H_1")}</h1>
              <p className="txt-body " dangerouslySetInnerHTML={{ __html: `${t("D_1")}` }}></p>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("H_1_1")}</h5>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("H_1_2")}</h5>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-center p-3">
                  <div className="me-3 d-flex align-items-center">
                    <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-1">{t("H_1_3")}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-end mb-3 z-0">
              <Image src="/images/img_prod1.png" alt="green2" width={500} height={500} priority />
            </div>
          </div>
        </div>
      </div>
      <div className="background-gray">
        <div className={`container py-5`}>
          <div className={`row mt-5`}>
            <div className={`col-12`}>
              <h1 className="gradient-text">{t("H_2")}</h1>
            </div>
            <div className="col-12 mt-5 text-center">
              <h4 className="text-black">{t("H_2_1")}</h4>
            </div>
            <div className="col-12text-center">
              <div style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "16/5" }}>
                <Image src={`/images/${t("lang")}/img_prod1_1.png`} alt="green2" fill style={{ objectFit: "contain" }} priority />
              </div>
            </div>
          </div>
          <div className={`row mt-5`}>
            <div className="col-12 text-center">
              <h4 className="text-black">{t("H_2_2")}</h4>
            </div>
            <div className="col-12text-center">
              <div style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "16/5" }}>
                <Image src={`/images/${t("lang")}/img_prod1_2.png`} alt="green2" fill style={{ objectFit: "contain" }} priority />
              </div>
            </div>
          </div>
          <div className={`row mt-5`}>
            <div className="col-12 text-center">
              <h4 className="text-black">{t("H_2_3")}</h4>
            </div>
            <div className="col-12 text-center">
              <div style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "16/3" }}>
                <Image src={`/images/${t("lang")}/img_prod1_3.png`} alt="green2" fill style={{ objectFit: "contain" }} priority />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className={`container py-5`}>
          <div className={`row mt-5`}>
            <div className={`col-12`}>
              <h1 className="gradient-text">{t("H_2_6")}</h1>
              <ul className="mt-3 text-black">
                <li>{t("H_2_6_1")}</li>
                <li>{t("H_2_6_2")}</li>
              </ul>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: "45em" }}>
              <div className="row m-0 text-black">
                <div className="col-md-6 d-flex align-items-end">One-time Facility registration fee (additional 5-year validity)</div>
                <div className="col-md-6">
                  <div className="float-end">
                    Facility Renewal fee
                    <br />
                    (additional 5-year validity)
                  </div>
                </div>
                <div className="col-12 my-3">
                  <div className="table-container">
                    <table className={`table table-striped2 my-table text-start m-0`}>
                      <thead className="table-light">
                        <tr>
                          <th scope="col">&emsp;Capacity</th>
                          <th scope="col">Price (THB)</th>
                          <th scope="col">Price (THB)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>&emsp;3MW or greater</td>
                          <td>43,999.-</td>
                          <td>17,500.-</td>
                        </tr>
                        <tr>
                          <td>&emsp;1MW or greater and less than 3MW</td>
                          <td>21,999.-</td>
                          <td>8,799.-</td>
                        </tr>
                        <tr>
                          <td>&emsp;250kW or greater and less than 1MW</td>
                          <td>5,799.-</td>
                          <td>2,319.-</td>
                        </tr>
                        <tr>
                          <td>&emsp;less than 250kW</td>
                          <td>5,799.-</td>
                          <td>2,319.-</td>
                        </tr>
                        <tr>
                          <td>&emsp;less than 250kW with approved method of digital meter reading access</td>
                          <td>1,999.-</td>
                          <td>799.-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <br />
                  *** Price exclude VAT
                  <div className="d-flex border my-radius align-items-center my-container mt-3">
                    <div className="flex-fill text-start fw-bold p-3">Issuance fee (per MWh)</div>

                    <div className="border-start mx-3 align-self-stretch" style={{ width: "1px" }}></div>

                    <div className="flex-fill p-3">
                      <div className="fw-bold">Price (THB)</div>
                      <div>1,999.-</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegisterPea />
      <Footer />
    </RootLayout>
  );
}
