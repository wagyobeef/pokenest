import { ReactNode } from "react";

interface TopBarProps {
  left?: ReactNode;
  middle?: ReactNode;
  right?: ReactNode;
}

const TopBar = ({ left, middle, right }: TopBarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-20 bg-white shadow-md z-10">
      <div className="mx-8 h-full px-4 flex items-center justify-between">
        <div>{left}</div>
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          {middle}
        </div>
        <div>{right}</div>
      </div>
    </div>
  );
};

export default TopBar;
