import React from "react";

import styled from "styled-components";
import FullPageScroll from "../components/FullPageScroll";

const FullPage = () => {
  return (
    <FullPageScroll>
      <PageDiv />
      <PageDiv />
      <PageDiv />
    </FullPageScroll>
  );
};

export default FullPage;

const PageDiv = styled.div`
  position: relative;
  top: 0;
  height: 100vh;
  width: 100%;

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
