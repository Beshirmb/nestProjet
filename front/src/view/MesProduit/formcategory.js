import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addcategory,
  updatearabecategory,
  updatecategory,
} from "../../api/produit";
import { toast } from "react-toastify";
import Icon from "../../component/register/Icon";

export default function Formadd({
  hideSideBar,
  refrechdata,
  updatestate,
  idorg,
  selected,
}) {
  const { t, i18n } = useTranslation();
  const validationSchema = Yup.object().shape({
    nameProduit: Yup.string().required(t("Client.Requirename")),

    code: Yup.string().required(t("Client.Requirename")),
    color_categorie: Yup.string().required(t("Client.Requirename")),
  });
  const [state, setState] = useState({
    nameProduit: "",
    code: "",
    color_categorie: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    control,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: "",
  });
  useEffect(() => {
    if (selected) {
      const obj = {
        nameProduit: selected.nameProduit,
        code: selected.codes,
        color_categorie: selected.color,
      };
   reset(obj);
    }
  }, [idorg]);

  const submitcategorie = (data) => {
    let obj = {
      color: data.color_categorie,
      codes: data.code,
      nameProduit: data.nameProduit,

      idorganisation: idorg,
    };

    toast.success("catégorie enregistrer !");
    addcategory(obj);
    refrechdata(idorg);
    hideSideBar();

  };
  const updatecategorie = (data) => {

      const obj = {
        _id: selected._id,
        color: data.color_categorie,
        codes: data.code,
        nameProduit: data.nameProduit,
        }
      
        updatecategory(obj).then((res) => {
        toast.success("Produit modifier ");
        refrechdata(idorg);
        hideSideBar();
      });
  };
  return (
    <div className="containercategory">
      {Boolean(selected)}
      <form
        className="form-drawer"
        onSubmit={
          Boolean(selected)
            ? handleSubmit(updatecategorie)
            : handleSubmit(submitcategorie)
        }
      >
        <p className="title-org">
          {updatestate
            ? t("Categorie.updatecategorie")
            : t("Categorie.addnewcategorie")}
        </p>
        <div className="form-group">
          <label className="custom-label-org">
            {t("Categorie.nomcategory")}{" "}
          </label>
          <input
            type="text"
            className={`form-control custom-input-org ${
              errors.nameProduit ? "is-invalid" : ""
            }`}
            name="nameProduit"
            {...register("nameProduit")}
            placeholder={t("Categorie.nomcategory")}
          />
          <div className="invalid-feedback-drawer">
            {errors.nameProduit && <Icon />}
            {errors.nameProduit?.message}
          </div>
        </div>

        <div className="form-group">
          <label className="custom-label-org">
            {t("Categorie.codecategory")}{" "}
          </label>
          <input
            readOnly={Boolean(selected) ? true : false}
            type="number"
            className={`form-control custom-input-org  ${
              errors.code ? "is-invalid" : ""
            }`}
            name="code"
            {...register("code")}
            placeholder={t("Categorie.codecategory")}
          />
          <div className="invalid-feedback-drawer">
            {errors.code && <Icon />}
            {errors.code?.message}
          </div>
        </div>
        <div className="form-group">
          <label className="custom-label-org">
            stock{" "}
          </label>
          <input
            readOnly={Boolean(selected) ? true : false}
            type="number"
            className={`form-control custom-input-org `}
            name="Stock"
            {...register("Stock")}
            placeholder={"Stock"}
            defaultValue="0"
          />

        </div>
        <div className="form-group">
          <label className="custom-label-org">{t("Categorie.color")} </label>

          <div className="form-group ">
            <input
              type="color"
              className={`form-control custom-input-color ${
                errors.color_categorie ? "is-invalid" : ""
              }`}
              name="color_categorie"
              {...register("color_categorie")}
            />
          </div>
          <div className="invalid-feedback-drawer">
            {errors.color_categorie && <Icon />}
            {errors.color_categorie?.message}
          </div>
        </div>

        <div className="group-button">
          <button
            type="reset"
            className="btn btn-light custom-btn-cancel"
            onClick={() => hideSideBar()}
          >
            {" "}
            {t("Categorie.Btnannuller")}
          </button>
          <input
            type="submit"
            className="btn btn-primary custom-btn-save ml-2"
            value={
              updatestate
                ? t("Categorie.BtnModifier")
                : t("Categorie.BtnEnregistrer")
            }
          />
        </div>
      </form>
    </div>
  );
}
