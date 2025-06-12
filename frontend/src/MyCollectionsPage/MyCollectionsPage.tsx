import MainPage from "../components/MainPage";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import CollectionsList from "./CollectionsList";
import { CollectionType } from "../types/CollectionType";

const MyCollectionsPage = () => {
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const token = await getToken();
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/collections`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch collections");
        }
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, [getToken]);

  return (
    <MainPage>
      {collections.length > 0 ? (
        <CollectionsList collections={collections} />
      ) : (
        <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-500 text-xl mb-4">No collections found!</p>
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
