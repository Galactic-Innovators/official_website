import React from "react";
import { Spinner } from "react-bootstrap";
import { RingLoader } from "react-spinners";
import "./index.css";
function Loader() {
  return (
    <div
      style={{
        height: "200px",
        width: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <RingLoader color="#60d4f9" />
    </div>
  );
}

export default Loader;
