import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import Dropzone from "react-dropzone";
import { addnewfacture } from "../api/facture";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imgadropzone from "../assets/images/dropzone.jpg";
import PDF_file from "../assets/images/PDF_file.png";
import { decodetoken } from "../utile";
import { getuserconnected } from "../api/profilapi";
import { SiInternetarchive } from "react-icons/si";
import { FaUserCheck } from "react-icons/fa";
import ClientBleu from "../assets/images/ClientBleu.png";
import ClientGris from "../assets/images/gris.png";
import FournisseurGris from "../assets/images/fournisseur.png";
import FournisseurBleu from "../assets/fonts/fournisseur.svg";

import { IconContext } from "react-icons";

export default function Addocument() {
  const history = useHistory();
  const [organisationid, setidorganisation] = useState("");
  const [value, setValue] = useState();

  const { t, i18n } = useTranslation();
  const [selectedFile, setSelectedFile] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [send, setsend] = useState(false);
  const [file, setfile] = useState([]);
  useEffect(() => {
    const token = decodetoken();
    if (token) {
      getuserconnected(token._id).then((res) => {
        setidorganisation(res.data.organisation);
      });
    }
  }, []);
  const doc = new jsPDF({
    orientation: "l",
    unit: "pt",
    format: "a4",
  });

  const changeHandler = (event) => {
    setSelectedFile(event);
    setIsSelected(true);
    setfile({ file: window.URL.createObjectURL(event[0]) });
  
  };

  const handleSubmission = (event) => {
    event.preventDefault();
   
    if (value == null) {
      toast.error(t("ADD-DOCUMENT.TOAST-ERRORR"));
    } else {
      setdisabled(true);
      if (selectedFile[0].type !== "application/pdf") {
        let img = new Image();
        img.src = file.file;
        doc.addImage(img, "png", 5, 5, 800, 500);
        //doc.save("new.pdf");
        const blob = doc.output("blob");
        const data = new FormData();
        data.append("file", blob);
        data.append("facture", value);
        data.append("idsub_organisation", organisationid);
        addnewfacture(data).then(
          (res) => {
            history.push(`/admin/my-documents`);
            i18n.language === "fr"
              ? toast.success(res.data.message.fr)
              : toast.success(res.data.message.ar);
          },
          () => {
            history.push(`/admin/add-document`);
            toast.error(t("ADD-DOCUMENT.TOAST-ECHOUE"));
          }
        );
        setSelectedFile([]);
        setsend(true);
      } else {
        // Create an object of formData
        const data = new FormData();
        // Update the formData object
        data.append("file", selectedFile[0]);
        data.append("facture", value);
        data.append("idsub_organisation", organisationid);
        addnewfacture(data).then(
          (res) => {
            history.push(`/admin/my-documents`);
            i18n.language === "fr"
              ? toast.success(res.data.message.fr)
              : toast.success(res.data.message.ar);
          },
          () => {
            history.push(`/admin/add-document`);
            toast.error(t("ADD-DOCUMENT.TOAST-ECHOUE"));
          }
        );
        setSelectedFile([]);
        setsend(true);
      }
    }
  };

  return (
    <div className="docmument-principale">
      <div className="adddocument container ">
        <p className="titre  "> {t("ADD-DOCUMENT.TITRE1")}</p>
        <div className=" d-flex justify-content-center ">
          <div className="margindoc">
            <button
              onClick={() => setValue(false)}
              className={
                value == false
                  ? "boxsenddocselected text-center"
                  : "text-center boxsenddoc"
              }
            >
              <img
                className="icon-four"
                src={value === false ? ClientBleu : ClientGris}
                alt="hide-facture"
              />

    

              <p className={value === false ? "btncolor-active" : "btncolor"}>
                {t("ScanerFacture.Client")}
              </p>
            </button>
          </div>
          <div className="margindoc">
            <button
              onClick={() => setValue(true)}
              className={
                value === true
                  ? " boxsenddocselected text-center "
                  : " text-center boxsenddoc"
              }
            >
              <img
              className="icon-four"
              src={value === true ?FournisseurBleu : FournisseurGris}
              alt="hide-facture"
            />


              <p className={value == true ? "btncolor-active" : "btncolor"}>
                {t("ScanerFacture.Fournisseur")}
              </p>
            </button>
          </div>
        </div>
        <hr />

        <p className="titre"> {t("ADD-DOCUMENT.TITRE2")}</p>

        <div className="centredropzone">
          <br />
          {selectedFile.length > 0 && (
            <>
              {selectedFile[0].type !== "application/pdf" ? (
                <img
                  alt="Preview"
                  src={file.file}
                  width="200px"
                  height="200px"
                  className="rounded-circle photo-facture"
                />
              ) : (
                <img
                  alt="pdf"
                  src={PDF_file}
                  width="200px"
                  height="200px"
                  className="rounded-circle photo-facture"
                />
              )}
            </>
          )}{" "}
          <br />
          <br />
          {send ? (
            <div
              className="spinner-border text-primary"
              role="status"
              data-toggle="tooltip"
              data-placement="top"
              title="extraction des donner"
            >
              <span className="sr-only"> {t("ADD-DOCUMENT.LOADING")}</span>
            </div>
          ) : isSelected ? (
            <button
              onClick={handleSubmission}
              className="btn btn-primary btn-file "
              disabled={disabled}
            >
              {/*  Voir la facture selectedFile.length>0 && selectedFile[0].name */}
              <span className="title-suiv">{t("ScanerFacture.suivant")}</span>
            </button>
          ) : (
            <>
              <Dropzone
                onDrop={changeHandler}
                //accept={["image/*" , "*.pdf"]}
                minSize={1024}
                maxSize={3072000}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <img src={imgadropzone} alt="image" />
                    <input {...getInputProps()} />
                    <p className="titre-doc">{t("ScanerFacture.dropzone")} </p>
                    <button className="btn btndropzone">
                      {t("ADD-DOCUMENT.BUTTON-PARCOURIR")}
                    </button>
                  </div>
                )}
              </Dropzone>
            </>
          )}
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
