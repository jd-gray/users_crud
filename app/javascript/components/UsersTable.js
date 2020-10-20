import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState({});
  const [queryParam, setQueryParam] = useState();

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const pageNumber = params.get("p");

  useEffect(() => {
    axios
      .get("/api/v1/users", { params: { page: pageNumber } })
      .then((response) => {
        const data = response.data;
        setUsers(data.users);
        setPage({
          previousPage: data.previous_page,
          nextPage: data.next_page,
          totalPages: data.total_pages,
        });
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, [queryParam]);

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
          to={{ search: `?p=${page.previousPage}` }}
          onClick={() => setQueryParam(page.previousPage)}
          className="pagination-previous"
          disabled={page.previousPage === 1}
        >
          Previous
        </Link>
        <Link
          to={{ search: `?p=${page.nextPage}` }}
          onClick={() => setQueryParam(page.nextPage)}
          className="pagination-next"
          disabled={page.nextPage === page.totalPages}
        >
          Next page
        </Link>
      </nav>
    </div>
  );
};

export default UsersTable;
