import { Routes } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import MyCollectionsPage from "./MyCollectionsPage/MyCollectionsPage";
import CreateCollectionPage from "./CreateCollectionPage/CreateCollectionPage";
import GenerateCollectionPage from "./CreateGeneratedCollectionPage/CreateGeneratedCollectionPage";
import CreateManualCollectionPage from "./CreateManualCollectionPage/CreateManualCollectionPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/collections" element={<MyCollectionsPage />} />
        <Route path="/create-collection" element={<CreateCollectionPage />} />
        <Route
          path="/create-manual-collection"
          element={<CreateManualCollectionPage />}
        />
        <Route
          path="/generate-collection"
          element={<GenerateCollectionPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
