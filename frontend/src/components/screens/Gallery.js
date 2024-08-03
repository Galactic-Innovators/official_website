import React, { useRef } from "react";
import "./Gallery.css";
import { useInView } from "react-intersection-observer";
import product_video_1 from "./product_images/product_video_1.mp4";
import product_video_2 from "./product_images/product_video_2.mp4";
import product_video_3 from "./product_images/product_video_3.mp4";

function Gallery() {
  const videoRefs = useRef([null, null, null]);

  const [ref1, inView1] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [ref3, inView3] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const handleMouseEnter = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  const handleMouseLeave = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
      videoRefs.current[index].currentTime = 0;
    }
  };

  return (
    <div className="gallery">
      <div ref={ref1} className={`media-container ${inView1 ? "fade-in" : ""}`}>
        <video
          ref={(el) => (videoRefs.current[0] = el)}
          src={product_video_1}
          className="video"
          muted
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)}
        />
      </div>
      <div ref={ref2} className={`media-container ${inView2 ? "fade-in" : ""}`}>
        <video
          ref={(el) => (videoRefs.current[1] = el)}
          src={product_video_2}
          className="video"
          muted
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}
        />
      </div>
      <div ref={ref3} className={`media-container ${inView3 ? "fade-in" : ""}`}>
        <video
          ref={(el) => (videoRefs.current[2] = el)}
          src={product_video_3}
          className="video"
          muted
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
        />
      </div>
    </div>
  );
}

export default Gallery;
