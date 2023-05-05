import Organisation from "../view/Organisation";
import Dashbord from "../view/Dashboard";
import Client from "../view/client";
import Fournissuer from "../view/fournisseur";
import MesProduit from "../view/MesProduit";
import Accesuser from "../view/Accesuser";
import Addocument from "../view/Addocument";
import Updatefacture from "../view/facture/Updatefacture"
import Showfacture from "../view/facture/Showfacture"
import User from "../view/user/User";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashbord",
    component: Dashbord,
    layout: "/admin",
  },
  {
    path: "/organisation",
    name: "Organisation",
    component: Organisation,
    layout: "/admin",
  },

  {
    path: "/user-profile",
    name: "User Profile",
    component: User,
    layout: "/admin",
  },
  {
    path: "/clients",
    name: "Client",
    component: Client,
    layout: "/admin",
  },
  {
    path: "/suppliers",
    name: "Fournisseur",
    component: Fournissuer,
    layout: "/admin",
  },
  {
    path: "/my-category",
    name: "MesProduit",
    component: MesProduit,
    layout: "/admin",
  },
  {
    path: "/accesuser",
    name: "Accesuser",
    component: Accesuser,
    layout: "/admin",
  },
  {
    path: "/add-document",
    name: "adddocument",
    component: Addocument,
    layout: "/admin",
  },
  {
    path: "/update-document/:id",
    name: "update facture",
    component: Updatefacture,
    layout: "/admin",
  },
  {
    path: "/show-document/:id",
    name: "Show facture",
    component: Showfacture,
    layout: "/admin",
  },
];

export default dashboardRoutes;
