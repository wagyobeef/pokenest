import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <div className="flex justify-center w-screen min-h-screen bg-yellow-50">
      <div className="mx-auto w-full max-w-[1200px] p-5 bg-white shadow-lg pt-32">
        {children}
      </div>
    </div>
  );
};

export default Page;
