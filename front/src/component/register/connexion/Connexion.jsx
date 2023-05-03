import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Icon from "../Icon";
import { useDispatch, useSelector } from "react-redux";
import { loginU } from "../../../redux/actions/UserAction";
import { isLogin } from "../../../utile";

import { toast } from "react-toastify";
import { CLEAR_TOAST_CNX } from "../../../redux/constants/UserConstant";
const Connexion = ({ history }) => {
  const [iselogin, setiselogin] = useState(false);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("CONNEXION.REQUIRED.EMAIL"))
      .email(t("IDENTIFICATION.REQUIRED.EMAIL-IS-INVALID")),
    password: Yup.string()
      .required(t("CONNEXION.REQUIRED.MOT-DE-PASSE"))
      .min(6, t("IDENTIFICATION.REQUIRED.PASSWORD-LENGHT-MIN"))
      .max(20, t("IDENTIFICATION.REQUIRED.PASSWORD-LENGHT-MAX")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    dispatch({ type: CLEAR_TOAST_CNX });
    if (isLogin()) setiselogin(true);
    else if (
      userInfo &&
      userInfo.message &&
      userInfo.message.en === "user does not exist"
    ) {
      toast.error(t("BACK-END-ERROR.EMAIL-INCORECT"));
    } else if (
      userInfo &&
      userInfo.message &&
      userInfo.message.en === "Verify your password"
    ) {
      toast.error(t("BACK-END-ERROR.PASSWORD-INCORECT"));
    }
  }, [history, userInfo, t, dispatch]);

  const onSubmit = async (dataO) => {
    dispatch(loginU(dataO));
  };

  return (
    <>
      <div className="header-connexion-wrapper" style={{ marginTop: "40px" }}>
        <span className="header-connexion ">
          {t("CONNEXION.VOUS-N-PAS-COMPTE")}
        </span>

        <Link
          className="nav-link-connect text-decoration-none"
          to="/register"
        >
          {t("CONNEXION.S-INSCRIRE")}
        </Link>
      </div>

      <div className="custom-title">
        <p className="main-title">{t("CONNEXION.CONNECION")}</p>
        <p className="sub-title">{t("CONNEXION.SUB-TITLE")}</p>
        <hr className="custom-bar-cnx" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
        {/* email */}
        <div className="form-group">
          <label className="custom-label">
            {t("CONNEXION.LABEL-EMAIL")}
          </label>

          <input
            id="email"
            name="email"
            type="text"
            placeholder={t("CONNEXION.LABEL-EMAIL")}
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">
            {<Icon />}
            {errors.email?.message}
          </div>
        </div>
        {/* mot de passe" */}
        <div className="form-group">
          <label className="custom-label">
            {t("CONNEXION.LABEL-MOT-DE-PASSE")}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder={t("CONNEXION.LABEL-MOT-DE-PASSE")}
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""
              }`}
          />
          <div className="invalid-feedback">
            {<Icon />}
            {errors.password?.message}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block button-lg"
        >
          {t("CONNEXION.BUTTON-SE-CONNECTER")}
        </button>
      </form>
    </>

  );
};

export default Connexion;
