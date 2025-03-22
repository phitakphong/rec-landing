"use client";

import { useTranslation } from "react-i18next";

import Image from "next/image";
import { Helper } from "@/commons/helper";

export default function NewsItemWidget(props: any) {
  const { i18n, t } = useTranslation(["news"]);

  // const formattedDate = Helper.formatDate(i18n.language, date);
  // console.log(props);

  return (
    <div className={`col-12 col-sm-6 col-lg-4 mt-4`}>
      <div className="card card-custom h-100 d-flex flex-column">
        <div style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "16/9" }}>
          <Image src={props.image_url} alt="green2" fill style={{ objectFit: "cover" }} priority />
        </div>
        <div className="p-3 d-flex flex-column flex-grow-1">
          <div>
            {props.category}
            <p className="mt-2 truncate-2-lines">
              <strong>{props.topic[i18n.language]}</strong>
            </p>
            <p className="truncate-2-lines">{props.context[i18n.language]}</p>
            <p>{Helper.formatDate(i18n.language, new Date(props.news_datetime))}</p>
          </div>
          <a href={`/news/${props.news_uid}`} className="mt-auto">
            <u>
              <strong className="text-purple">{t("H_5")}...</strong>
            </u>
          </a>
        </div>
      </div>
    </div>
  );
}
