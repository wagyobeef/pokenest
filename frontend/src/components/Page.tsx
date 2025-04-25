import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <div className="flex justify-center w-screen min-h-screen bg-yellow-50">
      <div className="mx-8 w-full max-w-[1600px] p-8 bg-white shadow-lg pt-28">
        {children}
      </div>
    </div>
  );
};

export default Page;
