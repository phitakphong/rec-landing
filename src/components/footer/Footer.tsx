"use client";
import Image from "next/image";
import styles from "./Footer.module.css";

import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function Footer() {
  const { t } = useTranslation(["footer"]);
  return (
    <>
      <div className={`py-5 ${styles.footerBg} text-white`}>
        <div className="container max-width-1140">
          <div className="row">
            <div className="col-12 col-xl-3 position-relative">
              <Image src="/images/logo_pea.png" width={240} height={80} alt="logo_pea" />
              <h4 className=" mt-3">{t("F_1")}</h4>
              <div className="d-inline-flex gap-4 mt-3 ">
                <a href="#" rel="noreferrer" className={`${styles.socialIcon}`}>
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" rel="noreferrer" className={`${styles.socialIcon}`}>
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" rel="noreferrer" className={`${styles.socialIcon}`}>
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" rel="noreferrer" className={`${styles.socialIcon}`}>
                  <i className="bi bi-youtube"></i>
                </a>
                <a href="#" rel="noreferrer" className={`${styles.socialIcon}`}>
                  <i className="bi bi-tiktok"></i>
                </a>
                <a href="#" rel="noreferrer" className={`${styles.socialIcon}`}>
                  <i className="bi bi-line"></i>
                </a>
              </div>
              <div className="mt-3">
                <span className={`${styles.socialIconSmall}`}>
                  <i className="bi bi-telephone"></i>
                </span>
                <strong className="ms-3">1129 PEA Contact Center</strong>
              </div>
              {/* <div className="col-6 d-flex align-items-center gap-3 mt-3"></div> */}
            </div>
            <div className="col-12 col-xl-9">
              <div className="d-block d-xl-none">
                <div className="row mt-3">
                  <div className="col-12">
                    <a href="/about" className="text-white text-decoration-none">
                      {t("F_2")}
                    </a>
                  </div>
                  <div className="col-12 mt-3">
                    <Link href="/home#services" className="text-white text-decoration-none">
                      {t("F_3")}
                    </Link>
                  </div>
                  <div className="col-12 mt-3">
                    <Link href="/register" className="text-white text-decoration-none">
                      {t("M_8")}
                    </Link>
                  </div>
                  <div className="col-12 mt-3">
                    <Link href="/rec-calc" className="text-white text-decoration-none">
                      {t("F_4")}
                    </Link>
                  </div>
                  <div className="col-12 mt-3">
                    <Link href="/news" className="text-white text-decoration-none">
                      {t("F_5")}
                    </Link>
                  </div>
                  <div className="col-12 mt-3">
                    <Link href="/faq" className="text-white text-decoration-none">
                      {t("F_6")}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="d-none d-xl-block">
                <div className="d-flex justify-content-end gap-4">
                  <a href="/about" className="text-white text-decoration-none">
                    {t("F_2")}
                  </a>
                  <Link href="/home#services" className="text-white text-decoration-none">
                    {t("F_3")}
                  </Link>
                  <Link href="/register" className="text-white text-decoration-none">
                    {t("M_8")}
                  </Link>
                  <Link href="/rec-calc" className="text-white text-decoration-none">
                    {t("F_4")}
                  </Link>
                  <Link href="/news" className="text-white text-decoration-none">
                    {t("F_5")}
                  </Link>
                  <Link href="/faq" className="text-white text-decoration-none">
                    {t("F_6")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-white" />
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center flex-wrap text-white">
                <div className="col-12 d-flex">
                  <span className="d-none d-xl-block">{t("F_8")}</span>
                  <div className="d-block d-xl-none flex-fill">
                    <div className="row">
                      <span className="">{t("F_8")}</span>
                      <div className="col-12  mt-3">
                        <Link href="/cookie-policy" className="text-white text-decoration-none">
                          {t("F_9")}
                        </Link>
                      </div>
                      <div className="col-12 mt-3">
                        <Link href="/terms" className="text-white text-decoration-none">
                          {t("F_10")}
                        </Link>
                      </div>
                      <div className="col-12 mt-3">
                        <Link href="/policy" className="text-white text-decoration-none">
                          {t("F_14")}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-xl-block flex-fill">
                    <div className="d-flex justify-content-end gap-4">
                      <Link href="/cookie-policy" className="text-white text-decoration-none">
                        {t("F_9")}
                      </Link>
                      <Link href="/terms" className="text-white text-decoration-none">
                        {t("F_10")}
                      </Link>
                      <Link href="/policy" className="text-white text-decoration-none">
                        {t("F_14")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
