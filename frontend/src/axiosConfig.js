import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "./actions/userActions"; // Adjust the path as necessary

const setupAxiosInterceptors = (dispatch) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response ||
        error.response.data ||
        error.response.status === 401 ||
        error.response.data.detail ===
          "Given token not valid for any token type"
      ) {
        dispatch(logout());
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
