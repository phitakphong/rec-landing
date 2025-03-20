"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Footer from "@/app/components/footer/Footer";
import LastedNews from "@/app/components/news/LastedNews";
import { useTranslation } from "react-i18next";
import ApiService from "@/app/services/api-service";
import { Helper } from "@/app/commons/helper";
import RootLayout from "../layout";

type PageProps = {
  params: {
    id: string;
  };
};

export default function NewsDetailContent({ params }: PageProps) {
  const { i18n, t } = useTranslation(["news"]);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("params.id:", params.id);
    const fetchData = async () => {
      try {
        const resp = await ApiService.getNewsDetail(params.id);
        setData(resp);
      } catch (err) {
        setError("Failed to load news details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <RootLayout>
      <div className="background-platform">
        <div className="container py-5">
          <div className="row my-5">
            {data && (
              <div className="col-12">
                <p className="text-muted">
                  {data.category} {Helper.formatDate(i18n.language, new Date(data.news_datetime))}
                </p>
                <h1 className="gradient-text">{data.topic[i18n.language]}</h1>
                <div className="row">
                  <div className="col-12 mt-3">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "auto",
                        aspectRatio: "16/9",
                      }}
                    >
                      <Image src={data.image_url} alt="green2" fill style={{ objectFit: "cover", borderRadius: "1em" }} priority />
                    </div>
                    <div className="mt-5 text-muted" dangerouslySetInnerHTML={{ __html: data.context[i18n.language] }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <LastedNews />
        <Footer />
      </div>
    </RootLayout>
  );
}
