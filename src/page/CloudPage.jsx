import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const width = 1200;
const height = 800;

const imgStyle = {
  width,
  height,
  position: "absolute",
  top: 0,
  left: 0,
};
const imgDir = `${process.env.PUBLIC_URL}/img`;

const CloudPage = () => {
  const ref = useRef();
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const el = ref.current;

    gsap
      .timeline({
        scrollTrigger: {
          //   trigger: ".scrollDist",
          trigger: el.querySelector(".scrollDist"),
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .fromTo(".sky", { y: 0 }, { y: -200 }, 0)
      .fromTo(".cloud1", { y: 100 }, { y: -800 }, 0)
      .fromTo(".cloud2", { y: -150 }, { y: -500 }, 0)
      .fromTo(".cloud3", { y: -50 }, { y: -650 }, 0)
      .fromTo(".mountBg", { y: -10 }, { y: -100 }, 0)
      .fromTo(".mountMg", { y: -30 }, { y: -250 }, 0)
      .fromTo(".mountFg", { y: -50 }, { y: -600 }, 0);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#ddd",
        textAlign: "center",
      }}
      ref={ref}
    >
      <div
        className="scrollDist"
        style={{ width: "100%", height: "300vh" }}
      ></div>

      <div
        className="main"
        style={{
          position: "fixed",
          background: "white",
          width: "100%",
          //   maxWidth: "1200px",
          height: "100%",
          top: 0,
          left: 0,
          x: "-50%",
        }}
      >
        <img className="sky" style={imgStyle} src={`${imgDir}/sky.jpg`} />

        <img
          className="mountBg"
          style={imgStyle}
          src={`${imgDir}/mountBg.png`}
        />

        <img
          className="mountMg"
          style={imgStyle}
          src={`${imgDir}/mountMg.png`}
        />

        <img className="cloud2" style={imgStyle} src={`${imgDir}/cloud2.png`} />

        <img
          className="mountFg"
          style={imgStyle}
          src={`${imgDir}/mountFg.png`}
        />

        <img className="cloud1" style={imgStyle} src={`${imgDir}/cloud1.png`} />

        <img className="cloud3" style={imgStyle} src={`${imgDir}/cloud3.png`} />
      </div>
    </div>
  );
};

export default CloudPage;
