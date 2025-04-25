import { FormattedCardType } from "../types/CardType";

interface DisplayCollectionSectionProps {
  cards: FormattedCardType[];
}

const DisplayCollectionSection = ({ cards }: DisplayCollectionSectionProps) => {
  if (cards.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No cards in collection yet
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Your Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1300px] mx-auto">
        {cards.map((card) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCollectionSection;
