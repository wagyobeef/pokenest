import { ReactNode } from "react";
import Page from "./Page";
import TopBar from "./TopBar";
import SubPageTitle from "./SubPageTitle";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface SubPageProps {
  children: ReactNode;
  backTo: string;
  title: string;
}

const SubPage = ({ children, backTo, title }: SubPageProps) => {
  const navigate = useNavigate();

  return (
    <>
      <TopBar
        left={
          <ArrowLeft
            onClick={() => navigate(backTo)}
            className="cursor-pointer w-10 h-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
          />
        }
        middle={<SubPageTitle>{title}</SubPageTitle>}
      />
      <Page>{children}</Page>
    </>
  );
};

export default SubPage;
