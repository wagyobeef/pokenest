import SearchCardsSection from "./SearchCardsSection";
import SubPage from "../components/SubPage";
import { useState } from "react";
import { FormattedCardType } from "../types/CardType";
import DisplayCollectionSection from "./DisplayCollectionSection";
import Button from "../components/Button";

const CreateManualCollectionPage = () => {
  const [addedCards, setAddedCards] = useState<FormattedCardType[]>([]);

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
      />
      <div className="sticky bottom-4 w-full flex justify-end pr-4">
        <Button variant="primary" size="large">
          Create Collection
        </Button>
      </div>
    </SubPage>
  );
};

export default CreateManualCollectionPage;
