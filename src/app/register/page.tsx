"use client";

import { useTranslation } from "react-i18next";
import Footer from "../components/footer/Footer";
import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useRouter } from "next/navigation";

// import Image from "next/image";

export default function RegisterContent() {
  const { t } = useTranslation(["register"]);
  const router = useRouter();

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
    request_power: "",
    rec_amount: "",
    rec_year: "",
    contact_period: "",
    more_detail: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    mobile: false,
    email: false,
    address: false,
    province: false,
    district: false,
    sub_district: false,
    postcode: false,
    loccode: false,
    request_power: false,
    rec_amount: false,
    rec_year: false,
    contact_period: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="background-purple">
        <div className={`container py-5`}>
          <div className={`row my-5`}>
            <div className={`col-12`}>
              <h1 className="text-white full-width text-center">{t("H_1")}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={`container py-5`}>
        <div className="row">
          <Container>
            <Form>
              <Row>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup className={errors.name ? "input-group-error" : ""}>
                    <Label className="text-black" for="name">
                      {t("D_1_1")} *
                    </Label>
                    <Input id="name" value={formData.name} name="name" onChange={handleChange} placeholder={t("D_7_1")} type="text" autoComplete="none" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup className={errors.surname ? "input-group-error" : ""}>
                    <Label className="text-black" for="surname">
                      {t("D_1_2")} *
                    </Label>
                    <Input id="surname" value={formData.surname} name="surname" onChange={handleChange} placeholder={t("D_7_1")} type="text" autoComplete="none" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup className={errors.mobile ? "input-group-error" : ""}>
                    <Label className="text-black" for="phoneNo">
                      {t("D_1_3")} *
                    </Label>
                    <Input id="mobile" value={formData.mobile} name="mobile" onChange={handleChange} placeholder={t("D_7_1")} type="text" autoComplete="none" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup className={errors.email ? "input-group-error" : ""}>
                    <Label className="text-black" for="email">
                      {t("D_1_4")} *
                    </Label>
                    <Input id="email" value={formData.email} name="email" onChange={handleChange} placeholder={t("D_7_1")} type="email" autoComplete="none" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-12  mt-3 d-flex align-items-center`}>
                  <div className="left-item"></div>
                  <h5 className="text-black warp-content ms-3">{t("H_2")}</h5>
                </Col>
                <Col className={`col-12 mt-3`}>
                  <FormGroup className={errors.address ? "input-group-error" : ""}>
                    <Label className="text-black" for="address">
                      {t("D_2_1")} *
                    </Label>
                    <Input id="address" value={formData.address} name="address" onChange={handleChange} placeholder={t("D_7_1")} autoComplete="none" type="text" maxLength={500} />
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup className={errors.province ? "input-group-error" : ""}>
                    <Label className="text-black" for="province">
                      {t("D_2_2")} *
                    </Label>
                    <Input id="province" value={formData.province} name="province" onChange={handleChange} type="select">
                      <option>{t("H_10")}</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup className={errors.district ? "input-group-error" : ""}>
                    <Label className="text-black" for="district">
                      {t("D_2_3")} *
                    </Label>
                    <Input id="district" value={formData.district} name="district" onChange={handleChange} type="select">
                      <option>{t("H_10")}</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup className={errors.sub_district ? "input-group-error" : ""}>
                    <Label className="text-black" for="sub_district">
                      {t("D_2_4")} *
                    </Label>
                    <Input id="sub_district" value={formData.sub_district} name="sub_district" onChange={handleChange} type="select">
                      <option>{t("H_10")}</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6`}>
                  <FormGroup className={errors.postcode ? "input-group-error" : ""}>
                    <Label className="text-black" for="postcode">
                      {t("D_2_5")} *
                    </Label>
                    <Input id="postcode" value={formData.postcode} name="postcode" onChange={handleChange} placeholder={t("D_7_1")} type="text" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-12  mt-3 d-flex align-items-center`}>
                  <div className="left-item"></div>
                  <h5 className="text-black warp-content ms-3">{t("H_3")}</h5>
                </Col>
                <Col className={`col-12 col-lg-6 mt-3`}>
                  <FormGroup className={errors.request_power ? "input-group-error" : ""}>
                    <Label className="text-black" for="request_power">
                      {t("H_4")} *
                    </Label>
                    <Input id="request_power" value={formData.request_power} name="request_power" onChange={handleChange} type="select">
                      <option value={``}>{t("H_10")}</option>
                      <option value={1}>{t("D_4_2")}</option>
                      <option value={2}>{t("D_4_4")}</option>
                      <option value={3}>{t("D_4_5")}</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col className={`col-12  mt-3 d-flex align-items-center`}>
                  <div className="left-item"></div>
                  <h5 className="text-black warp-content ms-3">{t("H_5")}</h5>
                </Col>
                <Col className={`col-12 col-lg-6 mt-3`}>
                  <FormGroup className={errors.rec_amount ? "input-group-error" : ""}>
                    <Label className="text-black" for="rec_amount">
                      {t("D_5_1")} *
                    </Label>
                    <Input id="rec_amount" value={formData.rec_amount} name="rec_amount" onChange={handleChange} placeholder={t("D_7_1")} type="number" maxLength={255} />
                    <small className="text-muted">{t(`H_11`)}</small>
                  </FormGroup>
                </Col>
                <Col className={`col-12 col-lg-6 mt-3`}>
                  <FormGroup className={errors.rec_year ? "input-group-error" : ""}>
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
                    <Label className="text-black" for="address">
                      {t("H_7")}
                    </Label>
                    <Input id="address" value={formData.address} name="address" onChange={handleChange} placeholder={t("D_7_1")} type="textarea" maxLength={255} rows={5} />
                  </FormGroup>
                </Col>
                <Col className={`col-12 mt-5`}>
                  <Button outline color="primary" style={{ width: 140, height: 40 }} onClick={() => router.back()}>
                    {t("H_8")}
                  </Button>
                  <Button color="primary" className="bg-primary-gradient ms-3" style={{ width: 140, height: 40 }}>
                    {t("H_9")}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </div>

      <Footer />
    </>
  );
}
