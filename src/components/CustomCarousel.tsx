"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import ApiService from "../services/api-service";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CustomCarousel() {
  const { i18n } = useTranslation();

  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await ApiService.getBanners();
      if (data) {
        setBanners(data);
      }
    }
    fetchData();
  }, [setBanners]);

  return (
    <>
      <Carousel autoPlay interval={10000} infiniteLoop showStatus={false} showThumbs={false}>
        {banners.map((item, i) => (
          <div key={`${i}`} style={{ position: "relative", width: "100%", height: "auto" }}>
          <Image
            src={item[`image_url_${i18n.language}`]}
            alt="green2"
            width={0} // ระบุขนาดดั้งเดิมของภาพ
            height={0} // ระบุขนาดดั้งเดิมของภาพ
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            priority
          />
        </div>
        ))}
      </Carousel>
    </>
  );
}
