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

  const { ref: mindmapRef, inView: mindmapInView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });





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


  return (
    <Container className="about-screen">
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


      {/*mindmap thing*/}
      <div className="mindmap-section">
        <div ref={mindmapRef} className={`mindmap-container ${mindmapInView ? "pop-up" : ""}`}>
          <Mindmap />
        </div>

      </div>
    </Container>
  );
}

export default AboutScreen;