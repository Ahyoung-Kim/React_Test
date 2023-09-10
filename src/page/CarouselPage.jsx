import React, { useState } from "react";
import styled from "styled-components";

const CARDS = 10;
const MAX_VISIBILITY = 3;
const CARD_SIZE = "23rem";

const Card = ({ title, content }) => (
  <CardDiv>
    <h2>{title}</h2>
    <p>{content}</p>
  </CardDiv>
);

const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  return (
    <CarouselDiv>
      {active > 0 && (
        <Button className="left" onClick={() => setActive((i) => i - 1)}>
          left
        </Button>
      )}
      {React.Children.map(children, (child, i) => (
        <CardContainer
          style={{
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            pointerEvents: active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          {child}
        </CardContainer>
      ))}
      {active < count - 1 && (
        <Button className="right" onClick={() => setActive((i) => i + 1)}>
          right
        </Button>
      )}
    </CarouselDiv>
  );
};

const CarouselPage = () => (
  <Container>
    <Carousel>
      {[...new Array(CARDS)].map((_, i) => (
        <Card
          key={"Card " + (i + 1)}
          title={"Card " + (i + 1)}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      ))}
    </Carousel>
  </Container>
);

export default CarouselPage;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(45deg, #8b5cf6, #ec4899);
`;

const CarouselDiv = styled.div`
  position: relative;
  width: ${CARD_SIZE};
  height: ${CARD_SIZE};
  perspective: 500px;
  transform-style: preserve-3d;
`;

const CardContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateY(calc(var(--offset) * 50deg))
    scaleY(calc(1 + var(--abs-offset) * -0.4))
    translateZ(calc(var(--abs-offset) * -30rem))
    translateX(calc(var(--direction) * -5rem));
  filter: blur(calc(var(--abs-offset) * 1rem));
  transition: all 0.3s ease-out;
`;

const CardDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: hsl(280deg, 40%, calc(100% - var(--abs-offset) * 50%));
  border-radius: 1rem;
  color: $color-gray;
  text-align: justify;
  transition: all 0.3s ease-out;

  h2 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 0 0 0.7em;
    color: $color-black;
  }

  p,
  h2 {
    transition: all 0.3s ease-out;
    opacity: var(--active);
  }
`;

const Button = styled.button`
  color: white;
  font-size: 5rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  z-index: 2;
  cursor: pointer;
  user-select: none;
  background: unset;
  border: unset;

  &.left {
    transform: translateX(-100%) translateY(-50%);
  }

  &.right {
    right: 0;
    transform: translateX(100%) translateY(-50%);
  }
`;
