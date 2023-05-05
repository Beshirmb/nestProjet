import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import styled from "styled-components";
const animatedComponents = makeAnimated();

const DataDevise = ({ Controller, control, errorDevise,defaultdevise,setselecteddevise }) => {
  const [t] = useTranslation(["translation", "devise"]);
  const [selectdevise, setSelectdevise] = useState(null);
  const DeviseValues = [
    { value: "AFN", label: t("devise:LIST-DEVISE.AFGHANI") },
    { value: "AWG", label: t("devise:LIST-DEVISE.ARUBAN-FLORIN") },
    { value: "AUD", label: t("devise:LIST-DEVISE.AUSTRALIAN-DOLLAR") },
    { value: "AZN", label: t("devise:LIST-DEVISE.AZERBAIJANIAN-MANAT") },
    { value: "THB", label: t("devise:LIST-DEVISE.BAHT") },
    { value: "PAB", label: t("devise:LIST-DEVISE.BALBOA") },
    { value: "ETB", label: t("devise:LIST-DEVISE.BIRR-ÉTHIOPIENNE") },
    { value: "VEF", label: t("devise:LIST-DEVISE.BOLIVAR") },
    { value: "BOB", label: t("devise:LIST-DEVISE.BOLIVIANO") },
    { value: "BND", label: t("devise:LIST-DEVISE.BRUNEI-DOLLAR") },
    { value: "CVE", label: t("devise:LIST-DEVISE.CABO-VERDE-ESCUDO") },
    { value: "KYD", label: t("devise:LIST-DEVISE.CAYMAN-ISLANDS-DOLLAR") },
    { value: "GHS", label: t("devise:LIST-DEVISE.CEDI-DU-GHANA") },
    { value: "XOF", label: t("devise:LIST-DEVISE.CFA-FRANC-BCEAO") },
    { value: "XAF", label: t("devise:LIST-DEVISE.CFA-FRANC-BEAC") },
    { value: "NIO", label: t("devise:LIST-DEVISE.CORDOBA") },
    { value: "CRC", label: t("devise:LIST-DEVISE.CORDOBA") },
    { value: "DKK", label: t("devise:LIST-DEVISE.COURONNE-DANOISE") },
    { value: "ISK", label: t("devise:LIST-DEVISE.COURONNE-ISLANDAISE") },
    { value: "NOK", label: t("devise:LIST-DEVISE.COURONNE-NORVÉGIENNE") },
    { value: "SEK", label: t("devise:LIST-DEVISE.COURONNE-SUÉDOISE") },
    { value: "CZK", label: t("devise:LIST-DEVISE.COURONNE-TCHÈQUE") },
    { value: "GMD", label: t("devise:LIST-DEVISE.DALASI") },
    { value: "MKD", label: t("devise:LIST-DEVISE.DENAR") },
    { value: "BHD", label: t("devise:LIST-DEVISE.DINAR-BAHRAINI") },
    { value: "IQD", label: t("devise:LIST-DEVISE.DINAR-IRAQUIEN") },
    { value: "KWD", label: t("devise:LIST-DEVISE.DINAR-KOWAITIEN") },
    { value: "RSD", label: t("devise:LIST-DEVISE.DINAR-SERBE") },
    { value: "DZD", label: t("devise:LIST-DEVISE.DINARS-ALGÉRIENS") },
    { value: "JOD", label: t("devise:LIST-DEVISE.DINARS-JORDANIEN") },
    { value: "LYD", label: t("devise:LIST-DEVISE.DINARS-LIBIEN") },
    { value: "TND", label: t("devise:LIST-DEVISE.DINARS-TUNISIENS") },
    { value: "MAD", label: t("devise:LIST-DEVISE.DIRHAM-MAROCAIN") },
    { value: "MAD", label: t("devise:LIST-DEVISE.DIRHAM-MAROCCAIN") },
    { value: "AED", label: t("devise:LIST-DEVISE.DIRHAM-UAE") },
    { value: "STD", label: t("devise:LIST-DEVISE.DOBRA") },
    { value: "AUD", label: t("devise:LIST-DEVISE.DOLLAR-AUSTRALIEN") },
    { value: "BSD", label: t("devise:LIST-DEVISE.DOLLAR-BAHAMÉEN") },
    { value: "BMD", label: t("devise:LIST-DEVISE.DOLLAR-BERMUDIEN") },
    { value: "CAD", label: t("devise:LIST-DEVISE.DOLLAR-CANADIEN") },
    { value: "BZD", label: t("devise:LIST-DEVISE.DOLLAR-DE-BÉLIZE") },
    { value: "HKD", label: t("devise:LIST-DEVISE.DOLLAR-DE-HONG-KONG") },
    {
      value: "XCD",
      label: t("devise:LIST-DEVISE.DOLLAR-DES-CARAÏBES-ORIENTALES"),
    },
    { value: "FJD", label: t("devise:LIST-DEVISE.DOLLAR-DES-FIJI") },
    { value: "SBD", label: t("devise:LIST-DEVISE.DOLLAR-DES-ÎLES-SOLOMON") },
    { value: "LRD", label: t("devise:LIST-DEVISE.DOLLAR-DU-LIBERIA") },
    { value: "GYD", label: t("devise:LIST-DEVISE.DOLLAR-GUYANIEN") },
    { value: "NAD", label: t("devise:LIST-DEVISE.DOLLAR-NAMIBIEN") },
    { value: "NZD", label: t("devise:LIST-DEVISE.DOLLAR-NÉO-ZÉLANDAIS") },
    { value: "SGD", label: t("devise:LIST-DEVISE.DOLLAR-SINGAPORIEN") },
    { value: "USD", label: t("devise:LIST-DEVISE.DOLLAR-US") },
    { value: "AUD", label: t("devise:LIST-DEVISE.DOLLARS-AUSTRALIENS") },
    { value: "BBD", label: t("devise:LIST-DEVISE.DOLLARS-BARBADOS") },
    {
      value: "TTD",
      label: t("devise:LIST-DEVISE.DOLLARS-DE-TRINIDAD-ET-TOBAGO"),
    },
    { value: "SRD", label: t("devise:LIST-DEVISE.DOLLARS-DU-SURINAM") },
    { value: "ZWL", label: t("devise:LIST-DEVISE.DOLLARS-DU-ZIMBABWE") },
    { value: "JMD", label: t("devise:LIST-DEVISE.DOLLARS-JAMAICAIN") },
    { value: "DONG", label: t("devise:LIST-DEVISE.DONG") },
    { value: "AMD", label: t("devise:LIST-DEVISE.DRAM-ARMENIEN") },
    { value: "EUR", label: t("devise:LIST-DEVISE.EURO") },
    {
      value: "ANG",
      label: t("devise:LIST-DEVISE.FLORIN-DES-ANTILLES-NÉERLANDAISES"),
    },
    { value: "HUF", label: t("devise:LIST-DEVISE.FORINT") },
    { value: "BIF", label: t("devise:LIST-DEVISE.FRANC-BURUNDI") },
    { value: "XOF", label: t("devise:LIST-DEVISE.FRANC-CFA BCEAO") },
    { value: "XAF", label: t("devise:LIST-DEVISE.FRANC-CFA BEAC") },
    { value: "XPF", label: t("devise:LIST-DEVISE.FRANC-CFP") },
    { value: "KMF", label: t("devise:LIST-DEVISE.FRANC-COMORIEN") },
    { value: "DJF", label: t("devise:LIST-DEVISE.FRANC-DJIBOUTIEN") },
    { value: "GNF", label: t("devise:LIST-DEVISE.FRANC-GUINÉEN") },
    { value: "RWF", label: t("devise:LIST-DEVISE.FRANC-RWANDAIS") },
    { value: "CHF", label: t("devise:LIST-DEVISE.FRANC-SUISSE") },
    { value: "CHW", label: t("devise:LIST-DEVISE.FRANC-WIR") },
    { value: "HTG", label: t("devise:LIST-DEVISE.GOURDE") },
    { value: "PYG", label: t("devise:LIST-DEVISE.GUARANI") },
    { value: "UAH", label: t("devise:LIST-DEVISE.HRYVNIA") },
    { value: "INR", label: t("devise:LIST-DEVISE.INDIAN-RUPEE-INDIENNE") },
    { value: "PGK", label: t("devise:LIST-DEVISE.KINA") },
    { value: "LAK", label: t("devise:LIST-DEVISE.KIP") },
    { value: "HRK", label: t("devise:LIST-DEVISE.KUNA") },
    { value: "MWK", label: t("devise:LIST-DEVISE.KWACHA") },
    { value: "ZMW", label: t("devise:LIST-DEVISE.KWACHA-ZAMBIEN") },
    { value: "AOA", label: t("devise:LIST-DEVISE.KWANZA") },
    { value: "MMK", label: t("devise:LIST-DEVISE.KYAT") },
    { value: "GEL", label: t("devise:LIST-DEVISE.LARI") },
    { value: "SVC", label: t("devise:LIST-DEVISE.LE-COLON-SALVADORIEN") },
    { value: "CDF", label: t("devise:LIST-DEVISE.LE-FRANC-CONGOLAIS") },
    { value: "ALL", label: t("devise:LIST-DEVISE.LEK") },
    { value: "HNL", label: t("devise:LIST-DEVISE.LEMPIRA") },
    { value: "SLL", label: t("devise:LIST-DEVISE.LEONE") },
    { value: "MDL", label: t("devise:LIST-DEVISE.LEU-MOLDAVIEN") },
    { value: "RON", label: t("devise:LIST-DEVISE.LEU-ROUMAIN") },
    { value: "BGN", label: t("devise:LIST-DEVISE.LEV-BULGARE") },
    { value: "SZL", label: t("devise:LIST-DEVISE.LILANGENI") },
    { value: "SHP", label: t("devise:LIST-DEVISE.LIVRE-DE-SAINT-HELENE") },
    { value: "FKP", label: t("devise:LIST-DEVISE.LIVRE-DES-ÎLES-MALOUINES") },
    { value: "SDG", label: t("devise:LIST-DEVISE.LIVRE-SOUDANAIS") },
    { value: "GBP", label: t("devise:LIST-DEVISE.LIVRE-STERLING") },
    { value: "GBP", label: t("devise:LIST-DEVISE.LIVRE-STERLLING") },
    { value: "SSP", label: t("devise:LIST-DEVISE.LIVRE-SUD-SOUDANAISE") },
    { value: "TRY", label: t("devise:LIST-DEVISE.LIVRE-TURQUE") },
    { value: "LSL", label: t("devise:LIST-DEVISE.LOTI") },
    { value: "MGA ", label: t("devise:LIST-DEVISE.MALAGASY ARIARY") },
    { value: "BAM", label: t("devise:LIST-DEVISE.MARK-CONVERTIBLE") },
    { value: "MUR", label: t("devise:LIST-DEVISE.MAURITIUS-RUPEE") },
    { value: "MZN", label: t("devise:LIST-DEVISE.METICAL") },
    {
      value: "MXV",
      label: t("devise:LIST-DEVISE.MEXICAN-UNIDAD-DE-INVERSION-(UDI)"),
    },
    { value: "BOV", label: t("devise:LIST-DEVISE.MVDOL") },
    { value: "NGN", label: t("devise:LIST-DEVISE.NAIRA") },
    { value: "ERN", label: t("devise:LIST-DEVISE.NAKFA") },
    { value: "NZD", label: t("devise:LIST-DEVISE.NÉO-ZÉLANDAIS") },
    { value: "BTN", label: t("devise:LIST-DEVISE.NGULTRUM") },
    { value: "TWD", label: t("devise:LIST-DEVISE.NOUVEAU-DOLLARS-TAIWANAIS") },
    { value: "ILS", label: t("devise:LIST-DEVISE.NOUVEAU-SHEQEL-ISRAÉLIEN") },
    { value: "PEN", label: t("devise:LIST-DEVISE.NOUVEAU-SOL") },
    { value: "MRO", label: t("devise:LIST-DEVISE.OUGUIYA") },
    { value: "TOP", label: t("devise:LIST-DEVISE.PA-ANGA") },
    { value: "0", label: t("devise:LIST-DEVISE.PAS-DE-INTERNATIONALE") },
    { value: "0", label: t("devise:LIST-DEVISE.PAS-DE-UNIVERSELLE") },
    { value: "MOP", label: t("devise:LIST-DEVISE.PATACA") },
    { value: "ARS", label: t("devise:LIST-DEVISE.PESO-ARGENTIN") },
    { value: "CLP", label: t("devise:LIST-DEVISE.PESO-CHILIEN") },
    { value: "COP", label: t("devise:LIST-DEVISE.PESO-COLOMBIEN") },
    { value: "CUC", label: t("devise:LIST-DEVISE.PESO-CONVERTIBLE") },
    { value: "CUP", label: t("devise:LIST-DEVISE.PESO-CUBAIN") },
    { value: "DOP", label: t("devise:LIST-DEVISE.PESO-DOMINICAIN") },
    { value: "MXN", label: t("devise:LIST-DEVISE.PESO-MEXICAIN") },
    { value: "PHP", label: t("devise:LIST-DEVISE.PESO-PHILLIPINS") },
    { value: "UYU", label: t("devise:LIST-DEVISE.PESO-URUGUAYEN") },
    { value: "GIP", label: t("devise:LIST-DEVISE.POUND-DE-GIBRALTAR") },
    { value: "EGP", label: t("devise:LIST-DEVISE.POUND-ÉGYPTIEN") },
    { value: "LBP", label: t("devise:LIST-DEVISE.POUND-LIBANAIS") },
    { value: "SYP", label: t("devise:LIST-DEVISE.POUND-SYRIEN") },
    { value: "BWP", label: t("devise:LIST-DEVISE.PULA") },
    { value: "GTQ", label: t("devise:LIST-DEVISE.QUETZAL") },
    { value: "ZAR", label: t("devise:LIST-DEVISE.RAND") },
    { value: "BRL", label: t("devise:LIST-DEVISE.REAL-BRÉSILIEN") },
    { value: "YER", label: t("devise:LIST-DEVISE.RIAL-DU-YEMENL") },
    { value: "IRR", label: t("devise:LIST-DEVISE.RIAL-IRANIEN") },
    { value: "OMR", label: t("devise:LIST-DEVISE.RIAL-OMANI") },
    { value: "QAR", label: t("devise:LIST-DEVISE.RIAL-QATARI") },
    { value: "KHR", label: t("devise:LIST-DEVISE.RIEL") },
    { value: "MYR", label: t("devise:LIST-DEVISE.RINGGI-MALAISIEN") },
    { value: "SAR", label: t("devise:LIST-DEVISE.RIYAL-SAOUDIENS") },
    { value: "BYR", label: t("devise:LIST-DEVISE.RUBLE-BIÉLORUSSE") },
    { value: "RUB", label: t("devise:LIST-DEVISE.RUBLE-RUSSE") },
    { value: "MVR", label: t("devise:LIST-DEVISE.RUFIYAA") },
    { value: "SCR", label: t("devise:LIST-DEVISE.RUPEE-DES-SEYCHELLES") },
    { value: "PKR", label: t("devise:LIST-DEVISE.RUPEE-DU-PAKISTAN") },
    { value: "INR", label: t("devise:LIST-DEVISE.RUPEE-INDIENNE") },
    { value: "NPR", label: t("devise:LIST-DEVISE.RUPEE-NÉPALAIS") },
    { value: "LKR", label: t("devise:LIST-DEVISE.RUPEE-SRI-LANKAIS") },
    { value: "IDR", label: t("devise:LIST-DEVISE.RUPIAH") },
    {
      value: "XDR",
      label: t("devise:LIST-DEVISE.SDR-(DROIT-DE-TIRAGE-SPÉCIAL)"),
    },
    { value: "KES", label: t("devise:LIST-DEVISE.SHILLING-KENYAN") },
    { value: "UGX", label: t("devise:LIST-DEVISE.SHILLING-OUGANDAISG") },
    { value: "SOS", label: t("devise:LIST-DEVISE.SHILLING-SOMALIEN") },
    { value: "TZS", label: t("devise:LIST-DEVISE.SHILLING-TANZANIEN") },
    { value: "KGS", label: t("devise:LIST-DEVISE.SOM") },
    { value: "TJS", label: t("devise:LIST-DEVISE.SOMONI") },
    { value: "XSU", label: t("devise:LIST-DEVISE.SUCRE") },
    { value: "UZS", label: t("devise:LIST-DEVISE.SUM-D'OUBEKISTAN") },
    { value: "CHF", label: t("devise:LIST-DEVISE.SWISS-FRANC") },
    { value: "BDT", label: t("devise:LIST-DEVISE.TAKA") },
    { value: "WST", label: t("devise:LIST-DEVISE.TALA") },
    { value: "KZT", label: t("devise:LIST-DEVISE.TENGE") },
    { value: "MNT", label: t("devise:LIST-DEVISE.TUGRIK") },
    { value: "TMT", label: t("devise:LIST-DEVISE.TURKMÉNISTAN-NOUVEAU-MANAT") },
    { value: "CLF", label: t("devise:LIST-DEVISE.UNIDAD-DE-FOMENTO") },
    { value: "COU", label: t("devise:LIST-DEVISE.UNIDAD-DE-VALOR-REAL") },
    { value: "XUA", label: t("devise:LIST-DEVISE.UNITÉ-DE-COMPTE-DE-LA-BAD") },
    {
      value: "UYI",
      label: t(
        "devise:LIST-DEVISE.URUGUAY-PESO-EN-UNIDADES-INDEXADAS-(URUIURUI)"
      ),
    },
    { value: "USD", label: t("devise:LIST-DEVISE.US-DOLLAR") },
    { value: "VUV", label: t("devise:LIST-DEVISE.VATU") },
    { value: "CHE", label: t("devise:LIST-DEVISE.WIR-EURO") },
    { value: "KRW", label: t("devise:LIST-DEVISE.WON") },
    { value: "KPW", label: t("devise:LIST-DEVISE.WON-NORD-CORÉEN") },
    { value: "JPY", label: t("devise:LIST-DEVISE.YEN") },
    { value: "CNY", label: t("devise:LIST-DEVISE.YUAN-RENMINBI") },
    { value: "PLN", label: t("devise:LIST-DEVISE.ZLOTY") },
  ];
  const ondeviseSelect = (e) => {
    setSelectdevise(e);
    setselecteddevise(e.value)
  };
  return (
    <>
      <Controller
        name="Devise"
        isClearable
        control={control}
        render={({ field }) => (
          <StyledSelect
            classNamePrefix={errorDevise ? "select_control" : "Select"}
           
            components={animatedComponents}
            placeholder={t("CONFIG-ORGANISATION.SHADOW.DEVISE")}
            {...field}
            onChange={ondeviseSelect}
            options={DeviseValues}
            value = {selectdevise ? selectdevise : DeviseValues.filter(el =>el.value === defaultdevise)[0]}
            
          
          />
        )}
      />
    </>
  );
};

export default DataDevise;

export const StyledSelect = styled(Select)`


.select_control__control {
  border: 1px solid #e96464;
  background-color: rgba(235, 87, 87, 0.1);
  box-shadow: 0 0 0 0.2rem #f5d0d0;
}
  .Select__control--is-focused {
    box-shadow: 0 0 0 0.2rem #bbd6f8;
    outline: none;
  }

    .Select__indicator-separator {
      border: none;
    }
  }

  .Select__indicator-separator {
    display: none;
  }
`;
