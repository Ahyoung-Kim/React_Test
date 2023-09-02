import { GlobalStyles } from "./styles";

import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import FullPage from "./page/FullPage";
import PlanePage from "./page/PlanePage";

function App() {
  return (
    <>
      <GlobalStyles />

      <MainLayout>
        <Routes>
          <Route path="/" element={<FullPage />} />
          <Route path="plane" element={<PlanePage />} />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
