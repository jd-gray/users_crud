import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../routers/AppRouter";

const UsersTable = () => {
  const usersState = useUserContext();

  if (usersState.loading) {
    return <div>Loading..</div>;
  }

  const {
    users,
    previous_page: previousPage,
    next_page: nextPage,
    current_page: currentPage,
    total_pages: totalPages,
  } = usersState.data;
  
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
        >
          Previous
        </Link>
        <Link
          to={{ search: `?p=${nextPage}` }}
          className="pagination-next"
        >
          Next page
        </Link>
      </nav>
      <p>Page {currentPage} of {totalPages}</p>
    </div>
  );
};

export default UsersTable;
