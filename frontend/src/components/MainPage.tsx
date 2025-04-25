import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Page from "./Page";
import TopBar from "./TopBar";

interface MainPageProps {
  children: ReactNode;
}

const NavLink = ({ to, title }: { to: string; title: string }) => {
  return (
    <Link
      to={to}
      className="nav-link text-lg text-gray-500 transition-colors me-8 no-underline"
    >
      {title}
    </Link>
  );
};

const MainPage = ({ children }: MainPageProps) => {
  return (
    <div>
      <TopBar
        left={
          <nav>
            <NavLink to="/collections" title="Your Collections" />
            <NavLink to="/create-collection" title="Create Collection" />
          </nav>
        }
      />
      <Page>{children}</Page>
    </div>
  );
};

export default MainPage;
