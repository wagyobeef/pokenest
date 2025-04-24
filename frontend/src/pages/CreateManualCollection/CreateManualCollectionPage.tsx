import SearchCardsSection from "./SearchCardsSection";
import Page from "../components/Page";

const CreateManualCollectionPage = () => {
  return (
    <Page>
      <p>Create Manual Collectionnn</p>
      <div className="flex flex-col gap-2 text-center">
        <p className="p-16 text-gray-500">Add to collection</p>
      </div>
      <hr className="my-4 border-t border-black" />
      <SearchCardsSection />
    </Page>
  );
};

export default CreateManualCollectionPage;
