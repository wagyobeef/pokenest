import { useNavigate } from "react-router-dom";
import MainPage from "../components/MainPage";
import Button from "../components/Button";

const CreateCollectionPage = () => {
  const navigate = useNavigate();

  return (
    <MainPage>
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="flex flex-col items-center w-96">
          <div className="self-start">
            <p className="font-semibold text-gray-900 mb-1 text-lg">
              Quick start
            </p>
            <p className="text-gray-500 mb-4 text-lg">
              Generate a collection based on a filter, like artist or Pokemon
            </p>
          </div>
          <Button
            size="large"
            fullWidth
            onClick={() => navigate("/generate-collection")}
          >
            Generate collection
          </Button>
          <div className="my-8 w-full">
            <div className="h-[1px] bg-[#EAEAEA]" />
          </div>
          <div className="self-start">
            <p className="font-semibold text-gray-900 mb-1 text-lg">
              Build from scratch
            </p>
            <p className="text-gray-500 mb-4 text-lg">
              Create a custom collection by searching for individual cards
            </p>
          </div>
          <Button
            size="large"
            variant="secondary"
            fullWidth
            onClick={() => navigate("/create-manual-collection")}
          >
            Create manual collection
          </Button>
        </div>
      </div>
    </MainPage>
  );
};

export default CreateCollectionPage;
