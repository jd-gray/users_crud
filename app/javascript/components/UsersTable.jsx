import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../routers/AppRouter";

const UsersTable = () => {
  const usersState = useUserContext();

  if (usersState.loading) {
    return <div>Loading..</div>;
  }

  const users = usersState.loaded ? usersState.users : [];
  const previousPage = usersState.loaded ? usersState.previousPage : 0;
  const nextPage = usersState.loaded ? usersState.nextPage : 0;
  const totalPages = usersState.loaded ? usersState.totalPages : 0;

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Last updated</th>
            <th>Name</th>
            <th>Email</th>
            <th>Title</th>
            <th>Phone</th>
            <th>Status</th>
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
      <nav className="pagination" role="navigation" aria-label="pagination">
        <Link
          to={{ search: `?p=${previousPage}` }}
          className="pagination-previous"
          disabled={previousPage === 1}
        >
          Previous
        </Link>
        <Link
          to={{ search: `?p=${nextPage}` }}
          className="pagination-next"
          disabled={nextPage === totalPages}
        >
          Next page
        </Link>
      </nav>
    </div>
  );
};

export default UsersTable;
