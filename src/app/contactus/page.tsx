"use client";

import { useTranslation } from "react-i18next";
import "../../../i18n/i18n";

import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Image from "next/image";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ApiService from "../services/api-service";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const position = {
  lat: 13.850821,
  lng: 100.558112,
};

export default function ContactUsContent() {
  const { t } = useTranslation(["contactas"]);

  const [formData, setFormData] = useState({
    contact_name: "",
    contact_surname: "",
    contact_mobile: "",
    contact_email: "",
    contact_detail: "",
  });

  const [valid, setValid] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = (): boolean => {
    const invalid = {
      contact_name: false,
      contact_surname: false,
      contact_mobile: false,
      contact_email: false,
    };
    Object.keys(invalid).forEach((k) => {
      invalid[k as keyof typeof invalid] = formData[k as keyof typeof formData].length === 0;
    });
    const res = Object.values(invalid).every((e) => e === false);
    setValid(res);
    return res;
  };

  const submit = async () => {
    setErrors(false);
    setSuccess(false);
    if (validate()) {
      setValid(true);
      const data = await ApiService.createContactUs(formData)
        .catch((e) => {
          setErrors(true);
        })
        .then(() => {
          setSuccess(true);
          const form = { ...formData };
          Object.keys(form).forEach((k: string) => {
            form[k as keyof typeof form] = "";
          });
          setFormData(form);
        });
    }
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
          <div className="col-12 ">
            <div className="text-center full-width d-flex justify-content-center">
              <h1 className="gradient-text">{t("H_0")}</h1>
            </div>
          </div>
          <Container className="pt-5">
            <Form>
              <Row>
                <Col className={`col-6`}>
                  <FormGroup>
                    <Label className="text-black" for="contact_name">
                      {t("H_8")} *
                    </Label>
                    <Input id="contact_name" value={formData.contact_name} name="contact_name" onChange={handleChange} placeholder={t("H_13")} type="text" autoComplete="none" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-6`}>
                  <FormGroup>
                    <Label className="text-black" for="contact_surname">
                      {t("H_9")} *
                    </Label>
                    <Input
                      id="contact_surname"
                      value={formData.contact_surname}
                      name="contact_surname"
                      onChange={handleChange}
                      placeholder={t("H_13")}
                      type="text"
                      autoComplete="none"
                      maxLength={255}
                    />
                  </FormGroup>
                </Col>
                <Col className={`col-6`}>
                  <FormGroup>
                    <Label className="text-black" for="contact_mobile">
                      {t("H_10")} *
                    </Label>
                    <Input id="contact_mobile" value={formData.contact_mobile} name="contact_mobile" onChange={handleChange} placeholder={t("H_13")} autoComplete="none" type="text" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-6`}>
                  <FormGroup>
                    <Label className="text-black" for="email">
                      {t("H_11")} *
                    </Label>
                    <Input id="contact_email" value={formData.contact_email} name="contact_email" onChange={handleChange} placeholder={t("H_13")} type="email" maxLength={255} />
                  </FormGroup>
                </Col>
                <Col className={`col-12`}>
                  <FormGroup>
                    <Label className="text-black" for="contact_detail">
                      {t("H_12")}
                    </Label>
                    <Input id="contact_detail" value={formData.contact_detail} name="contact_detail" onChange={handleChange} placeholder={t("H_13")} type="textarea" maxLength={255} rows={5} />
                  </FormGroup>
                </Col>
              </Row>

              <p className="text-muted py-5" dangerouslySetInnerHTML={{ __html: t("H_6") }}></p>

              {!valid && <p className="text-danger">* {t("H_18")}</p>}

              {errors && <p className="text-danger">* {t("H_19")}</p>}

              {success && <p> {t("H_20")}</p>}

              <Button
                color="primary"
                type="button"
                className="bg-primary-gradient"
                style={{ width: 140 }}
                onClick={() => {
                  submit();
                }}
              >
                {t("H_7")}
              </Button>
            </Form>
          </Container>
        </div>
      </div>
      <div className="background-gray">
        <div className={`container py-5`}>
          <div className={`row my-5`}>
            <div className={`col-6`}>
              <div style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "1/1" }}>
                <LoadScript googleMapsApiKey={ApiService.YOUR_GOOGLE_MAPS_API_KEY}>
                  <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={15}>
                    <Marker position={position} />
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
            <div className={`col-6`}>
              <div className="container">
                <h3 className="text-black">{t("H_2")}</h3>
                <div className="row mt-3">
                  <div className="col-auto">
                    <Image src={`/images/ic_pin.png`} alt="ic_pin" width={30} height={30} />
                  </div>
                  <div className="col">
                    <h5 className="text-black">{t("H_4")}</h5>
                    <p className="text-muted" dangerouslySetInnerHTML={{ __html: t("H_5") }}></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-auto">
                    <Image src={`/images/ic_clock.png`} alt="ic_clock" width={30} height={30} />
                  </div>
                  <div className="col">
                    <h5 className="text-black">{t("H_14")}</h5>
                    <p className="text-muted" dangerouslySetInnerHTML={{ __html: t("H_15") }}></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-auto">
                    <Image src={`/images/ic_customer_service.png`} alt="ic_customer_service" width={30} height={30} />
                  </div>
                  <div className="col">
                    <h5 className="text-black">{t("H_16")}</h5>
                    <p className="text-muted" dangerouslySetInnerHTML={{ __html: `1129 PEA Contact Center` }}></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-auto">
                    <Image src={`/images/ic_email.png`} alt="ic_email" width={30} height={30} />
                  </div>
                  <div className="col">
                    <h5 className="text-black">{t("H_17")}</h5>
                    <p className="text-muted" dangerouslySetInnerHTML={{ __html: `pearecs@pea.co.th` }}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
