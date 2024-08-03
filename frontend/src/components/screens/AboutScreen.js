import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import Mindmap from "../Mindmap";
import Preloader from "../Preloader/Preloader";
import { useInView } from "react-intersection-observer";
import CountDown from "../Countdown/Countdown.js";
import "./AboutScreen.css"; // Create this CSS file for animations

const HoverVideo = ({ videoSrc, imageSrc }) => {
  const videoRef = useRef(null);
  const imageRef = useRef(null);

  const playVideo = () => {
    if (videoRef.current && imageRef.current) {
      videoRef.current.style.display = 'block';
      imageRef.current.style.display = 'none';
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current && imageRef.current) {
      videoRef.current.style.display = 'none';
      imageRef.current.style.display = 'block';
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="video-container"
      onMouseOver={playVideo}
      onMouseOut={pauseVideo}
    >
      <video ref={videoRef} src={videoSrc} muted />
      <img ref={imageRef} src={imageSrc} alt="Hover to play" />
    </div>
  );
};

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
            <div>
              <HoverVideo videoSrc="/img/video1.mp4" imageSrc="/images/airpods.jpg" />
            </div>
            <div className="card-img">
              <img src="/img/17.gif" alt="" />
            </div>
          </div>
          <div className="card" style={{ transform: `translateY(${offset}%)` }}>
            <div>
              <HoverVideo videoSrc="/img/video2.mp4" imageSrc="/images/image2.jpg" />
            </div>
            <div className="card-img">
              <img src="/img/08.gif" alt="" />
            </div>
          </div>
          <div className="card" style={{ transform: `translateY(${offset}%)` }}>
            <div>
              <HoverVideo videoSrc="/img/video3.mp4" imageSrc="/images/image3.jpg" />
            </div>
            <div className="card-img">
              <img src="/img/03.gif" alt="" />
            </div>
          </div>
          <div className="card" style={{ transform: `translateY(${offset}%)` }}>
            <div>
              <HoverVideo videoSrc="/img/video4.mp4" imageSrc="/images/image4.jpg" />
            </div>
            <div className="card-img">
              <img src="/img/04.gif" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutScreen;
