"use client";

import React, { useEffect, useState } from "react";

import styles from "./Faq.module.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Footer from "../components/footer/Footer";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import ApiService from "../services/api-service";
import RootLayout from "../layout";

export default function FaqContent() {
  const { t, i18n } = useTranslation(["common"]);
  const [openId, setOpenId] = useState<number | null>(null);

  const [faqs, setFaqs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleCollapse = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await ApiService.getFaqs();
      if (data) {
        setFaqs(data);
      }
    };
    fetchData();
  }, [setFaqs]);

  const filteredFaqs = faqs.filter((faq) => faq.topic[i18n.language].toLowerCase().includes(searchQuery.toLowerCase()) || faq.detail[i18n.language].toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <RootLayout>
      <div className="background-purple">
        <div className={`container py-5`}>
          <div className={`row my-5`}>
            <div className={`col-12`}>
              <h1 className="text-white full-width text-center">{t("faq")}</h1>
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-5 mt-5">
                  <InputGroup>
                    <InputGroupText className={`${styles.inputGroupText}`}>
                      <i className="bi bi-search"></i>
                    </InputGroupText>
                    <Input value={searchQuery} placeholder={`${t("search")}`} style={{ width: "20em" }} onChange={(e) => setSearchQuery(e.target.value)} />
                  </InputGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`container py-5`}>
        <div className="row my-5">
          <div className="col-12 px-5">
            {filteredFaqs.map((faq, index) => (
              <React.Fragment key={faq.faq_uid}>
                <div key={faq.faq_uid}>
                  <a
                    role="button"
                    className={`d-flex align-items-center justify-content-between w-100 ${openId === faq.faq_uid ? "txt-purple" : "text-black"}`}
                    onClick={() => toggleCollapse(faq.faq_uid)}
                  >
                    <h5 className="m-0">{faq.topic[i18n.language]}</h5>
                    <i className={`bi ${openId === faq.faq_uid ? "bi-dash" : "bi-plus"}`} style={{ fontSize: "xx-large" }}></i>
                  </a>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={openId === faq.faq_uid ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="text-muted">{faq.detail[i18n.language]}</p>
                  </motion.div>
                </div>
                {index < faqs.length - 1 && <hr className="my-4" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </RootLayout>
  );
}
