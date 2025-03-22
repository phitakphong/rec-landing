"use client";

import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import ApiService from "@/services/api-service";
import Swal from "sweetalert2";

type UploadBoxProps = {
  onUploadComplete?: (uploadedFiles: any[]) => void;
};

export default function UploadBox({ onUploadComplete }: UploadBoxProps) {
  const { t } = useTranslation(["register-company"]);

  const onDrop = async (acceptedFiles: File[]) => {
    Swal.fire({
      title: t("T_37"),
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const files: any[] = [];
    for (const file of acceptedFiles) {
      const result = await ApiService.uploadFile(file);
      files.push({
        file_name: result.file_name,
        file_url: result.file_url,
      });
    }
    if (onUploadComplete) {
      onUploadComplete(files);
    }

    setTimeout(() => {
      Swal.close();
    }, 1000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx("card card-custom d-flex flex-column align-items-center p-3 radius-8 no-shadow pointer", {
        "bg-light border border-primary": isDragActive,
        border: !isDragActive,
      })}
      style={{
        transition: "0.3s ease",
        border: "2px dashed",
        borderColor: isDragActive ? "var(--bs-primary)" : "var(--bs-border-color)",
      }}
    >
      <input {...getInputProps()} />
      <div className="circle-doc d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
        <i style={{ fontSize: "x-large", lineHeight: "0" }} className="bi bi-cloud-upload"></i>
      </div>
      <label className="mt-3 pointer" dangerouslySetInnerHTML={{ __html: t("T_30") }}></label>
      <small className="mt-1 text-muted">{isDragActive ? t("T_35") : t("T_31")}</small>
    </div>
  );
}
