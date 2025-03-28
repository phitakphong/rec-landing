"use client";

import { useTranslation } from "react-i18next";

import styles from "./News.module.css";

import Image from "next/image";
import { Helper } from "@/commons/helper";

export default function NewsWidget(props: any) {
  const { i18n, t } = useTranslation(["news"]);
  const formattedDate = Helper.formatDate(i18n.language, props.news_datetime);

  return (
    <>
      <div className="row mt-4">
        <div className={`${props.size === "small" ? "col-6" : "col-12"}`}>
          <Image src={props.image_url} style={{ borderRadius: "1em" }} layout="responsive" width={1} height={1} alt="ing_news" />
        </div>
        <div className={`${props.size === "small" ? "col-6" : "col-12 mt-3"}`}>
          <strong className="text-news-cat">{props.category}</strong>
          {props.size === "big" ? (
            <h2 className={`mt-2 ${styles.truncate2Lines}`}>{props.topic[i18n.language]}</h2>
          ) : (
            <p className={`mt-2 ${styles.truncate2Lines}`}>
              <strong>{props.topic[i18n.language]}</strong>
            </p>
          )}

          <p className={`${styles.truncate2Lines}`}>{props.context[i18n.language]}</p>
          <div className="d-flex justify-content-between mt-3">
            <p className="mb-0">{formattedDate}</p>
            <a href={`/news/${props.news_uid}`} className="mt-auto">
              <u>
                <strong className="text-purple">{t("H_5")}...</strong>
              </u>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
