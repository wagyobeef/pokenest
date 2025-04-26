import MainPage from "../components/MainPage";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const MyCollectionsPage = () => {
  const [collections, setCollections] = useState<object[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchCollections = async () => {
    //   const response = await fetch("/api/collections");
    //   const data = await response.json();
    //   setCollections(data);
    // };
  }, []);

  return (
    <MainPage>
      {collections.length > 0 ? (
        <div></div>
      ) : (
        <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-500 text-lg mb-4">No collections found!</p>
            <Button size="large" onClick={() => navigate("/create-collection")}>
              Create Collection
            </Button>
          </div>
        </div>
      )}
    </MainPage>
  );
};

export default MyCollectionsPage;
