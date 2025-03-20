"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Cookie.module.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input, Label } from "reactstrap";

export default function CookieConsent() {
  const { t } = useTranslation(["cookie"]);
  const [show, setShow] = useState(true);
  const toggle = () => {
    setModal(!modal);
  };
  const [modal, setModal] = useState(false);
  if (!show) return null; // Hide when dismissed
  return (
    <div className="position-fixed bottom-0 start-50 translate-middle-x lg mb-5 z-2 " style={{ width: "95%" }}>
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-xl-6 d-flex justify-content-center">
          <div className={`${styles.cookieConsent} card card-custom  p-3 text-start rounded shadow-`}>
            <div className="row">
              <div className="col-6">
                <p>
                  <strong className="text-blank">Cookies</strong>
                </p>
              </div>
              <div className="col-6">
                <button onClick={() => setShow(false)} className="btn p-0 border-0 bg-transparent float-end" aria-label="Close">
                  <i className="bi bi-x float-end"></i>
                </button>
              </div>
              <div className="col-12">
                <p className="text-muted">{t("H_1")}</p>
              </div>
              <div className="col-12">
                <Button outline color="primary" style={{ width: 140, height: 40 }} onClick={toggle}>
                  {t("H_2")}
                </Button>
                <Button
                  color="primary"
                  className="bg-primary-gradient ms-3"
                  style={{ width: 140, height: 40 }}
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  {t("H_3")}
                </Button>
              </div>
            </div>
            <Modal isOpen={modal} toggle={toggle} backdrop="static" size="lg" zIndex={"99"}>
              <ModalHeader className="text-black" toggle={toggle}>
                {t("setting.H_1")}
              </ModalHeader>
              <ModalBody>
                <p className="text-muted">{t("setting.H_2")}</p>
                <FormGroup check>
                  <Input type="checkbox" id="time1" name="time1" />
                  <Label className="text-muted" for="time1" check>
                    <strong className="text-black"> {t("setting.H_3")}</strong>
                  </Label>
                  <p className="text-muted">{t("setting.D_3")}</p>
                </FormGroup>
                <FormGroup check>
                  <Input type="checkbox" id="time1" name="time1" />
                  <Label className="text-muted" for="time1" check>
                    <strong className="text-black"> {t("setting.H_4")}</strong>
                  </Label>
                  <p className="text-muted">{t("setting.D_4")}</p>
                </FormGroup>
                <FormGroup check>
                  <Input type="checkbox" id="time1" name="time1" />
                  <Label className="text-muted" for="time1" check>
                    <strong className="text-black"> {t("setting.H_5")}</strong>
                  </Label>
                  <p className="text-muted">{t("setting.D_5")}</p>
                </FormGroup>
                <FormGroup check>
                  <Input type="checkbox" id="time1" name="time1" />
                  <Label className="text-muted" for="time1" check>
                    <strong className="text-black"> {t("setting.H_6")}</strong>
                  </Label>
                  <p className="text-muted">{t("setting.D_6")}</p>
                </FormGroup>
                <hr />
                <FormGroup check>
                  <Input type="checkbox" id="time1" name="time1" />
                  <Label className="text-muted" for="time1" check>
                    <strong className="text-black"> {t("setting.H_7")}</strong>
                  </Label>
                  <p className="text-muted">{t("setting.D_7")}</p>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle}>
                  {t("setting.H_7")}
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
