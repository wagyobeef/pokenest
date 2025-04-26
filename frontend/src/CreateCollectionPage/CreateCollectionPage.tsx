import { useNavigate } from "react-router-dom";
import MainPage from "../components/MainPage";
import Button from "../components/Button";

const CreateCollectionPage = () => {
  const navigate = useNavigate();

  return (
    <MainPage>
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="flex flex-col items-center gap-4 w-80">
          <Button
            size="large"
            fullWidth
            onClick={() => navigate("/generate-collection")}
          >
            Generate new collection
          </Button>
          <p className="my-4 text-[#9CA3AF] text-lg font-medium">OR</p>
          <Button
            size="large"
            variant="secondary"
            fullWidth
            onClick={() => navigate("/create-manual-collection")}
          >
            Manually create collection
          </Button>
        </div>
      </div>
    </MainPage>
  );
};

export default CreateCollectionPage;
