import axios from "axios";
import { apiUrl } from "../../Utils/Utils";

export const GET_MESSAGES = "GET_MESSAGES";
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const EDIT_MESSAGE = "EDIT_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

export const getMessages = () => {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}message`)
      .then((res) => {
        dispatch({ type: GET_MESSAGES, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
};

export const createMessage = (data) => {
  return () => {
    return axios.post(`${apiUrl}message`, data);
  };
};

export const editMessage = (messageId, updatedData) => {
  return (dispatch) => {
    return axios
      .put(`${apiUrl}message/${messageId}`, updatedData)
      .then((res) => {
        dispatch({ type: EDIT_MESSAGE, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
};

export const deleteMessage = (messageId) => {
  return (dispatch) => {
    return axios
      .delete(`${apiUrl}message/${messageId}`)
      .then(() => {
        dispatch({ type: DELETE_MESSAGE, payload: { messageId } });
      })
      .catch((error) => console.log(error));
  };
};
