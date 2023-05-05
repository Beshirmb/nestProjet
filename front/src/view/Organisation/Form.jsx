import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Icon from "../../component/register/Icon";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Datapayes from "./Data/DataPays";
import {
  GetOrganisation,
  UpdateOrganisation,
} from "../../redux/actions/organisationaction";
import DataDevise from "./Data/DataDevise";
import { getorganisation } from "../../api/organisationapi";
import { decodetoken } from "../../utile";

const Form = ({ history, hideSideBar, sidebar }) => {
  const dispatch = useDispatch();
  const [t] = useTranslation(["translation", "pays"]);
  const [errorPays, errorSetPays] = useState();
  const [errorDevise, errorSetDevise] = useState();
  const [country, setCountry] = useState("");
  const [devise, setDevise] = useState("");
  const [selectedcountry, setselectedcountry] = useState("");
  const [selecteddevise, setselecteddevise] = useState("");
  const [dataorg, setdataorg] = useState({
    id: "",
    name: "",
    Tel: "",
    Country: "",
    Devise: "",
    EmailFact: "",
  });
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("IDENTIFICATION.REQUIRED.ORGANISATION")),
    Tel: Yup.string()

      .required(t("IDENTIFICATION.REQUIRED.NUM-TELE"))
      .matches(phoneRegExp, t("IDENTIFICATION.REQUIRED.NUM-TELE-IS-INVALID"))
      .min(8, t("IDENTIFICATION.REQUIRED.NUM-TELE-LENGHT"))
      .max(8, t("IDENTIFICATION.REQUIRED.NUM-TELE-LENGHT")),
    EmailFact: Yup.string().required(t("IDENTIFICATION.REQUIRED.EMAIL")),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: dataorg,
  });

  const GetOrganisationData = useSelector(
    (state) => state.GetOrganisationReducers
  );

  const { message } = GetOrganisationData;

  useEffect(() => {
    reset({
      _id: message._id,
      name: message.name,
      EmailFact: message.email,
      Tel: message.tel,
    });

    setCountry(message.country);
    setDevise(message.devise);
  }, [history, reset, sidebar]);

  const onSubmit = async (data) => {
    errorSetPays("");
    errorSetDevise("");

    const dataOrganisation = {
      _id: data._id,
      name: data.name,
      tel: data.Tel,
      email: data.EmailFact,
      country: selectedcountry || country,
      devise: selecteddevise || devise,
    };

    if (
      (dataOrganisation.country === undefined ||
        dataOrganisation.country.length < 1) &&
      (dataOrganisation.devise === undefined ||
        dataOrganisation.devise.length < 1)
    ) {
      errorSetPays(t("CONFIG-ORGANISATION.PAYS"));
      errorSetDevise(t("CONFIG-ORGANISATION.DEVISE"));
    } else if (
      dataOrganisation.country === undefined ||
      dataOrganisation.country.length < 1
    ) {
      errorSetPays(t("CONFIG-ORGANISATION.PAYS"));
    } else if (
      dataOrganisation.devise === undefined ||
      dataOrganisation.devise.length < 1
    ) {
      errorSetDevise(t("CONFIG-ORGANISATION.DEVISE"));
    } else {
      toast.success(t("CONFIG-ORGANISATION.MODIFICATION-VALIDE"));
      hideSideBar();
    }

    dispatch(UpdateOrganisation(dataOrganisation));
  };

  return (
    <form className="form-drawer" onSubmit={handleSubmit(onSubmit)}>
      <p className="title-org">
        {t("CONFIG-ORGANISATION.UPDATE-ORGANISATION")}
      </p>

      <div className="form-group">
        <label className="custom-label-org">
          {t("CONFIG-ORGANISATION.SHADOW.ORGANISATION-NAME")}
        </label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder={t("CONFIG-ORGANISATION.SHADOW.ORGANISATION-NAME")}
          {...register("name")}
          className={`form-control custom-input-org ${
            errors.name ? "is-invalid" : ""
          }`}
        />
        <div className="invalid-feedback-drawer">
          {errors.name && <Icon />}
          {errors.name?.message}
        </div>
      </div>

      <div className="form-group">
        <label className="custom-label-org">
          {t("CONFIG-ORGANISATION.SHADOW.NUMERO-TELE")}
        </label>

        <input
          id="Tel"
          name="Tel"
          type="text"
          placeholder={t("CONFIG-ORGANISATION.SHADOW.NUMERO-TELE")}
          {...register("Tel")}
          className={`form-control custom-input-org ${
            errors.Tel ? "is-invalid" : ""
          }`}
        />
        <div className="invalid-feedback-drawer">
          {errors.Tel && <Icon />}
          {errors.Tel?.message}
        </div>
      </div>

      <div className="form-group">
        <label className="custom-label-org">
          {t("CONFIG-ORGANISATION.SHADOW.PAYS")}
        </label>

        <Datapayes
          country={country}
          Controller={Controller}
          control={control}
          errorPays={errorPays}
          setselectedcountry={setselectedcountry}
        />

        <div className="invalid-feedback-drawer">
          {errorPays && <Icon />}
          {errorPays}
        </div>
      </div>

      <div className="form-group">
        <label className="custom-label-org">
          {t("CONFIG-ORGANISATION.SHADOW.DEVISE")}
        </label>
        <DataDevise
          Controller={Controller}
          control={control}
          defaultdevise={devise}
          errorDevise={errorDevise}
          setselecteddevise={setselecteddevise}
        />
        <div className="invalid-feedback-drawer">
          {errorDevise && <Icon />}
          {errorDevise}
        </div>
      </div>

      <div className="form-group">
        <label className="custom-label-org">
          {t("CONFIG-ORGANISATION.SHADOW.EMAIL-FACTURATION")}
        </label>

        <input
          id="EmailFact"
          name="EmailFact"
          type="text"
          readOnly
          placeholder={t("CONFIG-ORGANISATION.SHADOW.EMAIL-FACTURATION")}
          {...register("EmailFact")}
          className={`form-control custom-input-org ${
            errors.EmailFact ? "is-invalid" : ""
          }`}
        />
        <div className="invalid-feedback-drawer">
          {errors.EmailFact && <Icon />}
          {errors.EmailFact?.message}
        </div>
      </div>

      <div className="group-button">
        <button
          type="reset"
          className="btn btn-light custom-btn-cancel"
          onClick={hideSideBar}
        >
          {t("CONFIG-ORGANISATION.BUTTON-CANCEL")}
        </button>
        <input
          value={t("PASSWORD.BUTTON-ENREGISTRER")}
          type="submit"
          className="btn btn-primary custom-btn-save ml-2"
        />
      </div>
    </form>
  );
};

export default Form;
