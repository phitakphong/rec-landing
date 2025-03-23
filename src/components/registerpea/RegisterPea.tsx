"use client";

import { useTranslation } from "react-i18next";

import styles from "./RegisterPeaContent.module.css";
import { Button } from "reactstrap";
import { useRouter } from "next/navigation";

export default function RegisterPea() {
  const { t } = useTranslation(["home", "common"]);
  const router = useRouter();

  return (
    <div className={`${styles.backgroundSolar}`}>
      <div className="container py-5 mt-5 max-width-1140">
        <div className="row">
          <div className="col-12 px-5 text-center">
            <div className=" px-5 ">
              <h1 className="gradient-text" dangerouslySetInnerHTML={{ __html: t("H_4_3") }}></h1>
              <p className="mt-3" dangerouslySetInnerHTML={{ __html: t("D_4_3") }}></p>
              <Button color="primary" className="bg-primary-gradient px-5 my-5" onClick={() => router.push("/register")}>
                {t("regis", { ns: "common" })}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
