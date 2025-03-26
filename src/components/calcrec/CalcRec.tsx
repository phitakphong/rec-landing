"use client";

import { useTranslation } from "react-i18next";

import styles from "./CalcRec.module.css";
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import { useCallback, useEffect, useState } from "react";
import ApiService from "../../services/api-service";

const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  th: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
};

interface CalcRecProps {
  className?: string;
}

export default function CalcRec({ className }: CalcRecProps) {
  const { t, i18n } = useTranslation(["calc", "common"]);
  const [selectState, setSelectState] = useState("CUSTOM");
  const [calcResult, setCalcResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState(null);
  const [sumKwh, setSumKwh] = useState(0);
  const [percentUse, setPercentUse] = useState("");
  const [totalRec, setTotalRec] = useState("");
  const [totalKwh, setTotalKwh] = useState("");

  const [formData, setFormData] = useState({
    meter_code: "",
    pea_no: "",
    bill_period: "",
    amt_invoice: "",
  });

  const [formData2, setFormData2] = useState({
    from: "",
    to: "",
  });

  const [errors, setErrors] = useState({
    meter_code: false,
    pea_no: false,
    bill_period: false,
    amt_invoice: false,
  });

  const [errors2, setErrors2] = useState({
    from: false,
    to: false,
  });

  const [months, setMonths] = useState<{ value: string; year: string; monthIndex: number }[]>([]);
  const [filterMonths, setFilterMonths] = useState<{ value: string; year: string; monthIndex: number }[]>([]);

  const generateMonths = (start: string, end: string | null = null) => {
    const currentDate = end ? new Date(end) : new Date();
    const startMonth = new Date(`${start}-01`);
    const monthsList: { value: string; year: string; monthIndex: number }[] = [];

    const tempDate = startMonth;

    while (tempDate <= currentDate) {
      monthsList.push({
        value: `${tempDate.getFullYear()}${(tempDate.getMonth() + 1).toString().padStart(2, "0")}`,
        year: `${tempDate.getFullYear() + (i18n.language == "th" ? 543 : 0)}`,
        monthIndex: tempDate.getMonth(),
      });
      tempDate.setMonth(tempDate.getMonth() + 1);
    }
    return monthsList;
  };

  useEffect(() => {
    setMonths(generateMonths(`2024-01`));
  }, [t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      meter_code: false,
      pea_no: false,
      bill_period: false,
      amt_invoice: false,
    };

    newErrors.meter_code = formData.meter_code.length === 0;
    newErrors.pea_no = formData.pea_no.length === 0;
    newErrors.bill_period = formData.bill_period.length === 0;
    newErrors.amt_invoice = formData.amt_invoice.length === 0;

    setErrors(newErrors);
    return Object.values(newErrors).filter((e) => e === true).length === 0;
  };

  const validateForm2 = () => {
    const newErrors = {
      from: false,
      to: false,
    };

    newErrors.from = formData2.from.length === 0;
    newErrors.to = formData2.to.length === 0;

    if (!newErrors.from && !newErrors.to) {
      if (parseInt(formData2.from) > parseInt(formData2.to)) {
        newErrors.from = true;
        newErrors.to = true;
      }
    }
    setErrors2(newErrors);
    return Object.values(newErrors).filter((e) => e === true).length === 0;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      handleBillingSubmit();
    }
  };

  const handleFormSubmit2 = () => {
    if (validateForm2()) {
      setTotalRec("");
      setPercentUse("");
      setSumKwh(0);
      const data = response!!.monthlyUsage.filter((m: any) => m.billPeriod >= parseInt(formData2.from) && m.billPeriod <= parseInt(formData2.to));
      setSelectedItems(new Array(data.length).fill(false));
      setCalcResult(data);
    }
  };

  const handleBillingSubmit = async () => {
    setLoading(true);
    setResponse(null);
    setCalcResult(null);
    setFormData2({
      from: "",
      to: "",
    });
    setErrors2({
      from: false,
      to: false,
    });
    const billingData = {
      amt_invoice: parseFloat(formData.amt_invoice),
      bill_period: formData.bill_period,
      meter_code: formData.meter_code,
      pea_no: formData.pea_no,
    };

    try {
      const data = await ApiService.getBilling(billingData).catch((e) => {
        setError(e.error);
      });
      if (data.data) {
        const minBillPeriod = data.data.minBillPeriod.toString();
        const maxBillPeriod = data.data.maxBillPeriod.toString();
        const min = `${minBillPeriod.substring(0, 4)}-${minBillPeriod.substring(4)}`;
        const max = `${maxBillPeriod.substring(0, 4)}-${maxBillPeriod.substring(4)}`;
        const months = generateMonths(min, max);
        setFilterMonths(months);
      }
      setResponse(data.data);
      setError(null);
      setLoading(false);
    } catch (err: unknown) {
      setResponse(null);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResponse(null);
    setCalcResult(null);
    setError(null);
    setErrors({
      meter_code: false,
      pea_no: false,
      bill_period: false,
      amt_invoice: false,
    });

    setFormData({
      meter_code: "",
      pea_no: "",
      bill_period: "",
      amt_invoice: "",
    });

    // setFormData({
    //   meter_code: "020000225347",
    //   pea_no: "22991042",
    //   bill_period: "202401",
    //   amt_invoice: "441.73",
    // });

    setFormData2({
      from: "",
      to: "",
    });

    setTotalRec("");
    setTotalKwh("");
  };

  const [selectedItems, setSelectedItems] = useState<boolean[]>([]);

  const handleCheckAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const all = selectedItems.map(() => checked);
    setSelectedItems(all);
    sunKwh(all);
    calcRec(percentUse);
  };

  const handleCheckboxChange = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
    sunKwh(newSelectedItems);
    calcRec(percentUse);
  };

  const sunKwh = useCallback(
    (selectedItems: boolean[]) => {
      let kwhTotal = 0;
      selectedItems.forEach((e, i) => {
        if (e) {
          if (calcResult && calcResult[i]) {
            kwhTotal += calcResult[i].kwhTotal || 0;
          }
        }
      });
      setSumKwh(kwhTotal / 1000);
    },
    [calcResult]
  );

  const isAllChecked = selectedItems.every((checked) => checked);

  const calcRec = useCallback(
    (v: any) => {
      if (v.length) {
        const percent = sumKwh * (parseInt(v) / 100.0);
        setTotalRec(percent.toFixed(2));
      } else {
        setTotalRec("");
      }
    },
    [sumKwh]
  );

  useEffect(() => {
    sunKwh(selectedItems);
    calcRec(percentUse);
  }, [selectedItems, percentUse, calcRec, sunKwh]);

  return (
    <div className="z-3">
      <div className="row">
        <div className="col-12">
          <h1 className="gradient-text">{t("H_1")}</h1>
          <p className="txt-body">{t("H_2")}</p>
          <div className={`card card-custom p-2 mt-3`} style={{ width: "fit-content", display: "inline-block" }}>
            <Button
              color="primary"
              style={{ height: "50px" }}
              className={`${selectState === "CUSTOM" ? "bg-primary-gradient" : "btn-outline-primary  no-border card-text"}`}
              onClick={() => {
                resetForm();
                setSelectState("CUSTOM");
              }}
            >
              {t("D_4_4_2")}
            </Button>
            <Button
              className={`ms-1 ${selectState === "HISTORY" ? "bg-primary-gradient" : "btn-outline-primary no-border card-text"}`}
              style={{ height: "50px" }}
              onClick={() => {
                resetForm();
                setSelectState("HISTORY");
              }}
            >
              {t("D_4_4_3")}
            </Button>
          </div>
        </div>
      </div>{" "}
      <div className={`row mt-3`}>
        <div className="col-12">
          <div className={`p-3 ${className}`} style={{ border: "none" }}>
            {selectState === "CUSTOM" ? (
              <>
                <div className="row align-items-center mt-3">
                  <div className="col-4 text-center">{t("D_10_3")}</div>
                  <div className="col-4 text-center">
                    <Input
                      type="number"
                      placeholder={t("D_4_4_4")}
                      className="form-control text-center"
                      value={totalKwh}
                      onChange={(e) => {
                        setTotalKwh(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-4">MWh</div>
                </div>
                <div className="row mt-3 align-items-center">
                  <div className="col-4 text-center">{t("D_9_3")}</div>
                  <div className="col-4 text-center">
                    <span className={`${styles.recRes}`}>&nbsp;{totalKwh}&nbsp;</span>
                  </div>
                  <div className="col-4">REC</div>
                </div>
                <div className="row mt-5 align-items-center">
                  <div className="col-12">
                    <p>{t("D_10_4")}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Form>
                  <Row>
                    <Col className={`col-12 col-lg-6`}>
                      <FormGroup>
                        <Label className="text-black" for="meter_code">
                          {t("H_3")}
                        </Label>
                        <InputGroup className={errors.meter_code ? "input-group-error" : ""}>
                          <InputGroupText>
                            <i className="bi bi-printer-fill"></i>
                          </InputGroupText>
                          <Input id="meter_code" name="meter_code" type="text" autoComplete="off" maxLength={255} value={formData.meter_code} onChange={handleChange} />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col className={`col-12 col-lg-6`}>
                      <FormGroup>
                        <Label className="text-black" for="pea_no">
                          {t("H_4")}
                        </Label>
                        <InputGroup className={errors.pea_no ? "input-group-error" : ""}>
                          <InputGroupText>
                            <i className="bi bi-printer-fill"></i>
                          </InputGroupText>
                          <Input id="pea_no" name="pea_no" type="text" autoComplete="off" maxLength={255} value={formData.pea_no} onChange={handleChange} />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col className={`col-12 col-lg-6`}>
                      <FormGroup>
                        <Label className="text-black" for="bill_period">
                          {t("H_5")}
                        </Label>
                        <InputGroup className={errors.bill_period ? "input-group-error" : ""}>
                          <InputGroupText>
                            <i className="bi bi-lightning-charge-fill"></i>
                          </InputGroupText>
                          <Input type="select" value={formData.bill_period} name="bill_period" onChange={handleChange} className="form-control">
                            <option value=""></option>
                            {months.map((p, i) => (
                              <option key={i} value={p.value}>
                                {MONTHS[i18n.language as keyof typeof MONTHS][p.monthIndex]} {p.year}
                              </option>
                            ))}
                          </Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col className={`col-12 col-lg-6`}>
                      <FormGroup>
                        <Label className="text-black" for="amt_invoice">
                          {t("H_6")}
                        </Label>
                        <InputGroup className={errors.amt_invoice ? "input-group-error" : ""}>
                          <InputGroupText>
                            <i className="bi bi-coin"></i>
                          </InputGroupText>
                          <Input id="amt_invoice" name="amt_invoice" type="number" maxLength={255} value={formData.amt_invoice} onChange={handleChange} />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col className="col-12 d-flex">
                      <Button
                        disabled={loading}
                        type="button"
                        outline
                        color="primary"
                        className="align-self-end mb-3 btn-white"
                        style={{ width: "100%", height: 38 }}
                        onClick={() => {
                          handleFormSubmit();
                        }}
                      >
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : t("H_7")}
                      </Button>
                    </Col>

                    {error && (
                      <Col className="col-12 text-center">
                        <div className="invalid-feedback d-block">* {error}</div>
                      </Col>
                    )}

                    {response && (
                      <>
                        <Col className={`col-6 col-lg-5`}>
                          <FormGroup>
                            <Label for="exampleDate">{t("H_8")}</Label>
                            <InputGroup className={errors2.from ? "input-group-error" : ""}>
                              {" "}
                              <InputGroupText>
                                <i className="bi bi-calendar4"></i>
                              </InputGroupText>
                              <Input type="select" className="form-control" value={formData2.from} name="from" onChange={handleChange2}>
                                <option value=""></option>
                                {filterMonths.map((p, i) => (
                                  <option key={i} value={p.value}>
                                    {MONTHS[i18n.language as keyof typeof MONTHS][p.monthIndex]} {p.year}
                                  </option>
                                ))}
                              </Input>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col className={`col-6 col-lg-5`}>
                          <FormGroup>
                            <Label className="text-black" for="email">
                              &emsp;
                            </Label>
                            <InputGroup className={errors2.from ? "input-group-error" : ""}>
                              <InputGroupText>
                                <i className="bi bi-calendar4"></i>
                              </InputGroupText>
                              <Input type="select" className="form-control" value={formData2.to} name="to" onChange={handleChange2}>
                                <option value=""></option>
                                {filterMonths.map((p, i) => (
                                  <option key={i} value={p.value}>
                                    {MONTHS[i18n.language as keyof typeof MONTHS][p.monthIndex]} {p.year}
                                  </option>
                                ))}
                              </Input>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col className="col-12 col-lg-2 d-flex">
                          <Button
                            type="button"
                            color="primary"
                            className="align-self-end mb-3 bg-primary-gradient"
                            style={{ width: "100%", height: 38 }}
                            onClick={() => {
                              handleFormSubmit2();
                            }}
                          >
                            {t("H_9")}
                          </Button>
                        </Col>
                      </>
                    )}
                  </Row>
                </Form>
              </>
            )}
          </div>

          {calcResult != null && (
            <>
              <div className="col-12 mt-5">
                <div className="table-container">
                  <table className={`table table-striped2 my-table text-start m-0`}>
                    <thead className="table-light">
                      <tr>
                        <th scope="col" style={{ width: "3em" }}>
                          <FormGroup check className="ms-3">
                            <Input type="checkbox" checked={isAllChecked} onChange={handleCheckAllChange} />
                          </FormGroup>
                        </th>
                        <th scope="col">ลำดับ</th>
                        <th scope="col">เดือน</th>
                        <th scope="col">ปริมาณการใช้ไฟฟ้า</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calcResult.map((p: any, i: number) => (
                        <tr key={i}>
                          <td>
                            <FormGroup check className="ms-3">
                              <Input type="checkbox" checked={selectedItems[i]} onChange={() => handleCheckboxChange(i)} />
                            </FormGroup>
                          </td>
                          <td>{i + 1}.</td>
                          <td>
                            {MONTHS[i18n.language as keyof typeof MONTHS][parseInt(p.billPeriod.toString().substring(4)) - 1]} {parseInt(p.billPeriod.toString().substring(0, 4)) + 543} 
                          </td>
                          <td>{p.kwhTotal} kWh</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`card card-custom p-3 mt-5 ${styles.background}`} style={{ border: "none" }}>
                <div className="col-12 pt-3">
                  <p>
                    <strong>{t("H_10")}</strong>
                  </p>
                </div>
                <div className="row align-items-center mt-3">
                  <div className="col-12 col-md-4">{t("D_10_1")}</div>
                  <div className="col-8 col-md-4">
                    <input type="text" readOnly placeholder={t("D_4_4_4")} value={sumKwh.toFixed(2)} className="form-control text-center" />
                  </div>
                  <div className="col-4">MWh</div>
                </div>
                <div className="row align-items-center mt-3">
                  <div className="col-12 col-md-4">{t("D_10_2")}</div>
                  <div className="col-8 col-md-4">
                    <input
                      type="number"
                      placeholder={t("D_4_4_4")}
                      className="form-control text-center"
                      min={0}
                      max={100}
                      value={percentUse}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPercentUse(value);
                        calcRec(value);
                      }}
                    />
                  </div>
                  <div className="col-4"></div>
                </div>
                <div className="row mt-3 align-items-center">
                  <div className="col-12 col-md-4">{t("D_10_3")}</div>
                  <div className="col-8 col-md-4 text-center">
                    <span className={`${styles.recRes}`}>&nbsp;{totalRec}&nbsp;</span>
                  </div>
                  <div className="col-4">REC</div>
                </div>
                <div className="row mt-5 align-items-center">
                  <div className="col-12">
                    <p>{t("D_10_4")}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
