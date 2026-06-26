type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const categories = [
  "All",
  "Department",
  "Library",
  "Transport",
  "Hostel",
  "Food",
];

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-3 py-2 rounded-lg border transition ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}