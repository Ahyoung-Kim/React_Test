import React from "react";

import styled, { css, keyframes } from "styled-components";

const planes = [
  {
    id: "plane-1",
    height: "18px",
    top: "10%",
    duration: "50s",
    delay: "-10s",
  },
  {
    id: "plane-2",
    height: "58px",
    // top: "320px",
    top: "20%",
    duration: "60s",
    delay: "-4s",
  },
  {
    id: "plane-3",
    height: "40px",
    // top: "30px",
    top: "30%",
    duration: "50s",
    delay: "-33s",
  },
  {
    id: "plane-4",
    height: "14px",
    // top: "261px",
    top: "40%",
    duration: "30s",
    delay: "-50s",
  },
  {
    id: "plane-5",
    height: "21px",
    // top: "204px",
    top: "50%",
    duration: "100s",
    delay: "-2s",
  },
  {
    id: "plane-6",
    height: "31px",
    // top: "449px",
    top: "60%",
    duration: "80s",
    delay: "-33s",
  },
  {
    id: "plane-7",
    height: "21px",
    // top: "0px",
    top: "70%",
    duration: "20s",
    delay: "-10s",
  },
  {
    id: "plane-8",
    height: "67px",
    // top: "401px",
    top: "80%",
    duration: "40s",
    delay: "-10s",
  },
  {
    id: "plane-9",
    height: "34px",
    // top: "331px",
    top: "90%",
    duration: "150s",
    delay: "-20s",
  },
  {
    id: "plane-10",
    height: "12px",
    // top: "430px",
    top: "100%",
    duration: "160s",
    delay: "0s",
  },
];

const PlanePage = () => {
  return (
    <Container>
      {planes.map((plane) => (
        <Plane key={plane.id} height={plane.height} top={plane.top}>
          <PlaneImage
            duration={plane.duration}
            delay={plane.delay}
            src={`${process.env.PUBLIC_URL}/img/plane.png`}
          />
        </Plane>
      ))}
    </Container>
  );
};

export default PlanePage;

const Container = styled.div`
  background-color: white;
  //   overflow-x: hidden;
  overflow: hidden;
  height: 100vh;
  position: relative;

  &::after {
    background: linear-gradient(359deg, #b7bca4 26.23%, #3d94b2 87.37%);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.4;
    height: 100%;
    width: 100%;
  }
`;

const motion = keyframes`
0% {
    opacity: 0;
    transfrom: translateX(0);
}

5% {
    opacity: 1;
}

97% {
    opacity: 1;
}

98% {
    opacity: 0;
}

100% {
    opacity: 0;
    transform: translateX(100vw);
}

`;

const Plane = styled.div`
  position: absolute;
  left: 0;
  z-index: 1;

  width: 100%;
  transform: rotate(-10deg);
  //   background-color: orange;

  ${({ height, top }) => {
    return css`
      height: ${height};
      top: ${top};
    `;
  }}
`;

const PlaneImage = styled.div`
  height: 100%;

  background-image: url(${process.env.PUBLIC_URL}/img/plane.png);
  background-repeat: no-repeat;
  background-size: contain;

  animation: ${motion} linear infinite;

  ${({ duration, delay }) => {
    return css`
      animation-duration: ${duration};
      animation-delay: ${delay};
    `;
  }}
`;
