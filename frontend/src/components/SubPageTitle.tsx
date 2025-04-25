interface SubPageTitleProps {
  children: string;
}

const SubPageTitle = ({ children }: SubPageTitleProps) => {
  return <h2 className="text-xl font-medium">{children}</h2>;
};

export default SubPageTitle;
