import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { addsupplier } from "../../api/fournissuer";
import { getProduit } from "../../api/produit";
import { devisevalue } from "../../component/devise/devise";
import { toast } from "react-toastify";
import plusPrimary from "../../assets/images/plusPrimary.png";
import Icon from "../../component/register/Icon";

export default function Formadd({ hideSideBar, refrechdata, idorg }) {
  const [t, i18n] = useTranslation(["translation", "devise"]);
  const [statecat, setstatecat] = useState([]);
  const [basecat, setbasecat] = useState([]);
  const [catvalue, setcatvalue] = useState("");
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("FOURNISSEUR.REQUIRED.NOM")),

    tvacollect: Yup.string().required(t("FOURNISSEUR.REQUIRED.TVACOLLECT")),
    devise: Yup.string().required(t("FOURNISSEUR.REQUIRED.DEVISE")),
    tva: Yup.number()
      .typeError(t("FOURNISSEUR.REQUIRED.POURCENTAGE"))
      .required(t("FOURNISSEUR.REQUIRED.POURCENTAGE"))
      .test(
        "Is positive?",
        t("FOURNISSEUR.REQUIRED.POURCENTAGE"),
        (value) => value >= 0
      ),
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: "",
  });
  useEffect(() => {
    getProduit(idorg).then((res) => setbasecat(res.data));
  }, [idorg]);
  const catadd = () => {
    if (catvalue) 
    {
    const isexiste = statecat.find(el => el === catvalue)
    if(!isexiste)
     setstatecat([...statecat, catvalue]);
     else
     toast.error(t("Client.categoexist"));
    }
    else toast.error(t("Client.Requirecatego"));
  };
  const deletecat = (index) => {
    const array = [...statecat];
    array.splice(index, 1);
    setstatecat(array);
    const sup = statecat.splice(index, 1);
  };
  const onSubmit = async (data) => {


      const supp = Object.assign(data, {
        organisation: idorg,
        codesCustomer: "1",
      });
      addsupplier(supp)
        .then((res) => {
          if (res.data.success)
            toast.success(t("FOURNISSEUR.REQUIRED.ADDFOURNISSEUR"));
          else {
            i18n.language == "ar"
              ? toast.success(res.data.message.ar)
              : toast.success(t(res.data.message.fr));
          }

          hideSideBar(false);
          refrechdata(idorg);
        })
        .catch((err) => toast.error(err.message));
    
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
            {t("Fournisseur.formannulerbtn")}
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
