import { Routes } from "react-router-dom";
import { BrowserRouter, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import LandingPage from "./LandingPage/LandingPage";
import MyCollectionsPage from "./MyCollectionsPage/MyCollectionsPage";
import CreateCollectionPage from "./CreateCollectionPage/CreateCollectionPage";
import GenerateCollectionPage from "./CreateGeneratedCollectionPage/CreateGeneratedCollectionPage";
import CreateManualCollectionPage from "./CreateManualCollectionPage/CreateManualCollectionPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Navigate to="/my-collections" replace />
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/my-collections"
          element={
            <>
              <SignedIn>
                <MyCollectionsPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/create-collection"
          element={
            <>
              <SignedIn>
                <CreateCollectionPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/create-manual-collection"
          element={
            <>
              <SignedIn>
                <CreateManualCollectionPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/generate-collection"
          element={
            <>
              <SignedIn>
                <GenerateCollectionPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* Catch-all route for undefined paths */}
        <Route
          path="*"
          element={
            <>
              <SignedIn>
                <Navigate to="/my-collections" replace />
              </SignedIn>
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
