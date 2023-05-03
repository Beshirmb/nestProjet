import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";

const languages = [
  {
    index: 1,
    code: "fr",
    name: "Français",
    country_code: "fr",
  },
  {
    index: 2,
    code: "ar",
    name: "Arabe",
    dir: "rtl",
    country_code: "ar",
  },
];

export default function Footer() {
  const currentLanguageCode = cookies.get("i18next") || "fr";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("APP-TITLE");
  }, [currentLanguage, t]);

  return (

    <div className="custom_footer flexfooter dashbordfooter positionfooter">
      <span
        className={currentLanguageCode === "ar" ? "pr-2 mr-4" : "pl-2 ml-5"}
      >
        &copy;{new Date().getFullYear()} {t("COPY-RIGHT")}
      </span>

      <div
        className={
          currentLanguageCode === "ar"
            ? "language-select ml-5"
            : "language-select mr-5"
        }
      >
      
      <select
            className="optionclass"
          defaultValue=  {currentLanguageCode}
          onChange={(e) => i18next.changeLanguage(e.target.value)}
          >
          
        
          {languages.map(({ code, name, country_code }) => (
                <option 
                className="dropdown-item"
                  value={code} 
                >
                  {name}
                </option>
           
            ))}
            </select>
      </div>
    </div>

  );
}
