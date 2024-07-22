import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Mindmap from "../Mindmap";
import Preloader from "../Preloader/Preloader";
import { useInView } from "react-intersection-observer";
import CountDown from "../Countdown/Countdown.js";
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

  const [chosenSlideNumber, setChosenSlideNumber] = useState(1);
  const [offset, setOffset] = useState(0);
  const [barOffset, setBarOffset] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      slideTo((chosenSlideNumber % 4) + 1);
    }, 3000);

    return () => clearInterval(intervalID);
  }, [chosenSlideNumber]);

  const slideTo = (slideNumber) => {
    drawerboxToggle(slideNumber);
    drawerbtnToggle(slideNumber);

    const previousSlideNumber = chosenSlideNumber;
    setChosenSlideNumber(slideNumber);
    setOffset(offset + (slideNumber - previousSlideNumber) * -100);
    setBarOffset(barOffset + (slideNumber - previousSlideNumber) * 100);
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
  const location = process.env.PUBLIC_URL + "/images/17.gif";
  return (
    <div id="main">
      <div id="click-section">
        <div id="drawerboxes">
          <div className="drawerbox active">
            <button className="drawer-btn active" onClick={() => slideTo(1)}>
              The Wind Rises<span className="drawer-head">1</span>
            </button>
          </div>
          <div className="drawerbox">
            <button className="drawer-btn" onClick={() => slideTo(2)}>
              Children of the Wind<span className="drawer-head">2</span>
            </button>
          </div>
          <div className="drawerbox">
            <button className="drawer-btn" onClick={() => slideTo(3)}>
              Castle in the Sky<span className="drawer-head">3</span>
            </button>
          </div>
          <div className="drawerbox">
            <button className="drawer-btn" onClick={() => slideTo(4)}>
              Spirited Away<span className="drawer-head">4</span>
            </button>
          </div>
        </div>
      </div>
      <div id="slide-section">
        <div id="slide-bar">
          <div id="bar" style={{ transform: `translateY(${barOffset}%)` }}></div>
        </div>
        <div id="card-section">
          <div className="card" style={{ transform: `translateY(${offset}%)` }}>
            <div className="card-small-title">Miyazaki Hayao</div>
            <div className="card-title">The Wind Rises</div>
            <div className="card-content">
              Quote: "Even in the dark night, the stars will not disappear."
              Reflection: In the journey of life, we may encounter storms and difficulties, but as long as we have faith and hope in our hearts, we can find light even in the darkness.
            </div>
            <div className="card-img">
              <img src="./img/17.gif" alt="" />
            </div>
          </div>
          <div className="card" style={{ transform: `translateY(${offset}%)` }}>
            <div className="card-small-title">Miyazaki Hayao</div>
            <div className="card-title">Children of the Wind</div>
            <div className="card-content">
              Quote: "The wind is calling, to fly freely."
              Reflection: The wind symbolizes freedom and inspiration. We should bravely follow the voice of our hearts, break through all limitations, and pursue our dreams.
            </div>
            <div className="card-img">
              <img src="./img/08.gif" alt="" />
            </div>
          </div>
          <div className="card" style={{ transform: `translateY(${offset}%)` }}>
            <div className="card-small-title">Miyazaki Hayao</div>
            <div className="card-title">Castle in the Sky</div>
            <div className="card-content">
          Quote: "At the end of the sky, there is another world."
          Reflection: Sometimes we may feel lost and confused, but as long as we maintain faith and hope, we will surely find our own piece of sky and achieve our dreams.
        </div>
        <div className="card-img">
          <img src="./img/03.gif" alt="" />
        </div>
      </div>
      <div className="card" style={{ transform: `translateY(${offset}%)` }}>
        <div className="card-small-title">Miyazaki Hayao</div>
        <div className="card-title">Spirited Away</div>
        <div className="card-content">
          Quote: "Don't stop, don't be afraid, just keep going, and you will find the answer."
          Reflection: In the journey of life, we will encounter various difficulties and challenges, but as long as we persevere, fear no hardship, and believe in our own strength, we will find the answers and achieve our dreams.
        </div>
        <div className="card-img">
          <img src="./img/04.gif" alt="" />
        </div>
      </div>
    </div>
  </div>
</div>
    // <Container className="about-screen">
    //  <div>
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

    //  </div> 
    //   <div ref={titleRef} className={`title-container ${titleInView ? 'pop-up' : ''}`}>
    //     <svg viewBox="0 0 500 100" className="svg-title">
    //       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
    //         Meet our team
    //       </text>
    //     </svg>
    //   </div>
    //   <div ref={mindmapRef} className={`mindmap-container ${mindmapInView ? 'pop-up' : ''}`}>
    //     <Mindmap />
    //   </div> 
    //    <Preloader /> 
    // </Container> 
  );
}

export default AboutScreen;