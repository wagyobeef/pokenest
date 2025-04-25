import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Page from "./SubPage";

interface MainPageProps {
  children: ReactNode;
}

const MainPage = ({ children }: MainPageProps) => {
  return (
    <div>
      <nav className="mb-4">
        <Link to="/collections">Your Collections</Link> |{" "}
        <Link to="/create-collection">Create Collection</Link>
      </nav>
      <Page>{children}</Page>
    </div>
  );
};

export default MainPage;
