import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchForm = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`?q=${searchValue}`);
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" value={searchValue} onChange={handleChange} />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default SearchForm;