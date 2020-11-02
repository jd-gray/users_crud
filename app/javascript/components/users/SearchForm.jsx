import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Input = styled.input`
  width: 200px;
`;

const Button = styled.input`
  width: 100px;
`;

const SearchForm = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`?q=${searchValue}`);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="columns">
        <div className="column">
          <div className="control">
            <Input
              className="input"
              type="text"
              name="search"
              placeholder="Search table..."
              value={searchValue}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="column">
          <div className="control">
            <Button
              className="button is-primary"
              type="submit"
              value="Submit"
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SearchForm;
