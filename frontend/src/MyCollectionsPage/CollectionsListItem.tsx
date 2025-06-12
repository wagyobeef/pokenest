import { CollectionType } from "../types/CollectionType";

interface CollectionsListItemProps {
  collection: CollectionType;
}

const CollectionsListItem = ({ collection }: CollectionsListItemProps) => {
  console.log(collection);
  return (
    <div className="p-4 border border-gray-300 rounded-lg mb-2 hover:border-gray-400 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-xl font-semibold text-gray-800">
          {collection.name}
        </h3>
        <p className="text-gray-500 text-m font-medium">
          {collection.cardIds?.length ?? 0} cards
        </p>
      </div>
      <div className="flex gap-2">
        {collection.previewCards?.map((card) => (
          <img
            key={card.id}
            src={card.images.small}
            alt={card.name}
            className="w-32 h-auto rounded-md shadow-[2px_0_4px_rgba(0,0,0,0.1)]"
          />
        ))}
        <div className="w-32 h-auto bg-black/20 rounded-md shadow-[2px_0_4px_rgba(0,0,0,0.1)] flex items-center justify-center">
          <p className="text-white text-sm text-center px-2">
            View entire collection
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollectionsListItem;
