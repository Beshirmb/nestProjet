import axios from 'axios';

const token = localStorage.getItem('jwt')
const config = {
    headers:{
      'Authorization': `Bearer  ${token}`,
    }
   };

   export const getProduit = (id) => axios.get(process.env.REACT_APP_baseurl + `produit/byorganisation/${id}`,config);
   export const getonecategory = (id) => axios.get(process.env.REACT_APP_baseurl + `produit/getone/${id}`,config);
   export const deletecategory = (id) => axios.delete(process.env.REACT_APP_baseurl + `produit/delete/${id}` ,config )
   export const addcategory = (data) =>  axios.post(process.env.REACT_APP_baseurl  + `produit/add`, data , config);
   export const updatecategory = (data) =>  axios.put(process.env.REACT_APP_baseurl +`produit/update/${data._id}`, data , config);

