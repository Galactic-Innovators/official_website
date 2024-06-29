import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "../../Testing.css";
import Mindmap from "../Mindmap";
import Preloader from "../Preloader/Preloader";
import { useInView } from "react-intersection-observer";
import "./AboutScreen.css"; // Create this CSS file for animations

function AboutScreen() {
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  const { ref: mindmapRef, inView: mindmapInView } = useInView({
    triggerOnce: true,
    threshold: 0.5
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
      <div ref={titleRef} className={`title-container ${titleInView ? 'pop-up' : ''}`}>
        <svg viewBox="0 0 500 100" className="svg-title">
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
            Meet our team
          </text>
        </svg>
      </div>
      <div ref={mindmapRef} className={`mindmap-container ${mindmapInView ? 'pop-up' : ''}`}>
        <Mindmap />
      </div>
      {/* <Preloader /> */}
    </Container>
  );
}

export default AboutScreen;