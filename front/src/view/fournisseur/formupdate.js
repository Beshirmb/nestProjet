import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatesupplier } from "../../api/fournissuer";
import { toast } from "react-toastify";
import { devisevalue } from "../../component/devise/devise";
import { getProduit } from "../../api/produit";
import plusPrimary from "../../assets/images/plusPrimary.png";
import Icon from "../../component/register/Icon";

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

    tvacollect: Yup.string().required(t("Client.Requirename")),
    devise: Yup.string().required("Client.Requirename"),
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
    getProduit(idorg).then((res) => setbasecat(res.data));
  }, [rowdata]);
  const onSubmit = async (data) => {


      const supplier = Object.assign(data, {
        organisation: idorg,
        codesCustomer: "1",
      });

      updatesupplier(supplier)
        .then((res) => {
          if (res.data.success)
            toast.success(t("FOURNISSEUR.REQUIRED.UPDATEFOURNISSEUR"));
          else {
            i18n.language == "ar"
              ? toast.error(res.data.message.ar)
              : toast.error(t(res.data.message.fr));
          }
          refrechdata(idorg);
          hideSideBar(false);
        })
        .catch((err) => toast.error(t(err.message)));
   
  };
  const deletecat = (index) => {

  };
  const catadd = () => {

    
  };
  return (
    <div className="containerclient">
      <form className="form-drawer" onSubmit={handleSubmit(onSubmit)}>
        <p className="title-org">{t("Fournisseur.formadd")}</p>
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
            {errors.name && <Icon />}
            {errors.name?.message}
          </div>
        </div>

        <div className="form-group">
          <label className="custom-label-org">
            {t("Fournisseur.formtvacollect")}
          </label>

          <input
            name="tvacollect"
            type="text"
            placeholder={t("Fournisseur.formtvacollect")}
            {...register("tvacollect")}
            className={`form-control custom-input-org ${
              errors.tvacollect ? "is-invalid" : ""
            }`}
          />

          <div className="invalid-feedback-drawer">
            {errors.comptetvacollect && <Icon />}
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

          <div className="invalid-feedback-drawer">
            {errors.devise && <Icon />}
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
            {...register("tva")}
            className={`form-control custom-input-org ${
              errors.tva ? "is-invalid" : ""
            }`}
          />

          <div className="invalid-feedback-drawer">
            {errors.tva && <Icon />}
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
            value={t("Client.formaddbtn")}
            type="submit"
            className="btn btn-primary custom-btn-save ml-2"
          />
        </div>
      </form>
    </div>
  );
}
