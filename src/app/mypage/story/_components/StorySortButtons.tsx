type SortOrder = "newest" | "oldest";

interface StorySortButtonsProps {
  sortOrder: SortOrder;
  onSort: (order: SortOrder) => void;
}

const StorySortButtons = ({ sortOrder, onSort }: StorySortButtonsProps) => {
  return (
    <div className="flex justify-end mb-6 gap-2">
      <button
        className={`px-4 py-2 rounded transition-colors ${
          sortOrder === "newest"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => onSort("newest")}
      >
        최신순
      </button>
      <button
        className={`px-4 py-2 rounded transition-colors ${
          sortOrder === "oldest"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => onSort("oldest")}
      >
        오래된순
      </button>
    </div>
  );
};

export default StorySortButtons;
