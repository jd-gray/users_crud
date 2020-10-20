import React from "react";
import { useUserContext } from "../../routers/AppRouter";
import Pagination from "./Pagination";
import SearchForm from "./SearchForm";
import SortableColumn from "./SortableColumn";

const UsersTable = () => {
  const usersState = useUserContext();

  if (usersState.loading) {
    return <div>Loading..</div>;
  }

  const { users } = usersState.data;

  return (
    <>
    <SearchForm />
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <SortableColumn columnName={"updated_at"} displayText={"Last updated"} />
            <SortableColumn columnName={"name"} displayText={"Name"} />
            <SortableColumn columnName={"email"} displayText={"Email"} />
            <SortableColumn columnName={"title"} displayText={"Title"} />
            <SortableColumn columnName={"phone"} displayText={"Phone"} />
            <SortableColumn columnName={"status"} displayText={"Status"} />
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={`${user.name}-${index}`}>
              <td>{user.updated_at}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.title}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
            </tr>
            ))}
        </tbody>
      </table>
      <Pagination />
    </div>
    </>
  );
};

export default UsersTable;
