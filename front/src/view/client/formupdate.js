import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateclient } from "../../api/client";
import { toast } from "react-toastify";
import { getProduit } from "../../api/produit";
import { devisevalue } from "../../component/devise/devise";
import plusPrimary from "../../assets/images/plusPrimary.png";

export default function Formupdate({
  hideSideBar,
  rowdata,
  refrechdata,
  idorg,
}) {
  const [t, i18n] = useTranslation(["translation", "devise"]);
  const [statecat, setstatecat] = useState([]);
  const [basecat, setbasecat] = useState([]);
  const [catvalue, setcatvalue] = useState("");
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Client.Requirename"),

    comptetvacollect: Yup.string().required(t("Client.Requirename")),
    devise: Yup.string().required(t("Client.Requirename")),
    tva: Yup.number()
      .typeError(t("Client.valuenumber"))
      .required(t("Client.Requirename"))
      .test("Is positive?", t("Client.valuenumber"), (value) => value > 0),
  });

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: "",
  });

  useEffect(() => {
  
    reset(rowdata);
  }, [rowdata]);

  const onSubmit = async (data) => {
  

      const client = Object.assign(data, {
        organisation: idorg,
        codesCustomer: "1",
      });

      updateclient(client)
        .then((res) => {
          toast.success(t("CLIENT.REQUIRED.UPDATECLIENT"));
          refrechdata(idorg);
          hideSideBar(false);
        })

        .catch((err) => toast.error(t(err.message)));
    
  };



  return (
    <div className="containerclient">
      <form className="form-drawer" onSubmit={handleSubmit(onSubmit)}>
        <p className="title-org">{t("Client.formupdate")}</p>
        <div className="form-group">
          <label className="custom-label-org">{t("Client.formNom")}</label>

          <input
            name="name"
            type="text"
            placeholder={t("Client.formNom")}
            {...register("name")}
            className={`form-control custom-input-org ${
              errors.name ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback-drawer">
            {errors.name && <i className="fal fa-info-circle mr-1"></i>}
            {errors.name?.message}
          </div>
        </div>
        <div className="form-group">
          <label className="custom-label-org">
            {t("Client.formtvacollect")}
          </label>

          <input
            name="comptetvacollect"
            type="text"
            placeholder={t("Client.formtvacollect")}
            {...register("comptetvacollect")}
            className={`form-control custom-input-org ${
              errors.comptetvacollect ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback-drawer">
            {errors.comptetvacollect && (
              <i className="fal fa-info-circle mr-1"></i>
            )}
            {errors.comptetvacollect?.message}
          </div>
        </div>

        <div className="form-group">
          <label className="custom-label-org">{t("Client.formdevise")}</label>
          <select
            name="devise"
            {...register("devise")}
            className={`form-control custom-select ${
              errors.devise ? "is-invalid" : ""
            }`}
          >
            <option value="">{t("Client.choisiredevise")}</option>
            {devisevalue.map(({ label, value }, i) => {
              return (
                <option key={i} value={value}>
                  {" "}
                  {t(label)}
                </option>
              );
            })}
          </select>
          <div className="invalid-feedback">
            {errors.devise && <i className="fal fa-info-circle mr-1 ml-1"></i>}
            {errors.devise?.message}
          </div>
        </div>

        <div className="form-group">
          <label className="custom-label-org">
            {t("Client.formtvapourcent")}
          </label>

          <input
            name="tva"
            type="number"
            placeholder={t("Client.formtvapourcent")}
            min="0"
            {...register("tva")}
            className={`form-control custom-input-org ${
              errors.tva ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback-drawer">
            {errors.tva && <i className="fal fa-info-circle mr-1"></i>}
            {errors.tva?.message}
          </div>
        </div>

        <div className="group-button">
          <button
            type="reset"
            className="btn btn-light custom-btn-cancel"
            onClick={() => hideSideBar(false)}
          >
            {t("Client.formannulerbtn")}
          </button>
          <input
            value={t("Client.formupdatebtn")}
            type="submit"
            className="btn btn-primary custom-btn-save ml-2"
          />
        </div>
      </form>
    </div>
  );
}
