import { useNavigate } from "react-router-dom";
import MainPage from "../components/MainPage";

const CreateCollectionPage = () => {
  const navigate = useNavigate();

  return (
    <MainPage>
      <button onClick={() => navigate("/generate-collection")}>
        Generate new collection
      </button>
      <button onClick={() => navigate("/create-manual-collection")}>
        Manually create collection
      </button>
    </MainPage>
  );
};

export default CreateCollectionPage;
