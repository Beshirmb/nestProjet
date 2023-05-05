import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Card, Accordion, Button } from "react-bootstrap";
import {
  getProduit,
  deletecategory,
} from "../../api/produit";
import { getuserconnected } from "../../api/profilapi";
import { decodetoken } from "../../utile";
import Formacat from "./formcategory";
import ReactPaginate from "react-paginate";

export default function MesProduit(props) {
  const { t, i18n } = useTranslation();
  const [showcategory, setchowcat] = useState(false);
  const [selectedcat, setselectedcat] = useState("");
  const [selectedsubcat, setselectedsubcat] = useState("");
  const [updatecategory, setupdatecategory] = useState(false);
  const [showsouscategory, setshowsouscategory] = useState(false);
  const [updatesouscategory, setupdatesouscategory] = useState(false);
  const [idorganisation, setidorganisation] = useState("");
  const [category, setbasecat] = useState([]);
  const [pagelimit, setpagelimit] = useState(8);
  const [dateshow, setdateshow] = useState([]);
  const [filterval, setfilterval] = useState([]);
  const [savedcategory, setsavedcategory] = useState("");
  const [rowsuprission, setrowsuprission] = useState(null);
  const [selected, setselected] = useState(0);
  const [offset, setoffset] = useState(0);
  const [catrowsuprission, setcatrowsuprission] = useState("");
  const refmodal = useRef(null);
  const refmodalcat = useRef(null);

  useEffect(() => {
    const token = decodetoken();
    if (token) {
      getuserconnected(token._id).then((res) => {
        setidorganisation(res.data.organisation);
        getProduitData(res.data.organisation);
      });
    }
  }, [idorganisation]);

  const getProduitData = (id) => {
    getProduit(id).then((res) => {
      setbasecat(res.data);
      const row = res.data;
      const dat = row.slice(offset, pagelimit + offset);
      if (Boolean(dat.length)) setdateshow(dat);
      else {
        const dat = row.slice(0, pagelimit);
        setselected(0);
        setdateshow(dat);
      }
    });
  };

  const handleModal = () => {
    setchowcat(!showcategory);
  };

  const updateonecategory = (el) => {
    setupdatecategory(true);
    setchowcat(true);
    setselectedcat(el);
  };

  const hidedrower = () => {
    if (showcategory) {
      setupdatecategory(false);
      setchowcat(false);
      setselectedcat("");
      getProduitData(idorganisation);
    }
    if (showsouscategory) {
      setshowsouscategory(false);
      setupdatesouscategory(false);
      setselectedsubcat("");
    }
  };

  const handleModalsouscategorie = () => {
    setshowsouscategory(!showsouscategory);
  };

  const updateonesubcategory = (el) => {
    setupdatesouscategory(true);
    setshowsouscategory(true);
    setselectedsubcat(el);
  };

  const strOp = (str) => {
    return str.toString().replace(/\s/g, "").toLowerCase();
  };

  const recherchefilter = (val, data) => {
    const res = data.filter((el) =>
      val
        ? strOp(el.codes).includes(strOp(val)) ||
          strOp(el.ar?.name_categorie).includes(strOp(val)) ||
          strOp(el.fr?.name_categorie).includes(strOp(val))
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
      const currentdata = category.slice(offset, offset + pagelimit);
      setoffset(offset);
      setselected(selected);
      setdateshow(currentdata);
    }
  };


  const deletecatrowsuprission = () => {
    refmodalcat.current.click();
    deletecategory(catrowsuprission._id).then((res) =>
    getProduitData(idorganisation)
    );
  };

  return (
    <div className="container p-md-5 container-category">
      <div className="categorypage">
        <div
          className={
            showcategory || showsouscategory ? "overlay is-open" : "overlay"
          }
        ></div>

        <div
          className={
            (showcategory || showsouscategory) && i18n.language === "ar"
              ? "arnav-menu  active"
              : (showcategory || showsouscategory) && i18n.language === "fr"
              ? "nav-menu  active"
              : "nav-menu"
          }
        >
          {showcategory && (
            <Formacat
              updatestate={updatecategory}
              hideSideBar={hidedrower}
              idorg={idorganisation}
              refrechdata={getProduitData}
              selected={selectedcat}
            />
          )}

        </div>

        <div className="groupe-header1">
          <div className="connexion">{t("Categorie.titel")}</div>

          <div
            className={
              !Boolean(category.length) ? "d-none" : "custom-pagination"
            }
          >
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={
                filterval.length > 0
                  ? Math.ceil(filterval.length / pagelimit)
                  : Math.ceil(category.length / pagelimit)
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
        </div>

        <div className="groupe-header2">
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
                  recherchefilter(event.target.value, category)
                }
              />
            </div>
          </div>
          <div className="groupe-button-header mt-3">
            <button
              className="btn btn-primary btn-category"
              onClick={handleModal}
            >
              {t("Categorie.addnewcategorie")}
            </button>
            
          </div>
        </div>

        <div className="groupe-table">
          <br />
          <table className="table table-borderless table-category">
            <thead>
              <tr className="th-table header-table">
                <th className="col-4">{t("Categorie.tabcat")}</th>
                <th className="col-5">{t("Categorie.tabsubcat")}</th>
                <th className="col-3">{t("Fournisseur.tabAction")}</th>
              </tr>
            </thead>
          </table>
          {dateshow.map((cat, index) => {
            return (
              <Accordion defaultActiveKey="0" key={index}>
                <Card className="card-category">
                  <Accordion.Toggle
                    className="text-left list-category"
                    as={Button}
                    variant="link"
                    eventKey={cat._id}
                    style={{
                      backgroundColor: cat.color,
                      color: "black",
                    }}
                    sorttype="asc"
                  >
                    <div
                      className="row align-items-center row-cat"
                      onClick={() => setsavedcategory(cat._id)}
                    >
                      <p className="col-6 col-md-4 header-text-category">
                        {cat.codes} {" - "}{" "}
                        {cat.nameProduit }
                      </p>
                      <p className="col-2 col-md-5  header-text-category">
                        { cat?.Stock}
                      </p>

                      <p className="col-4 col-md-2 header-icon-category">
                        <i
                          className="fas fa-trash-alt tabfonticon pr-2 pl-2"
                          data-toggle="modal"
                          data-target="#categoryModal"
                          onClick={() => setcatrowsuprission(cat)}
                        ></i>
                        <i
                          className="fas fa-pen tabfonticon pl-2 pr-2"
                          onClick={() => updateonecategory(cat)}
                        ></i>
                      </p>

                      <p className="col-1 header-text-category">
                        <i className="fas fa-angle-down"></i>
                      </p>
                    </div>
                  </Accordion.Toggle>

                </Card>
              </Accordion>
            );
          })}
        </div>

        {/* model delete subcat */}
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
                  {t("Categorie.modaldeletetitel")}{" "}
                  {rowsuprission?.code_sous_categorie}{" "}
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
              <div className="modal-body">{t("Categorie.modaldelete")}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary p-2"
                  data-dismiss="modal"
                >
                  {t("Client.formannulerbtn")}
                </button>
         
              </div>
            </div>
          </div>
        </div>
        {/* modal delete cat */}
        <div
          className="modal fade"
          id="categoryModal"
          tabIndex="-1"
          aria-labelledby="categoryModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="categoryModalLabel">
                  {" "}
                  {t("Categorie.modaldeletetitel")} {catrowsuprission?.codes}{" "}
                </h5>
                <button
                  ref={refmodalcat}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{t("Categorie.modaldelete")}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary p-2"
                  data-dismiss="modal"
                >
                  {t("Categorie.formannulerbtn")}
                </button>
                <button
                  type="button"
                  className="btn btn-primary p-2"
                  onClick={() => deletecatrowsuprission()}
                >
                  {t("Categorie.formsupprimerbtn")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
