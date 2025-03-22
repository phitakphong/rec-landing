"use client";

import { useEffect, useState } from "react";
import RegisterCompanyContent from "../RegisterCompanyContent";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import ApiService from "@/services/api-service";
import { useRouter } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ManageRegisterCompanyContent({ params }: PageProps) {
  const { t } = useTranslation(["register-company"]);
  const [data, setData] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        Swal.fire({
          title: t("T_44"),
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const resolvedParams = await params;
        const resp = await ApiService.getCooperation(resolvedParams.id);

        setData(resp);

        setTimeout(() => {
          Swal.close();
        }, 1000);
      } catch (err) {
        Swal.fire({
          icon: "error",
          confirmButtonText: t("T_34"),
          buttonsStyling: false,
          allowOutsideClick: false,
          customClass: {
            confirmButton: "bg-primary-gradient btn btn-primary px-5",
          },
          text: t("T_42"),
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/home");
          }
        });
      }
    };
    fetchData();
  }, [params]);

  return <>{data && <RegisterCompanyContent id={id} data={data}></RegisterCompanyContent>}</>;
}
