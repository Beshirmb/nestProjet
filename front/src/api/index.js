import axios from "axios";



export const signUp = (Data) =>
  axios.post(process.env.REACT_APP_baseurl + "organization/add", Data);

export const signIn = (data,config) =>
  axios.post(process.env.REACT_APP_baseurl + "users/auth/login", data, config);

export const updatepassword = (data) =>
  axios.put(
    process.env.REACT_APP_baseurl + `users/changepassword/${data.id}`,
    { password: data.password }
  );
