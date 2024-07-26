import React, { useState, useEffect } from "react";
import "./Drawer.css"; // 
import product_1 from './product_images/product_1.jpg';
import product_2 from './product_images/product_2.jpg';
import product_3 from './product_images/product_3.jpg';

const Drawer = () => {
  const [chosenSlideNumber, setChosenSlideNumber] = useState(1);
  const [offset, setOffset] = useState(0);
  const [barOffset, setBarOffset] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  useEffect(() => {
    startSlide();
    return () => clearInterval(intervalID); // Cleanup on unmount
  }, []);

  const startSlide = () => {
    const id = setInterval(() => {
      slideTo((chosenSlideNumber % 4) + 1);
    }, 3000);
    setIntervalID(id);
  };

  const slideTo = (slideNumber) => {
    drawerboxToggle(slideNumber);
    drawerbtnToggle(slideNumber);

    let previousSlideNumber = chosenSlideNumber;
    setChosenSlideNumber(slideNumber);
    setOffset(offset + (slideNumber - previousSlideNumber) * -100);
    setBarOffset(barOffset + (slideNumber - previousSlideNumber) * 100);
  };

  const drawerboxToggle = (drawerboxNumber) => {
    let prevDrawerboxNumber = chosenSlideNumber;
    document
      .querySelectorAll(".drawerbox")
      [prevDrawerboxNumber - 1].classList.toggle("active");
    document
      .querySelectorAll(".drawerbox")
      [drawerboxNumber - 1].classList.toggle("active");
  };

  const drawerbtnToggle = (drawerBtnNumber) => {
    let prevDrawerBtnNumber = chosenSlideNumber;
    document
      .querySelectorAll(".drawer-btn")
      [prevDrawerBtnNumber - 1].classList.toggle("active");
    document
      .querySelectorAll(".drawer-btn")
      [drawerBtnNumber - 1].classList.toggle("active");
  };

  const barSlide = (barOffset) => {
    const bar = document.querySelector("#bar");
    bar.style.transform = `translateY(${barOffset}%)`;
  };

  useEffect(() => {
    barSlide(barOffset);
    const slides = document.querySelectorAll(".card");
    slides.forEach((slide) => {
      slide.style.transform = `translateY(${offset}%)`;
    });
  }, [offset, barOffset]);

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
              Title Here<span className="drawer-head">3</span>
            </button>
          </div>
          <div className="drawerbox">
            <button className="drawer-btn" onClick={() => slideTo(4)}>
              Title Here<span className="drawer-head">4</span>
            </button>
          </div>
        </div>
      </div>
      <div id="slide-section">
        <div id="slide-bar">
          <div id="bar"></div>
        </div>
        <div id="card-section">
          <div id="card1" className="card">
            <div className="card-small-title">Miyazaki Hayao</div>
            <div className="card-title">The Wind Rises</div>
            <div className="card-content">
              Quote: "Text.
            </div>
            <div className="card-img">
              <img src={product_1}  alt="" />
            </div>
          </div>
          <div id="card2" className="card">
            <div className="card-small-title">Miyazaki Hayao</div>
            <div className="card-title">Children of the Wind</div>
            <div className="card-content">
              Quote: "The wind is calling, to fly freely." Reflection: The wind
              symbolizes freedom and inspiration. We should bravely follow the
              voice of our hearts, break through all limitations, and pursue our
              dreams.
            </div>
            <div className="card-img">
              <img src={product_2} alt="" />
            </div>
          </div>
          <div id="card3" className="card">
            <div className="card-small-title">Miyazaki Hayao</div>
            <div className="card-title">Castle in the Sky</div>
            <div className="card-content">
              Quote: "At the end of the sky, there is another world."
              Reflection: Sometimes we may feel lost and confused, but as long
              as we maintain faith and hope, we will surely find our own piece
              of sky and achieve our dreams.
            </div>
            <div className="card-img">
              <img src={product_3} alt="" />
            </div>
          </div>
          <div id="card4" className="card">
            <div className="card-small-title">Miyazaki Hayao</div>
            <div className="card-title">Spirited Away</div>
            <div className="card-content">
              Quote: "Don't stop, don't be afraid, just keep going, and you will
              find the answer." Reflection: In the journey of life, we will
              encounter various difficulties and challenges, but as long as we
              persevere, fear no hardship, and believe in our own strength, we
              will find the answers and achieve our dreams.
            </div>
            <div className="card-img">
              <img src={product_3}  alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
