"use client";

import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";
import PdfViewerModal, { PdfViewerModalRef } from "./PdfViewerModal";
import { useRef } from "react";

interface UploadItemProps {
  fileName: string;
  fileSize: string;
  fileUrl: string;
  onDeleteFile?: () => void;
}

export default function UploadItem({ fileName, fileSize, fileUrl, onDeleteFile }: UploadItemProps) {
  const { t } = useTranslation(["register-company"]);

  const modalRef = useRef<PdfViewerModalRef>(null);

  const handleDownload = async () => {
    const url = fileUrl;

    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors", // สำคัญมากสำหรับ cross-origin
      });

      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // console.error("Download error:", error);
    }
  };

  return (
    <div className={`card card-custom d-flex flex-column align-items-center p-3 mb-3 radius-8 no-shadow`} style={{ borderColor: "var(--bs-border-color)" }}>
      <div className="d-flex w-100">
        <div className="me-3 flex-shrink-0">
          <div className="circle-doc d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
            <i style={{ lineHeight: "0" }} className="bi bi-file-earmark-pdf-fill"></i>
          </div>
        </div>
        <div className="me-2 flex-grow-1 d-flex align-items-center">
          <strong>{fileName}</strong>
          {/* <br /> */}
          {/* <small className="text-muted">{fileSize}</small> */}
        </div>
        <div className="me-2 flex-shrink-0">
          <Button
            color="link"
            className="button-content no-border text-black"
            onClick={() => {
              modalRef.current?.viewFile(fileUrl, fileName);
            }}
          >
            <i className="bi bi-eye"></i>
          </Button>
        </div>
        <div className="me-2 flex-shrink-0">
          <Button color="link" className="button-content no-border text-black" onClick={handleDownload}>
            <i className="bi bi-download"></i>
          </Button>
        </div>

        {onDeleteFile && (
          <div className="flex-shrink-0">
            <Button
              color="link"
              className="button-content no-border text-black"
              onClick={() => {
                onDeleteFile();
              }}
            >
              <i className="bi bi-trash3"></i>
            </Button>
          </div>
        )}
      </div>
      <PdfViewerModal ref={modalRef} />
    </div>
  );
}
