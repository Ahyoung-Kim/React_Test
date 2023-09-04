import React, { useCallback, useEffect, useRef, useState } from "react";

import styled, { keyframes, css } from "styled-components";

import useWheel from "../components/useWheel";
import useScrollAnimation from "../components/useScrollAnimation";

const Section = ({ curSection, index }) => {
  const { inView, ref } = useScrollAnimation();

  useEffect(() => {
    if (inView) {
      console.log(index);
    }
  }, [inView]);

  return (
    <SectionDiv ref={ref}>
      <Card className={inView ? "view" : ""} />
    </SectionDiv>
  );
};

const arr = [0, 1, 2];

const ScrollPage = () => {
  const [curSection, setCurSection] = useState(0);

  const wheelHandler = useCallback((ref, deltaY, scrollTop) => {
    // 뷰포트 높이 값
    const pageHeight = window.innerHeight;

    let dest = Math.ceil(scrollTop / pageHeight);

    if (deltaY > 0) {
      // scroll down
      dest++;
    } else {
      // scroll up
      dest--;
    }

    if (dest < 0 || dest > arr.length - 1) {
      return;
    }

    setCurSection(dest);
    ref.current?.scrollTo({
      top: pageHeight * dest,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const containerRef = useWheel(wheelHandler);

  return (
    <Container ref={containerRef}>
      {arr.map((_, idx) => (
        <Section key={idx} index={idx} curSection={curSection} />
      ))}
    </Container>
  );
};

export default ScrollPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: whitesmoke;
`;

const SectionDiv = styled.div`
  width: 100%;
  height: 100vh;

  &:nth-child(1) {
    background-color: orange;
  }
  &:nth-child(2) {
    background-color: aqua;
  }
  &:nth-child(3) {
    background-color: royalblue;
  }
`;

const move = keyframes`
0% {
    // opacity: 0;
    transform: translateY(50%);
}
25% {
    // opacity: 0.25;
    transform: translateY(25%);
}
100% {
    // opacity: 1;
    transform: translateY(0);
}
`;

const Card = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: tomato;

  &.view {
    animation: ${move} 1.5s ease;
  }
`;
