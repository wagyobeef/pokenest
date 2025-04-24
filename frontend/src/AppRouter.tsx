import { Navigate, Routes } from "react-router-dom";

import { BrowserRouter, Route } from "react-router-dom";
import CollectionsPage from "./pages/CollectionsPage";
import CreateCollectionPage from "./pages/CreateCollectionPage";
import GenerateCollectionPage from "./pages/GenerateCollectionPage";
import CreateManualCollectionPage from "./pages/CreateManualCollection/CreateManualCollectionPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/collections" replace />} />
        <Route path="/collections" element={<CollectionsPage />} />
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
