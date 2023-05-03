import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Icon from "../Icon";
import { useHistory, useParams } from "react-router-dom";
import { UPpassword } from "../../../redux/actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PassWord = () => {
  const { changepass } = useSelector((state) => state.updatepassword);

  let { id } = useParams();
  const { t } = useTranslation();
  let history = useHistory();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    passWord: Yup.string()
      .required(t("CONNEXION.REQUIRED.MOT-DE-PASSE"))
      .min(6, t("IDENTIFICATION.REQUIRED.PASSWORD-LENGHT-MIN"))
      .max(20, t("IDENTIFICATION.REQUIRED.PASSWORD-LENGHT-MAX")),
    ConfirmPassWord: Yup.string()
      .required(t("CONNEXION.REQUIRED.MOT-DE-PASSE"))
      .oneOf([Yup.ref("passWord"), null], t("PASSWORD.MATCH-PASSWORD"))
      .min(6, t("IDENTIFICATION.REQUIRED.PASSWORD-LENGHT-MIN"))
      .max(20, t("IDENTIFICATION.REQUIRED.PASSWORD-LENGHT-MAX")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function onSubmit(data) {
    if (id.length === 24) {
      dispatch(UPpassword({ password: data.passWord, id: id }));
      toast.success(t("CONNEXION.INSCRIT-SUCCES"));
      history.push("/login");
    } else {
      toast.error(t("CONNEXION.URL-NON-VALIDE"));
    }
  }
  useEffect(() => {
    if (changepass && changepass.success === true) {
      toast.success(t("CONNEXION.INSCRIT-SUCCES"));
      history.push("/login");
    }
    if (changepass && changepass.success === false) {
      toast.error(t("CONNEXION.INSCRIT-FAILED"));
    }
  }, [changepass]);
  return (
    <div className="custom-password">
      <div className="custom-title">
        <p className="main-title">{t("PASSWORD.N-MOT-PASSE")}</p>
        <p className="sub-title">{t("PASSWORD.ENTRER-MOT-DE-PASSE")}</p>
        <hr className="custom-bar" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={reset}
        className="custom-form "
      >
        <div className="form-group">
          <label className="custom-label">{t("PASSWORD.N-MOT-PASSE")}</label>
          <input
            name="passWord"
            type="text"
            placeholder="***************"
            {...register("passWord")}
            className={`form-control ${errors.passWord ? "is-invalid" : ""}`}
          />

          <div className="invalid-feedback">
            {<Icon />}
            {errors.passWord?.message}
          </div>
        </div>

        <div className="form-group">
          <label className="custom-label">
            {t("PASSWORD.LABEL-CONFIRAMATION")}
          </label>
          <input
            name="ConfirmPassWord"
            type="text"
            placeholder="***************"
            {...register("ConfirmPassWord")}
            className={`form-control ${
              errors.ConfirmPassWord ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {<Icon />}
            {errors.ConfirmPassWord?.message}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block button-lg"
        >
          {t("PASSWORD.BUTTON-ENREGISTRER")}
        </button>
      </form>
    </div>
  );
};

export default PassWord;
