import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "../../Testing.css";
import Mindmap from "../Mindmap";
import Preloader from "../Preloader/Preloader";
import { useInView } from "react-intersection-observer";
import 'animate.css'
import "./AboutScreen.css"; // Create this CSS file for animations
import Gallery from "./Gallery";

function AboutScreen() {
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  const { ref: mindmapRef, inView: mindmapInView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  const { ref: product_titleRef, inView: product_titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  const { ref: galleryRef, inView: galleryInView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });


  const defaultImage = process.env.PUBLIC_URL + "/images/playstation.jpg";

  return (

    <Container className="about-screen">
      <div ref={titleRef} className={`title-container ${titleInView ? 'pop-up' : ''}`}>
        <svg viewBox="0 0 500 100" className="svg-title">
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
            Meet Our Team
          </text>
        </svg>
      </div>
      <div ref={mindmapRef} className={`mindmap-container ${mindmapInView ? 'pop-up' : ''}`}>
        <Mindmap />
      </div>
      <div ref={product_titleRef} className={`product_title ${product_titleInView ? 'pop-up' : ''}`}>
        <svg viewBox="0 0 500 100" className="svg-title">
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
            Product
          </text>
        </svg>
      </div>
      {/* <Preloader /> */}
      <div ref={galleryRef} className={`gallery-container ${galleryInView ? 'pop-up' : ''}`}>
        <Gallery />
      </div>
    </Container>
  );
}

export default AboutScreen;