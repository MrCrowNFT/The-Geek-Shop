import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <form>
        <input
          className="search-query"
          type="text"
          placeholder="Search products"
          autoComplete="off"
          autoCapitalize="off"
        ></input>
      </form>
    </div>
  );
};

export default SearchBar;
