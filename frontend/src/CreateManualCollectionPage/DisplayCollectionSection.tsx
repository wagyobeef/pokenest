import { useState } from "react";
import { FormattedCardType } from "../types/CardType";

interface DisplayCollectionSectionProps {
  cards: FormattedCardType[];
  setCards: (cards: FormattedCardType[]) => void;
}

const DisplayCollectionSection = ({
  cards,
  setCards,
}: DisplayCollectionSectionProps) => {
  const [collectionName, setCollectionName] = useState("");

  const removeCard = (cardToRemove: FormattedCardType) => {
    setCards(cards.filter((card) => card.id !== cardToRemove.id));
  };

  return (
    <div>
      <div className="flex items-center mb-8 ms-8 justify-center">
        <div className="mr-4 flex items-center justify-center bg-gray-100 rounded-full h-7 w-7">
          <span className="text-base text-gray-600">{cards.length}</span>
        </div>
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="Collection Name"
          className={`text-xl font-semibold text-gray-900 bg-transparent outline-none focus:outline-none placeholder-gray-400 w-auto ${
            collectionName === "" ? "border-b-2 border-gray-200" : ""
          }`}
        />
      </div>

      {cards.length === 0 ? (
        <div className="text-center text-gray-500 py-8 text-lg max-w-md mx-auto">
          No cards added yet. Search and select cards above to start building
          your collection!
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 max-w-[1200px] mx-auto px-4">
          {cards.map((card) => (
            <div key={card.id} className="relative w-[200px] rounded-lg">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-full h-auto"
                />
                <button
                  onClick={() => removeCard(card)}
                  className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 border border-[#F28B82] hover:bg-[#F28B82] cursor-pointer focus:outline-none [&:hover>svg]:text-white"
                  aria-label="Remove from collection"
                >
                  <svg
                    className="w-5 h-5 text-[#F28B82] transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="h-16 bg-gradient-to-t from-black/65 to-transparent"></div>
                  <div className="bg-black/65 p-4 rounded-b-lg">
                    <h3 className="text-sm font-semibold truncate text-white">
                      {card.name}
                    </h3>
                    <p className="text-xs truncate text-gray-300">
                      {card.setName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayCollectionSection;
