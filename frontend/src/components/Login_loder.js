import React from "react";
import { Spinner } from "react-bootstrap";
import { RingLoader } from "react-spinners";
import "./index.css";
function Login_Loader() {
  return (
    <div className="login-loader-container">
      <RingLoader color="#60d4f9" />
    </div>
  );
}

export default Login_Loader;
