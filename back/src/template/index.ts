export const send_insecription_email = (organisation, id, url) => {
  let Body = '<html>';
  Body += "<div style='background: rgb(204,204,204); padding:20px'>";
  Body +=
    "<div style='box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white'>";


  Body +=
    '<p>Nous vous invitons à paramétrer  votre compte dès votre premier  accès:</p>';
  Body +=
    '<br><br><p>, Nous vous invitons à paramétrer votre compte dès votre inscription</p>';

  Body +=
    "<a href='" + url + "password/" + id + "' style='text-decoration: none;'>  <button style='display:block;border: none;outline:none;background: none;padding:10px; background-color:#1890ff;color:white;border-radius:10px; margin:auto'><strong>J'acceder a mon compte !</strong></button>  </a>";
  Body += "<p>ou copier coller le lien au navigateur : " + url + "password/" + id + "</p>";
  Body +=
    "<p> Notre service clients est disponible pour toutes questions sur  <span style='text-decoration: underline;color:blue'>  contact@test.com</span> </p>";
  Body += '<p>Bonne journée</p>  </div></div>';
  Body += '</html>';
  return Body;
};

export const send_invatation_email = (url, lname, sender, domaine, password) => {
  let Body = '<html>';
  Body += "<div style='background: rgb(204,204,204); padding:20px'>";
  Body +=
    "<div style='box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white'>";
  Body += '<p>Bonjour ' + lname + '</p>';
  Body +=
    "<p>Vous venez d'être invité à rejoindre " +
    sender +
    ' sur ' +
    domaine +
    " Acounting.</p><p> Cliquez sur le bouton suivant afin d'activer votre compte:</p>";
  Body +=
    "<br/><a href='" + url + "login' style='text-decoration: none;'>  <button style='display:block;border: none;outline:none;background: none;padding:10px; background-color:#1890ff;color:white;border-radius:10px; margin:auto'><strong>Accéder a mon compte!</strong></button>  </a>";
  Body += 'votre mot de passe est :<strong>  ' + password;
  Body += '<p>Bonne journée</p>  </div></div>';
  Body += '</html>';
  return Body;
};

export const send_forgetpassword = (url, organisation, password) => {
  let Body = '<html>';
  Body += "<div style='background: rgb(204,204,204); padding:20px'>";
  Body +=
    "<div style='box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white'>";

  Body += '<h3 style="margin:auto ;text-align: center;">Réinitialiser votre mot de passe</h3>';
  Body +=
    "<h5>Bonjour <span style='text-transform: capitalize;'><strong>" +
    organisation +
    '</strong></span></h5>  <p><br/>   Vous nous avez indiqué avoir oublié votre mot de passe.  </p>';
  Body +=
    '<p>votre nouveau mot de passe est : <strong>' + password + '</strong></p>';
  Body +=
    "<a href='" + url + "login' style='text-decoration: none;'>  <button style='display:block;border: none;outline:none;background: none;padding:10px; background-color:#1890ff;color:white;border-radius:10px; margin:auto;  padding:15px 50px'><strong>connectez</strong></button>  </a>";
  Body +=
    "<span style='text-decoration: underline;color:blue'>contact@test.com</span>";
  Body += ' </div></div>';
  Body += '</html>';
  return Body;
};

export const send_firstPasswordChange = (url, password) => {
  let Body = '<html>';
  Body += "<div style='background: rgb(204,204,204); padding:20px'>";
  Body +=
    "<div style='box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white'>";

  Body += '<h3 style="margin:auto ;text-align: center;">Votre mot de passe est changer</h3>';
  Body +=
    "<h5>Bonjour <span style='text-transform: capitalize;'><strong>" +
    '</strong></span></h5>';
  Body +=
    '<p>votre  mot de passe est : <strong>' + password + '</strong></p>';
  Body +=
    "<a href=" + url + "'login' style='text-decoration: none;'>  <button style='display:block;border: none;outline:none;background: none;padding:10px; background-color:#1890ff;color:white;border-radius:10px; margin:auto;  padding:15px 50px'><strong>connectez</strong></button>  </a>";
  Body +=
    "<span style='text-decoration: underline;color:blue'>contact@test.com</span>";
  Body += ' </div></div>';
  Body += '</html>';
  return Body;
};