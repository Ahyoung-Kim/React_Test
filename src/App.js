import { GlobalStyles } from "./styles";

import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import FullPage from "./page/FullPage";
import PlanePage from "./page/PlanePage";
import GsapPage from "./page/GsapPage";
import CloudPage from "./page/CloudPage";

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
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
