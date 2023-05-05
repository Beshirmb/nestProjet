
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useTranslation } from 'react-i18next'
function Header({ showslide }) {
  const { t, i18n } = useTranslation()
  const history = useHistory()
  const [statelangage, setstatelangage] = useState('')
  useEffect(() => {
    setstatelangage(i18n.language)
  }, [i18n.language])

  const adddocument = () => {
    history.push('/admin/add-document')
  }
  return (
    <Navbar className="headernavbar" expand="lg bg-white">


      <i className="add-document btn text-white fas fa-bars pl-3 pr-3" onClick={() => showslide(false)}></i>
      <Navbar.Brand

        className="bg-primary"
      >

        <img href="/admin/Dashbord"
          src='/logo.png' alt="logo app" width="201px" height={"81px"} ></img>

      </Navbar.Brand>
      <i onClick={adddocument} className="add-document btn  text-white far fa-plus pr-3 pl-3" ></i>




      <Nav className="displaybutton widthadd" navbar>

        <div className="ml-3 float-left btn btn-primary p-3 widthadd" >
          Stock Mangment System  </div>



      </Nav>


    </Navbar>
  );
}

export default Header;
