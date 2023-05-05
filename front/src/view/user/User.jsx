import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import user from "../../assets/images/user.jpg";
import { MdModeEdit } from "react-icons/md";
import UpdateProfile from "./UpdateProfil";
import UpdatePassword from "./UpdatePassword";

import { useSelector } from "react-redux";

const User = () => {
  const { t, i18n } = useTranslation();
  const [UpdateProfil, setUpdateProfil] = useState(false);
  const [UpdatePassWord, setUpdatePassWord] = useState(false);

  const ShowUpdateProfil = () => {
    setUpdateProfil(!UpdateProfil);
  };

  const HideUpdateProfil = () => {
    setUpdateProfil(!UpdateProfil);
  };

  const ShowUpdatePassWord = () => {
    setUpdatePassWord(!UpdatePassWord);
  };

  const HideUpdatePassWord = () => {
    setUpdatePassWord(!UpdatePassWord);
  };

  const GetUserData = useSelector((state) => state.GetUserProfileReducers);

  const { message } = GetUserData;

  return (
    <div className="container main-user">
      <div className={UpdateProfil ? "overlay is-open" : "overlay"}></div>
      <div className={UpdatePassWord ? "overlay is-open" : "overlay"}></div>

      <div className="group-header">
        <button className="button-prev-organisation">
          <Link to="/">
            <IconContext.Provider value={{ className: "icon-arrow" }}>
              <BsArrowLeft />
            </IconContext.Provider>
          </Link>
        </button>

        <div className="title-organisation">{t("UserProfile.titelProfil")}</div>
      </div>

      <div className="shadow-lg rounded custom-shadow">
        <div className="row">
          <div className="col-lg-5">
            <img
              src={message?.image || user}
              className="image-user"
              alt="avatar"
            />
          </div>

          <div className="col-lg-5">
            <p className="label-card">{t("USER.NOM")}</p>
            <p className="text-card">{message?.name || t("USER.NOM")}</p>
            <p className="label-card">{t("USER.PRENOM")}</p>
            <p className="text-card">{message?.lastName || t("USER.PRENOM")}</p>
          </div>
          <div className="col-lg-2">
            <span className="label-card">
              <IconContext.Provider value={{ className: "icon-edit" }}>
                <MdModeEdit onClick={ShowUpdateProfil} />
              </IconContext.Provider>
            </span>
          </div>
        </div>
        <hr className="custom-bar" />
        <div className="row">
          <div className="col-lg-5">
            <p className="label-card">{t("USER.NUM-TELE")}</p>
            <p className="text-card">
              {message?.phoneNumber || t("USER.NUM-TELE")}
            </p>
          </div>

          <div className="col-lg-7">
            <p className="label-card">{t("USER.EMAIL")}</p>
            <p className="text-card">{message?.email || t("USER.EMAIL")}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-7">
            <p className="label-card">{t("USER.ADRESSE")}</p>
            <p className="text-card">{message?.adresse || t("USER.ADRESSE")}</p>
          </div>
        </div>

        <hr className="custom-bar" />
        <p
          type="button"
          className="change-pass-word"
          onClick={ShowUpdatePassWord}
        >
          {t("UserProfile.changermotdepasse")}
        </p>
      </div>

      <div
        className={
          UpdateProfil && i18n.language !== "ar"
            ? "nav-menu active"
            : UpdateProfil && i18n.language === "ar"
              ? "arnav-menu active"
              : "nav-menu"
        }
      >
        <UpdateProfile
          HideUpdateProfil={HideUpdateProfil}
          UpdateProfil={UpdateProfil}
        />
      </div>

      <div
        className={
          UpdatePassWord && i18n.language !== "ar"
            ? "nav-menu active"
            : UpdatePassWord && i18n.language === "ar"
              ? "arnav-menu active"
              : "nav-menu"
        }
      >
        <UpdatePassword
          HideUpdatePassWord={HideUpdatePassWord}
          UpdatePassWord={UpdatePassWord}
        />
      </div>
    </div>
  );
};

export default User;
