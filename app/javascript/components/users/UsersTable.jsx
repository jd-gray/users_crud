import React from "react";
import styled from "styled-components";
import { capitalize } from "../../lib/capitalize";
import { formatDateTime } from "../../lib/formatDateTime";
import { useUserContext } from "../../routers/AppRouter";
import Pagination from "./Pagination";
import SearchForm from "./SearchForm";
import SortableColumn from "./SortableColumn";

const HeaderColumns = styled.div`
  margin-top: 15px;
`;

const Table = styled.table`
  width: 100%;
`;

const StatusData = styled.td`
  color: ${props => props.status === "active" ? "hsl(141, 53%, 53%)" : "hsl(348, 100%, 61%)"};
  font-weight: 700;
`;

const UsersTable = () => {
  const usersState = useUserContext();

  if (usersState.loading) {
    return <div>Loading..</div>;
  }

  const { users } = usersState.data;

  return (
    <div className="container">
      <HeaderColumns className="columns is-vcentered">
        <div className="column">
          <h1 className="is-size-2">User Details</h1>
        </div>
        <div className="column">
          <SearchForm />
        </div>
      </HeaderColumns>
      <Table className="table">
        <thead>
          <tr>
            <SortableColumn columnName={"updated_at"} displayText={"Last updated"} />
            <SortableColumn columnName={"name"} displayText={"Name"} />
            <SortableColumn columnName={"email"} displayText={"Email"} />
            <SortableColumn columnName={"title"} displayText={"Title"} />
            <SortableColumn columnName={"phone"} displayText={"Phone"} />
            <SortableColumn columnName={"status"} displayText={"Status"} />
            <td><b>Actions</b></td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={`${user.name}-${index}`}>
              <td>{formatDateTime(user.updated_at)}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.title}</td>
              <td>{user.phone}</td>
              <StatusData status={user.status}>{capitalize(user.status)}</StatusData>
              <td></td>
            </tr>
            ))}
        </tbody>
      </Table>
      <Pagination />
    </div>
  );
};

export default UsersTable;
