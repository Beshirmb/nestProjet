import axios from 'axios';
const token = localStorage.getItem('jwt')
const config = {
    headers:{
      'Authorization': `Bearer  ${token}`,
    }
   };

export const getclient = (id) => axios.get(process.env.REACT_APP_baseurl + `customer/byorganisation/${id}`,config);
export const getoneclient = (id) => axios.get(process.env.REACT_APP_baseurl + `customer/getone/${id}`,config);
export const addnewclient = (data) =>  axios.post(process.env.REACT_APP_baseurl + `customer/add`, data,config);
export const updateclient = (data) =>  axios.put(process.env.REACT_APP_baseurl + `customer/update/${data._id}`, data,config);
export const deleteclient = (id) => axios.delete(process.env.REACT_APP_baseurl + `customer/delete/${id}` ,config )
