interface SubPageTitleProps {
  children: string;
}

const SubPageTitle = ({ children }: SubPageTitleProps) => {
  return <h2 className="text-lg font-medium text-gray-600">{children}</h2>;
};

export default SubPageTitle;
