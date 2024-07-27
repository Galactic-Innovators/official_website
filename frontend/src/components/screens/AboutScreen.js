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

  const { ref: para1Ref, inView: para1InView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const { ref: para2Ref, inView: para2InView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const { ref: para3Ref, inView: para3InView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const [chosenSlideNumber, setChosenSlideNumber] = useState(1);
  const [offset, setOffset] = useState(0);
  const [barOffset, setBarOffset] = useState(0);


  useEffect(() => {
    const timers = showParagraphs.map((_, index) =>
      setTimeout(() => setShowParagraphs(prev => {
        const newShowParagraphs = [...prev];
        newShowParagraphs[index] = true;
        return newShowParagraphs;
      }), index * 1000)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const [showParagraphs, setShowParagraphs] = useState([false, false, false]);
  const { ref: titleRef2, inView: titleInView2 } = useInView({ triggerOnce: true });
  const { ref: para1Ref2, inView: para1InView2 } = useInView({ triggerOnce: true });
  const { ref: para2Ref2, inView: para2InView2 } = useInView({ triggerOnce: true });

  useEffect(() => {
    const intervalID = setInterval(() => {
      slideTo((chosenSlideNumber % 4) + 1);
    }, 3000);

    return () => clearInterval(intervalID);
  }, [chosenSlideNumber]);

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
  const location = process.env.PUBLIC_URL + "/images/17.gif";
  return (
    <div>

<div className="about-screen">
        <h1
          style={{ textAlign: "center" }}
          ref={titleRef}
          className={`title ${titleInView ? "pop-up" : ""}`}
        >
          Galactic Innovators Group - 星穹创造
        </h1>
        <div ref={para1Ref} className={`paragraph ${para1InView ? "pop-up" : ""}`}>
          <p>
            我们的核心是：创造创新；“Creating Innovation” 
          </p>
        </div>
        <div ref={para2Ref} className={`paragraph ${para2InView ? "pop-up" : ""}`}>
          <p>
            我们的目标是助力每个愿意与梦想比肩的人，我们的使命是让每个渺小的、伟大的梦想变成现实。我们始终怀揣着创造、创新的梦想来让世界变得更美好。

            We are enthusiasts with the mission of helping innovators achieve their dreams. We aim to create new opportunities and foster positive changes while supporting the general public by shaping and visualizing dreams.
          </p>
        </div>
        <div ref={para3Ref} className={`paragraph ${para3InView ? "pop-up" : ""}`}>
          <p>
            我们的理念是热情洋溢、开拓创新，以无限的创造，开启无限的未来。

            Our philosophy is to embrace passion and innovation, unlocking limitless possibilities for the future through boundless creativity.
          </p>
        </div>
      </div>

{/* New section with scroll-triggered animations */}
<div className="scroll-triggered-section">
        <h2 ref={titleRef2} style={{ textAlign: "center" }} className={`title_sec2 ${titleInView2 ? 'visible' : ''}`}>品牌特色</h2>
        <p ref={para1Ref2} className={`paragraph_sec2 ${para1InView2 ? 'visible' : ''}`}>
         创新（创造）  定制  服务  
        </p>
        <p ref={para2Ref2} className={`paragraph_sec2 ${para2InView2 ? 'visible' : ''}`}>
          Second paragraph of the new section. title_sec2 
  opacity: 0;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  transform: translateY(20px);
  margin-top: 200px;
  margin-bottom: 50px;

        </p>
      </div>

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

            {/*mindmap thing*/}
            <div className="mindmap-section">
        <div ref={mindmapRef} className={`mindmap-container ${mindmapInView ? "pop-up" : ""}`}>
          <Mindmap />
        </div>

      </div>
    </div>
  );
};

export default AboutScreen;