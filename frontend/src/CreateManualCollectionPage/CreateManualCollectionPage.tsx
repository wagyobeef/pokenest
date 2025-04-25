import SearchCardsSection from "./SearchCardsSection";
import SubPage from "../components/SubPage";
import { useState } from "react";
import { FormattedCardType } from "../types/CardType";
import DisplayCollectionSection from "./DisplayCollectionSection";

const CreateManualCollectionPage = () => {
  const [cards, setCards] = useState<FormattedCardType[]>([]);

  return (
    <SubPage backTo="/create-collection" title="Create Manual Collection">
      <DisplayCollectionSection cards={cards} />
      <hr className="my-4 border-t border-black" />
      <SearchCardsSection cards={cards} setCards={setCards} />
    </SubPage>
  );
};

export default CreateManualCollectionPage;
