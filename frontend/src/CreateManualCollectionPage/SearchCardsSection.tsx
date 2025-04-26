import { useState } from "react";
import axios from "axios";
import { CardType, FormattedCardType } from "../types/CardType";
import LoadingIndicator from "../components/LoadingIndicator";
import Button from "../components/Button";

interface SearchCardsSectionProps {
  cards: FormattedCardType[];
  setCards: (cards: FormattedCardType[]) => void;
}

const SearchCardsSection = ({ cards, setCards }: SearchCardsSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCards, setSearchedCards] = useState<FormattedCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchCards = async () => {
    setIsLoading(true);
    const params = {
      q: `name:${searchQuery}*`,
    };

    try {
      const apiURL = import.meta.env.VITE_SERVER_URL;
      const response = await axios.get(`${apiURL}/search-cards`, {
        params,
      });
      console.log(response.data);
      const formattedCards = response.data.data.map((card: CardType) => {
        const tcgPlayerData = card.tcgplayer;
        if (tcgPlayerData == null) {
          return null;
        }
        const prices = tcgPlayerData.prices;
        if (prices == null) {
          return null;
        }
        return {
          id: card.id,
          name: card.name,
          setName: card.set.name,
          imageUrl: card.images.small,
          prices: tcgPlayerData.prices,
        };
      });
      const filteredCards = formattedCards.filter((card: FormattedCardType) => {
        return card != null;
      });
      setSearchedCards(filteredCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCardToCollection = (card: FormattedCardType) => {
    setCards([...cards, card]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <div className="flex max-w-md w-full border-2 border-gray-200 rounded-lg overflow-hidden mb-2">
          <input
            type="text"
            className="flex-1 py-2 px-4 focus:outline-none"
            placeholder="Search for Pokemon cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchCards();
              }
            }}
            spellCheck="false"
          />
          <button
            className="px-6 py-2 bg-white border-l border-gray-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-200 ease-in-out cursor-pointer"
            onClick={searchCards}
          >
            Search
          </button>
        </div>
        {searchedCards.length > 0 && (
          <button
            onClick={() => {
              setSearchedCards([]);
              setSearchQuery("");
            }}
            className="text-blue-500 hover:text-blue-600 text-sm transition-colors cursor-pointer"
          >
            Clear results
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-32">
          <LoadingIndicator />
        </div>
      ) : (
        <>
          <div className="max-w-[880px] mx-auto px-4 w-full">
            <div className="flex overflow-x-auto gap-2 pb-4 hide-scrollbar">
              {searchedCards.map((card: FormattedCardType) => (
                <div
                  key={card.id}
                  className="relative group w-[200px] rounded-lg overflow-hidden flex-shrink-0"
                >
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className="h-16 bg-gradient-to-t from-black/65 to-transparent"></div>
                    <div className="bg-black/65 p-3">
                      <h3 className="text-sm font-semibold truncate text-white">
                        {card.name}
                      </h3>
                      <p className="text-xs truncate text-gray-300">
                        {card.setName}
                      </p>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Button
                      onClick={() => {
                        addCardToCollection(card);
                      }}
                      variant="secondary"
                      size="small"
                    >
                      Add to Collection
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchCardsSection;
