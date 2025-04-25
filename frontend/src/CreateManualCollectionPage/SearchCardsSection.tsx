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
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-center">
        <div className="flex max-w-md w-full border-2 border-gray-200 rounded-lg overflow-hidden">
          <input
            type="text"
            className="flex-1 py-2 px-4 focus:outline-none"
            placeholder="Search for Pokemon cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-white border-l border-gray-200 hover:bg-red-100 transition-colors duration-200 ease-in-out"
            onClick={searchCards}
          >
            Search
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <LoadingIndicator />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1300px] mx-auto">
          {searchedCards.map((card: FormattedCardType) => (
            <div
              key={card.id}
              className="border rounded-lg p-4 relative group max-w-[300px] justify-self-center w-full"
            >
              <img
                src={card.imageUrl}
                alt={card.name}
                className="w-full h-auto"
              />
              <h3 className="text-lg font-semibold mt-2">{card.name}</h3>
              <p className="text-gray-600">{card.setName}</p>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <button
                  onClick={() => {
                    addCardToCollection(card);
                  }}
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Add to Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCardsSection;
