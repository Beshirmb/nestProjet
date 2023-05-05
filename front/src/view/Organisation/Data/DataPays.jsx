import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import styled from "styled-components";
const animatedComponents = makeAnimated();
const Datapayes = ({ Controller, control,errorPays,country,setselectedcountry }) => {
  const [t] = useTranslation(["translation", "pays"]);
  const [selectCity, setSelectCity] = useState(null);
   const PaysValues = [
    { value: "Afganistan", label:  t("pays:LIST-PAYS.AFGHANISTAN") },
    { value: "Albania", label: t("pays:LIST-PAYS.ALBANIA") },
    { value: "Algeria", label: t("pays:LIST-PAYS.ALGERIA") },
    { value: "American Samoa", label: t("pays:LIST-PAYS.AMERICAN-SAMOA") },
    { value: "Andorra", label: t("pays:LIST-PAYS.ANDORRA") },
    { value: "Angola", label: t("pays:LIST-PAYS.ANGOLA") },
    { value: "Anguilla", label: t("pays:LIST-PAYS.ANGUILLA") },
    { value: "Antigua & Barbuda", label: t("pays:LIST-PAYS.ANTIGUA-BARBUDA") },
    { value: "Argentina", label: t("pays:LIST-PAYS.ARGENTINA") },
    { value: "Armenia", label: t("pays:LIST-PAYS.ARMENIA") },
    { value: "Aruba", label: t("pays:LIST-PAYS.ARUBA" )},
    { value: "Australia", label: t("pays:LIST-PAYS.AUSTRALIA") },
    { value: "Austria", label: t("pays:LIST-PAYS.AUSTRIA") },
    { value: "Azerbaijan", label: t("pays:LIST-PAYS.AZERRBAIJAN") },
    { value: "Bahamas", label: t("pays:LIST-PAYS.BAHAMAS") },
    { value: "Bahrain", label: t("pays:LIST-PAYS.BAHRAIN") },
    { value: "Bangladesh", label: t("pays:LIST-PAYS.BANGLADESH") },
    { value: "Barbados", label: t("pays:LIST-PAYS.BARBADOS") },
    { value: "Belarus", label: t("pays:LIST-PAYS.BELARUS") },
    { value: "Belgium", label: t("pays:LIST-PAYS.BELGIUM") },
    { value: "Belize", label: t("pays:LIST-PAYS.BELIZE") },
    { value: "Benin", label: t("pays:LIST-PAYS.BENIN" )},
    { value: "Bermuda", label: t("pays:LIST-PAYS.BERMUDA") },
    { value: "Bhutan", label: t("pays:LIST-PAYS.BHUTAN") },
    { value: "Bolivia", label: t("pays:LIST-PAYS.BOLIVIA") },
    { value: "Bonaire", label: t("pays:LIST-PAYS.BONAIRE") },
    {
      value: "Bosnia & Herzegovina",
      label: t("pays:LIST-PAYS.BOSNIA-HERZEGOVINA"),
    },
    { value: "Botswana", label: t("pays:LIST-PAYS.BOTSWANA") },
    { value: "Brazil", label: t("pays:LIST-PAYS.BRAZIL") },
    {
      value: "British Indian Ocean Ter",
      label: t("pays:LIST-PAYS.BRITISH-INDIAN-OCEAN-TER"),
    },
    { value: "Brunei", label: t("pays:LIST-PAYS.BRUNEI") },
    { value: "Bulgaria", label: t("pays:LIST-PAYS.BULGARIA") },
    { value: "Burkina Faso", label: t("pays:LIST-PAYS.BURKINA-FASO") },
    { value: "Burundi", label: t("pays:LIST-PAYS.BURUNDI") },
    { value: "Cambodia", label: t("pays:LIST-PAYS.CAMBODIA") },
    { value: "Cameroon", label:t("pays:LIST-PAYS.CAMEROON") },
    { value: "Canada", label: t("pays:LIST-PAYS.CANADA") },
    { value: "Canary Islands", label: t("pays:LIST-PAYS.CANARY-ISLANDS") },
    { value: "Cape Verde", label: t("pays:LIST-PAYS.CAPE-VERDE") },
    { value: "Cayman Islands", label: t("pays:LIST-PAYS.CAYMAN-ISLAND") },
    {
      value: "Central African Republic",
      label: t("pays:LIST-PAYS.CENTRAL-AFRICAN-REPUBLIC",
   ) },
    { value: "Chad", label: t("pays:LIST-PAYS.CHAD") },
    { value: "Channel Islands", label: t("pays:LIST-PAYS.CHANNEL-ISLANDS") },
    { value: "Chile", label: t("pays:LIST-PAYS.CHILE") },
    { value: "China", label: t("pays:LIST-PAYS.CHINA") },
    { value: "Christmas Island", label: t("pays:LIST-PAYS.CHRISMAN-ISLAND") },
    { value: "Cocos Island", label: t("pays:LIST-PAYS.COCOS-ISLAND") },
    { value: "Colombia", label: t("pays:LIST-PAYS.COLOMBIA") },
    { value: "Comoros", label: t("pays:LIST-PAYS.COMOROS") },
    { value: "Congo", label: t("pays:LIST-PAYS.CONGO") },
    { value: "Cook Islands", label: t("pays:LIST-PAYS.COOK-ISLANDS") },
    { value: "Costa Rica", label: t("pays:LIST-PAYS.COSTA-RICA") },
    { value: "Cote DIvoire", label: t("pays:LIST-PAYS.COTE-DIVOIRE") },
    { value: "Croatia", label: t("pays:LIST-PAYS.CORATIA") },
    { value: "Cuba", label: t("pays:LIST-PAYS.CUBA") },
    { value: "Curaco", label: t("pays:LIST-PAYS.CURACO") },
    { value: "Cyprus", label: t("pays:LIST-PAYS.CYPRUS") },
    { value: "Czech Republic", label: t("pays:LIST-PAYS.CZECH-REPUBLIC") },
    { value: "Denmark", label: t("pays:LIST-PAYS.DENMARK") },
    { value: "Djibouti", label: t("pays:LIST-PAYS.DJIBOUTI") },
    { value: "Dominica", label: t("pays:LIST-PAYS.DOMINICA") },
    {
      value: "Dominican Republic",
      label: t("pays:LIST-PAYS.DOMINICAN-REPUBLIC",
   ) },
    { value: "East Timor", label: t("pays:LIST-PAYS.EAST-TIMOR") },
    { value: "Ecuador", label: t("pays:LIST-PAYS.ECUADOR") },
    { value: "Egypt", label: t("pays:LIST-PAYS.EGYPT") },
    { value: "El Salvador", label: t("pays:LIST-PAYS.EL-SLVADOR") },
    {
      value: "Equatorial Guinea",
      label: t("pays:LIST-PAYS.EQUATORIAL-GUNIEA",
   ) },
    { value: "Eritrea", label: t("pays:LIST-PAYS.ERITREA") },
    { value: "Estonia", label: t("pays:LIST-PAYS.ESTONIA") },
    { value: "Ethiopia", label: t("pays:LIST-PAYS.ETHIOPIA") },
    { value: "Falkland Islands", label: t("pays:LIST-PAYS.FALKLAND-ISLANDS") },
    { value: "Faroe Islands", label: t("pays:LIST-PAYS.FAROE-ISLANDS") },
    { value: "Fiji", label: t("pays:LIST-PAYS.FIJI") },
    { value: "Finland", label: t("pays:LIST-PAYS.FINLAND") },
    { value: "France", label: t("pays:LIST-PAYS.FRANCE") },
    { value: "French Guiana", label: t("pays:LIST-PAYS.FRENCH-GUIANA") },
    { value: "French Polynesia", label: t("pays:LIST-PAYS.FRENCH-POLYNSESIA") },
    {
      value: "French Southern Ter",
      label: t("pays:LIST-PAYS.FRANCH-SOUTHERN-TER",
   ) },
    { value: "Gabon", label: t("pays:LIST-PAYS.GABON") },
    { value: "Gambia", label: t("pays:LIST-PAYS.GAMBIA") },
    { value: "Georgia", label: t("pays:LIST-PAYS.GOERGIA") },
    { value: "Germany", label: t("pays:LIST-PAYS.GERMANY") },
    { value: "Ghana", label: t("pays:LIST-PAYS.GHANA") },
    { value: "Gibraltar", label: t("pays:LIST-PAYS.GIBRALTAR") },
    { value: "Great Britain", label: t("pays:LIST-PAYS.GREAT-BRITAIN") },
    { value: "Greece", label: t("pays:LIST-PAYS.GREECE") },
    { value: "Greenland", label: t("pays:LIST-PAYS.GREENLAND") },
    { value: "Grenada", label: t("pays:LIST-PAYS.GRENADA") },
    { value: "Guadeloupe", label: t("pays:LIST-PAYS.GUADELOUPE") },
    { value: "Guam", label: t("pays:LIST-PAYS.GUAM") },
    { value: "Guatemala", label: t("pays:LIST-PAYS.GUATEMALA") },
    { value: "Guinea", label: t("pays:LIST-PAYS.GUINEA") },
    { value: "Guyana", label: t("pays:LIST-PAYS.GUYANA") },
    { value: "Haiti", label: t("pays:LIST-PAYS.HAITI") },
    { value: "Hawaii", label: t("pays:LIST-PAYS.HAWAII") },
    { value: "Honduras", label: t("pays:LIST-PAYS.HANDURAS") },
    { value: "Hong Kong", label: t("pays:LIST-PAYS.HONG-KONG") },
    { value: "Hungary", label: t("pays:LIST-PAYS.HANGARY") },
    { value: "Indonesia", label: t("pays:LIST-PAYS.INDONESIA") },
    { value: "Iceland", label: t("pays:LIST-PAYS.ICELAND") },
    { value: "India", label: t("pays:LIST-PAYS.INDIA") },
    { value: "Iran", label: t("pays:LIST-PAYS.IRAN") },
    { value: "Iraq", label: t("pays:LIST-PAYS.IRAQ") },
    { value: "Ireland", label: t("pays:LIST-PAYS.IRELAND") },
    { value: "Isle of Man", label: t("pays:LIST-PAYS.ISLE-OF-MAN") },
    { value: "Israel", label: t("pays:LIST-PAYS.ISRAEL") },
    { value: "Italy", label: t("pays:LIST-PAYS.ITALY") },
    { value: "Jamaica", label: t("pays:LIST-PAYS.JAMAICA") },
    { value: "Japan", label: t("pays:LIST-PAYS.JAPAN") },
    { value: "Jordan", label: t("pays:LIST-PAYS.JORDAN") },
    { value: "Kazakhstan", label: t("pays:LIST-PAYS.KAZAKHSTAN") },
    { value: "Kenya", label: t("pays:LIST-PAYS.KENYA") },
    { value: "Kiribati", label: t("pays:LIST-PAYS.KIRIBATI") },
    { value: "Korea North", label: t("pays:LIST-PAYS.KOREA-NORTH") },
    { value: "Korea Sout", label: t("pays:LIST-PAYS.KOREA-SOUTH") },
    { value: "Kuwait", label: t("pays:LIST-PAYS.KUWAIT") },
    { value: "Kyrgyzstan", label: t("pays:LIST-PAYS.KYEGYZSTAN") },
    { value: "Laos", label: t("pays:LIST-PAYS.LAOS") },
    { value: "Latvia", label: t("pays:LIST-PAYS.LATVIA") },
    { value: "Lebanon", label: t("pays:LIST-PAYS.LEBANON") },
    { value: "Lesotho", label: t("pays:LIST-PAYS.LESOTHO") },
    { value: "Liberia", label: t("pays:LIST-PAYS.LIBERIA") },
    { value: "Libya", label: t("pays:LIST-PAYS.LIBYA") },
    { value: "Liechtenstein", label: t("pays:LIST-PAYS.LUXEMBOURG") },
    { value: "Lithuania", label: t("pays:LIST-PAYS.LITHUANIA") },
    { value: "Luxembourg", label: t("pays:LIST-PAYS.LUXEMBOURG") },
    { value: "Macau", label: t("pays:LIST-PAYS.MACAU") },
    { value: "Macedonia", label: t("pays:LIST-PAYS.MACEDONIA") },
    { value: "Madagascar", label: t("pays:LIST-PAYS.MADAGASCAR") },
    { value: "Malaysia", label: t("pays:LIST-PAYS.MALAYSIA") },
    { value: "Malawi", label: t("pays:LIST-PAYS.MALAWI") },
    { value: "Maldives", label: t("pays:LIST-PAYS.MALDIVES") },
    { value: "Mali", label: t("pays:LIST-PAYS.MALI") },
    { value: "Malta", label: t("pays:LIST-PAYS.MALTA") },
    { value: "Marshall Islands", label: t("pays:LIST-PAYS.MARSHALL-ISLANDS") },
    { value: "Martinique", label: t("pays:LIST-PAYS.MARTINIQUE") },
    { value: "Mauritania", label: t("pays:LIST-PAYS.MAURITANIA") },
    { value: "Mauritius", label: t("pays:LIST-PAYS.MAURITIUS") },
    { value: "Mayotte", label: t("pays:LIST-PAYS.MAYOTTE") },
    { value: "Mexico", label: t("pays:LIST-PAYS.MEXICO") },
    { value: "Midway Islands", label: t("pays:LIST-PAYS.MIDWAY-ISLANDS") },
    { value: "Moldova", label: t("pays:LIST-PAYS.MOLDOVA") },
    { value: "Monaco", label: t("pays:LIST-PAYS.MONACO") },
    { value: "Mongolia", label: t("pays:LIST-PAYS.MONGOLIA") },
    { value: "Montserrat", label: t("pays:LIST-PAYS.MONTSERRAT") },
    { value: "Morocco", label: t("pays:LIST-PAYS.MOROCCO") },
    { value: "Mozambique", label: t("pays:LIST-PAYS.MOZAMBIQUE") },
    { value: "Myanmar", label: t("pays:LIST-PAYS.MYANMAR") },
    { value: "Nambia", label: t("pays:LIST-PAYS.NAMBIA") },
    { value: "Nauru", label: t("pays:LIST-PAYS.NAURU") },
    { value: "Nepal", label: t("pays:LIST-PAYS.NEPAL") },
    {
      value: "Netherland Antilles",
      label: t("pays:LIST-PAYS.NETHERLAND-ANTILLES",
   ) },
    { value: "Netherlands", label: t("pays:LIST-PAYS.NETHERLANDS") },
    { value: "Nevis", label: t("pays:LIST-PAYS.NEVIS") },
    { value: "New Caledonia", label: t("pays:LIST-PAYS.NEW-CALEDONIA") },
    { value: "New Zealand", label: t("pays:LIST-PAYS.NEW-ZEALAND") },
    { value: "Nicaragua", label: t("pays:LIST-PAYS.NICARAGUA") },
    { value: "Niger", label: t("pays:LIST-PAYS.NIGER") },
    { value: "Nigeria", label: t("pays:LIST-PAYS.NIGERIA") },
    { value: "Niue", label: t("pays:LIST-PAYS.NIUE") },
    { value: "Norfolk Island", label: t("pays:LIST-PAYS.NORFOLK-ISLAND") },
    { value: "Norway", label: t("pays:LIST-PAYS.NORWAY") },
    { value: "Oman", label: t("pays:LIST-PAYS.OMAN") },
    { value: "Pakistan", label: t("pays:LIST-PAYS.PAKISTAN") },
    { value: "Palau Island", label: t("pays:LIST-PAYS.PALAU-ISLAND") },
    { value: "Palestine", label: t("pays:LIST-PAYS.PALESTINE") },
    { value: "Panama", label: t("pays:LIST-PAYS.PANAMA") },
    { value: "Papua New Guinea", label: t("pays:LIST-PAYS.PAPUA-NEW-GUINEA") },
    { value: "Paraguay", label: t("pays:LIST-PAYS.PARAGUAY") },
    { value: "Peru", label: t("tpays:LIST-PAYS.PERU") },
    { value: "Phillipines", label: t("pays:LIST-PAYS.PHILLIPINES") },
    { value: "Pitcairn Island", label: t("pays:LIST-PAYS.PITCAIRN-ISLAND") },
    { value: "Poland", label: t("pays:LIST-PAYS.POLAND") },
    { value: "Portugal", label: t("pays:LIST-PAYS.PORTUGAL") },
    { value: "Puerto Rico", label: t("pays:LIST-PAYS.PUERTO-RICO") },
    { value: "Qatar", label: t("pays:LIST-PAYS.QATAR") },
    {
      value: "Republic of Montenegro",
      label: t("pays:LIST-PAYS.REPUBLIC-OF-MONTENEGRO",
   ) },
    {
      value: "Republic of Serbia",
      label: t("pays:LIST-PAYS.REPUBLIC-OF-SERBIA",
   ) },
    { value: "Reunion", label: t("pays:LIST-PAYS.REUNION") },
    { value: "Romania", label: t("pays:LIST-PAYS.ROMANIA") },
    { value: "Russia", label: t("pays:LIST-PAYS.RUSSIA") },
    { value: "Rwanda", label: t("pays:LIST-PAYS.RWANDA") },
    { value: "St Barthelemy", label: t("pays:LIST-PAYS.ST-BARTHELEMY") },
    { value: "St Eustatius", label: t("pays:LIST-PAYS.ST-EUSTATIUS") },
    { value: "St Helena", label: t("pays:LIST-PAYS.ST-HELENA") },
    { value: "St Kitts-Nevis", label: t("pays:LIST-PAYS.ST-KITTS-NEVIS") },
    { value: "St Lucia", label: t("pays:LIST-PAYS.ST-LUCIA") },
    { value: "St Maarten", label: t("pays:LIST-PAYS.ST-MAARTEN") },
    {
      value: "St Pierre & Miquelon",
      label: t("pays:LIST-PAYS.ST-PIERRE-MILQUELON",
   ) },
    {
      value: "St Vincent & Grenadines",
      label: t("pays:LIST-PAYS.ST-VINCENT-GRENADIENS",
   ) },
    { value: "Saipan", label: t("pays:LIST-PAYS.SAIPAN") },
    { value: "Samoa", label: t("pays:LIST-PAYS.SAMOA") },
    { value: "Samoa American", label: t("pays:LIST-PAYS.SAMOA-AMERICAN") },
    { value: "San Marino", label: t("pays:LIST-PAYS.SAN-MARINO") },
    {
      value: "Sao Tome & Principe",
      label: t("pays:LIST-PAYS.SAO-TOME-&-PRINCIPE",
   ) },
    { value: "Saudi Arabia", label: t("pays:LIST-PAYS.SAUDI-ARABIA") },
    { value: "Senegal", label: t("pays:LIST-PAYS.SENEGAL") },
    { value: "Seychelles", label: t("pays:LIST-PAYS.SEYCHELLES") },
    { value: "Sierra Leone", label: t("pays:LIST-PAYS.SIERRA-LEONE") },
    { value: "Singapore", label: t("pays:LIST-PAYS.SINGAPORE") },
    { value: "Slovakia", label: t("pays:LIST-PAYS.SLOVAKIA") },
    { value: "Slovenia", label: t("pays:LIST-PAYS.SLOVANIA") },
    { value: "Solomon Islands", label: t("pays:LIST-PAYS.SOLOMON-ISLANDS") },
    { value: "Somalia", label: t("pays:LIST-PAYS.SOMALIA") },
    { value: "South Africa", label: t("pays:LIST-PAYS.SOUTH-AFRICA") },
    { value: "Spain", label: t("pays:LIST-PAYS.SPAIN") },
    { value: "Sri Lanka", label: t("pays:LIST-PAYS.SRI-LANKA") },
    { value: "Sudan", label: t("pays:LIST-PAYS.SUDAN") },
    { value: "Suriname", label: t("pays:LIST-PAYS.SURINAME") },
    { value: "Swaziland", label: t("pays:LIST-PAYS.SWAZILAND") },
    { value: "Sweden", label: t("pays:LIST-PAYS.SWEDEN") },
    { value: "Switzerland", label: t("pays:LIST-PAYS.SWITZERLAND") },
    { value: "Syria", label: t("pays:LIST-PAYS.SYRIA") },
    { value: "Tahiti", label: t("pays:LIST-PAYS.TAHITI") },
    { value: "Taiwan", label: t("pays:LIST-PAYS.TAIWAN") },
    { value: "Tajikistan", label: t("pays:LIST-PAYS.TAJIKISTAN") },
    { value: "Tanzania", label: t("pays:LIST-PAYS.TANZANIA") },
    { value: "Thailand", label: t("pays:LIST-PAYS.THAILAND") },
    { value: "Togo", label: t("pays:LIST-PAYS.TOGO") },
    { value: "Tokelau", label: t("pays:LIST-PAYS.TOKELAU") },
    { value: "Tonga", label: t("pays:LIST-PAYS.TONGA") },
    { value: "Trinidad & Tobago", label: t("pays:LIST-PAYS.TRINIDAD-TOBAGO") },
    { value: "Tunisia", label: t("pays:LIST-PAYS.TUNISIA") },
    { value: "Turkey", label: t("pays:LIST-PAYS.TURKEY") },
    { value: "Turkmenistan", label: t("pays:LIST-PAYS.TURKMENISTAN") },
    { value: "Turks & Caicos Is", label: t("pays:LIST-PAYS.TURKS-CAICOS-IS") },
    { value: "Tuvalu", label: t("pays:LIST-PAYS.TUVALU") },
    { value: "Uganda", label: t("pays:LIST-PAYS.UGANDA") },
    { value: "United Kingdom", label: t("pays:LIST-PAYS.UNITED-KINGDOM") },
    { value: "Ukraine", label: t("pays:LIST-PAYS.UKRAINE") },
    {
      value: "United Arab Erimates",
      label: t("pays:LIST-PAYS.UNITED-ARAB-ERIMATES",
   ) },
    {
      value: "United States of America",
      label: t("pays:LIST-PAYS.UNITED-STATES-OF-AMERICA",
   ) },
    { value: "Uraguay", label: t("pays:LIST-PAYS.URAGUAY") },
    { value: "Uzbekistan", label: t("pays:LIST-PAYS.UZBEKISTAN") },
    { value: "Vanuatu", label: t("pays:LIST-PAYS.VANUATU") },
    {
      value: "Vatican City State",
      label: t("pays:LIST-PAYS.VATICAN-CITY-STATE",
   ) },
    { value: "Venezuela", label: t("pays:LIST-PAYS.VENEZUELA") },
    { value: "Vietnam", label: t("pays:LIST-PAYS.VIETNAM") },
    {
      value: "Virgin Islands (Brit)",
      label: t("pays:LIST-PAYS.VIRGIN-ISLANDS-(BRIT)",
   ) },
    {
      value: "Virgin Islands (USA)",
      label: t("pays:LIST-PAYS.VIRGIN-ISLANDS-(USA)",
   ) },
    { value: "Wake Island", label: t("pays:LIST-PAYS.WAKE-ISLAND") },
    {
      value: "Wallis & Futana Is",
      label: t("pays:LIST-PAYS.WALLIS-FUTANA-IS",
   ) },
    { value: "Yemen", label: t("pays:LIST-PAYS.YEMEN") },
    { value: "Zaire", label: t("pays:LIST-PAYS.ZAIRE") },
    { value: "Zambia", label: t("pays:LIST-PAYS.ZAMBIA") },
    { value: "Zimbabwe", label: t("pays:LIST-PAYS.ZIMBABWE") },
    { label:"Mumbai", value: "Mumbai" },
  ];


  const onCitySelect = (e) => {
    setSelectCity(e);
    setselectedcountry(e.value)
  };
  return (
    <>

  <Controller
  name="Country"
  isClearable
  control={control}
  render={({ field }) => (
  <StyledSelect

        classNamePrefix={errorPays ? "select_control" : "Select"}
        components={animatedComponents}
         placeholder={t("CONFIG-ORGANISATION.SHADOW.PAYS")}
         {...field}
         onChange={onCitySelect}
         options={PaysValues}
         value= {selectCity? selectCity : PaysValues.filter(el =>el.value === country)[0]}
      />
  )
}  />
</>
  )
}
export default Datapayes
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