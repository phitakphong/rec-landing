"use client";

import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import { useRouter } from "next/navigation";
import ApiService from "@/services/api-service";
import UploadBox from "@/components/uploads/UploadBox";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import UploadItem from "@/components/uploads/UploadBoxItem";
import PdfViewerModal, { PdfViewerModalRef } from "@/components/uploads/PdfViewerModal";
import Swal from "sweetalert2";
// import Image from "next/image";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface Props {
  data: any | null;
  id: string | null;
}

export default function RegisterCompanyContent({ data }: Props) {
  const { t, i18n } = useTranslation(["register-company"]);
  const router = useRouter();
  const [provinces, setProvince] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [subDistricts, setSubDistricts] = useState<any[]>([]);
  const [pCode, setPostCode] = useState("");
  const [id, setId] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [invalid, setInvalid] = useState<any>(null);
  const [position, setPosition] = useState({
    lat: 13.850821,
    lng: 100.558112,
  });

  const [markerPosition, setMarkerPosition] = useState<any>({
    lat: 13.850821,
    lng: 100.558112,
  });

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setMarkerPosition({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  const modalRef = useRef<PdfViewerModalRef>(null);

  const [formData, setFormData] = useState<any>({
    cooperate_card_id: "",
    cooperate_card_type: "",
    cooperate_company_address: "",
    cooperate_company_branch: "",
    cooperate_company_ca: "",
    cooperate_company_district: "",
    cooperate_company_id: "",
    cooperate_company_loccode: "",
    cooperate_company_name: "",
    cooperate_company_postcode: "",
    cooperate_company_province: "",
    cooperate_company_subdistrict: "",
    cooperate_email: "",
    cooperate_latitude: "",
    cooperate_longitude: "",
    cooperate_name: "",
    cooperate_phone: "",
    cooperate_surname: "",

    cooperate_receive_document: [] as any[],
    cooperate_delegate_document: [] as any[],
    cooperate_document: [] as any[],
  });

  useEffect(() => {
    if (data) {
      const getData = async () => {
        const [provinces, districts, subDistricts] = await Promise.all([
          ApiService.getProvinces(),
          ApiService.getDistricts(data.cooperate_company_province),
          ApiService.getSubDistricts(data.cooperate_company_district),
        ]);

        setProvince(provinces);
        setDistricts(districts);
        setSubDistricts(subDistricts);
        setPostCode(data.cooperate_company_postcode);
        setCooperateDocuments(data.cooperate_document);
        setCooperateReceiveDocument(data.cooperate_receive_document);
        setCooperateDelegateDocument(data.cooperate_delegate_document);
        setMarkerPosition({
          lat: data.cooperate_latitude,
          lng: data.cooperate_longitude,
        });

        position.lat = data.cooperate_latitude;
        position.lng = data.cooperate_longitude;
        setFormData(data);
      };
      getData();
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await ApiService.getProvinces();
      setProvince(resp);
    };
    fetchData();
  }, [setProvince]);

  useEffect(() => {
    if (hasInteracted) {
      validate();
    }
  }, [formData, hasInteracted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newVal = value;
    if (name === "cooperate_phone") {
      newVal = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "cooperate_company_id") {
      newVal = value.replace(/\D/g, "").slice(0, 13);
    } else if (name === "cooperate_card_id" && formData.cooperate_card_type == 1) {
      newVal = value.replace(/\D/g, "").slice(0, 13);
    } else if (name === "cooperate_company_province") {
      setFormData((prev: any) => ({
        ...prev,
        [name]: newVal,
        cooperate_company_district: "",
        cooperate_company_subdistrict: "",
      }));
      return;
    } else if (name === "cooperate_company_district") {
      setFormData((prev: any) => ({
        ...prev,
        [name]: newVal,
        cooperate_company_subdistrict: "",
      }));
      return;
    }
    setFormData((prev: any) => ({
      ...prev,
      [name]: newVal,
    }));
  };

  const provinceChanged = async (provinceCode: string) => {
    if (provinceCode.length) {
      const resp = await ApiService.getDistricts(provinceCode);
      setDistricts(resp);
    } else {
      setDistricts([]);
    }
    setSubDistricts([]);
    setPostCode("");
  };

  const districtChanged = async (districtCode: string) => {
    if (districtCode.length) {
      const resp = await ApiService.getSubDistricts(districtCode);
      // console.log(resp);
      setSubDistricts(resp);
    } else {
      setSubDistricts([]);
    }
    setPostCode("");
  };

  const subDistrictChanged = async (subDistrictCode: string) => {
    const p = subDistricts.find((s) => s.sub_district_code === subDistrictCode)?.post_code;
    setPostCode(p || "");
  };

  const validate = (): boolean => {
    const invalid = {
      cooperate_card_id: false,
      cooperate_card_type: false,
      cooperate_company_address: false,
      cooperate_company_branch: false,
      cooperate_company_ca: false,
      cooperate_company_district: false,
      cooperate_company_id: false,
      cooperate_company_name: false,
      cooperate_company_province: false,
      cooperate_company_subdistrict: false,
      cooperate_delegate_document: false,
      cooperate_document: false,
      cooperate_email: false,
      cooperate_latitude: false,
      cooperate_longitude: false,
      cooperate_name: false,
      cooperate_phone: false,
      cooperate_receive_document: false,
      cooperate_surname: false,
    };

    if (markerPosition) {
      formData.cooperate_latitude = markerPosition.lat.toString();
      formData.cooperate_longitude = markerPosition.lng.toString();
    }

    formData.cooperate_receive_document = cooperateReceiveDocument;
    formData.cooperate_delegate_document = cooperateDelegateDocument;
    formData.cooperate_document = cooperateDocuments;

    Object.keys(invalid).forEach((k) => {
      if (k === "cooperate_phone") {
        invalid.cooperate_phone = formData.cooperate_phone.length !== 10;
      } else if (k === "cooperate_company_id") {
        invalid.cooperate_company_id = formData.cooperate_company_id.length !== 13;
      } else if (k === "cooperate_card_id" && formData.cooperate_card_type == 1) {
        invalid.cooperate_card_id = formData.cooperate_card_id.length !== 13;
      } else if (k === "cooperate_email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        invalid.cooperate_email = !emailRegex.test(formData.cooperate_email);
      } else {
        invalid[k as keyof typeof invalid] = formData[k as keyof typeof formData].length === 0;
      }
    });

    const res = Object.values(invalid).every((e) => e === false);
    setInvalid(invalid);
    return res;
  };

  const submit = async () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    const valid = validate();

    if (!valid) {
      Swal.fire({
        icon: "error",
        confirmButtonText: t("T_34"),
        buttonsStyling: false,
        allowOutsideClick: false,
        customClass: {
          confirmButton: "bg-primary-gradient btn btn-primary px-5",
        },
        text: t("T_33"),
      });
      return;
    }

    const req: any = {
      cooperate_card_id: "",
      cooperate_card_type: "",
      cooperate_company_address: "",
      cooperate_company_branch: "",
      cooperate_company_ca: "",
      cooperate_company_district: "",
      cooperate_company_id: "",
      cooperate_company_loccode: "",
      cooperate_company_name: "",
      cooperate_company_postcode: "",
      cooperate_company_province: "",
      cooperate_company_subdistrict: "",
      cooperate_delegate_document: [],
      cooperate_document: [],
      cooperate_email: "",
      cooperate_latitude: 0,
      cooperate_longitude: 0,
      cooperate_name: "",
      cooperate_phone: "",
      cooperate_receive_document: [],
      cooperate_surname: "",
    };

    Object.keys(formData).forEach((f) => {
      const key = f as keyof typeof formData;
      req[f as keyof typeof req] = formData[key] as any;
    });

    req.cooperate_company_loccode = req.cooperate_company_subdistrict;
    req.cooperate_company_postcode = pCode;

    req.cooperate_latitude = parseFloat(req.cooperate_latitude);
    req.cooperate_longitude = parseFloat(req.cooperate_longitude);

    try {
      const data = await ApiService.createOrUpdateCooperation(req, id);
      const result = await Swal.fire({
        icon: "success",
        title: t("T_38"),
        text: t("T_39"),
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: t("T_40"),
        cancelButtonText: t("T_41"),
        customClass: {
          confirmButton: "bg-primary-gradient btn btn-primary px-5 me-2",
          cancelButton: "bg-primary-gradient btn btn-primary px-5",
        },
        buttonsStyling: false,
      });

      if (result.isConfirmed) {
        router.push("/register-company/info/" + data.data.cooperation_uid);
      } else if (result.isDismissed) {
        router.push("/home");
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        confirmButtonText: t("T_34"),
        buttonsStyling: false,
        allowOutsideClick: false,
        customClass: {
          confirmButton: "bg-primary-gradient btn btn-primary px-5",
        },
        text: t("T_42"),
      });
    }
  };

  const [cooperateDocuments, setCooperateDocuments] = useState<any[]>([]);

  const handleUploadCooperateDocumentComplete = (uploadedFiles: any[]) => {
    const updatedDocs = [...cooperateDocuments, ...uploadedFiles];
    setCooperateDocuments(updatedDocs);
  };
  const handleUploadCooperateDocumentDelete = (index: number) => {
    const updatedDocs = [...cooperateDocuments.slice(0, index), ...cooperateDocuments.slice(index + 1)];
    setCooperateDocuments(updatedDocs);
  };

  const [cooperateReceiveDocument, setCooperateReceiveDocument] = useState<any[]>([]);

  const handleUploadCooperateReceiveDocumentComplete = (uploadedFiles: any[]) => {
    const updatedDocs = [...cooperateReceiveDocument, ...uploadedFiles];
    setCooperateReceiveDocument(updatedDocs);
  };
  const handleUploadCooperateReceiveDocumenttDelete = (index: number) => {
    const updatedDocs = [...cooperateReceiveDocument.slice(0, index), ...cooperateReceiveDocument.slice(index + 1)];
    setCooperateReceiveDocument(updatedDocs);
  };

  const [cooperateDelegateDocument, setCooperateDelegateDocument] = useState<any[]>([]);

  const handleUploadCooperateDelegateDocumentComplete = (uploadedFiles: any[]) => {
    const updatedDocs = [...cooperateDelegateDocument, ...uploadedFiles];
    setCooperateDelegateDocument(updatedDocs);
  };
  const handleUploadCooperateDelegateDocumentDelete = (index: number) => {
    const updatedDocs = [...cooperateDelegateDocument.slice(0, index), ...cooperateDelegateDocument.slice(index + 1)];
    setCooperateDelegateDocument(updatedDocs);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ lat: latitude, lng: longitude });
          setMarkerPosition({ lat: latitude, lng: longitude });
        },
        () => {
          Swal.fire({
            icon: "error",
            confirmButtonText: t("T_34"),
            buttonsStyling: false,
            allowOutsideClick: false,
            customClass: {
              confirmButton: "bg-primary-gradient btn btn-primary px-5",
            },
            text: t("T_46"),
          });
        }
      );
    } else {
      Swal.fire({
        icon: "error",
        confirmButtonText: t("T_34"),
        buttonsStyling: false,
        allowOutsideClick: false,
        customClass: {
          confirmButton: "bg-primary-gradient btn btn-primary px-5",
        },
        text: t("T_45"),
      });
    }
  };

  const mapRef = useRef<GoogleMap | null>(null);

  const initMap = (map: any) => {
    console.log(map);
    if (map) {
      const button = document.createElement("button");
      button.type = "button";
      button.style.backgroundColor = "#fff";
      button.style.border = "1px solid #ccc";
      button.style.padding = "10px";
      button.style.cursor = "pointer";
      button.style.position = "absolute";
      button.style.width = "40px";
      button.style.height = "40px";
      button.style.marginRight = "8px";
      button.style.marginTop = "8px";
      button.style.zIndex = "1000";
      button.style.borderRadius = "4px";

      const icon = document.createElement("i");
      icon.className = "bi bi-crosshair";
      icon.style.fontSize = "18px";
      button.appendChild(icon);

      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(button);

      button.addEventListener("click", handleGetCurrentLocation);
      handleGetCurrentLocation();
    }
  };

  return (
    <>
      <div className="background-register-company">
        <div className={`container py-5`}>
          <div className={`row my-5`}>
            <div className={`col-12`}>
              <h1 className="text-header-big">{t("T_01")}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={`container py-5 max-width-1140`}>
        <div className="row">
          <Container>
            <Form>
              <Row>
                <Col className={`col-12  mb-3 d-flex align-items-center`}>
                  <div className="left-item"></div>
                  <h5 className="text-black warp-content ms-3">{t("T_28")}</h5>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_name">
                      {t("T_02")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_name ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-person"></i>
                      </InputGroupText>
                      <Input id="cooperate_name" name="cooperate_name" value={formData.cooperate_name} type="text" autoComplete="off" maxLength={255} onChange={handleChange} placeholder={t("T_29")} />
                    </InputGroup>
                    {invalid?.cooperate_name && <small className="text-red">{t("T_48")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_surname">
                      {t("T_03")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_surname ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-person"></i>
                      </InputGroupText>
                      <Input
                        id="cooperate_surname"
                        name="cooperate_surname"
                        value={formData.cooperate_surname}
                        type="text"
                        autoComplete="off"
                        maxLength={255}
                        onChange={handleChange}
                        placeholder={t("T_29")}
                      />
                    </InputGroup>
                    {invalid?.cooperate_surname && <small className="text-red">{t("T_48")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_card_type">
                      {t("T_04")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_card_type ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-credit-card"></i>
                      </InputGroupText>
                      <Input id="cooperate_card_type" name="cooperate_card_type" value={formData.cooperate_card_type} onChange={handleChange} type="select">
                        <option value={``}>{t("T_29")}</option>
                        <option value={`1`}>{t("T_05")}</option>
                        <option value={`2`}>{t("T_06")}</option>
                      </Input>
                    </InputGroup>

                    {invalid?.cooperate_card_type && <small className="text-red">{t("T_48")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_card_id">
                      {t("T_07")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_card_id ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-credit-card"></i>
                      </InputGroupText>
                      <Input
                        id="cooperate_card_id"
                        name="cooperate_card_id"
                        value={formData.cooperate_card_id}
                        type="text"
                        autoComplete="off"
                        maxLength={255}
                        onChange={handleChange}
                        placeholder={t("T_29")}
                      />
                    </InputGroup>
                    {invalid?.cooperate_card_id && <small className="text-red">{t("T_48")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_phone">
                      {t("T_08")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_phone ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-phone"></i>
                      </InputGroupText>
                      <Input
                        id="cooperate_phone"
                        name="cooperate_phone"
                        value={formData.cooperate_phone}
                        type="text"
                        autoComplete="off"
                        maxLength={255}
                        onChange={handleChange}
                        placeholder={t("T_29")}
                      />
                    </InputGroup>
                    {invalid?.cooperate_phone && <small className="text-red">{t("T_50")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_email">
                      {t("T_09")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_email ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-envelope"></i>
                      </InputGroupText>
                      <Input
                        id="cooperate_email"
                        name="cooperate_email"
                        value={formData.cooperate_email}
                        type="text"
                        autoComplete="off"
                        maxLength={255}
                        onChange={handleChange}
                        placeholder={t("T_29")}
                      />
                    </InputGroup>
                    {invalid?.cooperate_email && formData.cooperate_email.length === 0 && <small className="text-red">{t("T_48")}</small>}
                    {invalid?.cooperate_email && formData.cooperate_email.length > 0 && <small className="text-red">{t("T_51")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12  my-3 d-flex align-items-center`}>
                  <div className="left-item"></div>
                  <h5 className="text-black warp-content ms-3">{t("T_10")}</h5>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_company_name">
                      {t("T_11")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_company_name ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-person"></i>
                      </InputGroupText>
                      <Input
                        id="cooperate_company_name"
                        name="cooperate_company_name"
                        value={formData.cooperate_company_name}
                        type="text"
                        autoComplete="off"
                        maxLength={255}
                        onChange={handleChange}
                        placeholder={t("T_29")}
                      />
                    </InputGroup>
                    {invalid?.cooperate_company_name && <small className="text-red">{t("T_48")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_company_ca">
                      {t("T_12")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_company_ca ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-credit-card"></i>
                      </InputGroupText>
                      <Input
                        id="cooperate_company_ca"
                        name="cooperate_company_ca"
                        value={formData.cooperate_company_ca}
                        type="text"
                        autoComplete="off"
                        maxLength={255}
                        onChange={handleChange}
                        placeholder={t("T_29")}
                      />
                    </InputGroup>
                    {invalid?.cooperate_company_ca && <small className="text-red">{t("T_48")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_company_id">
                      {t("T_13")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_company_id ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-credit-card"></i>
                      </InputGroupText>
                      <Input
                        id="cooperate_company_id"
                        name="cooperate_company_id"
                        value={formData.cooperate_company_id}
                        type="text"
                        autoComplete="off"
                        maxLength={255}
                        onChange={handleChange}
                        placeholder={t("T_29")}
                      />
                    </InputGroup>
                    {invalid?.cooperate_company_id && <small className="text-red">{t("T_48")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_company_branch">
                      {t("T_14")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_company_branch ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-credit-card"></i>
                      </InputGroupText>
                      <Input
                        id="cooperate_company_branch"
                        name="cooperate_company_branch"
                        value={formData.cooperate_company_branch}
                        type="text"
                        autoComplete="off"
                        maxLength={255}
                        onChange={handleChange}
                        placeholder={t("T_29")}
                      />
                    </InputGroup>
                    {invalid?.cooperate_company_branch && <small className="text-red">{t("T_48")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12`}>
                  <hr />
                </Col>
                <Col className={`col-12  my-3 d-flex align-items-center`}>
                  <h6 className="text-black warp-content">{t("T_15")}</h6>
                </Col>
                <Col className={`col-12`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_company_address">
                      {t("T_16")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_company_address ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-buildings"></i>
                      </InputGroupText>
                      <Input
                        id="cooperate_company_address"
                        name="cooperate_company_address"
                        value={formData.cooperate_company_address}
                        type="text"
                        autoComplete="off"
                        maxLength={255}
                        onChange={handleChange}
                        placeholder={t("T_29")}
                      />
                    </InputGroup>
                    {invalid?.cooperate_company_address && <small className="text-red">{t("T_48")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_company_province">
                      {t("T_18")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_company_province ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-buildings"></i>
                      </InputGroupText>
                      <Input
                        id="cooperate_company_province"
                        value={formData.cooperate_company_province}
                        name="cooperate_company_province"
                        onChange={(e: any) => {
                          handleChange(e);
                          provinceChanged(e.target.value);
                        }}
                        type="select"
                      >
                        <option value={``}>{t("T_29")}</option>
                        {provinces.map((p: any, i) => {
                          return (
                            <option key={i} value={p.province_code}>
                              {p.province_name[i18n.language]}
                            </option>
                          );
                        })}
                      </Input>
                    </InputGroup>
                    {invalid?.cooperate_company_province && <small className="text-red">{t("T_48")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_company_district">
                      {t("T_19")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_company_district ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-buildings"></i>
                      </InputGroupText>
                      <Input
                        id="cooperate_company_district"
                        value={formData.cooperate_company_district}
                        name="cooperate_company_district"
                        onChange={(e: any) => {
                          handleChange(e);
                          districtChanged(e.target.value);
                        }}
                        type="select"
                      >
                        <option value={``}>{t("T_29")}</option>
                        {districts.map((d: any, i) => {
                          return (
                            <option key={i} value={d.district_code}>
                              {d.district_name[i18n.language]}
                            </option>
                          );
                        })}
                      </Input>
                    </InputGroup>
                    {invalid?.cooperate_company_district && <small className="text-red">{t("T_48")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="cooperate_company_subdistrict">
                      {t("T_20")}
                    </Label>
                    <InputGroup className={`input-group ${invalid?.cooperate_company_subdistrict ? "border-red" : ""}`}>
                      <InputGroupText>
                        <i className="bi bi-buildings"></i>
                      </InputGroupText>
                      <Input
                        id="cooperate_company_subdistrict"
                        value={formData.cooperate_company_subdistrict}
                        name="cooperate_company_subdistrict"
                        onChange={(e: any) => {
                          handleChange(e);
                          subDistrictChanged(e.target.value);
                        }}
                        type="select"
                      >
                        <option value={``}>{t("T_29")}</option>
                        {subDistricts.map((s: any, i) => {
                          return (
                            <option key={i} value={s.sub_district_code}>
                              {s.sub_district_name[i18n.language]}
                            </option>
                          );
                        })}
                      </Input>
                    </InputGroup>
                    {invalid?.cooperate_company_subdistrict && <small className="text-red">{t("T_48")}</small>}
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="pCode">
                      {t("T_17")}
                    </Label>
                    <InputGroup>
                      <InputGroupText>
                        <i className="bi bi-buildings"></i>
                      </InputGroupText>
                      <Input readOnly value={pCode} placeholder={t("T_29")} type="text" maxLength={255} />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col className={`col-12  mt-3 d-flex align-items-center`}>
                  <div className="left-item"></div>
                  <h5 className="text-black warp-content ms-3">{t("T_21")}</h5>
                </Col>
                <Col className={`col-12 mt-3`}>
                  <Label className="text-black">{t("T_22")}</Label>
                  {cooperateDocuments.map((s: any, i: number) => {
                    return (
                      <UploadItem
                        key={`${i}`}
                        fileName={s.file_name}
                        fileSize={""}
                        fileUrl={s.file_url}
                        onDeleteFile={() => {
                          handleUploadCooperateDocumentDelete(i);
                        }}
                      />
                    );
                  })}
                  <UploadBox onUploadComplete={handleUploadCooperateDocumentComplete} />
                  {invalid?.cooperate_receive_document && <small className="text-red">{t("T_49")}</small>}
                  <div className=" mt-3">
                    <span
                      onClick={() => {
                        modalRef.current?.viewFile("/files/Ex.Doc-01.pdf", `${t("T_24")} : ${t("T_22")}`);
                      }}
                      className="text-muted pointer"
                    >
                      {t("T_24")}
                    </span>
                  </div>
                </Col>
                <Col className={`col-12 mt-3`}>
                  <Label className="text-black">{t("T_25")}</Label>
                  {cooperateReceiveDocument.map((s: any, i: number) => {
                    return (
                      <UploadItem
                        key={`${i}`}
                        fileName={s.file_name}
                        fileSize={""}
                        fileUrl={s.file_url}
                        onDeleteFile={() => {
                          handleUploadCooperateReceiveDocumenttDelete(i);
                        }}
                      />
                    );
                  })}
                  <UploadBox onUploadComplete={handleUploadCooperateReceiveDocumentComplete} />
                  {invalid?.cooperate_document && <small className="text-red">{t("T_49")}</small>}
                  <div className=" mt-3">
                    <span
                      onClick={() => {
                        modalRef.current?.viewFile("/files/Ex.Doc-02.pdf", `${t("T_24")} : ${t("T_25")}`);
                      }}
                      className="text-muted pointer"
                    >
                      {t("T_24")}
                    </span>
                  </div>
                </Col>

                <Col className={`col-12 mt-3`}>
                  <Label className="text-black">{t("T_26")}</Label>
                  {cooperateDelegateDocument.map((s: any, i: number) => {
                    return (
                      <UploadItem
                        key={`${i}`}
                        fileName={s.file_name}
                        fileSize={""}
                        fileUrl={s.file_url}
                        onDeleteFile={() => {
                          handleUploadCooperateDelegateDocumentDelete(i);
                        }}
                      />
                    );
                  })}
                  <UploadBox onUploadComplete={handleUploadCooperateDelegateDocumentComplete} />
                  {invalid?.cooperate_delegate_document && <small className="text-red">{t("T_49")}</small>}
                  <div className=" mt-3">
                    <span
                      onClick={() => {
                        modalRef.current?.viewFile("/files/Ex.Doc-03.pdf", `${t("T_24")} : ${t("T_25")}`);
                      }}
                      className="text-muted pointer"
                    >
                      {t("T_24")}
                    </span>
                  </div>
                </Col>
                <Col className={`col-12  mt-5 d-flex align-items-center`}>
                  <div className="left-item"></div>
                  <h5 className="text-black warp-content ms-3">{t("T_27")}</h5>&emsp;<span className="txt-purple">{t("T_47")}</span>
                </Col>
                <Col className={`col-12 mt-3`}>
                  <div style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "2/1" }}>
                    <LoadScript googleMapsApiKey={ApiService.YOUR_GOOGLE_MAPS_API_KEY}>
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={position}
                        zoom={15}
                        onLoad={(map) => {
                          if (!mapRef.current) {
                            mapRef.current = map as any;
                            initMap(map);
                          }
                        }}
                        onClick={handleMapClick}
                        options={{
                          mapTypeControl: false,
                          streetViewControl: false,
                          fullscreenControl: false,
                          zoomControl: true,
                        }}
                      >
                        {markerPosition && <Marker position={markerPosition} />}
                      </GoogleMap>
                    </LoadScript>
                  </div>
                </Col>

                <Col className={`col-12 mt-5`}>
                  <Button
                    type="button"
                    color="primary"
                    className="bg-primary-gradient"
                    style={{ width: 140, height: 40 }}
                    onClick={() => {
                      submit();
                    }}
                  >
                    {t("T_32")}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
      <PdfViewerModal ref={modalRef} />
    </>
  );
}
