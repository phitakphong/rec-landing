"use client";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Form, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ApiService from "@/services/api-service";
import Swal from "sweetalert2";
import UploadItem from "@/components/uploads/UploadBoxItem";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function CompanyInfoContent({ params }: PageProps) {
  const { t, i18n } = useTranslation(["register-company"]);
  const router = useRouter();

  const [markerPosition, setMarkerPosition] = useState<any>(null);
  const [data, setData] = useState<any>({});
  const [files, setFiles] = useState<any[]>([]);
  const [id, setId] = useState<string>("");

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
        setId(resolvedParams.id);
        const resp = await ApiService.getCooperation(resolvedParams.id);

        const [provinces, districts, subDistricts] = await Promise.all([
          ApiService.getProvinces(),
          ApiService.getDistricts(resp.cooperate_company_province),
          ApiService.getSubDistricts(resp.cooperate_company_district),
        ]);

        resp.cooperate_company_province = provinces.find((p: any) => p.province_code == resp.cooperate_company_province).province_name[i18n.language];
        resp.cooperate_company_district = districts.find((d: any) => d.district_code == resp.cooperate_company_district).district_name[i18n.language];
        resp.cooperate_company_subdistrict = subDistricts.find((s: any) => s.sub_district_code == resp.cooperate_company_subdistrict).sub_district_name[i18n.language];

        setMarkerPosition({
          lat: resp.cooperate_latitude,
          lng: resp.cooperate_longitude,
        });

        setData(resp);

        setFiles([...(resp.cooperate_document || []), ...(resp.cooperate_receive_document || []), ...(resp.cooperate_delegate_document || [])]);

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

  return (
    <>
      <div className="background-purple">
        <div className={`container py-5`}>
          <div className={`row my-5`}>
            <div className={`col-12`}>
              <h1 className="text-white full-width text-center">{t("T_01")}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={`container py-5 max-width-1140`}>
        <div className="row">
          {data && (
            <Container>
              <Form>
                <Row>
                  <Col className={`col-12  mb-3 d-flex align-items-center`}>
                    <div className="left-item"></div>
                    <h5 className="text-black warp-content ms-3">{t("T_28")}</h5>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-person"></i>&emsp;{t("T_02")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_name}</Label>
                    </FormGroup>
                  </Col>

                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-person"></i>&emsp;{t("T_03")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_surname}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-credit-card"></i>&emsp;{t("T_04")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_card_type == 1 ? t("T_05") : t("T_06")}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-credit-card"></i>&emsp;{t("T_07")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_card_id}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-phone"></i>&emsp;{t("T_08")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_phone}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-envelope"></i>&emsp;{t("T_09")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_email}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12  my-3 d-flex align-items-center`}>
                    <div className="left-item"></div>
                    <h5 className="text-black warp-content ms-3">{t("T_10")}</h5>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-person"></i>&emsp;{t("T_11")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_company_name}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-credit-card"></i>&emsp;{t("T_12")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_company_ca}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-credit-card"></i>&emsp;{t("T_13")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_company_id}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-credit-card"></i>&emsp;{t("T_14")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_company_branch}</Label>
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
                      <Label className="text-black">
                        <i className="bi bi-buildings"></i>&emsp;{t("T_16")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_company_address}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-buildings"></i>&emsp;{t("T_18")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_company_province}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-buildings"></i>&emsp;{t("T_19")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_company_district}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-buildings"></i>&emsp;{t("T_20")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_company_subdistrict}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12 col-lg-6`}>
                    <FormGroup>
                      <Label className="text-black">
                        <i className="bi bi-buildings"></i>&emsp;{t("T_17")}
                      </Label>
                      <br />
                      &emsp;&emsp;<Label className="text-black">{data.cooperate_company_postcode}</Label>
                    </FormGroup>
                  </Col>
                  <Col className={`col-12  mt-3 d-flex align-items-center`}>
                    <div className="left-item"></div>
                    <h5 className="text-black warp-content ms-3">{t("T_21")}</h5>
                  </Col>
                  <Col className={`col-12 mt-3`}>
                    {files.map((s: any, i: number) => {
                      return <UploadItem key={`${i}`} fileName={s.file_name} fileSize={""} fileUrl={s.file_url} />;
                    })}
                  </Col>

                  <Col className={`col-12 mt-3`}>
                    <div style={{ position: "relative", width: "100%", height: "auto", aspectRatio: "1/1" }}>
                      <LoadScript googleMapsApiKey={ApiService.YOUR_GOOGLE_MAPS_API_KEY}>
                        {markerPosition && (
                          <GoogleMap mapContainerStyle={containerStyle} center={markerPosition} zoom={15}>
                            <Marker position={markerPosition} />
                          </GoogleMap>
                        )}
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
                        router.push(`/register-company/${id}`);
                      }}
                    >
                      {t("T_43")}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          )}
        </div>
      </div>
    </>
  );
}
