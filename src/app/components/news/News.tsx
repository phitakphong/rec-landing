"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

// import styles from "./News.module.css";
import NewsWidget from "./NewsWidget";
import Link from "next/link";
import { useEffect, useState } from "react";
import ApiService from "@/app/services/api-service";

export default function News() {
  const { t, i18n } = useTranslation(["home"]);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await ApiService.getNews();
      setData(resp.slice(0, 4));
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12 position-relative">
          <h1 className="gradient-text">{t("D_5")}</h1>

          <Link href="/news" className="txt-purple position-absolute top-0 end-0 mt-3">
            {t("D_5_1")} <Image src="/images/ic_more.png" width={25} height={25} alt="ic_more" />
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-6">{data.length > 0 && <NewsWidget size="big" {...data[0]} key={data[0].news_uid} />}</div>
        <div className="col-12 col-lg-6">{data.length > 1 && data.slice(1).map((d) => <NewsWidget size="small" {...d} key={d.news_uid} />)}</div>
      </div>
    </>
  );
}
