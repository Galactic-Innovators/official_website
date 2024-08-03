import React, { useState } from "react";
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

  const { ref: product_titleRef, inView: product_titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  const { ref: galleryRef, inView: galleryInView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  const [chosenSlideNumber, setChosenSlideNumber] = useState(1);
  const [offset, setOffset] = useState(0);
  const [barOffset, setBarOffset] = useState(0);

  const slideTo = (slideNumber) => {
    drawerboxToggle(slideNumber);
    drawerbtnToggle(slideNumber);

    const slideOffset = (slideNumber - 1) * -100;
    const slideBarOffset = (slideNumber - 1) * 100;

    setChosenSlideNumber(slideNumber);
    setOffset(slideOffset);
    setBarOffset(slideBarOffset);
  };

  const drawerboxToggle = (drawerboxNumber) => {
    const prevDrawerboxNumber = chosenSlideNumber;
    const drawerboxes = document.querySelectorAll(".drawerbox");
    drawerboxes[prevDrawerboxNumber - 1].classList.toggle("active");
    drawerboxes[drawerboxNumber - 1].classList.toggle("active");
  };

  const drawerbtnToggle = (drawerBtnNumber) => {
    const prevDrawerBtnNumber = chosenSlideNumber;
    const drawerBtns = document.querySelectorAll(".drawer-btn");
    drawerBtns[prevDrawerBtnNumber - 1].classList.toggle("active");
    drawerBtns[drawerBtnNumber - 1].classList.toggle("active");
  };

  const barSlide = (barOffset) => {
    const bar = document.querySelector("#bar");
    bar.style.transform = `translateY(${barOffset}%)`;
  };

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
      <div id="slide-section">
        <div id="slide-bar">
          <div id="bar" style={{ transform: `translateY(${barOffset}%)` }}></div>
        </div>
        <div id="card-section">
         
        </div>
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
