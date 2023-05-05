import axios from 'axios';
const token = localStorage.getItem('jwt')
const config = {
    headers:{
      'Authorization': `Bearer  ${token}`,
    }
   };

export const getsupplier= (id) => axios.get(process.env.REACT_APP_baseurl + `supplier/byorganisation/${id}`,config);
export const getonesupplier = (id) => axios.get(process.env.REACT_APP_baseurl + `supplier/show/${id}`,config);
export const addsupplier = (data) =>  axios.post(process.env.REACT_APP_baseurl + `supplier`, data , config);
export const updatesupplier = (data) =>  axios.patch(process.env.REACT_APP_baseurl + `supplier/update/${data._id}`, data, config);
export const deletesupplier = (id) =>  axios.delete(process.env.REACT_APP_baseurl + `supplier/delete/${id}`, config);