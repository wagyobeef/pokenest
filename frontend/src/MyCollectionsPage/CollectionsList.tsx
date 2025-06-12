import { Collection } from "../types/CollectionType";

interface CollectionsListProps {
  collections: Collection[];
}

const CollectionsList = ({ collections }: CollectionsListProps) => {
  return (
    <div>
      {collections.map((collection: Collection) => (
        <p key={collection._id}>{collection.name}</p>
      ))}
    </div>
  );
};

export default CollectionsList;
