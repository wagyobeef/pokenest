import { useState } from "react";
import axios from "axios";
import { CardType, FormattedCardType } from "../types/CardType";
import LoadingIndicator from "../components/LoadingIndicator";

interface SearchCardsSectionProps {
  cards: FormattedCardType[];
  setCards: (cards: FormattedCardType[]) => void;
}

const SearchCardsSection = ({ cards, setCards }: SearchCardsSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCards, setSearchedCards] = useState<FormattedCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchCards = async () => {
    setIsLoading(true);
    setHasSearched(true);
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

  const toggleCardInCollection = (card: FormattedCardType) => {
    const isInCollection = cards.some((c) => c.id === card.id);
    if (isInCollection) {
      setCards(cards.filter((c) => c.id !== card.id));
    } else {
      setCards([card, ...cards]);
    }
  };

  const clearResults = () => {
    setSearchedCards([]);
    setSearchQuery("");
    setHasSearched(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <div className="flex max-w-md w-full border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
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
            className="px-6 py-2 bg-white border-l border-gray-300 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-200 ease-in-out cursor-pointer"
            onClick={searchCards}
          >
            Search
          </button>
        </div>
        {searchedCards.length > 0 && (
          <button
            onClick={clearResults}
            className="text-blue-500 hover:text-blue-600 text-base transition-colors cursor-pointer"
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
          <div className="max-w-[1200px] mx-auto px-4 w-full">
            {searchedCards.length > 0 ? (
              <div className="flex overflow-x-auto gap-4 pb-4 pt-1 hide-scrollbar">
                {searchedCards.map((card: FormattedCardType) => (
                  <div
                    key={card.id}
                    className="relative w-[200px] rounded-lg flex-shrink-0"
                  >
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-auto"
                      />
                      <button
                        onClick={() => toggleCardInCollection(card)}
                        className={`absolute -top-1 -right-1 w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-200 border cursor-pointer focus:outline-none ${
                          cards.some((c) => c.id === card.id)
                            ? "bg-green-500 border-green-500 hover:bg-green-600"
                            : "bg-white border-gray-400 hover:bg-gray-50"
                        }`}
                        aria-label={
                          cards.some((c) => c.id === card.id)
                            ? "Remove from collection"
                            : "Add to collection"
                        }
                      >
                        {cards.some((c) => c.id === card.id) ? (
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        )}
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
            ) : (
              <div className="text-center text-gray-500 py-24 text-lg">
                {hasSearched
                  ? "No results found"
                  : "Search results will show up here"}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchCardsSection;
