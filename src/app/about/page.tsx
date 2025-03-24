"use client";

import { useTranslation } from "react-i18next";

import React, { useEffect, useState } from "react";
import Partner from "../../components/partner/Partner";
import ApiService from "@/services/api-service";

export default function AboutContent() {
  const { t, i18n } = useTranslation(["about"]);
  const [aboutData, setaboutData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await ApiService.getAbout();
      setaboutData(resp);

    };
    fetchData();
  }, [setaboutData]);

  return (
    <>
      <div className="background-about">
        <div className={`container py-5 max-width-1140`}>
          <div className={`row my-5`}>
            <div className={`col-12`}>
              <p className="text-header-eng text-center">About us</p>
              <h1 className="text-header-big">{t("H_1")}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={`container py-5 max-width-1140`}>
        <div className="row">
          <div className="col-12">

            {aboutData.map((p: any, i: number) => (
              i === 0 ? (
                <div key={`about-context-${i}`}>
                  <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: i18n.language === "th" ? p.context.th : p.context.en }}></p>
                  <div className="mt-5">
                    {p.image_url_3.length > 0 ? (
                      <div className="row">
                        <div className="col-md-4">
                          <img src={p.image_url_1} alt="" className="img-fluid" />
                        </div>
                        <div className="col-md-4">
                          <img src={p.image_url_1} alt="" className="img-fluid" />
                        </div>
                        <div className="col-md-4">
                          <img src={p.image_url_1} alt="" className="img-fluid" />
                        </div>
                      </div>
                    ) : p.image_url_2.length > 0 ? (
                      <div className="row">
                        <div className="col-md-6">
                          <img src={p.image_url_1} alt="" className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                          <img src={p.image_url_2} alt="" className="img-fluid" />
                        </div>
                      </div>
                    ) : p.image_url_1.length > 0 ? (

                      <div className="row">
                        <div className="col-md-12">
                          <img src={p.image_url_1} alt="" className="img-fluid" />
                        </div>
                      </div>

                    ) : null}
                  </div>
                </div>
              ) : (
                <div key={`about-topic-${i}`}>
                  {p.topic.th.length > 0 ? (
                    <>
                      <strong>
                        <p className="text-muted mt-5" dangerouslySetInnerHTML={{ __html: i18n.language === "th" ? p.topic.th : p.topic.en }}></p>
                      </strong>
                    </>
                  ) : null
                  }

                  <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: i18n.language === "th" ? p.context.th : p.context.en }}></p>


                  {p.image_url_3.length > 0 ? (
                    <div className="row">
                      <div className="col-md-4">
                        <img src={p.image_url_1} alt="" className="img-fluid" />
                      </div>
                      <div className="col-md-4">
                        <img src={p.image_url_2} alt="" className="img-fluid" />
                      </div>
                      <div className="col-md-4">
                        <img src={p.image_url_3} alt="" className="img-fluid" />
                      </div>
                    </div>
                  ) : p.image_url_2.length > 0 ? (
                    <div className="row">
                      <div className="col-md-6">
                        <img src={p.image_url_1} alt="" className="img-fluid" />
                      </div>
                      <div className="col-md-6">
                        <img src={p.image_url_2} alt="" className="img-fluid" />
                      </div>
                    </div>
                  ) : p.image_url_1.length > 0 ? (


                    <div className="row">
                      <div className="col-md-12">
                        <img src={p.image_url_1} alt="" className="img-fluid" />
                      </div>
                    </div>

                  ) : null
                  }


                </div>
              )
            ))}
          </div>
        </div>
      </div>

      <div className="container max-width-1140">
        <Partner />
      </div>
    </>
  );
}
