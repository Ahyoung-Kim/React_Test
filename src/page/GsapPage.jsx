import React, { useEffect } from "react";
import gsap from "gsap";

const GsapPage = () => {
  useEffect(() => {
    gsap.to(".box", {
      rotation: 360,
      x: "100vw",
      xPercent: -100,
      // special properties
      duration: 2, // how long the animation lasts
      repeat: 2, // the number of repeats - this will play 3 times
      yoyo: true, // this will alternate back and forth on each repeat. Like a yoyo
      repeatDelay: 0.5,
      delay: 0.5,
    });
  }, []);

  return (
    <div>
      <div
        className="box"
        style={{
          backgroundColor: "orange",
          width: 100,
          height: 100,
        }}
      ></div>
    </div>
  );
};

export default GsapPage;
