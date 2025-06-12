export interface CollectionType {
  _id: string;
  name: string;
  cardIds: string[];
  previewCards?: {
    id: string;
    name: string;
    images: {
      small: string;
    };
  }[];
}
