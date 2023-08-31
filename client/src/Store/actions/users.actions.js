import axios from "axios";
import { apiUrl } from "../../Utils/Utils";

export const GET_ALLUSERS = "GET_ALLUSERS";

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}/user`)
      .then((res) => {
        dispatch({ type: GET_ALLUSERS, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
};
