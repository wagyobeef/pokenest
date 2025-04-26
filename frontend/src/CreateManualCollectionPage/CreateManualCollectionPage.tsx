import SearchCardsSection from "./SearchCardsSection";
import SubPage from "../components/SubPage";
import { useState } from "react";
import { FormattedCardType } from "../types/CardType";
import DisplayCollectionSection from "./DisplayCollectionSection";

const CreateManualCollectionPage = () => {
  const [cards, setCards] = useState<FormattedCardType[]>([]);

  return (
    <SubPage backTo="/create-collection" title="Create Manual Collection">
      <SearchCardsSection cards={cards} setCards={setCards} />
      <hr className="my-8 border-t border-[#EAEAEA]" />
      <DisplayCollectionSection cards={cards} setCards={setCards} />
    </SubPage>
  );
};

export default CreateManualCollectionPage;
