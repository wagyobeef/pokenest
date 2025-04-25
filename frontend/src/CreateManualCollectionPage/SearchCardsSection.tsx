import { useState } from "react";
import axios from "axios";

interface Card {
  id: string;
  name: string;
  setName: string;
  imageUrl: string;
  prices: {
    [key: string]: {
      market: number;
    };
  };
}

const SearchCardsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchCards = async () => {
    console.log("in search cards");
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
      const formattedCards = response.data.data.map((card: object) => {
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
      const filteredCards = formattedCards.filter((card: object) => {
        return card != null;
      });
      setCards(filteredCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2 justify-center">
        <input
          type="text"
          className="flex-1 border-2 border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gray-200 max-w-md mb-8"
          placeholder="Search for Pokemon cards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors self-start"
          onClick={searchCards}
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card.id} className="border rounded-lg p-4 relative group">
              <img
                src={card.imageUrl}
                alt={card.name}
                className="w-full h-auto"
              />
              <h3 className="text-lg font-semibold mt-2">{card.name}</h3>
              <p className="text-gray-600">{card.setName}</p>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
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
