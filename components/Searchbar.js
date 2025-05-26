import React, { useState } from 'react';
import './Searchbar.css';

function Searchbar({ onSearch }) { // Expect a prop to handle the search
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior (page reload)
    if (onSearch) {
      onSearch(searchTerm); // Call the search function passed as a prop
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {/* Optional: You could have a submit button as well */}
      {/* <button type="submit">Search</button> */}
    </form>
  );
}

export default Searchbar;