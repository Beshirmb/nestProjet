import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { IconContext } from "react-icons";
import Icon from "../../component/register/Icon";
import { AiFillDelete } from "react-icons/ai";
import { UpdateUserProfile } from "../../redux/actions/UserProfileAction";
import { useDispatch, useSelector } from "react-redux";

const UpdateProfile = ({ HideUpdateProfil, UpdateProfil }) => {
  const { t } = useTranslation();
  const [userinfo, setUserinfo] = useState({});
  const [image, setImage] = useState("");

  const [filetosend, setfiletosend] = useState("");

  const dispatch = useDispatch();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("USER.SAISI-NOM")),
    lastName: Yup.string().required(t("USER.SAISI-PRENOM")),
    phoneNumber: Yup.string()
      .required(t("IDENTIFICATION.REQUIRED.NUM-TELE"))
      .matches(phoneRegExp, t("IDENTIFICATION.REQUIRED.NUM-TELE-IS-INVALID"))
      .min(8, t("IDENTIFICATION.REQUIRED.NUM-TELE-LENGHT"))
      .max(8, t("IDENTIFICATION.REQUIRED.NUM-TELE-LENGHT")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      _id: "",
      name: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      image: "",
    },
  });

  const handleFileChange = ({ target: { files } }) => {
    setfiletosend(files);
    setImage(URL.createObjectURL(files[0]));
  };

  const GetUserData = useSelector((state) => state.GetUserProfileReducers);

  const { message } = GetUserData;

  useEffect(() => {
    setUserinfo(message);
    reset(message);
  }, [reset, UpdateProfil]);

  const updateuserinfo = (data) => {
    // if (image.type === "image/jpeg" || image.type === "image/png") {
    //   const data = new FormData();
    //   data.append("file", image[0]);
    //   data.append("name", name);
    //   setImage(image.url.toString());
    //   console.log("setImage", data);
    // }

    dispatch(UpdateUserProfile(data));

    if (message !== null) {
      toast.success(t("UserProfile.resultaSuccessChangeProfil"));
    } else {
      toast.error(t("Erreur Serveur"));
    }
    HideUpdateProfil();
  };

  const deletefile = () => {
    setImage("");
    setfiletosend("");
  };

  return (
    <div className="form-drawer">
      <p className="title-org">{t("USER.UPDATE-USER")}</p>

      <form
        onSubmit={handleSubmit(updateuserinfo)}
        encType="multipart/form-data"
      >
        {image.length > 0 ? (
          <div className="box">
            <img alt="Preview" src={image} className="rounded-circle" />
            <IconContext.Provider value={{ className: "icon-delete" }}>
              <AiFillDelete onClick={deletefile} />
            </IconContext.Provider>
          </div>
        ) : (
          <div className="box">
            <label className="labelfile myLabel">
              <AiOutlinePlus />
              <input
                name="image"
                id="image"
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}

        <div className="form-group">
          <label className="custom-label-org">{t("USER.NOM")}</label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder={t("USER.NOM")}
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
          <label className="custom-label-org">{t("USER.PRENOM")}</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder={t("USER.PRENOM")}
            {...register("lastName")}
            className={`form-control custom-input-org ${
              errors.lastName ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback-drawer">
            {errors.lastName && <Icon />}
            {errors.lastName?.message}
          </div>
        </div>

        <div className="form-group">
          <label className="custom-label-org">{t("USER.NUM-TELE")}</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder={t("USER.NUM-TELE")}
            {...register("phoneNumber")}
            className={`form-control custom-input-org ${
              errors.phoneNumber ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback-drawer">
            {errors.phoneNumber && <Icon />}
            {errors.phoneNumber?.message}
          </div>
        </div>

        <div className="form-group">
          <label className="custom-label-org">{t("USER.EMAIL")}</label>

          <input
            id="email"
            name="email"
            type="text"
            readOnly
            placeholder={t("USER.EMAIL")}
            {...register("email")}
            className={`form-control custom-input-org ${
              errors.email ? "is-invalid" : ""
            }`}
          />
        </div>

        <div className="group-button">
          <button
            type="reset"
            className="btn btn-light custom-btn-cancel"
            onClick={HideUpdateProfil}
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
    </div>
  );
};

export default UpdateProfile;
