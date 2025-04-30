import { ReactNode } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import Page from "./Page";
import TopBar from "./TopBar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

interface MainPageProps {
  children: ReactNode;
}

const NavLink = ({ to, title }: { to: string; title: string }) => {
  return (
    <RouterNavLink
      to={to}
      end
      className={({ isActive }) =>
        `nav-link text-lg transition-colors me-8 no-underline ${
          isActive ? "active" : ""
        }`
      }
    >
      {title}
    </RouterNavLink>
  );
};

const MainPage = ({ children }: MainPageProps) => {
  return (
    <div>
      <TopBar
        left={
          <nav>
            <NavLink to="/my-collections" title="My Collections" />
            <NavLink to="/create-collection" title="Create Collection" />
          </nav>
        }
        right={
          <>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </>
        }
      />
      <Page>{children}</Page>
    </div>
  );
};

export default MainPage;
