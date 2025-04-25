import { ReactNode } from "react";
import Page from "./Page";
import TopBar from "./TopBar";

import { ArrowLeft } from "lucide-react";

interface SubPageProps {
  children: ReactNode;
  backPage: string;
}

const SubPage = ({ children, backPage }: SubPageProps) => {
  return (
    <>
      <TopBar>
        <ArrowLeft className="cursor-pointer w-10 h-10 p-2 rounded-full hover:bg-gray-100 transition-colors" />
      </TopBar>
      <Page>{children}</Page>
    </>
  );
};

export default SubPage;
