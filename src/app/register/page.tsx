"use client";

import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, InputGroup, Label, Row } from "reactstrap";
import { useRouter } from "next/navigation";
import ApiService from "@/services/api-service";
import Swal from "sweetalert2";

// import Image from "next/image";

export default function RegisterContent() {
  const { t, i18n } = useTranslation(["register"]);
  const router = useRouter();
  const [provinces, setProvince] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [subDistricts, setSubDistricts] = useState<any[]>([]);
  const [pCode, setPostCode] = useState("");
  const [requests, setRequests] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    mobile: "",
    email: "",
    address: "",
    province: "",
    district: "",
    sub_district: "",
    postcode: "",
    loccode: "",
    rec_amount: "",
    rec_year: "",
    contact_period: "",
    more_detail: "",
    request_id: "",
  });

  const [errors, setErrors] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await ApiService.getProvinces();
      setProvince(resp);

      const respReq = await ApiService.getRequests();
      setRequests(respReq);
    };
    fetchData();
  }, [setProvince, setRequests]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      setSubDistricts(resp);
    } else {
      setSubDistricts([]);
    }
    setPostCode("");
  };

  const subDistrictChanged = async (subDistrictCode: string) => {
    const p = subDistricts.find((s) => s.sub_district_code === subDistrictCode)!.post_code;
    setPostCode(p);
  };

  const validate = (): boolean => {
    const invalid = {
      name: false,
      surname: false,
      mobile: false,
      email: false,
      address: false,
      province: false,
      district: false,
      sub_district: false,
      rec_amount: false,
      rec_year: false,
      contact_period: false,
      request_id: false,
    };
    Object.keys(invalid).forEach((k) => {
      invalid[k as keyof typeof invalid] = formData[k as keyof typeof formData].length === 0;
    });

    const res = Object.values(invalid).every((e) => e === false);
    setErrors(!res);
    return res;
  };

  const submit = async () => {
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

    try {
      const req = {
        name: formData.name,
        surname: formData.surname,
        mobile: formData.mobile,
        email: formData.email,

        address: formData.address,
        province: provinces.find((p) => p.province_code === formData.province)!.province_name[i18n.language],
        district: districts.find((d) => d.district_code === formData.district)!.district_name[i18n.language],
        sub_district: subDistricts.find((s) => s.sub_district_code === formData.sub_district)!.sub_district_name[i18n.language],
        postcode: pCode,

        request_id: parseInt(formData.request_id),
        rec_amount: parseFloat(formData.rec_amount),
        rec_year: parseInt(formData.rec_year),

        is_request_power_source_solar: false,
        is_request_power_source_hydro: false,
        is_request_power_source_bio: false,
        is_request_power_source_wind: false,

        is_contact_period_morning: formData.contact_period === "1",
        is_contact_period_afternoon: formData.contact_period === "2",

        more_detail: formData.more_detail,

        loccode: subDistricts.find((s) => s.sub_district_code === formData.sub_district)!.sub_district_code,
      };

      await ApiService.register(req);
      const result = await Swal.fire({
        icon: "success",
        title: t("T_38"),
        text: t("T_39"),
        allowOutsideClick: false,
        confirmButtonText: t("T_34"),
        customClass: {
          confirmButton: "bg-primary-gradient btn btn-primary px-5 me-2",
        },
        buttonsStyling: false,
      });

      if (result.isConfirmed) {
        const form = { ...formData };
        Object.keys(form).forEach((k: string) => {
          form[k as keyof typeof form] = "";
        });
        setFormData(form);
        setPostCode("");
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

  return (
    <>
      <div className="background-register">
        <div className={`container py-5`}>
          <div className={`row my-5`}>
            <div className={`col-12`}>
              <p className="text-header-eng text-center">Register</p>
              <h1 className="text-header-big">{t("H_1")}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={`container py-5 max-width-1140`}>
        <div className="row">
          <Container>
            <Form>
              <Row>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="name">
                      {t("D_1_1")} *
                    </Label>
                    <Input id="name" value={formData.name} name="name" onChange={handleChange} placeholder={t("D_7_1")} type="text" autoComplete="off" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="surname">
                      {t("D_1_2")} *
                    </Label>
                    <Input id="surname" value={formData.surname} name="surname" onChange={handleChange} placeholder={t("D_7_1")} type="text" autoComplete="off" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="phoneNo">
                      {t("D_1_3")} *
                    </Label>
                    <Input id="mobile" value={formData.mobile} name="mobile" onChange={handleChange} placeholder={t("D_7_1")} type="text" autoComplete="off" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="email">
                      {t("D_1_4")} *
                    </Label>
                    <Input id="email" value={formData.email} name="email" onChange={handleChange} placeholder={t("D_7_1")} type="email" autoComplete="off" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-12  mt-3 d-flex align-items-center`}>
                  <div className="left-item"></div>
                  <h5 className="text-black warp-content ms-3">{t("H_2")}</h5>
                </Col>
                <Col className={`col-12 mt-3`}>
                  <FormGroup>
                    <Label className="text-black" for="address">
                      {t("D_2_1")} *
                    </Label>
                    <Input id="address" value={formData.address} name="address" onChange={handleChange} placeholder={t("D_7_1")} autoComplete="off" type="text" maxLength={500} />
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="province">
                      {t("D_2_2")} *
                    </Label>
                    <Input
                      id="province"
                      value={formData.province}
                      name="province"
                      onChange={(e: any) => {
                        handleChange(e);
                        provinceChanged(e.target.value);
                      }}
                      type="select"
                    >
                      <option value={``}>{t("H_10")}</option>
                      {provinces.map((p: any) => {
                        return <option value={p.province_code}>{p.province_name[i18n.language]}</option>;
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="district">
                      {t("D_2_3")} *
                    </Label>
                    <Input
                      id="district"
                      value={formData.district}
                      name="district"
                      onChange={(e: any) => {
                        handleChange(e);
                        districtChanged(e.target.value);
                      }}
                      type="select"
                    >
                      <option value={``}>{t("H_10")}</option>
                      {districts.map((d: any) => {
                        return <option value={d.district_code}>{d.district_name[i18n.language]}</option>;
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="sub_district">
                      {t("D_2_4")} *
                    </Label>
                    <Input
                      id="sub_district"
                      value={formData.sub_district}
                      name="sub_district"
                      onChange={(e: any) => {
                        handleChange(e);
                        subDistrictChanged(e.target.value);
                      }}
                      type="select"
                    >
                      <option value={``}>{t("H_10")}</option>
                      {subDistricts.map((s: any) => {
                        return <option value={s.sub_district_code}>{s.sub_district_name[i18n.language]}</option>;
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup>
                    <Label className="text-black" for="postcode">
                      {t("D_2_5")} *
                    </Label>
                    <Input readOnly value={pCode} placeholder={t("D_7_1")} type="text" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-12  mt-3 d-flex align-items-center`}>
                  <div className="left-item"></div>
                  <h5 className="text-black warp-content ms-3">{t("H_3")}</h5>
                </Col>
                <Col className={`col-12 col-lg-6 mt-3`}>
                  <FormGroup>
                    <Label className="text-black" for="request_id">
                      {t("H_4")} *
                    </Label>
                    <Input id="request_id" value={formData.request_id} name="request_id" onChange={handleChange} type="select">
                      <option value={``}>{t("H_10")}</option>
                      {requests.map((r: any) => {
                        return <option value={r.request_id}>{r.text[i18n.language]}</option>;
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col className={`col-12  mt-3 d-flex align-items-center`}>
                  <div className="left-item"></div>
                  <h5 className="text-black warp-content ms-3">{t("H_5")}</h5>
                </Col>
                <Col className={`col-12 col-lg-6 mt-3`}>
                  <FormGroup>
                    <Label className="text-black" for="rec_amount">
                      {t("D_5_1")} *
                    </Label>
                    <Input id="rec_amount" value={formData.rec_amount} name="rec_amount" onChange={handleChange} placeholder={t("D_7_1")} type="number" maxLength={255} />
                    <small className="text-muted">{t(`H_11`)}</small>
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6 mt-3`}>
                  <FormGroup>
                    <Label className="text-black" for="rec_year">
                      {t("D_5_2")} *
                    </Label>
                    <Input id="rec_year" value={formData.rec_year} name="rec_year" onChange={handleChange} placeholder={t("D_7_1")} type="number" maxLength={255} />
                    <small className="text-muted">{t(`H_12`)}</small>
                  </FormGroup>
                </Col>
                <Col className={`col-12  mt-3 d-flex align-items-center`}>
                  <div className="left-item"></div>
                  <h5 className="text-black warp-content ms-3">{t("H_6")}</h5>
                </Col>
                <Col className={`col-12 col-lg-6 mt-3`}>
                  <Label className="text-black">{t("D_6_1")}</Label>
                  <FormGroup check>
                    <Input type="radio" id="contact_period1" name="contact_period" value="1" checked={formData.contact_period === "1"} onChange={handleChange} />
                    <Label className="text-muted" for="contact_period1" check>
                      {t("D_6_2")}
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input type="radio" id="contact_period2" name="contact_period" value="2" checked={formData.contact_period === "2"} onChange={handleChange} />
                    <Label className="text-muted" for="contact_period2" check>
                      {t("D_6_3")}
                    </Label>
                  </FormGroup>
                </Col>
                <Col className={`col-12 mt-5`}>
                  <FormGroup>
                    <Label className="text-black" for="more_detail">
                      {t("H_7")}
                    </Label>
                    <Input id="more_detail" value={formData.more_detail} name="more_detail" onChange={handleChange} placeholder={t("D_7_1")} type="textarea" maxLength={255} rows={5} />
                  </FormGroup>
                </Col>
                <Col className={`col-12 mt-3`}>
                  <Button outline color="primary" style={{ width: 140, height: 40 }} onClick={() => router.back()}>
                    {t("H_8")}
                  </Button>
                  <Button
                    type="button"
                    color="primary"
                    className="bg-primary-gradient ms-3"
                    style={{ width: 140, height: 40 }}
                    onClick={() => {
                      submit();
                    }}
                  >
                    {t("H_9")}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
}
