import Connexion from "../component/register/connexion/Connexion";
import Identification from "../component/register/identification/Identification";
import Welcome from "../component/register/welcome/Welcome";
import PassWord from "../component/register/password/Password";

const ConexionRoutes = [
  {
    path: "/register",
    name: "Identification",
    component: Identification,
    layout: "/",
  },

  {
    path: "/",
    name: "Connexion",
    component: Connexion,
    layout: "/",
  },

  {
    path: "/Welcome",
    name: "Welcome",

    component: Welcome,
    layout: "/",
  },

  {
    path: "/PassWord",
    name: "PassWord",
    component: PassWord,
    layout: "/",
  },
];

export default ConexionRoutes;
