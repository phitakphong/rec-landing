"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import styles from "./FAQList.module.css";
import { motion } from "framer-motion";
import ApiService from "@/services/api-service";

function splitArray(array: unknown[]) {
  const mid = Math.ceil(array.length / 2);
  const firstHalf = array.slice(0, mid);
  const secondHalf = array.slice(mid);

  return [firstHalf, secondHalf];
}

export default function FAQList() {
  const { t, i18n } = useTranslation(["common"]);

  const [rigthFaq, setRigthFaq] = useState<any[]>([]);
  const [leftFaq, setLeftFaq] = useState<any[]>([]);

  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ApiService.getFaqs();
      if (data) {
        const splits = splitArray(data);
        setLeftFaq(splits[0]);
        setRigthFaq(splits[1]);
      }
    };
    fetchData();
  }, [setRigthFaq, setLeftFaq]);

  const toggleCollapse = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="py-100px">
      <div className="full-width mb-2">
        <h1 className="gradient-text mx-auto" dangerouslySetInnerHTML={{ __html: t("faq") }}></h1>
      </div>
      <div className="row my-5">
        <div className="col-12 col-lg-6 px-5">
          {leftFaq.map((faq, index) => (
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
              {index < leftFaq.length - 1 && <hr className="my-4" />}
              {index === leftFaq.length - 1 && <hr className="my-4 d-block d-lg-none" />}
            </React.Fragment>
          ))}
        </div>
        <div className="col-12 col-lg-6 px-5">
          {rigthFaq.map((faq, index) => (
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

              {index < rigthFaq.length - 1 && <hr className="my-4" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
