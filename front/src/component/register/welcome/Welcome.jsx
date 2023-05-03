import React from "react";
import { BiMailSend } from "react-icons/bi";
import { IconContext } from "react-icons";
import { useTranslation } from "react-i18next";
import "../../../assets/sass/pages/welcome.scss";

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="custom-welcome">
        <div className="icon-welcome mt-5 mb-5">
          <IconContext.Provider value={{ className: "icon-welcome" }}>
            <BiMailSend />
          </IconContext.Provider>
        </div>

        <p className="title-welcome">{t("WELCOME.M-BIENVENUE")}</p>

        <div
          className="text-center  sub-title-welcome-desc"
          dangerouslySetInnerHTML={{
            __html: t("WELCOME.MESSAGE-EMAIL-ACTIVATION"),
          }}
        ></div>
      </div>
    </>
  );
};

export default Welcome;
