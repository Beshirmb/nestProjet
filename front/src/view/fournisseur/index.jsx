import React, { useState, useEffect, useRef } from "react";
import Formadd from "./formadd";
import FormUpdate from "./formupdate";
import { decodetoken } from "../../utile";
import { getsupplier, deletesupplier } from "../../api/fournissuer";
import { getuserconnected } from "../../api/profilapi";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import cookies from "js-cookie";
import iconPlus from "../../assets/images/plusIcon.png";

export default function Client() {
  const { t, i18n } = useTranslation();
  const [droweradd, setadddrower] = useState(false);
  const [idorganisation, setidorganisation] = useState("");
  const [rowsuprission, setrowsuprission] = useState("");
  const [drowerupdate, setdrowerupdate] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [rowsPerPage, setrowsPerPage] = useState([]);
  const currentLanguageCode = cookies.get("i18next") || "fr";
  const [filterval, setfilterval] = useState([]);
  const [selected, setselected] = useState(0);
  const [offset, setoffset] = useState(0);
  const [pagelimit, setpagelimit] = useState(5);
  const [dateshow, setdateshow] = useState([]);
  const refmodal = useRef(null);
  useEffect(() => {
    const token = decodetoken();
    if (token) {
      getuserconnected(token._id).then((res) => {
        getuserdata(res.data.organisation);
        setidorganisation(res.data.organisation);
      });
    }
  }, [idorganisation]);
  const getuserdata = (id) => {
    getsupplier(id)
      .then((res) => {
        if (res.data.success) {
          setrowsPerPage(res.data.row);
          const row = res.data.row;
          const dat = row.slice(offset, pagelimit + offset);
          if (Boolean(dat.length)) setdateshow(dat);
          else {
            const dat = row.slice(0, pagelimit);
            setselected(0);
            setdateshow(dat);
          }
        } else setdateshow([]);
      })
      .catch((err) => console.log(err));
  };
  const showupdatedrower = (row) => {
    setupdatedata(row);
    setdrowerupdate(true);
  };
  const hidedrower = () => {
    if (drowerupdate) setdrowerupdate(false);
    if (droweradd) setadddrower(false);
  };
  const deletecustomer = () => {
    refmodal.current.click();

    deletesupplier(rowsuprission._id)
      .then((res) => {
        if (res.data.success) getuserdata(idorganisation);
        toast.success(t("Fournisseur.mesgdelete"));
      })
      .catch((err) => console.log(err));
  };
  const strOp = (str) => {
    return str.toString().replace(/\s/g, "").toLowerCase();
  };
  const recherchefilter = (val, data) => {
    const res = data.filter((el) =>
      val
        ? strOp(el.name).includes(strOp(val)) ||
        strOp(el.category[0]?.codecat).includes(strOp(val)) ||
        strOp(el.devise).includes(strOp(val))
        : true
    );
    const dat = res.slice(0, pagelimit);
    setselected(0);
    setdateshow(dat);
    setfilterval(res);
  };

  const onPageChanged = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * pagelimit);
    if (Boolean(filterval.length)) {
      const currentdata = filterval.slice(offset, offset + pagelimit);
      setoffset(offset);
      setselected(selected);
      setdateshow(currentdata);
    } else {
      const currentdata = rowsPerPage.slice(offset, offset + pagelimit);
      setoffset(offset);
      setselected(selected);
      setdateshow(currentdata);
    }
  };

  return (
    <div className="container p-5 client">
      <p className="titre">{t("Fournisseur.titel")}</p>

      <div className="group-header-client">
        <div className="input-groupe">
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback search-icon"></span>
            <input
              id="search"
              name="search"
              type="text"
              className="form-control input-search"
              placeholder={t("Client.rechercher")}
              onChange={(event) =>
                recherchefilter(event.target.value, rowsPerPage)
              }
            />
          </div>
        </div>

        <button
          className="btn btn-primary add-client"
          onClick={() => setadddrower(true)}
        >
          <img src={iconPlus} alt="iconPlus" />
          {t("Fournisseur.formadd")}
        </button>
      </div>
      <div
        onClick={() => hidedrower()}
        className={droweradd || drowerupdate ? "overlay is-open" : "overlay"}
      ></div>
      <div
        className={
          (droweradd && i18n.language === "ar") ||
            (drowerupdate && i18n.language === "ar")
            ? "arnav-menu  active scrolthin"
            : (droweradd && i18n.language === "fr") ||
              (drowerupdate && i18n.language === "fr")
              ? "nav-menu active"
              : "nav-menu scrolthin"
        }
      >
        {droweradd && (
          <Formadd
            hideSideBar={setadddrower}
            refrechdata={getuserdata}
            idorg={idorganisation}
          />
        )}
        {drowerupdate && (
          <FormUpdate
            hideSideBar={setdrowerupdate}
            rowdata={updatedata}
            refrechdata={getuserdata}
            idorg={idorganisation}
          />
        )}
      </div>
      <div className="main-client">
        <div
          className={!Boolean(dateshow.length) ? "d-none" : "custom-pagination"}
        >
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={
              filterval.length > 0
                ? Math.ceil(filterval.length / pagelimit)
                : Math.ceil(rowsPerPage.length / pagelimit)
            }
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={onPageChanged}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            initialPage={0}
            forcePage={selected}
          />
        </div>

        <table className="table table-borderless ">
          <thead>
            <tr className="th-table">
              <th className="col">{t("Client.tabNom")}</th>
              <th className="col">{t("Client.tabDevis")}</th>
              <th className="col">{t("Client.tabAction")}</th>
            </tr>
          </thead>

          <tbody>
            {dateshow.length > 0 ? (
              dateshow.map((customer, index) => {
                return (
                  <tr key={index} className="row custom-tr ">
                    <td label={t("Client.tabNom")} className="col">
                      {customer.name}
                    </td>
                    <td className="col" label={t("Client.tabDevis")}>
                      {customer.devise}
                    </td>

                    <td className="col" label={t("Client.tabAction")}>
                      <i
                        className="fas fa-trash-alt tabfonticon p-2"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => setrowsuprission(customer)}
                      ></i>
                      <i
                        className="fas fa-pen tabfonticon p-2"
                        onClick={() => showupdatedrower(customer)}
                      ></i>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center">
                <td colSpan="2" className="text-center">
                  {" "}
                  {t("FOURNISSEUR.REQUIRED.TABMSG")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {" "}
                {t("Client.modaldeletetitel")}
              </h5>
              <button
                ref={refmodal}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{t("Client.modaldelete")}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary p-2"
                data-dismiss="modal"
              >
                {t("Client.formannulerbtn")}
              </button>
              <button
                type="button"
                className="btn btn-primary p-2"
                onClick={() => deletecustomer()}
              >
                {t("FOURNISSEUR.REQUIRED.DELETE")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
