import React, { useEffect, useRef, useState } from "react";

import { useInView } from "react-intersection-observer";

import styled, { keyframes } from "styled-components";

const Section = ({ index }) => {
  const ref = useRef(null);

  const [isInView, setIsInView] = useState(false);

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 뷰포트에 요소가 나타났을 경우
        setIsInView(true);
        console.log(index);
      } else {
        setIsInView(false);
      }
    });
  };

  useEffect(() => {
    // 요소가 아직 준비되지 않은 경우 중단
    if (!ref.current) return;

    const options = {
      root: null, // 뷰포트를 기준으로 관찰할 대상 요소들을 선택 (null 이면 전체)
      rootMargin: "0px", // 루트 요소와 타겟 요소 사이의 마진 설정
      threshold: 0.2,
    };
    const observer = new IntersectionObserver(callback, options);
    // 요소 관찰 시작
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <SectionDiv ref={ref} className={isInView ? "fade-in" : ""}>
        <p>{index}</p>
      </SectionDiv>
    </>
  );
};

const IntersectionObserverPage = () => {
  return (
    // 관찰할 객체에 ref
    <Container>
      {[0, 1, 2].map((_, idx) => (
        <Section key={idx} index={idx} />
      ))}
    </Container>
  );
};

export default IntersectionObserverPage;

const Container = styled.div`
  width: 100%;
  background-color: whitesmoke;
`;

const fadeIn = keyframes`
from {
    opacity: 0;
}
to {
    opacity: 1;
}
`;
const SectionDiv = styled.div`
  margin: 0 auto;
  width: 50%;
  height: 100vh;
  box-sizing: border-box;
  background-color: orange;

  &.fade-in {
    animation: ${fadeIn} 1s ease;
  }
`;
