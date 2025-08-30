import { FaSearch } from 'react-icons/fa'; // Import the search icon

const SearchBar = () => {
  return (
    <div className="relative hidden sm:block">
      <input
        type="text"
        placeholder="Search..."
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;