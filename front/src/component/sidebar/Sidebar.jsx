import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { decodetoken } from "../../utile/index";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../../redux/actions/UserProfileAction";
import user from "../../assets/images/user.jpg";

function Sidebar({ show }) {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  let history = useHistory();
  const [statelangage, setstatelangage] = useState("");

  const deconextion = () => {
    localStorage.clear();
    history.push("/");
  };

  const GetUserData = useSelector((state) => state.GetUserProfileReducers);

  const { message } = GetUserData;

  useEffect(() => {
    const token = decodetoken();
    if (token && !message) dispatch(GetUserProfile(token._id));
  }, [dispatch]);
  return (
    <div className={show ? "d-none d-sm-block sidebar" : "d-block sidebar"}>
      <div className="pro-sidebar md ">
        <div className="pro-sidebar-inner ">
          <div className="pro-sidebar-layout">
            <div className="dropdown m-2">
              <div
                id="profil"
                className="d-flex justify-content-evenly align-items-center borderrs"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={user}
                  className="rounded-circle ml-3 image-user"
                  alt="logo"
                ></img>
                <div className="ml-3 mt-1">
                  <span className="font-sizetitel">
                    {message?.name ? (
                      <> {message?.name + " " + message?.lastName} </>
                    ) : (
                      "Nom Prénom"
                    )}
                  </span>
                  <div className="d-flex">
                    <p className="p-2 with-150  text-primary d-flex  justify-content-between align-items-center">
                      <span className="mr-2 font-sizedoc">30</span>
                      <span className="documentrestant">
                        {" "}
                        {t("Sidebar.Documentrestant")}{" "}
                      </span>
                    </p>

                    <i className="far fa-chevron-down ml-3 pl-1  mr-1 font-weight-bold"></i>
                  </div>
                </div>
              </div>

              <div
                className="dropdown-menu shadowtop"
                style={{ width: "100%" }}
                aria-labelledby="profil"
              >
                <NavLink
                  exact
                  className="colorsubmenu"
                  activeClassName="active"
                  to="/admin/organisation"
                >
                  <i className="icon-organisation pl-2 mr-2"></i>
                  {t("Sidebar.Organisation")}{" "}
                </NavLink>
                <NavLink
                  exact
                  className="colorsubmenu"
                  activeClassName="active"
                  to="/admin/user-profile"
                >
                  {" "}
                  <i className="icon-profil pl-2 mr-2"></i>{" "}
                  {t("Sidebar.Profil")}{" "}
                </NavLink>

                <p onClick={deconextion} className="colorsubmenu">
                  <i className="icon-deconection pl-2 mr-2"></i>{" "}
                  {t("Sidebar.Déconnection")}{" "}
                </p>
              </div>
            </div>

            <hr className="m-2" />
            <div className="section">
              <div className="ml-1">
                <p
                  className={
                    i18n.language === "fr"
                      ? "labelslider mt-2"
                      : "labelslider-ar mt-2"
                  }
                >
                  {t("Sidebar.Titre_Macomptabilite")}
                </p>

                <NavLink
                  className="colorsubmenu "
                  exact
                  activeClassName="active"
                  to="/admin/dashboard"
                >
                  {" "}
                  <span className="icon-dashbord pl-2 mr-2"></span>{" "}
                  {t("Sidebar.Dashboard")}
                </NavLink>
                <NavLink
                  className="colorsubmenu "
                  exact
                  activeClassName="active"
                  to="/admin/clients"
                >
                  <span className="icon-client pl-2 mr-2"></span>{" "}
                  {t("Sidebar.Client")}
                </NavLink>
                <NavLink
                  className="colorsubmenu "
                  exact
                  activeClassName="active"
                  to="/admin/suppliers"
                >
                  <span className="icon-fournisseur pl-2 mr-2"></span>{" "}
                  {t("Sidebar.Fournissuer")}
                </NavLink>
              </div>
              <hr className="m-2" />
              <div className="dropdown ">
                <div
                  id="parmetre"
                  className={
                    i18n.language === "fr"
                      ? "labelslider mt-2"
                      : "labelslider-ar mt-2"
                  }
                  data-display="static"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span> {t("Sidebar.Mesparametre")}</span>{" "}
                  <i
                    className={
                      statelangage === "ar"
                        ? "float-left arrotate far fa-chevron-down  font-weight-bold "
                        : "rotate far fa-chevron-down  font-weight-bold"
                    }
                  ></i>
                </div>

                <div
                  className="dropdown-menu border-0"
                  style={{ width: "100%" }}
                  aria-labelledby="parmetre"
                >
                  <NavLink
                    className="colorsubmenu"
                    exact
                    activeClassName="active"
                    to="/admin/organisation"
                  >
                    <i className="icon-organisation pl-2 mr-2"></i>{" "}
                    {t("Sidebar.Organisation")}{" "}
                  </NavLink>
                  <NavLink
                    exact
                    className="colorsubmenu"
                    activeClassName="active"
                    to="/admin/my-category"
                  >
                    <i className="icon-category pl-2 mr-2"></i>
                    {t("Sidebar.Mescategories")}{" "}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
