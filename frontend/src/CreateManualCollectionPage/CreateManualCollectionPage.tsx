import SearchCardsSection from "./SearchCardsSection";
import SubPage from "../components/SubPage";
import { useState } from "react";
import { FormattedCardType } from "../types/CardType";
import DisplayCollectionSection from "./DisplayCollectionSection";
import Button from "../components/Button";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const CreateManualCollectionPage = () => {
  const [addedCards, setAddedCards] = useState<FormattedCardType[]>([]);
  const [collectionName, setCollectionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const handleCreateCollection = async () => {
    if (!collectionName.trim()) {
      alert("Please enter a collection name");
      return;
    }

    if (addedCards.length === 0) {
      alert("Please add at least one card to your collection");
      return;
    }

    setIsLoading(true);
    try {
      const token = await getToken();
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/collections`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: collectionName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create collection");
      }

      const data = await response.json();
      console.log("Collection created:", data);
      navigate("/collections"); // Navigate to collections page after successful creation
    } catch (error) {
      console.error("Error creating collection:", error);
      alert("Failed to create collection. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubPage backTo="/create-collection" title="Create Manual Collection">
      <SearchCardsSection
        addedCards={addedCards}
        setAddedCards={setAddedCards}
      />
      <hr className="my-8 border-t border-[#E0E0E0]" />
      <DisplayCollectionSection
        addedCards={addedCards}
        setAddedCards={setAddedCards}
        collectionName={collectionName}
        setCollectionName={setCollectionName}
      />
      <div className="sticky bottom-4 w-full flex justify-end pr-4">
        <Button
          variant="primary"
          size="large"
          onClick={handleCreateCollection}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Collection"}
        </Button>
      </div>
    </SubPage>
  );
};

export default CreateManualCollectionPage;
