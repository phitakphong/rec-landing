"use client";

import { useTranslation } from "react-i18next";
import CustomCarousel from "../../components/CustomCarousel";
import Image from "next/image";

import styles from "./HomeContent.module.css";
import { Button } from "reactstrap";
import RegisterPea from "../../components/registerpea/RegisterPea";
import CalcRec from "../../components/calcrec/CalcRec";
import News from "../../components/news/News";
import FAQList from "../../components/faq/FAQList";
import Partner from "../../components/partner/Partner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AnimatedSection from "../../components/AnimatedSection";

// import { useRouter as useRouter2 } from "next/router";

export default function HomeContent() {
  const router = useRouter();
  const { t } = useTranslation(["home", "common"]);

  useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [router]);

  return (
    <>
      <CustomCarousel />

      <AnimatedSection>
        <div className={`${styles.backgroundFit}`}>
          <div className={`container py-5`}>
            <div className={`row`}>
              <div className={`col-12 col-lg-6 z-1`}>
                <h1 className="gradient-text">{t("H_1")}</h1>
                <p className="txt-body " dangerouslySetInnerHTML={{ __html: `&emsp;&emsp;${t("D_1")}` }}></p>
                <div className="col-12">
                  <div className="d-flex align-items-start p-3">
                    <div className="me-3">
                      <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                    </div>

                    <div>
                      <h5 className="fw-bold mb-1">{t("H_1_1")}</h5>
                      <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("D_1_1") }}></p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-start p-3">
                    <div className="me-3">
                      <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                    </div>

                    <div>
                      <h5 className="fw-bold mb-1">{t("H_1_2")}</h5>
                      <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("D_1_2") }}></p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-start p-3">
                    <div className="me-3">
                      <Image src="/images/ic_thunder.svg" alt="ic_thunder" width={60} height={60} />
                    </div>

                    <div>
                      <h5 className="fw-bold mb-1">{t("H_1_3")}</h5>
                      <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: t("D_1_3") }}></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 d-flex justify-content-center align-items-end mb-3 z-0">
                <div style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "1/1" }}>
                  <Image src="/images/img_solar.png" alt="green2" fill priority />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className={`${styles.backgroundNetz}`}>
          <div className="container py-5">
            <div className="row">
              <div className="col-12 ">
                <h1 className="gradient-text">{t("H_2")}</h1>
                <p className="txt-body" dangerouslySetInnerHTML={{ __html: `${t("D_2")}` }}></p>

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
                    <div className="col-12 col-lg-3 d-flex flex-column align-items-center mt-3">
                      <Image src="/images/netz1.png" alt="netz1" height={250} width={250} priority />
                      <h5 className="fw-bold mb-1 pt-5" dangerouslySetInnerHTML={{ __html: t("H_2_1") }}></h5>
                      <p className="mt-3 text-start" dangerouslySetInnerHTML={{ __html: t("D_2_1") }}></p>
                    </div>

                    <div className="col-12 col-lg-3 d-flex flex-column align-items-center mt-3">
                      <Image src="/images/netz2.png" alt="netz2" height={250} width={250} priority />
                      <h5 className="fw-bold mb-1 pt-5" dangerouslySetInnerHTML={{ __html: t("H_2_2") }}></h5>
                      <p className="mt-3 text-start" dangerouslySetInnerHTML={{ __html: t("D_2_2") }}></p>
                    </div>

                    <div className="col-12 col-lg-3 d-flex flex-column align-items-center mt-3">
                      <Image src="/images/netz3.png" alt="netz3" height={250} width={250} priority />
                      <h5 className="fw-bold mb-1 pt-5" dangerouslySetInnerHTML={{ __html: t("H_2_3") }}></h5>
                      <p className="mt-3 text-start" dangerouslySetInnerHTML={{ __html: t("D_2_3") }}></p>
                    </div>

                    <div className="col-12 col-lg-3 d-flex flex-column align-items-center mt-3">
                      <Image src="/images/netz4.png" alt="netz4" height={250} width={250} priority />
                      <h5 className="fw-bold mb-1 pt-5" dangerouslySetInnerHTML={{ __html: t("H_2_4") }}></h5>
                      <p className="mt-3 text-start" dangerouslySetInnerHTML={{ __html: t("D_2_4") }}></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className={`${styles.backgroundService}`}>
          <div className="container py-5">
            <div className="row">
              <div className="col-12 " id="services">
                <h1 className="gradient-text mx-auto">{t("H_3")}</h1>
                <p className="txt-body text-center" dangerouslySetInnerHTML={{ __html: `${t("H_3_1")}` }}></p>
              </div>
            </div>
            <div className="row d-flex text-center position-relative" style={{ minHeight: "100%" }}>
              <div className="col-md-6 mt-3 d-flex flex-column">
                <div className={`card card-custom d-flex flex-column align-items-center pointer h-100`} onClick={() => router.push("/our-product-1")} style={{ borderRadius: "34px" }}>
                  <div style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "16/9" }}>
                    <Image src="/images/img_service1.png" fill alt="บริการซื้อขาย" className={`${styles.cardImgTop}`} style={{ objectFit: "contain" }} />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="mt-2" dangerouslySetInnerHTML={{ __html: t("D_3_1_1") }}></h5>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mt-3 d-flex flex-column">
                <div className={`card card-custom d-flex flex-column align-items-center pointer h-100`} onClick={() => router.push("/our-product-2")} style={{ borderRadius: "34px" }}>
                  <div style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "16/9" }}>
                    <Image src="/images/img_service2.png" fill alt="บริการซื้อขาย" className={`${styles.cardImgTop}`} style={{ objectFit: "contain" }} />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="mt-2" dangerouslySetInnerHTML={{ __html: t("D_3_1_2") }}></h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12 text-center my-5">
                <Button color="primary" className="bg-primary-gradient px-5" onClick={() => router.push("/register")}>
                  {t("regis", { ns: "common" })}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className={`${styles.backgroundPlatform}`}>
          <div className="container py-5">
            <div className="row">
              <div className="col-12 ">
                <h1 className="gradient-text" dangerouslySetInnerHTML={{ __html: `${t("H_4")}` }}></h1>
                <p className="txt-body" dangerouslySetInnerHTML={{ __html: `${t("H_4_1")}` }}></p>
                <h2 className="text-black mt-4">{t("H_4_2")}</h2>
                <div className="col-12 px-0 position-relative">
                  <div className="row d-flex text-center position-relative" style={{ minHeight: "100%" }}>
                    <div className="col-12 col-lg-3 mt-3 d-flex flex-column">
                      <div className={`card card-custom d-flex flex-column align-items-center  p-3 h-100`}>
                        <Image src="/images/ic_1.png" alt="ic_1" height={80} width={80} priority />
                        <h5 className="fw-bold mb-1 pt-3" dangerouslySetInnerHTML={{ __html: t("H_4_2_1") }}></h5>
                        <p className="mt-3 text-center" dangerouslySetInnerHTML={{ __html: t("D_4_2_1") }}></p>
                      </div>
                    </div>

                    <div className="col-12 col-lg-3 mt-3 d-flex flex-column">
                      <div className={`card card-custom d-flex flex-column align-items-center  p-3 h-100`}>
                        <Image src="/images/ic_2.png" alt="ic_2" height={80} width={80} priority />
                        <h5 className="fw-bold mb-1 pt-3" dangerouslySetInnerHTML={{ __html: t("H_4_2_2") }}></h5>
                        <p className="mt-3 text-center" dangerouslySetInnerHTML={{ __html: t("D_4_2_2") }}></p>
                      </div>
                    </div>

                    <div className="col-12 col-lg-3 mt-3 d-flex flex-column">
                      <div className={`card card-custom d-flex flex-column align-items-center  p-3 h-100`}>
                        <Image src="/images/ic_3.png" alt="ic_3" height={80} width={80} priority />
                        <h5 className="fw-bold mb-1 pt-3" dangerouslySetInnerHTML={{ __html: t("H_4_2_3") }}></h5>
                        <p className="mt-3 text-center" dangerouslySetInnerHTML={{ __html: t("D_4_2_3") }}></p>
                      </div>
                    </div>

                    <div className="col-12 col-lg-3 mt-3 d-flex flex-column">
                      <div className={`card card-custom d-flex flex-column align-items-center p-3 h-100`}>
                        <Image src="/images/ic_4.png" alt="ic_4" height={80} width={80} priority />
                        <h5 className="fw-bold mb-1 pt-3" dangerouslySetInnerHTML={{ __html: t("H_4_2_4") }}></h5>
                        <p className="mt-3 text-center" dangerouslySetInnerHTML={{ __html: t("D_4_2_4") }}></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <RegisterPea />
      </AnimatedSection>
      <AnimatedSection>
        <div className={`${styles.backgroundfAQ} py-5`}>
          <div className="container py-5">
            <div className={`${styles.backgroundCakc}`}>
              <div className="my-5">
                <CalcRec />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div>
          <div className="container py-5">
            <div className="my-5">
              <News />
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div>
          <div className="container pb-5">
            <div className="p-lg-5 p-8">
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/Bn_mDPJHQbE?si=UbyfkvnTxNKaUF9D"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className={`${styles.backgroundfAQ} py-5`}>
          <div className="container">
            <FAQList />
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className={`py-5`}>
          <div className="container">
            <Partner />
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
