
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import classNames from "classnames";
import { MdArrowDropDown } from "react-icons/md";


const languages = [
  {
    code: "fr",
    name: "Français",
    country_code: "fr",
  },
  {
    code: "ar",
    name: "Arabe",
    dir: "rtl",
    country_code: "ar",
  },
];


export default function App() {
  const currentLanguageCode = cookies.get("i18next") || "fr";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();


  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("APP-TITLE");
  }, [currentLanguage, t]);

  return (

    <div className="custom-translate">
      <span className="custom-copy-right">
        &copy;{new Date().getFullYear()} {t("COPY-RIGHT")}
      </span>

      <div className="language-select">
        <div className="dropdown">
          <button
            className="custom-translate-button"
            type="button"
            data-toggle="dropdown"
          >
            {t("LANGUE")} <MdArrowDropDown />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {languages.map(({ code, name, country_code }) => (
              <li key={country_code}>

                <span 
                  className={classNames("dropdown-item" , {
                    disabled: currentLanguageCode === code,
                  })}
                  onClick={() => {
                    i18next.changeLanguage(code);
                  }}
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>

  
       
    </div>
    </div>
    </div>
  );
}
