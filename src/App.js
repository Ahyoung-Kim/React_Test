import { GlobalStyles } from "./styles";

import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import FullPage from "./page/FullPage";
import PlanePage from "./page/PlanePage";
import GsapPage from "./page/GsapPage";
import CloudPage from "./page/CloudPage";
import IntersectionObserverPage from "./page/IntersectionObserverPage";
import ScrollPage from "./page/ScrollPage";
import ScrollPage2 from "./page/ScrollPage2";
import CarouselPage from "./page/CarouselPage";

function App() {
  return (
    <>
      <GlobalStyles />

      <MainLayout>
        <Routes>
          <Route path="/" element={<FullPage />} />
          <Route path="plane" element={<PlanePage />} />
          <Route path="gsap" element={<GsapPage />} />
          <Route path="cloud" element={<CloudPage />} />
          <Route path="observer" element={<IntersectionObserverPage />} />
          <Route path="scroll" element={<ScrollPage />} />

          <Route path="scroll2" element={<ScrollPage2 />} />
          <Route path="carousel" element={<CarouselPage />} />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
