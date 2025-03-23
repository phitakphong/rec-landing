"use client";

import Image from "next/image";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ApiService from "@/services/api-service";

export default function Partner() {
  const { t } = useTranslation(["common"]);

  const [partners, setPartners] = useState<any[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await ApiService.getPartners();
      const chunkedData = [];
      for (let i = 0; i < resp.length; i += 5) {
        chunkedData.push(resp.slice(i, i + 5));
      }
      setPartners(chunkedData);
    };
    fetchData();
  }, []);

  return (
    <div className="py-72px">
      <div className="full-width mb-5">
        <h1 className="gradient-text mx-auto" dangerouslySetInnerHTML={{ __html: t("partner") }}></h1>
      </div>
      {partners.map((row, rowIndex) => (
        <div key={rowIndex} className="d-flex flex-wrap justify-content-center gap-5 ">
          {row.map((partner) => (
            <Image key={partner.partner_uid} src={partner.image_url} alt={`Partner ${partner.partner_name}`} width={120} height={60} />
          ))}
        </div>
      ))}
    </div>
  );
}
