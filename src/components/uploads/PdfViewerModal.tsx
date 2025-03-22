"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

export type PdfViewerModalRef = {
  viewFile: (url: string, fileName: string) => void;
};

const PdfViewerModal = forwardRef<PdfViewerModalRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [pdfName, setPdfName] = useState<string>("");

  const toggle = () => setIsOpen(!isOpen);

  useImperativeHandle(ref, () => ({
    viewFile: (url: string, fileName: string) => {
      setPdfUrl(url);
      setPdfName(fileName);
      setIsOpen(true);
    },
  }));

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl">
      <ModalHeader toggle={toggle}>{pdfName}</ModalHeader>
      <ModalBody style={{ overflow: "auto", maxHeight: "90vh" }}>{pdfUrl && <iframe id="pdfIframe" src={pdfUrl} width="100%" style={{ border: "none", height: "1150px" }} />}</ModalBody>
    </Modal>
  );
});

PdfViewerModal.displayName = "PdfViewerModal";

export default PdfViewerModal;
