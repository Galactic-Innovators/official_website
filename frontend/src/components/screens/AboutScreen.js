import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "../../Testing.css";
import Mindmap from "../Mindmap";
import { useInView } from "react-intersection-observer";
import "./AboutScreen.css"; // Create this CSS file for animations

function AboutScreen() {
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const { ref: mindmapRef, inView: mindmapInView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

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
    <Container className="about-screen">
      <h1 style={{textAlign: 'center'}} ref={titleRef} className={`title ${titleInView ? 'pop-up' : ''}`}>
        Meet our team
      </h1>
      <div ref={mindmapRef} className={`mindmap-container ${mindmapInView ? 'pop-up' : ''}`}>
        <Mindmap />
      </div>
    </Container>
  );
}

export default AboutScreen;