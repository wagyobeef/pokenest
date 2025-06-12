import { CollectionType } from "../types/CollectionType";
import CollectionsListItem from "./CollectionsListItem";

interface CollectionsListProps {
  collections: CollectionType[];
}

const CollectionsList = ({ collections }: CollectionsListProps) => {
  console.log(collections);
  return (
    <div>
      {collections.map((collection: CollectionType) => (
        <CollectionsListItem key={collection._id} collection={collection} />
      ))}
    </div>
  );
};

export default CollectionsList;
