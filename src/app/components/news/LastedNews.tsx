"use client";

import { useTranslation } from "react-i18next";

// import styles from "./News.module.css";
import { useEffect, useState } from "react";
import NewsItemWidget from "./NewsItemWidget";
import Image from "next/image";
import ApiService from "@/app/services/api-service";
import Link from "next/link";

export default function LastedNews() {
  const { t } = useTranslation(["news"]);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await ApiService.getNews();
      setData(resp.slice(0, 3));
    };
    fetchData();
  }, []);

  return (
    <div className="background-gray py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 position-relative">
            <h1 className="gradient-text">{t("H_3")}</h1>

            <Link href="/news" className="txt-purple position-absolute top-0 end-0 mt-3">
              {t("H_5")} <Image src="/images/ic_more.png" width={25} height={25} alt="ic_more" />
            </Link>
          </div>
        </div>
        <div className="row">
          {data.map((d) => (
            <NewsItemWidget {...d} key={d.news_uid}></NewsItemWidget>
          ))}
        </div>
      </div>
    </div>
  );
}
