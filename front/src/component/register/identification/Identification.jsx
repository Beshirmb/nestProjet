import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerU } from "../../../redux/actions/UserAction";
import { toast } from "react-toastify";
import Icon from "../Icon";
import { CLEAR_TOAST } from "../../../redux/constants/UserConstant";

const Identification = ({ history }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { message } = userRegister;

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    email: Yup.string()

      .required(t("IDENTIFICATION.REQUIRED.EMAIL"))

      .email(t("IDENTIFICATION.REQUIRED.EMAIL-IS-INVALID")),

    organisation: Yup.string().required(
      t("IDENTIFICATION.REQUIRED.ORGANISATION")
    ),

    phone: Yup.string()

      .required(t("IDENTIFICATION.REQUIRED.NUM-TELE"))
      .matches(phoneRegExp, t("IDENTIFICATION.REQUIRED.NUM-TELE-IS-INVALID"))
      .min(8, t("IDENTIFICATION.REQUIRED.NUM-TELE-LENGHT"))
      .max(8, t("IDENTIFICATION.REQUIRED.NUM-TELE-LENGHT")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    dispatch({ type: CLEAR_TOAST })
    if (message && message.success) history.push("/welcome");
    else if (message && message.success === false)
      toast.error(t("BACK-END-ERROR.EMAIL-EXSIST"));
  }, [history, message, t]);

  const onSubmit = async (data) => {
    toast.dismiss();
    if (!data.organisation || !data.phone || !data.email) {
    }

    const dataAPI = {
      name: data.organisation,
      tel: data.phone,
      email: data.email,
      isadmin: true,
    };


    dispatch(registerU(dataAPI));
  };

  return (
    <>
      <div className="header-connexion-wrapper" style={{ marginTop: "40px" }}>
        <span className="header-connexion">
          {t("IDENTIFICATION.VOUS-AVEZ-DEJA-UN-COMPTE")}{" "}
        </span>

        <Link className="nav-link-connect text-decoration-none" to="/">
          {t("IDENTIFICATION.SE-CONNECTER")}
        </Link>
      </div>

      <div className="custom-title">
        <p className="main-title">{t("IDENTIFICATION.M-IDENTIFICATION")}</p>

        <p className="sub-title">{t("IDENTIFICATION.SUB-TITLE")}</p>

        <hr className="custom-bar" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={reset}
        className="custom-form"
      >
        {/* email */}

        <div className="form-group">
          <label className="custom-label">
            {t("IDENTIFICATION.LABEL-EMAIL")}
          </label>

          <input
            id="email"
            name="email"
            type="text"
            placeholder={t("IDENTIFICATION.LABEL-EMAIL")}
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />

          <div className="invalid-feedback">
            {<Icon />}
            {errors.email?.message}
          </div>
        </div>

        {/* Oragnisation */}
        <div className="form-group">
          <label className="custom-label">
            {t("IDENTIFICATION.LABEL-ORAGANISATION")}
          </label>
          <input
            id="organisation"
            {...register("organisation")}
            name="organisation"
            type="text"
            placeholder={t("IDENTIFICATION.LABEL-ORAGANISATION")}
            className={`form-control ${errors.organisation ? "is-invalid" : ""
              }`}
          />
          <div className="invalid-feedback">
            {<Icon />}
            {errors.organisation?.message}
          </div>
        </div>

        {/* Num Tele */}
        <div className="form-group">
          <label className="custom-label">
            {t("IDENTIFICATION.LABEL-NUM-TELE")}
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder={t("IDENTIFICATION.LABEL-NUM-TELE")}
            {...register("phone")}
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">
            {<Icon />}
            {errors.phone?.message}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block button-lg "
        >
          {t("IDENTIFICATION.BUTTON-S-INSCRIRE")}
        </button>
      </form>
    </>
  );
};

export default Identification;
