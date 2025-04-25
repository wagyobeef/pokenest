import { ReactNode } from "react";

interface TopBarProps {
  children: ReactNode;
}

const TopBar = ({ children }: TopBarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-24 bg-white shadow-md z-10">
      <div className="mx-12 h-full px-5 flex items-center">{children}</div>
    </div>
  );
};

export default TopBar;
