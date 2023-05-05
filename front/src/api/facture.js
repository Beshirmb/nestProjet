import axios from 'axios';
const token = localStorage.getItem('jwt')
const config = {
    headers:{
      'Authorization': `Bearer  ${token}`,
    }
   };

export const getfacturebysuborganisation = (id) => axios.get(process.env.REACT_APP_baseurl + `invoice/byorganisation/${id}`,config);
export const getonefacturebyid = (id) => axios.get(process.env.REACT_APP_baseurl + `invoice/show/${id}`,config);
export const addnewfacture = (data) =>  axios.post(process.env.REACT_APP_baseurl + `invoice/uplodeinvoice`, data,config);
export const updatefacture = (data) =>  axios.patch(process.env.REACT_APP_baseurl + `invoice/update/${data._id}`, data,config);
export const updatestatut=(data) => axios.patch(process.env.REACT_APP_baseurl + `invoice/updatestatut/${data._id}`,data,config)
