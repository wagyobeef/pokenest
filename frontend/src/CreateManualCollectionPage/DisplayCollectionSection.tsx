import { FormattedCardType } from "../types/CardType";

interface DisplayCollectionSectionProps {
  cards: FormattedCardType[];
}

const DisplayCollectionSection = ({ cards }: DisplayCollectionSectionProps) => {
  if (cards.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No cards in collection yet
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-8 ms-8 justify-center">
        <h2 className="text-xl font-semibold text-gray-900">In Collection</h2>
        <div className="ml-2 flex items-center justify-center bg-gray-100 rounded-full h-7 w-7">
          <span className="text-base text-gray-600">{cards.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center max-w-[880px] mx-auto px-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative group w-[200px] rounded-lg overflow-hidden"
          >
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0">
              <div className="h-16 bg-gradient-to-t from-black/75 to-transparent"></div>
              <div className="bg-black/75 p-3">
                <h3 className="text-sm font-semibold truncate text-white">
                  {card.name}
                </h3>
                <p className="text-xs truncate text-gray-300">{card.setName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCollectionSection;
