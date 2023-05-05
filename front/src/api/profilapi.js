import axios from "axios";
const token = localStorage.getItem("jwt");
const config = {
  headers: {
    Authorization: `Bearer  ${token}`,
  },
};

export const getuserconnected = (id) =>
  axios.get(process.env.REACT_APP_baseurl + `users/show/${id}`, config);

export const updateprofil = (data) =>
  axios.patch(
    process.env.REACT_APP_baseurl + `users/update/${data._id}`,
    data,
    config
  );
export const addimagefile = (data) =>
  axios.post(
    process.env.REACT_APP_baseurl + `users/uplodephoto/`,
    data,
    config
  );
export const updatepassword = (data) =>
  axios.patch(
    process.env.REACT_APP_baseurl + `users/changepassword/${data.id}`,
    { password: data.password },
    config
  );
