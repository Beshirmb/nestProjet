import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GetOrganisation } from "../../redux/actions/organisationaction";
import Form from "./Form";
import { decodetoken } from "../../utile";
import { Link } from "react-router-dom";

const Organisation = ({ history }) => {
  const [t] = useTranslation(["translation"]);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const hideSideBar = () => {
    setSidebar(!sidebar);
  };

  const GetOrganisationData = useSelector(
    (state) => state.GetOrganisationReducers
  );

  const { message } = GetOrganisationData;

  useEffect(() => {
    const token = decodetoken();
    if (token && !message)
     dispatch(GetOrganisation(token._id));
  }, [dispatch]);

  return (
    <div className="container main-organisation">
      <div className="group-header">
        <button className="button-prev-organisation">
          <Link to="/">
            <IconContext.Provider value={{ className: "icon-arrow" }}>
              <BsArrowLeft />
            </IconContext.Provider>
          </Link>
        </button>

        <div className="title-organisation">
          {t("CONFIG-ORGANISATION.ORGANISATION")}
        </div>
      </div>

      <div className={sidebar ? "overlay is-open" : "overlay"}></div>

      <div className="shadow-lg rounded custom-shadow">
        <div className="row">
          <div className="col-lg-5">
            <p className="label-card">
              {t("CONFIG-ORGANISATION.SHADOW.ORGANISATION-NAME")}
            </p>
            <p className="text-card">{message.name}</p>
          </div>

          <div className="col-lg-5">
            <p className="label-card">
              {t("CONFIG-ORGANISATION.SHADOW.NUMERO-TELE")}
            </p>
            <p className="text-card">{message?.tel || ""}</p>
          </div>
          <div className="col-lg-2">
            <span className="label-card">
              <IconContext.Provider value={{ className: "icon-edit" }}>
                <MdModeEdit onClick={showSidebar} />
              </IconContext.Provider>
            </span>
          </div>
        </div>
        <hr className="custom-bar" />
        <div className="row">
          <div className="col-lg-5">
            <p className="label-card">{t("CONFIG-ORGANISATION.SHADOW.PAYS")}</p>
            <p className="text-card">{message?.country || ""}</p>
          </div>

          <div className="col-lg-7">
            <p className="label-card">
              {t("CONFIG-ORGANISATION.SHADOW.DEVISE")}
            </p>
            <p className="text-card">{message?.devise || ""}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5">
            <p className="label-card">
              {t("CONFIG-ORGANISATION.SHADOW.EMAIL-FACTURATION")}
            </p>
            <p className="text-card">{message.email}</p>
          </div>
        </div>
      </div>

      <div
        className={
          sidebar && i18n.language !== "ar"
            ? "nav-menu active"
            : sidebar && i18n.language === "ar"
            ? "arnav-menu active"
            : "nav-menu"
        }
      >
        <Form hideSideBar={hideSideBar} sidebar={sidebar} />
      </div>
    </div>
  );
};

export default Organisation;
