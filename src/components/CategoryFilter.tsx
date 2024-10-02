interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

function CategoryFilter({categories, selectedCategory, onSelectCategory}: CategoryFilterProps){
  return (
    <div className="flex flex-wrap justify-center sm:justify-start space-x-2 mb-4">
      <button
        onClick={() => onSelectCategory('')}
        className={`px-3 py-1 rounded ${selectedCategory === '' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        ทั้งหมด
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-3 py-1 rounded ${
            selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
