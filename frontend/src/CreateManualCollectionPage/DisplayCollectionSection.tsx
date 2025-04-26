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
      <div className="flex items-center mb-4 ms-8">
        <h2 className="text-xl font-semibold text-gray-900">In Collection</h2>
        <div className="ml-2 flex items-center justify-center bg-gray-100 rounded-full h-7 w-7">
          <span className="text-base text-gray-600">{cards.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-2 gap-x-1 max-w-[1300px] mx-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            className="border border-gray-300 rounded-lg p-3 relative group max-w-[200px] justify-self-center w-full"
          >
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-auto"
            />
            <h3 className="text-base font-semibold mt-2 truncate">
              {card.name}
            </h3>
            <p className="text-sm text-gray-600 truncate">{card.setName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCollectionSection;
