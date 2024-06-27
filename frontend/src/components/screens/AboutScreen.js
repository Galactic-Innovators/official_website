import React from "react";
import { Container, Image } from "react-bootstrap";
import "../../Testing.css";
import Loader from "../Loader";
import Message from "../Message";
import Preloader from "../Preloader/Preloader";
import CountDown from "../Countdown/Timer";
import Mindmap from "../Mindmap";

function AboutScreen() {
  const defaultImage = process.env.PUBLIC_URL + "/images/playstation.jpg";

  return (
    // <div>
    //   <div className="App">
    //     <div className="container">
    //       <h1>
    //         Website
    //         <br />
    //         Coming Soon
    //       </h1>
    //       <CountDown deadline="July 1, 2024 23:59:59" />
    //       <Preloader />
    //     </div>
    //   </div>

    // </div>
    <div>
    <Container>
      <h1>About Us</h1>
      <Mindmap />
    </Container>
    <Preloader />
    </div>

  );
}

export default AboutScreen;
