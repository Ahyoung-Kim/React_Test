import { GlobalStyles } from "./styles";

import MainLayout from "./components/MainLayout";
import FullPageScroll from "./components/FullPageScroll";
import styled from "styled-components";

function App() {
  return (
    <>
      <GlobalStyles />

      <MainLayout>
        <FullPageScroll>
          <PageDiv>dd</PageDiv>
          <PageDiv>dd</PageDiv>
          <PageDiv>dd</PageDiv>
        </FullPageScroll>
      </MainLayout>
    </>
  );
}

export default App;

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
