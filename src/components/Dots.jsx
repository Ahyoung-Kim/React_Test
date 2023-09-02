import React from "react";
import styled from "styled-components";

const Dot = ({ index, currentIndex, onClick }) => {
  const selected = index === currentIndex;

  return (
    <DotContainer selected={selected} onClick={onClick.bind(this, index)}>
      <DotDiv />
    </DotContainer>
  );
};

const Dots = ({ limit, currentIndex, onDotClick }) => {
  return (
    <Container>
      <VerticalLine />

      <DotsContainer>
        {Array(limit)
          .fill("")
          .map((_, index) => (
            <Dot
              key={`dot_${index}`}
              index={index}
              currentIndex={currentIndex}
              onClick={onDotClick}
            />
          ))}
      </DotsContainer>
    </Container>
  );
};

export default Dots;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 100px;
  height: 100%;
`;

const VerticalLine = styled.div`
  position: fixed;
  top: 65px;
  left: 108px;
  height: 100%;
  width: 1;
  background-color: white;
`;

const DotsContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const DotContainer = styled.div`
  width: 15px;
  height: 15px;
  border: 1px solid
    ${({ selected }) => (selected ? "white" : "rgba(0, 0, 0, 0)")};
  border-radius: 50%;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DotDiv = styled.div`
  position: relative;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
`;
