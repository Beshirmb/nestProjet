import axios from "axios";

export const getorganisation = (id, token) =>
  axios.get(
    process.env.REACT_APP_baseurl + `organization/show/byuser/${id}`,
    token
  );

export const updategetorganisation = (data, token) =>
  axios.patch(
    process.env.REACT_APP_baseurl + `organization/update/${data._id}`,
    data,
    token
  );
