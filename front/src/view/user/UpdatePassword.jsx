import React, { useState, useEffect } from "react";
import { getuserconnected, updatepassword } from "../../api/profilapi";
import { useTranslation } from "react-i18next";
import { IconContext } from "react-icons";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { decodetoken } from "../../utile/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Icon from "../../component/register/Icon";

const UpdatePassword = ({ HideUpdatePassWord, UpdatePassWord }) => {
  const { t, i18n } = useTranslation();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(t("CONNEXION.REQUIRED.MOT-DE-PASSE"))
      .min(6, t("USER.PASSWORD-LENGHT-MIN"))
      .max(20, t("USER.PASSWORD-LENGHT-MAX")),
    confirmepass: Yup.string()
      .required(t("CONNEXION.REQUIRED.MOT-DE-PASSE"))
      .oneOf([Yup.ref("password"), null], t("PASSWORD.MATCH-PASSWORD"))
      .min(6, t("USER.PASSWORD-LENGHT-MIN"))
      .max(20, t("USER.PASSWORD-LENGHT-MAX")),
  });

  const [shown, setShown] = useState(false);
  const [statelangage, setstatelangage] = useState("");
  const [userinfo, setUserinfo] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const token = decodetoken();
    setstatelangage(i18n.language);
    if (token)
      getuserconnected(token._id)
        .then((res) => {
          setUserinfo(res.data);
        })
        .catch((err) => console.log(err));
  }, [i18n.language]);

  const onSubmit = async (data) => {
    const token = await decodetoken();
    const id = token._id;

    const password = data.password;

    updatepassword({ password, id }).then((res) => {
      if (res.data.success)
        toast.success(t("UserProfile.resultaSuccessChangePass"));
      else {
        i18n.language === "ar"
          ? toast.success(res.data.message.ar)
          : toast.success(res.data.message.fr);
      }
    });

    HideUpdatePassWord();
  };

  return (
    <form className="form-drawer" onSubmit={handleSubmit(onSubmit)}>
      <p className="title-org"> {t("UserProfile.changermotdepasse")}</p>
      <div className="form-group">
        <label className="custom-label-org">{t("USER.PASSWORD")}</label>
        {shown ? (
          <IconContext.Provider value={{ className: "icon-eye" }}>
            <BsFillEyeSlashFill onClick={() => setShown(!shown)} />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ className: "icon-eye" }}>
            <BsFillEyeFill onClick={() => setShown(!shown)} />
          </IconContext.Provider>
        )}
        <input
          id="password"
          name="password"
          type={shown ? "text" : "password"}
          placeholder={t("USER.PASSWORD")}
          {...register("password")}
          className={`form-control custom-input-org ${
            errors.password ? "is-invalid" : ""
          }`}
        />

        <div className="invalid-feedback-drawer">
          {errors.password && <Icon />}
          {errors.password?.message}
        </div>
      </div>

      <div className="form-group">
        <label className="custom-label-org">{t("USER.CONFIRM-PASS")}</label>
        {shown ? (
          <IconContext.Provider value={{ className: "icon-eye2" }}>
            <BsFillEyeSlashFill onClick={() => setShown(!shown)} />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ className: "icon-eye2" }}>
            <BsFillEyeFill onClick={() => setShown(!shown)} />
          </IconContext.Provider>
        )}

        <input
          id="confirmepass"
          name="confirmepass"
          type={shown ? "text" : "password"}
          placeholder={t("USER.CONFIRM-PASS")}
          {...register("confirmepass")}
          className={`form-control custom-input-org ${
            errors.confirmepass ? "is-invalid" : ""
          }`}
        />

        <div className="invalid-feedback-drawer">
          {errors.confirmepass && <Icon />}
          {errors.confirmepass?.message}
        </div>
      </div>

      <div className="group-button">
        <button
          type="reset"
          className="btn btn-light custom-btn-cancel"
          onClick={HideUpdatePassWord}
        >
          {t("CONFIG-ORGANISATION.BUTTON-CANCEL")}
        </button>

        <button type="submit" className="btn btn-primary custom-btn-save ml-2">
          {t("PASSWORD.BUTTON-ENREGISTRER")}
        </button>
      </div>
    </form>
  );
};

export default UpdatePassword;
